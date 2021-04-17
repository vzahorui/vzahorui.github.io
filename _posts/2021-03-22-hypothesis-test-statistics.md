---
layout: single
title: "Hypothesis test statistics"
description: "overview of test statistics: when to use each"
category: "Probability"
tags: degrees-of-freedom Pearson's-chi-square-test goodness-of-fit significance-test hypothesis-testing z-score z-test t-test normal-distribution t-distribution f-statistic f-distribution Student's-distribution continuity-correction Welch's-t-test
date: 2021-04-25
---

This article provides an overview of the most commonly used statistics in [hypothesis testing]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}) explaining when to use each.

## Testing the difference in means

### The mean between sample and population

When we draw multiple samples from a population, the mean of each sample becomes a random variable, and the [expectation of the mean]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}) of those samples is equal to the mean of the population. Recall that for the [normal distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}) the $z$-score tells us how many standard deviations a given value is away from the mean of its distribution. The idea of the $z$-score can be applied to a single samples's mean, so that its relative distance from the population's mean is estimated, but instead of the standard deviation, the standard error of the mean is used as the scaling factor:

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{\bar x-\mu}{\frac{\sigma}{\sqrt{n}}}$

where $\bar x$ is the sample mean, $\mu$ is the true mean, $\sigma$ is the standard deviation of the population, and $n$ is the size of the sample. If $\sigma$ is unknown then the best thing to do is to use its estimate from the sample, thus the $z$-score is replaced by the $t$-statistic:

&nbsp;&nbsp;&nbsp;&nbsp;
$t = \frac{\bar x-\mu}{\frac{s}{\sqrt{n}}}$

where $s$ is the estimate of the population's standard deviation which has $(n-1)$ [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}). As a consequence, instead of the normal distribution the $t$-statistic estimates the distance in the Student's distribution with $(n-1)$ degrees of freedom. If the sample size is greater than 30 the Student's distribution will approximate the normal distribution, so the $t$-statistic will be almost the same as the $z$-score. Both statistics may be used in hypothesis testing (in $t$-tests and $z$-tests accordingly) depending on the sample size and the prior knowledge of the population's standard deviation. In the rare situations when the sample size is less than 30, and the population's standard deviation is known, $z$-test should be used, otherwise it is safe to apply $t$-test by default.

Let's consider a simple example. From statistical data we know that 5 year ago the average age of mothers at the time of birth of their first child was 26 years. Nowadays from a sample of 500 mothers we get the average age of 26.5 years, and the standard deviation of 3 years, so we would like to check whether mothers started to have their first child at an older age. The null hypothesis would be that the age did not change, and the alternative hypothesis would mean that the average age increased.

&nbsp;&nbsp;&nbsp;&nbsp;
$H_0: \mu = 26$

&nbsp;&nbsp;&nbsp;&nbsp;
$H_a: \mu > 26$

First let's set the significance level as 0.05. Assuming the data has normal distribution we may calculate the probability of getting the test statistic (the mean of our sample) provided that the true mean is 26. The $t$-statistic for our sample would be

&nbsp;&nbsp;&nbsp;&nbsp;
$t = \frac{26.5-26}{\frac{3}{\sqrt{500}}} \approx 3.7268$

For this one-sided $t$-test the $p$-value corresponding to our $t$-statistics is 0.0001, which is less than the significance level. Based on this we reject the null hypothesis and assume that the age of mothers at the time of birth of their first child increased indeed.

### The mean between two samples

In case of testing the mean between two samples the null hypothesis is constructed as no difference between them.

&nbsp;&nbsp;&nbsp;&nbsp;
$H_0: \mu_1 - \mu_2 = 0$

&nbsp;&nbsp;&nbsp;&nbsp;
$H_a:  \mu_1 - \mu_2 \neq 0$

Under the Central limit theorem, the difference in means of two samples can be viewed as a random variable which is approximately normally distributed. The mean of this variable is equal to the difference in true means, and its variance is equal to the combined variance of means of both samples.

