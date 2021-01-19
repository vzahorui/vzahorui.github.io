---
layout: single
title: "Moment generating functions"
description: Describing what are moment generating functions and how they might be useful
category: "Probability"
tags: moment mgf probability-density-distribution skewness kurtosis expected-value Taylor-series
date: 2021-01-15
---

In general moment generating functions (MGF) are used as an alternative for using probability density distribution. The name implies that with MGF it is possible to find moments of a distribution but other than that they uniquely determine distributions.

## So what is the moment

With respect to the functions of random variables moment is a quantitative measure which describes the shape of the function. The zeroth moment is the total probability (that is one), the first moment is the expected value, the second central moment is the variance, the third standardized moment is the skewness, and the fourth standardized moment is the kurtosis which may be viewed as the level of thickness of tails of the function.

In general the $n$th moment is the expected value of $X^n$. These are also called uncentered moments. The centered versions of them are the expected values of $(X-\mu)$ where $\mu$ is the mean of a distribution. In addition, the standardized version of them are the moments divided by $\sigma^n$.

## Moment generating functions

This is the expression for the MGF:

&nbsp;&nbsp;&nbsp;&nbsp;
$M_x(t) = E[e^{tX}]$

where $X$ is a random variable, and $t$ is a helper parameter.

In order to obtain $k$th moment from it we should take the $k$th derivative of $E[e^{tX}]$ with respect to $t$ and then set $t = 0$. The expression $e^{tX}$ is used because it's simply convenient for extracting moments. This is how its [Taylor expansion]({{ site.baseurl }}{% link _posts/2020-05-08-taylor-series.md %}) looks like:

&nbsp;&nbsp;&nbsp;&nbsp;
$e^{tX} = 1 + tX + \frac{t^2 X^2}{2!} + \frac{t^3 X^3}{3!} + ... + + \frac{t^n X^n}{n!}$

Then the expected value of it takes the following form:

&nbsp;&nbsp;&nbsp;&nbsp;
$E[e^{tX}] = E[1] + E[tX] + E[\frac{t^2 X^2}{2!}] + E[\frac{t^3 X^3}{3!}] + ... + + E[\frac{t^n X^n}{n!}] = 1 + tE[X] + \frac{t^2 E[X^2]}{2!} + \frac{t^3 E[X^3]}{3!} + ... + \frac{t^n E[X^n]}{n!}$

Now taking the $k$th derivative with respect to $t$ will cancel out the power of the numerator and the factorial in the denominator in the $(k+1)$ element and remove all elements prior to $(k+1)$. Setting $t$ to zero will remove all other elements leaving only the $k$th moment.