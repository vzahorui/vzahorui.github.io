---
layout: single
title: "Gradient descent"
description: Explaining gradient descent method and how it is used in loss function analysis
category: "Optimization"
tags: machine-learning loss-function penalization learning-rate gradient slope derivative local-minimum global-minimum SGD momentum adagrad adadelta adam RMS decaying-average
date: 2020-05-28
---
 
Gradient descent is bread and butter of machine learning. It is a fundamental method of finding a minimum of a function, hence it is widely used in loss function analysis and optimization.
 
## The mechanism of the gradient descent
 
As we know, the [derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) describes the slope of a function or the way the function changes when the predictor value changes. If the derivative of a function is negative at a certain point then the function at this point is decreasing. Also, the derivative of a function equals to zero when the function is at its critical points - local and global minima and maxima, as well as saddle points. Starting from a random point the gradient descent searches for a minimum of a function by iteration through the following steps:
 1. Measuring the derivative at its current point and comparing it to zero.
 2. Multiplying the derivative by a small number called learning rate, so that a step size is determined.
 3. Subtracting step size from the current point so that a new point is selected.
 
Here is a simple example of gradient descent towards a local minimum of a function.
 
![](/assets/images/optimization/gradient_descent_example.png){: .align-center}
 
Starting from randomly selected point $A$ the derivative shows upward slope - the derivative of the function is positive and high. Multiplying this high number by the learning rate results into reduced but still substantial step size. Subtracting this step size from the previous point gets us to point $B$. The slope at $B$ is still high so another step is also quite significant - we move to point $C$. Now it becomes obvious that the slope is getting lower, so multiplying it by the learning rate results in a smaller step size during each following iteration. One of the nice things about gradient descent is that it takes larger steps when the slope is far from zero and very small steps when it approaches the minimum of a loss function. Decreasing step size ensures that the gradient descent doesn't overstep the function's minimum, however as it reaches the minimum the slope becomes almost unnoticeable - so is the step size, which in turn leads to a very high number of iterations and computation cost which is undesirable. Setting a stopping criteria is useful in cutting the number of iterations. Such criteria may be simply the total number of allowed iterations or a point where the slope is close to zero meaning that further steps lead to insignificant improvements.  
 
If we had selected a starting point with the negative slope, as at point $F$, then its derivative would be also negative. Subtraction of a negative number is equal to adding so essentially we would have moved in the positive direction in finding the function's minimum. Thus in addition to adapting step size gradient descent by itself determines in which direction to move - doesn't it sound cool?
 
## Usage in loss function
 
Recall that the [loss function]({{ site.baseurl }}{% link _posts/2019-10-14-loss-functions.md %}) is a function of parameters, and it measures the sum of residuals, telling how good a model is fit to data. The model is optimized when its set of parameters ensures that the sum of residuals is minimal, which is the same as when the loss function is at its minimum. The gradient descent can be used for exactly this purpose - finding such parameters at which the loss function reaches its minimum. Gradient descent is also very useful when it is impossible or hard to find the optimal parameters analytically (e. g. by using least squares estimation).
 
Suppose we have an empirical distribution like this:
 
![](/assets/images/regression/some_linear_distribution.png){: .align-center}
 
We want to find the parameters for a simple linear regression to this distribution:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$f(x) = a + bx$
 
Suppose we already know the value of the intercept $a$, then we would only have to find such value of $b$, which minimizes the loss function (in this case mean square error but not necessarily so). Let's start plugging different numbers for the slope and measuring the squared error of the estimation.
 
![](/assets/images/regression/loss_values_and_slope.png){: .align-center}
 
We can see that the shape of the loss function is actually a quadratic function, and that if we take $b$ between 7 and 8 then the loss function will be close to its minimum. There is, however, an infinitely large number of possible values for $b$ and calculating loss function for any single random guess would be simply overkill. Instead, we can apply gradient descent, and in a few iterations adjust the value of $b$ in such a way that the function of residuals gets pretty close to its minimum.  
 
## Multivariate gradient descent
 
