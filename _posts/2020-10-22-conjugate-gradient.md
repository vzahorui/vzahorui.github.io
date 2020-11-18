---
layout: single
title: "Conjugate gradient"
description: "Explaining conjugate gradient methods in the context of optimization problems"
category: "Optimization"
tags: nonlinear-regression loss-function gradient-descent steepest-descent function-minimization
date: 2020-10-22
---

Conjugate gradient methods are well suited for solving both linear and non-linear systems of equations. 

## Linear conjugate gradient method

The linear system of equations can be expressed like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$Ax = b$

where $x$ is the vector of variables, and $A$ is the matrix of coefficients (weights).

The problem of solving this system of linear equations is equivalent to the problem of minimizing the residual. For convenience we can also transform it into a problem of minimizing a convex quadratic function:

&nbsp;&nbsp;&nbsp;&nbsp;
$\phi(x) = \frac{1}{2}x^{T}Ax - b^{T}x$

From here we can see that the 

The performance of linear conjugate gradient methods is dependent on distribution of eigenvalues of the coefficient matrix, and thus it can be improved by applying matrix preconditioning.