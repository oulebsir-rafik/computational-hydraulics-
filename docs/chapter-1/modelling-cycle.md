---
sidebar_position: 6
title: The Modelling Cycle
---

# The Modelling Cycle

Model building is a cycle rather than a one-shot process: the physical system (problem description) is translated into a mathematical formulation (mathematical model), which is discretized using a discretization strategy — the **strong form** (FDM), the **weak form** (FEM), or the **finite volume** approach (FVM) — to produce a discrete model and its numerical solution. The results are then visualized, which in turn feeds back into refining the understanding of the physical system.

At each stage, errors can be introduced: errors due to the modelling solution (mathematical formulation), errors due to discretization, and errors due to solution implementation.

![The cycle of mathematical modelling](/img/chapter-1/modelling-cycle.png)