In a more general case where a function is dependent on multiple input variables, for example if we need to estimate both $a$ and $b$ in the simple linear regression, the same logic with calculating derivatives for the loss function applies. However, in this case the loss function becomes multidimensional and instead of a single slope we need to find a direction in n-dimensional space in which to descend. The so-called multidimensional slope is determined by calculating partial derivatives with respect to each of the parameters, thus obtaining gradient (vector of slopes). Gradient is commonly depicted with $\nabla$, and here is how the gradient of loss function $J$ can be expressed:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$$\nabla J(\theta) =  
\left[\begin{array}{c}
\frac{\partial J}{\partial \theta_1} \\
\frac{\partial J}{\partial \theta_2} \\
... \\
\frac{\partial J}{\partial \theta_n}   
\end{array} \right]
$$
 
where $\theta$ is a set of predictors representing $n$ dimensions. In case of finding a minimum of a loss function these predictors are parameters of the original function.
 
Going back to the overall procedure the formula for gradient descent may be constructed as follows:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\theta^{(1)} = \theta^{(0)} - \alpha\nabla J(\theta^{(0)})$
 
where $\alpha$ is the learning rate and $\theta^{(1)}$ is a new set of predictors.

Here is an example of the gradient descent in two-dimensional space:
 
![](/assets/images/gradient_descent/3d_gradient_descent_demo.gif){: .align-center}
 
The area depicts the loss function values for all combinations of the parameters $\theta$ within certain scope. In order to simplify plotting, the loss function is usually projected on a two-dimensional plot of $\theta_0$ and $\theta_1$ with a contour plot, where each line represents areas where the loss function assumes the same value. Such areas of the same values are usually plotted with different colours, so that the areas of minima are easily distinguished. In the example above the areas where the loss function reaches its minimum are painted in blue.

Unfortunately, the best number which could be used as a value of the learning rate cannot be found analytically and thus has to be adjusted by trial and error. Smaller learning rates can lead to more precise estimations but would require more calculations while the bigger ones may lead to less accurate results, including overstepping the minimum of a function. Some techniques employed for finding the most appropriate learning rate include grid search, scheduling learning rate to decrease when a certain amount of steps is undertaken, and using adaptive learning rate.
 
## Types of gradient descent
 
Typically the gradient descent is applied to the loss function which is calculated using all available observations. This type of gradient descent is called batch gradient descent. It is quite stable and is guaranteed to converge to a local or global minimum depending on the initial guess for parameters, however for a large number of observations and parameters this type of gradient descent may be slow and computationally expensive.
 
Stochastic gradient descent (SGD) on the other hand instead of the whole dataset takes only one single randomly chosen point for calculating the loss, which significantly simplifies further calculations of the gradient. After the parameters are optimized for a loss function based on a single observation, the procedure is repeated a number of times for other randomly chosen points. The stochastic gradient descent is unstable, as each new point of observation may significantly change the parameters obtained at a previous step with a chance of overstepping a local minimum. This however may result in a better or even global minimum in case of non-convex functions. One good practice for applying the stochastic gradient descent is to slowly decrease the learning rate so that the function will stop overstepping a point of minimum. On the other hand, a modification of this algorithm called mini-batch stochastic descent takes several points (a subset) instead of a single one for calculating the loss function. Although the mini-batch stochastic descent is not as fast as the regular stochastic descent, it may result in more stable convergence.

## Enhancements to gradient descent
 
More recent studies proposed new methods of how the "classical" gradient descent may be improved. Slow convergence and the need to manually select and tune the learning rate are among the most discussed shortcomings. Here are some notable examples of these improvements.
 
### Gradient Descent with Momentum
 
The problem this extension tries to tackle is slow convergence in the standard gradient descent. When the slope becomes too gentle the gradient descent takes too small steps, has hardship escaping valleys and even may stop at a saddle point. In addition, the slope may be oscillating around the general direction of the slope following ravines in the loss function. Such ravines may change direction from one step to another, meaning that the gradient descent will have to take zigzagging steps towards the minimum of the loss function.
 
TODO: put plot here
 
Such oscillations are usually caused by stochastic gradient descent when a new point of the original function tries to "correct" the parameters from the previous step.
 
One common metaphor for gradient descent is a man trying to descend the mountain in the direction of the steepest slope. However in order to understand the momentum it is better to modify this image to describe a ball rolling downhill.  
 
### AdaGrad
 
 
 
### AdaDelta
 
 
 
### Adam