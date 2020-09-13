---
layout: single
title: "Trust region"
description: "Explaining trust region strategy in optimizaton problems"
category: "Optimization"
tags: nonlinear-regression loss-function minimization taylor-expansion
date: 2020-09-10
---

Trust region is a general strategy of optimization of an objective function by constructing an approximation of the function around a certain point and measuring its values at the nearest regions so as to select the correct direction for parameters change. While in [line search]({{ site.baseurl }}{% link _posts/2020-08-08-line-search.md %}) strategy the optimal step size is selected based on the specified direction, in trust region the step size is defined by the maximum size of the trust region and only then the direction is determined.

The approximation at trust region with size $p$ is constructed using second-order [Taylor expansion]({{ site.baseurl }}{% link _posts/2020-05-08-taylor-series.md %}):

&nbsp;&nbsp;&nbsp;&nbsp;
$\phi(x_k + p) = f(x_k) + p^T \nabla f(x_k) + \frac{1}{2} p^T B_k p$

where $x_k$ is the center of the trust region, $\nabla f(x_k)$ is the gradient and point $x_k$, and $B$ is the Hessian or some approximation of it.



