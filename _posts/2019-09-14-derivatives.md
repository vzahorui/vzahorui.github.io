---
layout: single
title: "Derivatives"
description: Here I am going to explain what derivatives are and how they can be used  
category: "Calculus"
tags: derivation derivative calculus slope differentiation
date: 2019-09-14
---

For understanding derivatives it is good to know what the slope of a function is and how it is measured. The slope generally shows the ratio of changes ($\frac{\Delta y}{\Delta x}$) between variables in two different points. In real life, however, it is rare that a function represents a straight line, as the slope changes over time. Let's look at the function described by the following curve:

![](/assets/images/calculus/plot_slope.png){: .align-center}

We can look at the points A and B, calculate the ratio of changes, then do the same for the points C and D, and come up with rather different slopes. We can see that the slope between points A and B is less steep than between points C and D. Moreover, the slope along the whole line is not constant as well. 

So here is where calculus comes really handy - using derivatives we can measure instantaneous slope, that is the rate of change at any specific point of a line. Intuitively, instantaneous rate of change is the relation of the change in $y$ to the change in $x$ when the change in $x$ is infinitely small ($\displaystyle{\lim_{\Delta x \to 0}}$).<br>
The common notation for instantaneous rate of change in calculus is this - $\frac{dx}{dy}$, and the derivative function for $f(x)$ would be noted as $f\prime (x)$. By expressing derivative through the term of limit we get the following equation:

&nbsp;&nbsp;&nbsp;&nbsp;
$f\prime (x) = \displaystyle{\lim_{h \to 0}}\frac{f(x_0 + h) - f(x_0)}{h}$ 

It is worth to note that a function cannot be differentiable at the points of [discontinuity]({{ site.baseurl }}{% link _posts/2019-09-10-limits-and-continuity.md %}). In addition, in order to be differentiable at a certain point, both one-sided limits at that point must be equal:

&nbsp;&nbsp;&nbsp;&nbsp;
$\displaystyle{\lim_{x \to c^{-}}}\frac{f(x)-f(c)}{x-c} = \displaystyle{\lim_{x \to c^{+}}}\frac{f(x)-f(c)}{x-c}$

Plainly speaking, these are the conditions under which a slope at a certain point would exist. Looking at the example below it is clear that the limits of a function approaching the point from both directions are different, therefore, it is impossible to get the ratio of changes at that particular point.

![](/assets/images/calculus/plot_no_slope.png){: .align-center}


For further reference, below I include the table of the most commonly used derivatives.

|$y = f(x)$|$\frac{dx}{dy} = f\prime (x)$|
|:---:|:---:|
|$k$, any constant|0|
|$x$|1|
|$x^2$|$2x$|
|$x^n$, any constant $n$|$n(x)^{n-1}$|
|$e^x$|$e^x$|
|$e^{kx}$|$ke^{kx}$|
|$\ln x$|$\frac{1}{x}$|
|$\log_{a} x$|$\frac{1}{x\ln (a)}$|