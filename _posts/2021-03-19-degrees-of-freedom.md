---
layout: single
title: "Degrees of freedom in statistics"
description: explaining Degrees of freedom
category: "Probability"
tags: residuals variance mean linear-model
date: 2021-03-21
---

In statistics degrees of freedom is the number of independent elements forming a final statistic which are free to vary without violation of an imposed constraint.

Suppose we have a sample of $n$ observations, and we know the mean of the sample. In this case $(n-1)$ elements of the sample may be any real numbers but the last remaining element is strictly determined by the other elements and the mean (the initial constraint). Hence the number of degrees of freedom for the set of observations is $(n-1)$. The mean itself has $n$ degrees of freedom because all $n$ elements used to form this statistic can be anything.

When estimating the variance of population using sample data, in place of the mean of population we use the estimate of it - the mean of the sample. The sum of residuals $(x_i - \bar x)$ is always equal to zero. Knowing the values of $(n-1)$ residuals it is possible to calculate the remaining one, thus there are $(n-1)$ degrees of freedom for residuals, and, as a consequence, for the variance as well. Another way to think about it is to imagine a sample size of 1. In this case there will be no residuals as the only observed value will be equal to the mean of this sample. However if we add just one additional observation then we are giving freedom to the residuals, because the values now may deviate from their mean.

## In linear models

In linear regression the number of degrees of freedom for the error term is calculated like $(n-p-1)$, where $p$ is the number of independent variables - the dimensions. Here is one way to build intuition about it. If we have $n$ observations and $n$ dimensions then a hyperplane can be perfectly fit to the points representing these observations. In other words we have a system of linear equations with unique solution which have $n$ equations and $(n+1)$ parameters - coefficients at each independent variable plus intercept. This system has no error term so in order to introduce freedom for the variance of error in it, at least one additional observation should be added. Hence, the minimal number of observations for the freedom is $(p+2)$ where $p$ is reserved for the coefficients at the variables, and 1 - for the intercept.