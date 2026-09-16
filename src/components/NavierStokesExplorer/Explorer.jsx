import React, {useMemo, useRef, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import * as THREE from 'three';
import katex from 'katex';
import styles from './styles.module.css';

// --- Geometry of the venturi (converging-diverging pipe) -----------------
// Local convention: flow travels along local +X, radial plane is Y/Z.
// The whole assembly is tilted around Z so the pipe descends left-to-right,
// which is what gives gravity a visible, non-decorative role.

const LENGTH = 8;
const R_INLET = 1.4;
const R_THROAT = 0.55;
const THROAT_WIDTH = 1.5;
const TILT = -0.36; // radians, ~-20.6°

function radiusAt(x) {
  const bump = Math.exp(-((x / THROAT_WIDTH) ** 2));
  return R_INLET - (R_INLET - R_THROAT) * bump;
}

const TERMS = [
  {
    id: 'local',
    tex: '\\rho\\dfrac{\\partial \\vec{u}}{\\partial t}',
    label: 'Local acceleration',
    description: "How the flow's speed at a fixed point changes over time.",
    color: '#60a5fa',
  },
  {
    id: 'convective',
    tex: '\\rho(\\vec{u}\\cdot\\nabla)\\vec{u}',
    label: 'Convective acceleration',
    description: 'Water speeds up as the pipe narrows, purely from moving into a smaller cross-section.',
    color: '#2dd4bf',
  },
  {
    id: 'pressure',
    tex: '-\\nabla p',
    label: 'Pressure gradient',
    description: 'Pressure is highest where the pipe is wide and drops toward the throat, pushing flow toward the constriction.',
    color: '#f87171',
  },
  {
    id: 'gravity',
    tex: '\\rho\\vec{g}',
    label: 'Gravity',
    description: 'Always points straight down in the real world, regardless of which way the pipe is angled.',
    color: '#a78bfa',
  },
  {
    id: 'friction',
    tex: '\\vec{S}_F',
    label: 'Friction (source term)',
    description: "This course lumps viscous drag near the walls into one source term rather than expanding it into a separate stress term.",
    color: '#f59e0b',
  },
];

// TERMS is static and its LaTeX never changes, so render each term's HTML
// once at module load rather than re-parsing it on every button re-render.
const TERMS_WITH_HTML = TERMS.map((term) => ({
  ...term,
  html: katex.renderToString(term.tex, {throwOnError: false, displayMode: false}),
}));

// --- A single arrow, built from a shaft + cone pointing along `direction` -
// Deliberately not THREE.ArrowHelper: its shaft is a thin Line and its
// color/head sizing are less controllable than a solid cylinder+cone here.

function Arrow({position, direction, length, color, radius = 0.045}) {
  // Cheap enough to compute directly: call sites pass fresh array literals
  // for `direction`, so memoizing on it would never actually hit the cache.
  const dir = new THREE.Vector3(...direction).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);

  const shaftLength = length * 0.72;
  const headLength = length * 0.28;

  return (
    <group position={position} quaternion={quaternion}>
      <mesh position={[shaftLength / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[radius, radius, shaftLength, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[shaftLength + headLength / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[radius * 2.4, headLength, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// --- The venturi shell itself ---------------------------------------------

function VenturiShell() {
  const geometry = useMemo(() => {
    const points = [];
    const segments = 48;
    for (let i = 0; i <= segments; i++) {
      const x = -LENGTH / 2 + (LENGTH * i) / segments;
      points.push(new THREE.Vector2(radiusAt(x), x));
    }
    const geo = new THREE.LatheGeometry(points, 40);
    // Lathe revolves around Y by default; reorient so the tube's axis is X.
    geo.rotateZ(-Math.PI / 2);
    return geo;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#94a3b8"
        transparent
        opacity={0.18}
        side={THREE.DoubleSide}
        roughness={0.4}
      />
    </mesh>
  );
}

// --- Flowing water particles ----------------------------------------------

const PARTICLE_COUNT = 420;

function WaterParticles() {
  const pointsRef = useRef();
  const state = useMemo(() => {
    const arr = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr.push({
        x: -LENGTH / 2 + Math.random() * LENGTH,
        radiusFrac: 0.15 + Math.random() * 0.75,
        angle: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = state[i];
      const r = radiusAt(p.x);
      const speed = 0.9 / (r * r);
      p.x += speed * dt;
      if (p.x > LENGTH / 2) {
        p.x = -LENGTH / 2;
        p.radiusFrac = 0.15 + Math.random() * 0.75;
        p.angle = Math.random() * Math.PI * 2;
      }
      const rr = radiusAt(p.x) * p.radiusFrac;
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = rr * Math.cos(p.angle);
      positions[i * 3 + 2] = rr * Math.sin(p.angle);
    }
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#7dd3fc" size={0.06} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

// --- Term-specific vector fields ------------------------------------------

const STATIONS = [-3, -1.8, -0.6, 0.6, 1.8, 3];

// Convective acceleration: arrow length scales with local flow speed
// (continuity: speed ~ 1/r^2), between a visible minimum and a max stretch.
const CONVECTIVE_MIN_LENGTH = 0.35;
const CONVECTIVE_MAX_STRETCH = 1.1;

function ConvectiveArrows() {
  const speeds = STATIONS.map((x) => 1 / radiusAt(x) ** 2);
  const maxSpeed = Math.max(...speeds);
  return STATIONS.map((x, i) => (
    <Arrow
      key={x}
      position={[x, 0, 0]}
      direction={[1, 0, 0]}
      length={CONVECTIVE_MIN_LENGTH + (speeds[i] / maxSpeed) * CONVECTIVE_MAX_STRETCH}
      color="#2dd4bf"
    />
  ));
}

// Pressure gradient: arrows point toward the throat from both sides, with
// length scaled by how steeply the radius is changing at that station.
const PRESSURE_GRADIENT_SAMPLE_EPS = 0.15;
const PRESSURE_MIN_LENGTH = 0.3;
const PRESSURE_GRADIENT_SCALE = 2.2;

function PressureArrows() {
  return STATIONS.map((x) => {
    const eps = PRESSURE_GRADIENT_SAMPLE_EPS;
    const grad = Math.abs(radiusAt(x + eps) - radiusAt(x - eps)) / (2 * eps);
    const towardThroat = x < 0 ? 1 : x > 0 ? -1 : 1;
    return (
      <Arrow
        key={x}
        position={[x, 0, 0]}
        direction={[towardThroat, 0, 0]}
        length={PRESSURE_MIN_LENGTH + grad * PRESSURE_GRADIENT_SCALE}
        color="#f87171"
      />
    );
  });
}

// Friction: short arrows opposing the flow, clustered near the pipe wall.
const FRICTION_STATIONS = [-2.4, -0.9, 0.9, 2.4];
const FRICTION_WALL_ANGLES = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
const FRICTION_WALL_FRACTION = 0.92; // how close to the wall radius, vs the centerline
const FRICTION_ARROW_LENGTH = 0.4;
const FRICTION_ARROW_RADIUS = 0.035;

function FrictionArrows() {
  const arrows = [];
  FRICTION_STATIONS.forEach((x) => {
    const r = radiusAt(x) * FRICTION_WALL_FRACTION;
    FRICTION_WALL_ANGLES.forEach((a) => {
      arrows.push(
        <Arrow
          key={`${x}-${a}`}
          position={[x, r * Math.cos(a), r * Math.sin(a)]}
          direction={[-1, 0, 0]}
          length={FRICTION_ARROW_LENGTH}
          color="#f59e0b"
          radius={FRICTION_ARROW_RADIUS}
        />,
      );
    });
  });
  return arrows;
}

// Local acceleration: fixed-position arrows whose length pulses over time,
// illustrating "how speed at this point changes in time" rather than a
// static vector.
const LOCAL_ACCEL_ARROW_LENGTH = 0.9;
const LOCAL_ACCEL_PULSE_SPEED = 1.6;
const LOCAL_ACCEL_PHASE_STEP = 0.9;

function LocalAccelArrows() {
  const groupRefs = useRef(STATIONS.map(() => React.createRef()));

  useFrame(({clock}) => {
    const t = clock.getElapsedTime();
    groupRefs.current.forEach((ref, i) => {
      if (ref.current) {
        const pulse = 0.55 + 0.45 * Math.sin(t * LOCAL_ACCEL_PULSE_SPEED + i * LOCAL_ACCEL_PHASE_STEP);
        ref.current.scale.set(pulse, pulse, pulse);
      }
    });
  });

  return STATIONS.map((x, i) => (
    <group ref={groupRefs.current[i]} key={x} position={[x, 0, 0]}>
      <Arrow position={[0, 0, 0]} direction={[1, 0, 0]} length={LOCAL_ACCEL_ARROW_LENGTH} color="#60a5fa" />
    </group>
  ));
}

// Gravity arrows must point world-down regardless of the venturi's tilt, so
// they're rendered outside the tilted group. Their positions are still
// derived from the group's actual rotation (rather than a hand-rolled
// duplicate of it) so they stay correct if TILT or its axis ever changes.
const TILT_AXIS = new THREE.Vector3(0, 0, 1);
// Vertical clearance above the tilted pipe so the arrows float clear of the shell.
const GRAVITY_ARROW_CLEARANCE = R_INLET + 1.2;

function GravityArrows() {
  return STATIONS.map((x) => {
    const worldPos = new THREE.Vector3(x, 0, 0).applyAxisAngle(TILT_AXIS, TILT);
    worldPos.y += GRAVITY_ARROW_CLEARANCE;
    return (
      <Arrow
        key={x}
        position={worldPos.toArray()}
        direction={[0, -1, 0]}
        length={0.9}
        color="#a78bfa"
      />
    );
  });
}

function TermVectors({activeTerm}) {
  switch (activeTerm) {
    case 'local':
      return <LocalAccelArrows />;
    case 'convective':
      return <ConvectiveArrows />;
    case 'pressure':
      return <PressureArrows />;
    case 'friction':
      return <FrictionArrows />;
    default:
      return null;
  }
}

function Scene({activeTerm}) {
  return (
    <>
      <color attach="background" args={['#0b1220']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <directionalLight position={[-4, -2, -3]} intensity={0.3} />

      <group rotation={[0, 0, TILT]}>
        <VenturiShell />
        <WaterParticles />
        <TermVectors activeTerm={activeTerm} />
      </group>

      {activeTerm === 'gravity' && <GravityArrows />}

      <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={16} />
    </>
  );
}

export default function Explorer() {
  const [activeTerm, setActiveTerm] = useState('convective');
  const active = TERMS_WITH_HTML.find((t) => t.id === activeTerm);

  return (
    <div className={styles.wrapper}>
      <div className={styles.equationBar}>
        {TERMS_WITH_HTML.map((term) => (
          <button
            key={term.id}
            type="button"
            className={styles.termButton}
            data-active={term.id === activeTerm}
            style={{'--term-color': term.color}}
            onClick={() => setActiveTerm(term.id)}
            dangerouslySetInnerHTML={{__html: term.html}}
          />
        ))}
      </div>

      <p className={styles.termDescription}>
        <strong style={{color: active.color}}>{active.label}:</strong> {active.description}
      </p>

      <div className={styles.canvasContainer}>
        <Canvas camera={{position: [6, 3.5, 7], fov: 45}}>
          <Scene activeTerm={activeTerm} />
        </Canvas>
      </div>
    </div>
  );
}