&nbsp;&nbsp;&nbsp;&nbsp;
$\bar x_1 - \bar x_2 = N(\mu_1 - \mu_2, \sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}})$

The $z$-score is then

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{(\bar x_1 - \bar x_2) - (\mu_1 - \mu_2)}{\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}}$

If the null hypothesis is true it becomes just

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{\bar x_1 - \bar x_2}{\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}}$

In practice we usually don't know the standard deviation in both populations so we use the unbiased estimate of it based on the standard deviation in the samples. So in this case $z$-score becomes $t$-statistic.

&nbsp;&nbsp;&nbsp;&nbsp;
$t = \frac{\bar x_1 - \bar x_2}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}$

This type of the $t$-test where the variance in different populations is assumed to be different is known as Welch's $t$-test. The number of degrees of freedom for this $t$-statistic is approximated via the following equation:

&nbsp;&nbsp;&nbsp;&nbsp;
$df = \frac{(\frac{s_1^2}{n_1}+\frac{s_2^2}{n_2})^2}{\frac{(\frac{s_1^2}{n_1})^2}{n_{1}-1}+\frac{(\frac{s_2^2}{n_2})^2}{n_{2}-1}}$

If the variance in both populations is assumed to be equal then the $t$-statistic may be calculated as follows:

&nbsp;&nbsp;&nbsp;&nbsp;
$t=\frac{\bar x_1 - \bar x_2}{s_p \sqrt{\frac{1}{n_1}+\frac{1}{n_2}}}$

where $s_p$ is the pooled standard deviation calculated like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$s_p = \sqrt{\frac{(n_{1}-1)s_1^2 + (n_{2}-1)s_2^2}{n_{1}+n_{2}-2}}$

The number of degrees of freedom in this case is $(n_1 + n_2 - 2)$.

In practice the variance of two populations is rarely equal, so the Welch's $t$-test should be used by default as it is more robust. At the same time, if the variance is equal the power of this test comes close to the power of the $t$-test based on the pooled standard deviation.

## Testing the difference in proportions

### The proportion between sample and population

This type of testing is performed on binomially distributed data where each observation has only two possible outcomes. For example we know that the average rate of college dropout across a country is 7%. For a particular college we conducted a survey and found out that among 500 originally enlisted students 31 left before graduation. We would like to test the hypothesis that the dropout rate for this college is the same as the average across the country. The alternative hypothesis would be that it is less than the average.

Considering that each student may or may not leave before graduation we're dealing with the [binomial distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}). For this kind of distribution we can employ its probability mass function and calculate directly the $p$-value - the probability of having from 0 to 31 dropouts among 500 considering that the average dropout rate is 7%:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(x \leq 31) = \sum_{i=0}^{31} {\binom{500}{i}}0.07^{i}(1-0.07)^{500-i} \approx 0.275$

So under the significance level of 0.05 we cannot reject the null hypothesis.

For large samples the [Central limit theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}) helps to make an approximation of the binomial distribution with the normal distribution. In this case the mean and the variance of the population are estimated as $np$ and $np(p-1)$ respectively, so
it is possible to calculate the $z$-score and get the corresponding $p$-value for it.

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{x-np}{\sqrt{np(1-p)}}$

Note that unlike the $z$-score for the mean of a sample here the variance in the denominator is not divided by the number of observations. This is because we have just a single realization of the binomial distribution. When calculating the sample mean, each observation within the sample is considered as representation of the population mean so their effect is eventually averaged. On the contrary, a single realization of the binomial distribution may be viewed as the sum of Bernoulli trials, not the average.

In the binomial distribution the outcome is restricted by a multitude of whole numbers while the normal distribution allows the outcome to be any real number. This is why continuity correction should be factored in when calculating the $z$-score. For example, when we want to calculate the probability of obtaining a value less than some value $a$ in the binomial distribution the following holds true:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(x < a) = P(x < a-0.5)$

