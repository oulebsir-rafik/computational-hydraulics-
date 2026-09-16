---
sidebar_position: 5
title: Conservation of Energy
---

# Conservation of Energy

For phenomena in which temperature varies, in addition to the momentum equation, conservation of energy must be considered. The energy equation accounts for both kinetic and potential energy, expressed by the term:

$$\rho\left(e + \frac{\vec{u}^2}{2}\right)$$

The equation for conservation of energy is:

$$\frac{\partial}{\partial t}\left[\rho\left(e + \frac{\vec{u}^2}{2}\right)\right] + \nabla \cdot \left[\rho\left(e + \frac{\vec{u}^2}{2}\right)\vec{u}\right] = \nabla \cdot (k\nabla T) - \nabla \cdot (\vec{u}p) + \nabla \cdot (\vec{u}\tau) + \rho\vec{g}\vec{u}$$

where:

- $e$ is the potential energy,
- $p$ is pressure,
- $\tau$ is the stress tensor,
- $k$ is a coefficient,
- $T$ is temperature.

## The Navier-Stokes system

The three conservation laws presented in this chapter — mass, momentum, and energy — form the so-called **Navier-Stokes equations**, which are space- and time-dependent (four independent variables).

In a three-dimensional domain there are **six dependent variables** but only a set of **five equations** available: a continuity equation for conservation of mass, three equations for conservation of momentum, and one equation for conservation of energy. The six dependent variables are pressure, density, temperature, and the three components of the velocity vector $\vec{u}$. The sixth equation used is the ideal gas law relating pressure and temperature:

$$-p \cdot V = nRT$$

where $p$ is pressure, $V$ is volume, $T$ is temperature, and $n, R$ are coefficients.

This forms a system of six equations with six unknowns, which can in principle be solved. In practice, the Navier-Stokes equations are usually too complicated to solve directly, and simpler forms are used.
