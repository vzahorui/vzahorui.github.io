---
layout: single
title: "Correlation"
description: Here I am going to explain what is correlation and correlation coefficients, the intuition behind their calculations and how they may be useful
category: "Regression"
tags: correlation correlation-coefficients covariation regression
date: 2019-08-10
---

Generally speaking correlation is a measure of how two variables are related. Increase of one variable may cause another to increase or decrease and vice versa. In linear regression we use correlation coefficient in order to understand how well a line describes the relationship between two variables. One other measure which is used to measure correlation is covariance.<br>

Covariance is a measure of the joint variability of two random variables. If the greater values of one variable mainly correspond with the greater values of the other variable the covariance is positive. In the opposite case, when the greater values of one variable mainly correspond to the lesser values of the other variable, the covariance is negative. The magnitude of the covariance is not easy to interpret because it is not normalized and hence depends on the magnitudes of the variables. That is high absolute values will lead to higher magnitude of covariance.<br>
Calculation of covariance is very similar to the calculation of distribution variance, however instead of squaring the difference we take a product of differences of both variables from the mean. <br>

&nbsp;&nbsp;&nbsp;&nbsp;
$cov(X,Y)$ = $\frac{1}{n}\sum_{i=1}^n (x_i-\overline{x})(y_i-\overline{y})$

In turn, correlation coefficient (also known as Pearson’s correlation coefficient) is a standardised (or scaled) version of covariance.

&nbsp;&nbsp;&nbsp;&nbsp;
$\rho_{X,Y} = \frac{cov(X,Y)}{\sigma_X \sigma_Y}$

The value of correlation coefficient lies between -1.0 and 1.0.<br>
If correlation coefficient equals 1 then the upward sloping line can completely describe the relationship. If correlation coefficient equals -1 then the downward sloping line can completely describe the relationship. And if the correlation coefficient is close to 0 then the line is not describing the relationship well at all.<br>
<br>
Below is representation of different kinds of regression where correlation coefficient assumes different values.

![](/assets/images/regression/correlation_demo.png){: .align-center}
