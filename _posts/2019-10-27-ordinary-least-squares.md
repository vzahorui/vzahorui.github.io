---
layout: single
title: "Ordinary least squares"
description: "Explaining how least squares method works and how it is applied in solving analytically linear regression"
category: "Regression"
tags: linear-regression ols svd gradient-descent pseudoinverse ill-conditioned-matrix
date: 2019-10-27
---
 
Ordinary least squares method (OLS) estimates analytically parameters for a linear regression by minimizing the sum of the squares of the differences between predicted and observed values of the dependent variable. As a result, this method produces a single set of parameters of the regression model, which fits the best to the observed data.
 
Under other assumptions of linear regression, the residuals are normally distributed with the value of mean which equals to 0.
 
## Analytical solving
 
For the expression $Y = \beta X + \varepsilon$ we want to minimize squared $\varepsilon$, which can be expressed like this:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$$\sum_{i=0}^n \varepsilon_i^2 =
\left[ \begin{array}{cccc}
\varepsilon_1 & \varepsilon_2 & ... & \varepsilon_n
\end{array} \right]_{1 \times n}
\left[ \begin{array}{c}
\varepsilon_1 \\
\varepsilon_2 \\
... \\
\varepsilon_n
\end{array} \right]_{n \times 1}
$$ <br>
where $\varepsilon_i$ is an error of individual observation point.
 
Using general matrix notation of linear regression the squared error can be rewritten as follows:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\varepsilon^{T}\varepsilon = (Y - \beta X)^2 = Y^{T}Y - 2\beta^{T}X^{T}Y + \beta^{T}X^{T}X\beta$
 
In order to find $\beta$ that minimizes squared error we need to find its critical point by taking the derivative of this equation with respect to $\beta$ and solve it when it equals to 0. (The second derivative with respect to $\beta$ is always positive, hence the critical point is the minimum. More about analyzing functions can be found [here]({{ site.baseurl }}{% link _posts/2019-09-21-analyzing-functions.md %}).)
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\frac{\partial \varepsilon^{T}\varepsilon}{\partial \beta} = -2X^{T}Y + 2X^{T}X\beta = 0$<br>
 
&nbsp;&nbsp;&nbsp;&nbsp;
$(X^{T}X)\beta = X^{T}Y$
 
&nbsp;&nbsp;&nbsp;&nbsp;
$(X^{T}X)^{-1}(X^{T}X)\beta = (X^{T}X)^{-1}X^{T}Y$
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\beta = (X^{T}X)^{-1}X^{T}Y$
 
## Iterative approaches
 
In case of larger volumes of data computation of square matrix $X^{T}X$ and then the inverse of it might be quite expensive. Iterative approaches come to rescue in this case, and [gradient descent]({{ site.baseurl }}{% link _posts/2019-10-15-gradient-descent.md %}) is one way to solve least squares problem. The results may be unreliable, however, since the minimum of the loss function may not be accurately determined.  
 
## Singular value decomposition (SVD)  
 
If the matrix $X^{T}X$ is ill-conditioned then computation of its inverse may result into errors during rounding of floating point numbers, hence the result may be inaccurate. Furthermore, if the matrix $X^{T}X$ is singular then it is impossible to get its inverse. This is where [singular value decomposition]({{ site.baseurl }}{% link _posts/2019-11-03-singular-value-decomposition.md %}) comes to rescue.   
 
SVD may be applied to any matrix, including singular matrices.
 
&nbsp;&nbsp;&nbsp;&nbsp;
$A = U \Sigma V^{T}$,<br>
where $U$ and $V$ are orthogonal matrices and $\Sigma$ is a diagonal matrix of singular values.
 
Remember, the inverse of an orthogonal matrix equals its transpose. Here is how SVD transforms analytical formula for finding $\beta$ in the least squares problem:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$(X^{T}X)^{-1}X^{T} = (V \Sigma^{T} U^{T} U \Sigma V^{T})^{-1} V \Sigma^{T} U^{T} = V \Sigma^{-1} (\Sigma^{T})^{-1} V^{T} V \Sigma^{T} U^{T} = V \Sigma^{-1} U^{T}$
 
In the end we get a formula of finding pseudoinverse of a matrix, so eventually, $X = A^{+}Y$. More about pseudoinverses can be found [here]({{ site.baseurl }}{% link _posts/2019-11-03-singular-value-decomposition.md %}). <br>  
By using SVD for the least square problem there is no need to calculate inverse of any matrix other than diagonal (which is plain easy), which simplifies calculations and makes the result more accurate.