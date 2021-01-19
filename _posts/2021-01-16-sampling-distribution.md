---
layout: single
title: "Sampling distribution"
description: Sample mean and variance
category: "Probability"
tags: variance sample mean central-limit-theorem normal-distribution
date: 2021-01-16
---

In real life situations it is often impossible to calculate statistics such as mean and variance of the whole population. Instead we may only be able to draw a sample from the whole population, calculate statistics over it, and project it to the whole population. Of course, sample statistics won't correspond fully to that of the whole population, and it may vary among different samples, since each sample is drawn independently. From here, sampling distribution is the probability distribution of sample statistics.

## Sample mean

### Expectation of the sample mean

As stated above, if we randomly draw $n$ samples from the population and calculate the mean value of each, we'll likely get different results. Here, the mean of a sample (signed as $\bar X$) becomes a random variable. Yet it is possible to calculate the expected value of $\bar X$ (in other words the mean of the sample mean), and its variance. For the expected value we have:

&nbsp;&nbsp;&nbsp;&nbsp;
$E[\bar X] = E[\frac{x_1 + x_2 + ... + x_n}{n}] = \frac{1}{n}E[x_1 + x_2 + ... + x_n] = \frac{1}{n}(E[x_1] + E[x_2] + ... + E[x_n])$

The expectation of each of the individually drawn values is equal to the mean of the population $\mu$, so:

&nbsp;&nbsp;&nbsp;&nbsp;
$E[\bar X] = \frac{1}{n}(\mu + \mu + ... + \mu) = \frac{n \mu}{n} = \mu$

Eventually the expected value of the sample mean is equal to the mean of the population.

Interestingly the distribution of means of different independently drawn samples tend to resemble [normal distribution]({{ site.baseurl }}{% link _posts/2019-07-28-normal-ditribution.md %}) as the number of samples increases. This phenomenon is known as the central limit theorem and it applies to any type of population distribution.

### Variance of the sample mean

Before moving to the expression of the variance of the sample mean it is worth to mention that the constant is getting squared after moving from the expression of variance:

&nbsp;&nbsp;&nbsp;&nbsp;
$Var(aX) = E[(aX - E[aX])^2] = E[(aX - aE[X])^2] = E[a^2(X - E[X])^2] = a^2 E[(X - E[X])^2] = a^2 Var(X)$

Remembering this, we can calculate the variance of the sample mean:

&nbsp;&nbsp;&nbsp;&nbsp;
$Var(\bar X) = Var(\frac{x_1 + x_2 + ... + x_n}{n}) = \frac{1}{n^2}Var(x_1 + x_2 + ... + x_n) = \frac{1}{n^2}(Var(x_1) + Var(x_2) + ... + Var(x_n))$

The variance of each of the individually drawn values is equal to the variance of the population $\sigma$, so:

&nbsp;&nbsp;&nbsp;&nbsp;
$Var(\bar X) = \frac{1}{n^2}(\sigma + \sigma + ... + \sigma) = \frac{n \sigma}{n^2} = \frac{\sigma}{n}$

The variance of the sample mean is much less than the variance of the population which means that the mean value of different independently drawn samples won't be much different.