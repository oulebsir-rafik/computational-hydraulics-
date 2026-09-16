---
sidebar_position: 3
title: Conservation of Mass
---

# Conservation of Mass

Water problems are represented mathematically by differential equations. Examples of such problems or processes are propagation of waves in a river channel, pollutant transport, reservoir operations, and so on.

## The general law of conservation

The general principle of conservation laws is that the rate of change of a quantity $\vec{u}$ within a volume $V$ plus the flux of $\vec{u}$ through the boundary $A$ (noted as $f(\vec{u})$) is the same as the rate of production of $\vec{u}$, denoted by $S(\vec{u}, t)$:

$$\frac{\partial}{\partial t}\int_V \vec{u} \cdot \mathrm{d}V + \int_A f(\vec{u}) \cdot \vec{n} \cdot \mathrm{d}A - \int_V S(\vec{u}, t)\, \mathrm{d}V = 0$$

## Deriving the continuity equation

Conservation of mass states that for any control volume, during a small time interval $\Delta t$, the mass entering the volume minus the mass leaving the volume equals the change of mass inside the control volume. For mass $m$ of density $\rho$, and advection velocity $u$ over the control volume $V$, this gives:

$$\frac{\partial}{\partial t}\int_V \rho \cdot \mathrm{d}V + \int_A (\rho \cdot u) \cdot \vec{n} \cdot \mathrm{d}A = 0$$

$$f(u) = \rho \cdot u \quad \text{and} \quad u \cdot \vec{n} = \vec{u}$$

The term $S$ is the source term, and since there is no mass production, $S$ is zero. Integrating the preceding equation yields:

$$\frac{\partial \rho}{\partial t} + \nabla(\vec{u}\rho) = 0$$

Which can be re-arranged into the total-derivative (material derivative) form, using the nabla operator $\nabla = \left(\frac{\partial}{\partial x}, \frac{\partial}{\partial y}, \frac{\partial}{\partial z}\right)$ and $\frac{D}{Dt} = \frac{\partial}{\partial t} + \frac{\mathrm{d}x}{\mathrm{d}t}\frac{\partial}{\partial x} + \frac{\mathrm{d}y}{\mathrm{d}t}\frac{\partial}{\partial y} + \frac{\mathrm{d}z}{\mathrm{d}t}\frac{\partial}{\partial z}$:

$$\frac{D\rho}{Dt} + \rho \nabla \cdot \vec{u} = 0$$
