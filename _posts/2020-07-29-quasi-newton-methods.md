---
layout: single
title: "Quasi-Newton methods"
description: Comparing quasi-Newton methods with Newton's method and giving description of the most common ones
category: "Optimization"
tags: hessian second-derivative loss-function rank-one-update jacobian Sherman-Morrison-formula cross-product
date: 2020-11-08
---
 
The classical [Newton's method]({{ site.baseurl }}{% link _posts/2020-07-05-newton-method.md %}) for optimization is known for being computationally expensive when it comes to calculating the gradient of the Hessian matrix and their inverses at each iteration. Quasi-Newton methods were developed as an alternative which calculates only approximations of the Hessian (or Jacobian) and thus achieves faster computation speed. Because Hessian and Jacobian approximations are less precise than the true matrices, quasi-Newton methods might require more iterations for convergence, which however is compensated by the increased computation speed.

This article describes some of the well-known methods which belong to this class, and are aimed at simplifying either the problem of root finding or loss function optimization.

## Broyden's method

This is primarily the method for root finding in a system of nonlinear equations which was developed in order to improve the efficiency of Newton's method. Instead of calculating a full Jacobian matrix at each iteration as in Newton's method, Broyden's method offers to calculate it only once and then update it at each iteration with newly obtained information.

In case of Newton's method in multiple dimensions we have this equation:

&nbsp;&nbsp;&nbsp;&nbsp;
$\Delta X = -J^{-1}F(X)$

In Broyden's method the Jacobian is substituted by an approximating matrix $B$ which should satisfy certain conditions. Since the Jacobian provides information about the rate of change at certain points, matrix $B$ should also reflect the change in $F(X)$ caused by change in $X$. We also assume that $F(X)$ changes only in one direction.

One way of performing slight modifications to a marix is by doing rank-one updates which take the following form:

&nbsp;&nbsp;&nbsp;&nbsp;
$B_{k+1} = B_k + uv^{T}$

where $uv^{T}$ is an outer product of two vectors. Matrix $uv^{T}$ has rank one because each of its columns is just a multiple of $u$.

In Broyden's method the following formula may be used to update $B$:

&nbsp;&nbsp;&nbsp;&nbsp;
$B_{k+1} = B_k + \frac{\Delta f_x - B_k \Delta x}{\lvert\lvert\Delta x\rvert\rvert^2}\Delta x$

This formula exploits the idea of rank-one update by setting $u = \frac{\Delta f_x - B_k \Delta x}{\lvert\lvert\Delta x\rvert\rvert^2}$ and $v = \Delta x$. Here is one way of building intuition behind it. If the Jacobian (and its approximation) are giving information about the rate of change the construct $B_k \Delta x$ should roughly provide the estimate of how much the function changes. In our case the value of $u$ gets the difference between the actual change in the function and the predicted change at the previous iteration, and scales it by the length of change in the variables, so that in the end vector $u$ gives information about the direction of correction to the  function's change. Computing the cross product between $u$ and $v$ builds up a correction matrix in the same dimensions in which the previous matrix $B$ was computed.

A greater level of simplification in Broyden's method is achieved by updating the inverse of the Jacobian estimate directly. The expression for rank-one update $(A + uv^{T})$ can be rewritten with Sherman-Morrison-formula like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$(A + uv^{T})^{-1} = A^{-1} - \frac{A^{-1}uv^{T}A^{-1}}{1 + v^{T}A^{-1}u}$

Therefore computational overhead required for calculating the inverse of Jacobian is avoided as well.
