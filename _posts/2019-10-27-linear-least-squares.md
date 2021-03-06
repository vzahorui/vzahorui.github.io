---
layout: single
title: "Linear least squares"
description: "Explaining how least squares method works and how it is applied in solving analytically linear regression"
category: "Regression"
tags: linear-regression ols svd gradient-descent pseudoinverse ill-conditioned-matrix normal-equations qr-decomposition
date: 2021-06-18
---
 
Ordinary least squares method (OLS) is a widely used method which estimates the parameters of a [linear regression]({{ site.baseurl }}{% link _posts/2019-10-25-linear-regression.md %}) by minimizing the sum of the squares of the differences between predicted and observed values of the dependent variable. As a result, this method produces a single set of parameters of the regression model, which fits the best to the observed data, and minimizes the quadratic [loss function]({{ site.baseurl }}{% link _posts/2019-10-14-loss-functions.md %}).
 
Under other assumptions of linear regression, the residuals are normally distributed with the value of mean which equals to 0.
 
## Analytical solving (normal equations)
 
For the expression $Y = X \beta + \varepsilon$ we want to minimize squared $\varepsilon$, which can be expressed like this:
 
$$
\sum_{i=0}^n \varepsilon_i^2 =
\left[ \begin{array}{cccc}
\varepsilon_1 & \varepsilon_2 & ... & \varepsilon_n
\end{array} \right]_{1 \times n}
\left[ \begin{array}{c}
\varepsilon_1 \\
\varepsilon_2 \\
... \\
\varepsilon_n
\end{array} \right]_{n \times 1}
$$

where $\varepsilon_i$ is an error of individual observation point.
 
Using general matrix notation of linear regression the squared error can be rewritten as follows:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\varepsilon^{T}\varepsilon = (Y - X \beta)^2 = Y^{T}Y - \beta^{T}X^{T}Y - Y^{T}X\beta + \beta^{T}X^{T}X\beta$
 
In order to find $\beta$ that minimizes squared error we need to find its critical point by taking the derivative of this equation with respect to $\beta$ and solve it when it equals to 0. (The second derivative with respect to $\beta$ is always positive, hence the critical point is the minimum. More about analyzing functions can be found [here]({{ site.baseurl }}{% link _posts/2019-09-21-analyzing-functions.md %}).)
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\frac{\partial \varepsilon^{T}\varepsilon}{\partial \beta} = -2X^{T}Y + 2X^{T}X\beta = 0$<br>
 
&nbsp;&nbsp;&nbsp;&nbsp;
$(X^{T}X)\beta = X^{T}Y$
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\beta = (X^{T}X)^{-1}X^{T}Y$

## Maximum likelihood estimation

This method is mathematically the same as the one described above but instead of the [loss function]({{ site.baseurl }}{% link _posts/2019-10-14-loss-functions.md %}) it operates with the term [maximum likelihood]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}).

Let's assume that the dependent variable is continuous. Let's further asume that the errors are independent and [normally distributed]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution) around zero. Then it is possible to write the probability density function for the dependent variable which is dependent of the known variable, the values of the parameters, and the standard deviation of the errors:

&nbsp;&nbsp;&nbsp;&nbsp;
$f(y \mid x, \beta, \sigma^2) = \frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{1}{2}(\frac{y-\beta x}{\sigma})^2}$

The likelihood function is then equal to the product of probability densities of each individual observation.

&nbsp;&nbsp;&nbsp;&nbsp;
$\mathcal {L}(\beta \mid y, x, \sigma^2) = \prod_{i=1}^n \frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{1}{2}(\frac{y_i - \beta x_i}{\sigma})^2} = \left[ \frac{1}{\sigma\sqrt{2\pi}} \right]^n \prod_{i=1}^n e^{-\frac{1}{2}(\frac{y_i - \beta x_i}{\sigma})^2}$

Let's take the logarithm of this expression so that it will be easier to calculate the [derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) and set it to zero. Thus we will find the values of $\beta$ at which the likelihood function is at its critical point - namely at its maximum.

&nbsp;&nbsp;&nbsp;&nbsp;
$n\log \left[\frac{1}{\sigma\sqrt{2\pi}} \right] - \frac{1}{2\sigma^2} \sum_{i=1}^n (y_i - \beta x_i)^2$

Then the derivative with respect to $\beta$ is just:

&nbsp;&nbsp;&nbsp;&nbsp;
$\frac{2}{2\sigma^2} \sum_{i=1}^n (y_i - \beta x_i)x_i$

