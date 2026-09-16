---
sidebar_position: 1
title: Introduction
---

# Introduction

Differential equations are essential in mathematics for modeling natural and human-made phenomena. They describe the rate of change of quantities and are widely used in physics, engineering, biology, economics, and more — including predicting planetary motion and understanding population dynamics.

![Turbulent jet CFD visualization](/img/chapter-2/cfd-turbulent-jet.png)

This chapter covers basic concepts, types of differential equations, and solution methods, equipping learners with the ability to apply differential equations to real-world water-related problems.

## What is a differential equation?

A differential equation relates a **function** to its **derivatives** — it describes how one quantity changes with respect to another:

$$\frac{\mathrm{d}f}{\mathrm{d}x} = g(f, x, t) \qquad \frac{\partial u}{\partial t} = \Delta u = \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}$$

The unknown in the equation is a function, and the equation defines the relationship between the function and its rates of change. A classic example is Newton's second law of motion, which relates acceleration to forces through a differential equation:

$$ma = \frac{\mathrm{d}^2 x}{\mathrm{d}t^2} = \sum_{i=0}^{N} F$$

:::info
"Solving a differential equation means finding the function that satisfies the relationship."
:::
