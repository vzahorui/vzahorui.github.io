---
layout: single
title: "Understanding integrals"
description: Explaining what integrals are and how they are tied to derivatives
category: "Calculus"
tags: integration integral calculus area net-change Riemann-sum fundamental-theorem-of-calculus improper-integrals
date: 2019-09-24
---
## Building intuition

Integration is used in a context of finding accumulated impact on some value provided some function. It is also often explained as the method of finding area under the curve of a function between two different points, which is virtually the same as finding accumulated impact (or net change), and below I'll explain why.

Suppose we have a function which describes the rate of change for specific value of $x$. As a simple example, it can be speed of a moving car dependent on time. How do we know the distance the car traveled between two time points given its function of speed? In other words, how do we find the accumulated change in the distance between two time points? If the speed is constantly changing then without using integral calculus we would only be able to get a close approximation of the distance, where the simplest would be taking some value, which is close to the average speed for the period, and multiplying it by time. However, we could get a better general approximation if we would split the whole time period of driving into parts, make approximation for each of the parts and then sum everything up. Let's look at the graphical representation:

![](/assets/images/calculus/plot_area_under_curve.png){: .align-center}

In this example we've split the whole time period between points $a$ and $b$ into equal parts and made approximation for each of these parts based on the starting speed of each split period. As a result, we come up with a set of rectangles instead of the curve. Since the distance is measured as the product of speed and time, for each period we can measure it as an area of a rectangle, and then calculate the sum of all areas as the traveled distance between points $a$ and $b$. This approach with approximation of area by dividing it into rectangles is called Riemann sum.

We can see on the graph that the function is only going through the upper left corner of each rectangle but we could have also fitted them so that the approximation would be based on the last point or the middle value of each period. Either way, approximation does not really mirror the real speed since the area under the bars may be lesser or greater than the actual area of the split. We can however minimize the error of approximation by splitting the whole area into more periods, and thus making rectangulars smaller. Integration is based upon the idea of taking infinitely small splits, so that approximation approaches real function. By definition, the definite integral is the limit of the Riemann sum between two defined points when number of splits approaches infinity:

&nbsp;&nbsp;&nbsp;&nbsp;
$\displaystyle{\lim_{n \to \infty}}\sum_{i=1}^n f(x_i) \Delta x = \int_a^b f(x)dx$, 
where $\Delta x = \frac{b-a}{n}$ and $x_i = a+i\Delta x $

## The fundamental theorem of calculus

In simple words, the fundamental theorem of calculus provides connection between differentiation and integration.<br>
Say we have a function $f(t)$ which is continuous over the interval from $a$ to $b$. If we pick some value of $x$ which belongs to the interval [$a$, $b$] then how do we define the function which represents the area between $a$ and $x$?

![](/assets/images/calculus/plot_area_under_curve_with_middle_value.png){: .align-center}

We already know that the area under the curve can be calculated with definite integral. The function of area under the curve $f(t)$ would look like this: 

&nbsp;&nbsp;&nbsp;&nbsp;
$F(x) = \int_a^x f(t)dt$, 
where x in [$a$, $b$]

The fundamental theorem of calculus states that for any continuous function if we take the derivative of $F(x)$ we will get $f(x)$.

&nbsp;&nbsp;&nbsp;&nbsp;
$\frac{dF}{dx}=\frac{d}{dx}\int_a^x f(t)dt=f(x)$

Now why is this so important? It means that any continuous function has its antiderivative $F(x)$, hence there is a clear connection between differentiation and integration. 

## Calculating integrals

For future reference, below I include the table of the most commonly used transformations when calculating integrals.

|$f(x)$|$F(x)$|
|:---:|:---:|
|$a dx$|$ax+C$|
|$x^n dx$|$\frac{x^{n+1}}{n+1}+C$|
|$e^x dx$|$e^x+C$|
|$a^x dx$|$\frac{a^x}{\ln (a)}+C$|
|$\frac{1}{x}dx$|$\ln (\lvert x \rvert)+C$|

## Improper integrals

Improper integrals are definite integrals that cover an unbounded area. One type of improper integrals are integrals where at least one of the endpoints is extended to infinity. When the limit exists the integral is called convergent, and when it doesn't  - it's divergent. 

Say we have the following function $f(x)=\frac{1}{x^2}$ and we want to know the whole area under the curve where $x$ is greater than 1. 

![](/assets/images/calculus/plot_area_under_improper_integral.png){: .align-center}

And here is how we deal with it:

&nbsp;&nbsp;&nbsp;&nbsp;
$\int_1^\infty \frac{1}{x^2}dx = \displaystyle{\lim_{n \to \infty}} \int_1^n \frac{1}{x^2}dx = \displaystyle{\lim_{n \to \infty}} [-\frac{1}{x}]_1^n = \displaystyle{\lim_{n \to \infty}} [-\frac{1}{n} - (-1)] = \displaystyle{\lim_{n \to \infty}} [1 -\frac{1}{n}] = 1$

Since at the end we get the limit which actually exists the integral is convergent, otherwise it would be impossible to calculate the area under the curve.