Or if the initial condition was "less or equal" then we would have this:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(x \leq a) = P(x < a+0.5)$

When applying continuity correction, each whole number gets an additional region around it where the normally distributed value could land, so that it can be attributed to the nearest neighboring whole number - the possible outcome of the binomial distribution.

The $z$-score with continuity correction for our example of the college dropouts looks like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{31-500 \cdot 0.07+0.5}{\sqrt{500 \cdot 0.07(1-0.07)}} \approx -0.61$

The resulting $p$-value of this $z$-score is 0.2698 which is not much different from the one obtained by calculating directly with the PMF of the binomial distribution.

Alternatively, for bigger samples it may be useful to calculate the $p$-value for the percentage instead of the exact number. For example we could calculate the $p$-value of getting 6.2% (31 out of 500) of dropouts provided that the average is 7%. In this case the variance of a single observation is $p(1-p)$, so the standard error of the sample mean is $\sqrt{\frac{p(1-p)}{n}}$. Therefore, the $z$-score is calculated like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{x-p}{\sqrt{\frac{p(1-p)}{n}}}$

Note, when testing the proportion we do not rely on the within-sample variance, the number of degrees of freedom is not reduced by 1, hence the normal distribution is assumed instead of the Student's t-distribution.

Also note that the formula above does not make use of the continuity correction thus making the result less precise for smaller samples. It could be however factored in like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{x-p \pm \frac{0.5}{n}}{\sqrt{\frac{p(1-p)}{n}}}$

Plus or minus are used depending on the direction of the one-tailed test (whether the sample statistic is smaller or greater than the expected value). If the test result is smaller than the expected value, and the test is lower-tailed we should use plus. And vice versa, if the test statistic is bigger than the expected value, and the test is upper-tailed, minus should be used.

### Proportion between two samples

In order to test the equality of proportions in two samples, it is also possible to use normal approximation provided that the sample sizes are large enough. Here we may also use the normally distributed random variable which is the difference of means in two samples.

&nbsp;&nbsp;&nbsp;&nbsp;
$\hat p_1 - \hat p_2 = N(p_1 - p_2, \sqrt{\frac{p_1(1-p_1)}{n_1} + \frac{p_2(1-p_2)}{n_2}})$

The $z$-score is calculated similarly to the $t$-statistic for the difference in means of two samples using the pooled version of variance:

&nbsp;&nbsp;&nbsp;&nbsp;
$z=\frac{\hat p_1 - \hat p_2}{\sqrt{\hat p(1- \hat p)\frac{1}{n_1}+\frac{1}{n_2}}}$

where 

&nbsp;&nbsp;&nbsp;&nbsp;
$\hat p = \frac{\hat p_1 n_1 +\hat p_2 n_2}{n_1+n_2}$

And after applying continuity correction:

&nbsp;&nbsp;&nbsp;&nbsp;
$z=\frac{\hat p_1 - \hat p_2 \pm \frac{1}{2}(\frac{1}{n_1}+\frac{1}{n_2})}{\sqrt{\hat p(1- \hat p)\frac{1}{n_1}+\frac{1}{n_2}}}$




## Chi-square

Chi-square test, also known as Pearson's chi-square test is used in hypothesis testing regarding datapoints being distributed among categories according to some theoretical distribution. In other words the significance test is performed on the difference between the observed and the theoretical distribution of observations among categories. Under the null hypothesis there is no difference between these distributions, so the test checks how likely the observed distribution among categories is, assuming the null hypothesis is true.

Another application of chi-square tests is checking whether two random variables are independent.

Each observation may be viewed separately for each category as a realization of the Bernoulli trial where the outcome may result in either belonging to the category or not. The chi-square tests are performed under the assumptions that the observations are random, independent and normally distributed which is often justified via the [Central limit theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}).
