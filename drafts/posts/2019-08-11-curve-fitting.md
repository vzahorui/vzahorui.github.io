---
layout: single
title: "Curve fitting"
description: Here I am going to explain some of the curve fitting methods such as least squares and least absolute residuals
category: "Regression"
tags: least-squares residuals regression absolute-residuals maximum-likelihood curve-fitting
date: 2019-08-11
---




## Arguments for using least squared distance<br>

Another important notation is that by solving least squares problem we obtain a single solution whereas by minimizing the sum of absolute residuals it is possible that there may be an infinite number of lines that all have the same sum of absolute residuals (the minimum).<br>

From the probabilistic point of view the least-squares solution is known to be the maximum likelihood estimate, provided that all residuals are independent and normally distributed random variables.<br>



###### TODO some other robust method

Another situation where least-squares solution may not perform well is heteroscedasticity of residuals. Heteroscedasticity allows the variance to be dependent on x, which is the case for many real scenarios. For example, the variance of expenditure is often larger for individuals with higher income than for individuals with lower incomes. 




