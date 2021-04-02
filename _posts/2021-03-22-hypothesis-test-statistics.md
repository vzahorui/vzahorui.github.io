---
layout: single
title: "Hypothesis test statistics"
description: "overview of test statistics: when to use each"
category: "Probability"
tags: degrees-of-freedom Pearson's-chi-square-test goodness-of-fit significance-test hypothesis-testing z-test t-test normal distribution t-distribution f-statistic f-distribution
date: 2021-04-25
---

This article provides an overview of the most commonly used statistics in hypothesis testing explaining when to use each.


## P-value calculation

Let's consider a simple example. Let's assume that 60% of the whole working population tends to take vacation in summer - this will be our null hypothesis. The alternative hypothesis will be that less than 60% of the working population takes vacation in summer.

&nbsp;&nbsp;&nbsp;&nbsp;
$H_0: \mu = 0.6$

&nbsp;&nbsp;&nbsp;&nbsp;
$H_a: \mu < 0.6$

We gather a sample of 1000 people and ask each of them as to where they prefer to take vacation in summer. The result of the sample reveals that 572 of them replied positive. Should we reject the null hypothesis knowing that?

Let's set beforehand the significance level as 0.05. Here we have a one-tailed hypothesis test where we need to calculate the area to the left from our test statistic 0.572 and see if it's smaller than the significance level. In general the probability area is calculated with [integral calculus]({{ site.baseurl }}{% link _posts/2019-09-24-integrals.md %}) but assuming that the distribution is close to normal we can use a table of precomputed $z$-scores which contains corresponding $p$-values.

In normal distribution $z$-score tells how many standard deviations a given value is away from the mean of its distribution.

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{x-\mu}{\sigma}$

In the case of hypothesis testing, sample mean itself becomes a random variable. The standard deviation of the [sample mean]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}) is called standard error and it is estimated like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$SE = \frac{\sigma}{\sqrt{n}}$

Hence, the normalized $z$-score in hypothesis testing will take the following form:

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{\bar X - \mu}{\frac{\sigma}{\sqrt{n}}}$

In our example we are checking the proportion using Bernoulli distribution where each response is either yes or no. Therefore we can calculate the $z$-score like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{0.572 - 0.6}{\sqrt{\frac{0.6 \cdot (1-0.6)}{1000}}} = -1.8074$

We see that our expected sample mean is nearly 1.8 standard errors away from the true mean (assuming the null hypothesis is true). From the table of $z$-scores this corresponds to $p$-value of 0.03515. It is less than our significance level of 0.05 so we reject the null hypothesis. It looks like less than 60% of the working population tends to take vacation in summer.

We used $z$-score in our example which is based on [normal distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}). As an alternative in hypothesis testing $t$-score could be used instead which is based on $t$-distribution with $(n-1)$ [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}). Compared to the normal distribution it has thicker tails so under the same significance level it allows test statistic to stray further from the true mean. Therefore $t$-score is generally used when the variance of the population is unknown and if the sample size is small (smaller than 30). According to the [Central limit theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}), if we draw more samples, the distribution of the sample mean starts to resemble normal distribution, so for the larger samples we may use the sample's standard deviation and consider it to be equal that of the population, and use $z$-score accordingly without sacrificing accuracy in scope of hypothesis testing.



Chi-square test, also knowsn as Pearson's chi-square test is used in hypothesis testing regarding datapoints being distributed among categories according to some theoretical distribution. In other words the significance test is performed on the difference between the observed and the theoretical distribution of observations among categories. Under the null hypothesis there is no difference between these distributions, so the test checks how likely the observed distribution among categories is, assuming the null hypothesis is true.

Another application of chi-square tests is checking whether two random variables are independent.

Each observation may be viewed separately for each category as a realization of Bernoulli trial where the outcome may result in either belonging to the category or not. The chi-square tests are perfomed under the assumptions that the observations are random, independent and normally distributed which is often justified via the [Central limit theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}).

Pearson's chi-square test uses a certain statistic which is approximated with the chi-square distribution, so first let's take a look at what this distribution is. 

## Goodness of fit test

