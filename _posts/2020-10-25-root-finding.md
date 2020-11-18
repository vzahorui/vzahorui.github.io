---
layout: single
title: "Root finding algorithms"
description: "Describing algorithms for function's root finding"
category: "Optimization"
tags: secant-method secant-line bisection-method brent's-method Newton's-method zero-finding false-position-method Broyden's-method
date: 2020-11-18
---

In numeric analysis root finding is equivalent to finding zeros of a continuous function. In case of complex and composite function finding values of a variable at which a function evaluates to zero is not a straightforward task, and thus root finding algorithms provide various iterative techniques for approximation of the root. In general root finding algorithms do not find all possible roots of a function but only the closest one to the initial guess (if any at all). Failing to find a root with approximation does not mean however that the function does not have any.

## Newton's method

Newton's method could be effectively used for root finding by making a linear approximation using first-order information (by taking the derivative) at a particular point. More details on how it actually works can be found [here]({{ site.baseurl }}{% link _posts/2020-07-05-newton-method.md %}). It's worth mentioning that Newton's method may not converge if the starting point is far off from the actual root.

![](/assets/images/optimization/newton_zero_finding.png){: .align-center}

## Bisection method

This is one probably the simplest method in root finding which starts off with two guesses where a function has values of opposite signs, say $f(a)$ is a positive and $f(b)$ is a negative value. The interval [$a$, $b$] is repeatedly bisected with a new point $c$ in the middle of it. After each bisection we either have $f(a) > 0$ and $f(c) \leq 0$ or $f(c) \geq 0$ and $(b) < 0$. The interval with opposite signs is selected and the procedure is repeated all over again until the interval becomes small enough, in which case the root is considered to be found. Although this algorithm is robust it might be too slow.  

## Secant method

This method assumes that the function is approximately linear in the region of interest. It starts off with two initial guesses and puts a line between them (a secant line). In each next iteration the point where the secant line reaches zero is selected as a new one which substitutes the first point in the previous pair of guesses.

![](/assets/images/optimization/secant_method.png){: .align-center}

In the example above points $A$ and $B$ are selected as initial guesses whereas $C$ and $D$ were the ones found in the next two iterations. In this particular example convergence towards the visible root is not likely which is the problem with the secant method. Although it's generally faster than the bisection method, it usually fails to converge if the initial guesses are not sufficiently close to the root.

Having two points the slope of the secant line can is determined in the following way:

&nbsp;&nbsp;&nbsp;&nbsp;
$a = \frac{f(x_1)-f(x_0)}{x_1 - x_0}$

And then the intercept is easily found as

&nbsp;&nbsp;&nbsp;&nbsp;
$b = f(x_1) - ax_1$

Putting it all together the equation for the secant line can be expressed like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$f(x) = ax + b = \frac{f(x_1)-f(x_0)}{x_1 - x_0}(x-x_1) + f(x_1)$

From here the new point where the secant line reaches zero is determined with this formula:

&nbsp;&nbsp;&nbsp;&nbsp;
$x_2 = x_1 - f(x_1)\frac{x_1 - x_0}{f(x_1)-f(x_0)}$

The formula is actually similar to the one used in Newton's method; only the slope based on difference is used instead of the one obtained from the derivative.

There is an improvement to this method known as false position method (or regula falsi) which makes sure that the algorithm converges by selecting points where a function assumes different signs, as opposed to selecting the last point regardless of its sign.

A generalization of the secant method in multidimensional space is known as Broyden's method which is described in greater details [here]({{ site.baseurl }}{% link _posts/2020-07-29-quasi-newton-methods.md %}).