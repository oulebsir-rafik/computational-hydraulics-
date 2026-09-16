---
sidebar_position: 6
title: Classifying Flow Equations
---

# Classifying Flow Equations

Water problems are represented mathematically by differential equations. Examples of such problems or processes are propagation of waves in a river channel, pollutant transport, and reservoir operations.

![Wave basin testing facility](/img/chapter-2/wave-basin-facility.png)
![Flood simulation overlay on satellite imagery](/img/chapter-2/flood-simulation-satellite.png)

## Classification criteria

Differential equations are classified taking into account several criteria:

- **Dimension of the unknown function:**
  - ordinary differential equation (ODE), when the unknown is a function of one independent variable only, e.g. $u(t)$
  - partial differential equation (PDE), when the unknown is a function of multiple independent variables, e.g. $u(t, x, y)$
- **Number of equations:** a single differential equation, or a system of differential equations.
- **Order:** the highest order of the derivative that appears in the equation — an equation is of $n$-th order if the highest derivative it contains is the $n$-th derivative.
- **Linearity:** linear, when all terms are linear in the unknown function and its derivatives; non-linear, when linearity does not hold.

## The general second-order linear PDE

In water-related problems, most frequently the 2nd order, linear PDEs with two independent variables (homogeneous or nonhomogeneous) are used. If the two independent variables are assumed to be $x$ and $t$, the PDE is written as:

$$A(x,t)\frac{\partial^2 u}{\partial x^2} + B(x,t)\frac{\partial^2 u}{\partial x \partial t} + C(x,t)\frac{\partial^2 u}{\partial t^2} = D(x,t)\frac{\partial u}{\partial x} + E(x,t)\frac{\partial u}{\partial t} + F(x,t)u(x,t) + G(x,t)$$

where the coefficients $A(x,t) \ldots G(x,t)$ may be functions of $x$, $t$, or both, or they may be constants.

## Elliptic, hyperbolic, and parabolic PDEs

The second-order PDE has a discriminant defined as:

$$\Delta = [B(x,t)]^2 - 4 \cdot A(x,t) \cdot C(x,t)$$

Depending on the sign of the discriminant $\Delta$, the PDE can be classified as:

- **Elliptic PDEs**, if $\Delta < 0$: PDEs with smooth solutions, easy to solve.
- **Hyperbolic PDEs**, if $\Delta > 0$: solutions may have discontinuities, usually difficult to solve computationally.
- **Parabolic PDEs**, if $\Delta = 0$: may have features of hyperbolic and elliptic PDEs combined.

Each type of equation describes a certain kind of physical phenomenon:

- **Elliptic PDEs** describe processes that are in **steady state**, time-independent (e.g., steady-state aquifer flow, backwater curves).
- **Hyperbolic PDEs** describe time-dependent, conservative physical processes (e.g., advection/convection), that are in **unsteady state** and not evolving towards a steady state.
- **Parabolic PDEs** describe time-dependent, dissipative physical processes (e.g., diffusion, transient aquifer flow) that are **evolving towards a steady state**.
