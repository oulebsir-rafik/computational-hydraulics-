---
sidebar_position: 4
title: Model Type Classification
---

# Model Type Classification

## By system and representation

A physical system or problem type (water allocation, water quality, river basin management, flood control, etc.) is captured by a mathematical representation of the physical system — a **model**. Models can follow a theoretical or an empirical representation, and can be further classified as deterministic, stochastic, or hybrid.

![Classification of models by system/representation](/img/chapter-1/model-representation-tree.png)

## By scale

Models are also classified by scale, along both the space and time dimensions: space ranges from lumped to distributed (1D, 2D, 3D) at large, medium, or small scale, while time ranges from short-term (daily, seasonal) to long-term trends over years.

![Classification of models by scale](/img/chapter-1/model-scale-tree.png)

## By method of solution

Phenomena in nature are described in terms of properties that prevail at each point in time and space separately, giving rise to **partial differential equations (PDEs)** that govern the phenomena. The solution of these PDEs can be:

- **Analytical**, via separation of variables, integral solutions (Green's functions), or integral transforms (Fourier & Laplace).
- **Numerical**, via the Finite Difference Method (FDM), the Finite Volume Method (FVM), or the Finite Element Method (FEM).

![Classification of models by method of solution](/img/chapter-1/model-solution-method-tree.png)
