---
layout: single
title: "Ordinary least squares"
description: Explaining how least squares method works and how it is applied in solving analytically linear regression
category: "Regression"
tags: linear-regression ols
date: 2019-10-27
---

Ordinary least squares method (OLS) estimates analytically parameters for a linear regression by minimizing the sum of the squares of the differences between predicted and observed values of the dependent variable. As a result this method produces a single set of parameters of the regression model, which fits the best to the observed data.

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

Using the general matrix notation of linear regression the squared error can be rewritten as follows:

&nbsp;&nbsp;&nbsp;&nbsp;
$\varepsilon'\varepsilon = (Y - \beta X)^2 = Y'Y - 2\beta'X'Y + \beta'X'X\beta$

In order to find $\beta$ that minimizes the squared error we need to find its critical point by taking the derivative of this equation with respect to $\beta$ and solve it when it equals to 0:

&nbsp;&nbsp;&nbsp;&nbsp;
$\frac{\partial \varepsilon'\varepsilon}{\partial \beta} = -2X'Y + 2X'X\beta = 0$<br>

&nbsp;&nbsp;&nbsp;&nbsp;
$(X'X)\beta = X'Y$

&nbsp;&nbsp;&nbsp;&nbsp;
$(X'X)^{-1}(X'X)\beta = (X'X)^{-1}X'Y$

&nbsp;&nbsp;&nbsp;&nbsp;
$\beta = (X'X)^{-1}X'Y$






