---
layout: single
title: "Gradient descent"
description: Explaining gradient descent method for finding optimal solution
category: "Machine Learning Concepts"
tags: machine-learning loss-function penalization learning-rate gradient slope 
date: 2019-10-15
---

Gradient descent is one of the widely used methods for optimizing functions in machine learning. In gradient descent the optimal parameters for the function are found by iterative guessing, measuring and adjusting, so that the [loss function]({{ site.baseurl }}{% link _posts/2019-10-14-loss-function.md %}) reaches its minimum. Gradient descent is also very useful when it is impossible to find analytically (e. g. by using least squares estimation) the parameters where the slope of the loss function is zero.

Let's describe the mechanism of gradient descent for the problem of simple linear regression where empirical distribution looks like this:

![](/assets/images/concepts/some_linear_distribution.png){: .align-center}

The function takes the following form:

&nbsp;&nbsp;&nbsp;&nbsp;
$f(x) = a + bx$

Suppose we already know the value of intercept $a$, then we would only have to find such value of $b$, which minimizes the loss function (in this case mean square error but not necessarily so). Let's start plugging different numbers for the slope and measuring means squared error of the estimation.

![](/assets/images/concepts/loss_values_and_slope.png){: .align-center}

We can see that the shape of the loss function reminds a quadratic function, and that if we take $b$ between 7 and 8 then the loss function will be close to its minimum. There is, however, an infinitely large number of possible values for $b$ and calculating loss function for any single random guess would be simply overkill. Instead, gradient descent takes only few calculations and decides which direction to move in order to make loss smaller. One of the nice things about gradient descent is that it takes larger steps when the slope is far from zero and very small steps when it approaches the minimum of a loss function.

As we know, the [derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) describes the slope of a function, and it equals to zero when a function reaches its critical points. In case of quadratic loss function the single critical point is the global minimum. Gradient descent takes the derivative of the loss function on a certain point, compares it to zero and then takes another step towards the minimum. It is important not to take too huge steps because the loss function may reach beyond the point of its minimum. Gradient descent decides which steps to take by taking the derivative of the function at its current point and multiplying it by a very small number called "learning rate". Thus the steps are getting smaller and smaller when the function reaches its minimum because the slope near the minimum is already getting smaller.

Gradient descent stops when the slope is either sufficiently close to zero or when it has already reached its predefined limit of number of steps.

In case when we need to estimate multiple parameters, for example both $a$ and $b$ in the ordinary linear regression, the same logic with calculating derivatives for the loss function applies. However, by doing so we need to take separately derivatives with respect to each parameter, thus calculating gradient (vector of slopes). This gradient is used for descending to the lowest point of the loss function and this is why the algorithm is called gradient descent.

Unfortunately, the best number of the learning rate cannot be found analytically and thus has to be adjusted by trial and error. Smaller learning rates can lead to more precise estimations but would require more calculations while the bigger ones may lead to less accurate results, including overstepping the minimum of the loss function. Some techniques employed for finding the most appropriate learning rate include grid search, scheduling learning rate to decrease when a certain amount of steps is undertaken, and using adaptive learning rate.

## Stochastic gradient descent

With the big data when there are many observed values and many parameters gradient descent may be slow and too hard to calculate. Here is where stochastic gradient descent comes into play - in one step it takes only a single randomly chosen point for calculating the derivative of a loss function and making descent, and then repeats the procedure a number of times with another randomly chosen numbers. The result of each step adjusts previously obtained estimates by the gradient of the new point multiplied by learning rate.

On the other hand, a modification of this algorithm called mini-batch stochastic descent takes instead of one point several ones (a batch), and then performs calculation of the derivative for the loss function and the descent. Albeit mini-batch stochastic descent is not as fast as the regular stochastic descent, it may result in more stable estimation of the parameters.