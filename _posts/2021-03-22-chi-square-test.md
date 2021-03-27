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

## Chi-square distribution

In a nutshell the chi-square distribution is the distribution of sum of squred values sampled from a [normally distributed]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}) variable.

&nbsp;&nbsp;&nbsp;&nbsp;
$\chi_k^{2} = \sum_{i=1}^k Z_i$

where $Z_i$ is a randomly drawn value from a normal distribution, and $k$ is the number of [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}), which is also equal to the number drawn values.

Below is a vizualization of the probability density function of the chi-square distribution for a different number of degrees of freedom if the values are drawn from the normal distribution with the mean value 0, and the standard deviation 1.

![](/assets/images/probability/chi_squared_distributions.png){: .align-center}

Notice that since we are squaring the values there are no negative values in chi-square distribution. If we draw only one value, then there is a high probability that this value is close to 0, since the normal distribution is centered around 0. Therefore the shape of the PDF of chi-square distribution with 1 degree of freedom is heavily skewed towards zero, while the probability of getting bigger numbers becomes minuscule. If we draw more and more numbers increasing the number of degrees of freedom, the sum of squared values causes the center of the PDF of chi-square dsitribution to be shifted to the right.

## Goodness of fit test

