---
layout: single
title: "Heteroscedasticity"
description: Here I am going to explain what heteroscedasticity means
category: "Regression"
tags: regression residuals heteroscedasticity variance
date: 2019-08-18
---

Heteroscedasticity is a situation when variability of a variable is unequal across the range of values of a second variable that predicts it. This actually means that the error is a function of independent variable. Below are several examples of linear regression where heteroscedasticity came into play. 

![](/assets/images/regression/heteroscedasticity_demo.png){: .align-center}

Among examples where heteroscedasticity may arise are relationships between:
 * age and the average weight of a person
 * years of work experieance and salary 
 * company size and its net revenue 
 
In regression analysis heteroscedasticity will result in averaging variance which would inaccurately representing all the variances of the line. In effect, residuals appear clustered and spread apart on their predicted plots for larger and smaller values for points along the linear regression line, and the mean squared error for the model will be wrong. 
