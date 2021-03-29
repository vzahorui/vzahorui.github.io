---
layout: single
title: "Chi-square test"
description: explaining Chi-square distribution and statistics
category: "Probability"
tags: PDF probability-densty-function normal-distibution chi-square-distribution probability-density-function degrees-of-freedom Pearson's-chi-square-test goodness-of-fit significance-test hypothesis-testing
date: 2021-03-25
---

Chi-square test, also knowsn as Pearson's chi-square test is used in hypothesis testing regarding datapoints being distributed among categories according to some theoretical distribution. In other words the significance test is performed on the difference between the observed and the theoretical distribution of observations among categories. Under the null hypothesis there is no difference between these distributions, so the test checks how likely the observed distribution among categories is, assuming the null hypothesis is true.

Another application of chi-square tests is checking whether two random variables are independent.

Each observation may be viewed separately for each category as a realization of Bernoulli trial where the outcome may result in either belonging to the category or not. The chi-square tests are perfomed under the assumptions that the observations are random, independent and normally distributed which is often justified via the [Central limit theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}).

Pearson's chi-square test uses a certain statistic which is approximated with the chi-square distribution, so first let's take a look at what this distribution is. 

## Goodness of fit test