Setting it to zero will leave the following expression:

&nbsp;&nbsp;&nbsp;&nbsp;
$\sum_{i=1}^n (y_i - \beta x_i)x_i = \sum_{i=1}^n \varepsilon_i x_i = 0$

From here 

&nbsp;&nbsp;&nbsp;&nbsp;
$\beta = \frac{\sum_{i=1}^n x_i y_i}{\sum_{i=1}^n x_i^2}$

Which is equivalent to the solution of the normal equations in matrix form above.
 
## Iterative approaches
 
In case of larger volumes of data computation of square matrix $X^{T}X$ and then the inverse of it might be quite expensive. Iterative approaches come to rescue in this case, and [gradient descent]({{ site.baseurl }}{% link _posts/2019-10-15-gradient-descent.md %}) is one way to solve least squares problem. 

## Singular value decomposition (SVD)

If the matrix $X^{T}X$ is ill-conditioned then computation of its inverse may result in errors during rounding of floating point numbers, hence the result may be inaccurate. In addition, large condition number of a matrix is squared after performing $X^{T}X$ multiplication. Furthermore, if the matrix $X^{T}X$ is singular then it is impossible to get its inverse. This is where [singular value decomposition]({{ site.baseurl }}{% link _posts/2019-11-03-singular-value-decomposition.md %}) comes to the rescue. SVD may be applied to any matrix, including singular matrices.
 
&nbsp;&nbsp;&nbsp;&nbsp;
$A = U \Sigma V^{T}$

where $U$ and $V$ are orthogonal matrices and $\Sigma$ is a diagonal matrix of singular values.
 
Remember, the inverse of an orthogonal matrix equals its transpose. Here is how SVD transforms analytical formula for finding $\beta$ in the least squares problem:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$(X^{T}X)^{-1}X^{T} = (V \Sigma^{T} U^{T} U \Sigma V^{T})^{-1} V \Sigma^{T} U^{T} = V \Sigma^{-1} (\Sigma^{T})^{-1} V^{T} V \Sigma^{T} U^{T} = V \Sigma^{-1} U^{T} = A^{+}$
 
In the end we get a formula of finding pseudoinverse of a matrix, so eventually, $\beta = A^{+}Y$. More about pseudoinverses can be found [here]({{ site.baseurl }}{% link _posts/2019-11-03-singular-value-decomposition.md %}). <br>  
By using SVD for the least square problem there is no need to calculate inverse of any matrix other than diagonal (which is plain easy), which simplifies calculations and makes the result more accurate.

## QR decomposition

One fairly efficient method for solving least squares is to do so with [QR decomposition]({{ site.baseurl }}{% link _posts/2019-11-19-qr-decomposition.md %}). This is a method which is similarly to SVD based on orthogonalization, which means avoiding forming $X^{T}X$ matrix thus being more stable. On the whole, compared to SVD, QR decomposition (Householder implementation) is slightly more efficient in finding least squares solution, however, it may be less stable. In addition, QR decomposition assumes matrix $X$ to be full-rank, that is each column of $X$ is linearly independent. 

This is how QR decomposition is applied to linear regression problem:

&nbsp;&nbsp;&nbsp;&nbsp;
$X \beta = y + \varepsilon$

&nbsp;&nbsp;&nbsp;&nbsp;
$QR \beta = y + \varepsilon$

&nbsp;&nbsp;&nbsp;&nbsp;
$R \beta = Q^{T}y + Q^{T}\varepsilon$

From here $Q^{T}y$ and $Q^{T}\varepsilon$ result into vectors, and $R$ becomes an upper-triangular matrix of size $n \times m$. Such system is easy to solve numerically. 

Vector $Q^{T}\varepsilon$ is minimized when $R \beta - Q^{T}y$ is maximally close to 0. Now, when $n > m$ the expression takes the following generalized form:

$$
Q^{T}\varepsilon = 
\left[\begin{array}{c}
R \\
0  
\end{array} \right]
\beta - 
\left[\begin{array}{c}
(Q^{T}y)_{m} \\
(Q^{T}y)_{n-m} 
\end{array} \right]
= 
\left[\begin{array}{c}
R \beta - (Q^{T}y)_{m} \\
0 - (Q^{T}y)_{n-m}   
\end{array} \right]
= 
\left[\begin{array}{c}
u \\
v 
\end{array} \right]
$$

We can find such values of $\beta$ so that $u$ becomes 0. Values of $v$ remain as they are representing minimized residuals.