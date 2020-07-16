---
layout: single
title: "Newton's method in optimization"
description: Explaining how and when to use Newton's method and comparing it to gradient descent
category: "Optimization"
tags: gradient-descent hessian derivative second-derivative loss-function taylor-series taylor-expansion
date: 2020-07-08
---
 
Similarly to [gradient descent]({{ site.baseurl }}{% link _posts/2019-10-15-gradient-descent.md %}), Newton's method is used for finding a minimum of a function through iterations. Unlike gradient descent however, it uses a second order derivative of a function, which provides additional information about curvature of the function, so that it can navigate faster towards its minimum.
 
## Newton's method for zero finding
 
In order to better understand how the formula for Newton's optimization works let's take a look at a simpler problem: finding zero of a function. Suppose we have a simple function like this:
 
![](/assets/images/optimization/newton_zero_finding.png){: .align-center}
 
Finding zeros of this function is a trivial task which is easily solved analytically but it is also easy to demonstrate with this example how Newton's method works as it may be similarly applied in more complex cases.<br>
So first of all we have a starting guess for the value of $x$, in our example it's 15 (the value of $x_0$), which corresponds to the value of the function at point A. From here we make a linear approximation of the function using [derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) at that point and see where this approximation reaches zero. Following the example above, we see that the derivative becomes zero at point $x_1$ which is closer to the point of the original function's zero. After that the procedure is repeated a number of times until we get sufficiently close to zero. In our example the second approximation is performed from the point B, and we see that the zero point of this approximation is very close to the original function's point of zero.
 
Let's take a closer look at what happens at each iteration. The derivative of a function at a certain point represents the slope of a function at that particular point or a tangent of the angle between $x$-axis and the slope line. If we look at the triangle formed by points A, $x_0$ and $x_1$ we see that it's a rectangular triangle. The tangent is then equivalent to the relation between lengths of A$x_0$ and $x_1 x_0$. The length of A$x_0$ is just the value of the function at point A, and the length of $x_1 x_0$ is the actual update step during the iteration.  
 
&nbsp;&nbsp;&nbsp;&nbsp;
$f'(x_0) = \frac{f(x_0)}{x_0-x_1}$
 
From here with some rearrangement we get the final formula for the updated step:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$x_t = x_{t-1} - \frac{f(x_{t-1})}{f'(x_{t-1})}$
 
## Newton's method for optimization
 
So now when we know how to find zero of a function finding a minimum would seem like a small modification of the algorithm. Recall that the derivative of a function is zero at its critical points. Knowing that we can apply the same technique, only instead of finding zero of a function using derivative we shall find zero of the derivative using the second derivative as approximation.

We start off with approximation of a function at some inital point A with the second-order [Taylor expansion]({{ site.baseurl }}{% link _posts/2020-05-08-taylor-series.md %}) which will produce quadratic function $\phi(x)$ like this:

![](/assets/images/optimization/newton_optimization.png){: .align-center}

Next step is finding the point where approximation $\phi(x)$ reaches its minimum, that is the point where the derivative of this approximation is zero.

&nbsp;&nbsp;&nbsp;&nbsp;
$\frac{d}{d (x-x_0)}(f(x_0) + f'(x_0)(x-x_0) + \frac{1}{2}f'' (x_0)(x-x_0)^2) = 0$

&nbsp;&nbsp;&nbsp;&nbsp;
$f'(x_0) + f'' (x_0)(x-x_0) = 0$

&nbsp;&nbsp;&nbsp;&nbsp;
$x - x_0 = - \frac{f'(x_0)}{f'' (x_0)}$

From here we get a very similar equation to the one of zero finding:

&nbsp;&nbsp;&nbsp;&nbsp;
$x_t = x_{t-1} - \frac{f'(x_{t-1})}{f'' (x_{t-1})}$

Just like in gradient descent the procedure is repeated util the algorithm reaches a point sufficiently close to the true minimum of a fucntion. In our example just in single step we approched pretty close to the minimum of $f(x)$. 




