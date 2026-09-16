---
sidebar_position: 2
title: Mathematical Models
---

# Mathematical Models

Classification of models is done in order to understand the type and level of mathematics involved in developing a model, and it helps understand how the simulation is done (Lane & Nichols, 1993). Model classification helps users select the appropriate model for a particular problem-solving need.

## Independent and dependent variables

The **independent variables** used in modelling are space and time. Time is usually defined over an interval, $t \in [t_0, T]$, and space $x$ refers to the volume $V$ that contains the system under study, $x \in V$.

The **dependent variable** is the state variable, which takes values depending on parameters and the independent variables. The state variable is a finite dimensional vector $u = u(x, t)$, which is $n$-dimensional, $u = (u_1, u_2, \ldots, u_n)$, and describes sufficiently the evolution of the phenomena (the real system).

A **mathematical model** is the set of equations that defines the evolution of the state variable in space and time.

:::warning Important
To accurately represent natural phenomena, the real system and the mathematical model must align. This requires that the number of unknown dependent variables matches the number of independent equations.
:::

## Dynamic vs. static, finite vs. continuous

- Mathematical models can be classified as **dynamic or static**, and as **finite or continuous**.
- A dynamic model has a time-dependent state variable, while a static model does not.
- Finite models do not depend on space variables, whereas continuous models do.
- Finite dynamic models use **ordinary differential equations**, while continuous dynamic models use **partial differential equations**.
- Static models, whether finite or continuous, are special cases of dynamic models where the time derivative is zero.
