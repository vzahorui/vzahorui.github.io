---
layout: single
title: "Hypothesis test parametric statistics"
description: "overview of test statistics: when to use each"
category: "Probability"
tags: degrees-of-freedom Pearson's-chi-square-test significance-test hypothesis-testing z-score z-test t-test normal-distribution t-distribution F-distribution Student's-distribution continuity-correction Welch's-t-test exact-Fisher's-test Barnard's-test contingency-table G-test paired-t-test McNemar's-test binomial-distribution ANOVA analysis-of-variance F-test F-statistic Games-Howell-test
date: 2021-06-06
---

This is an overview of the most commonly used parametric statistics in [hypothesis testing]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}) explaining when to use each. The parametric statistics here assume that the data has distribution close to the [normal]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution). See [this article]({{ site.baseurl }}{% link _posts/2021-06-06-hypothesis-test-non-parametric-statistics.md %}) for an overview of the non-parametric tests.

## In this article

* [Testing the difference in means](#difference_means)
  * [The sample mean and the mean of the population](#mean_sample_and_population)
  * [The mean in two independent samples](#mean_two_samples_independent)
  * [The mean in two paired samples](#mean_two_samples_paired)
  * [The mean in more than two independent samples](#mean_more_samples)
* [Testing the difference in proportions](#difference_proportions)
  * [Sample proportion and population proportion](#proportion_sample_and_population)
    * [Sample proportion and population proportion for the binomial distribution](#proportion_sample_and_population_binomial)
    * [Sample proportion and population proportion for the multinomial distribution](#proportion_sample_and_population_multinomial)
  * [Proportions in two independent samples](#proportion_two_samples_independent)
    * [Proportions in two samples for the binomial distribution](#proportion_two_samples_binomial)
    * [Proportions in two samples for the multinomial distribution](#proportion_two_samples_multinomial)
    * [Proportion in samples with small numbers](#contingency_tables_small_numbers)
  * [Proportions in two paired samples](#proportion_two_samples_paired)

<div id='difference_means'/>
## Testing the difference in means

<div id='mean_sample_and_population'/>
### The sample mean and the mean of the population

When we draw multiple samples from a population, the mean of each sample becomes a random variable, and the [expectation of the mean]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}) of those samples is equal to the mean of the population. Recall that for the [normal distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution) the $z$-score tells us how many standard deviations a given value is away from the mean of its distribution. The idea of the $z$-score can be applied to a single samples's mean, so that its relative distance from the population's mean is estimated, but instead of the standard deviation, the standard error of the mean is used as the scaling factor:

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
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='mean_two_samples_independent'/>
### The mean in two independent samples

In case of testing the mean between two independent samples the null hypothesis is constructed as no difference between them.

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

This type of the $t$-test where the variance in different populations is assumed to be different is known as Welch's $t$-test. The number of [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}) for this $t$-statistic is approximated via the following equation:

&nbsp;&nbsp;&nbsp;&nbsp;
$df = \frac{(\frac{s_1^2}{n_1}+\frac{s_2^2}{n_2})^2}{\frac{(\frac{s_1^2}{n_1})^2}{n_{1}-1}+\frac{(\frac{s_2^2}{n_2})^2}{n_{2}-1}}$

If the variance in both populations is assumed to be equal then the $t$-statistic may be calculated as follows:

&nbsp;&nbsp;&nbsp;&nbsp;
$t=\frac{\bar x_1 - \bar x_2}{s_p \sqrt{\frac{1}{n_1}+\frac{1}{n_2}}}$

where $s_p$ is the pooled standard deviation calculated like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$s_p = \sqrt{\frac{(n_{1}-1)s_1^2 + (n_{2}-1)s_2^2}{n_{1}+n_{2}-2}}$

The number of degrees of freedom in this case is $(n_1 + n_2 - 2)$.

In practice the variance of two populations is rarely equal, so Welch's $t$-test should be used by default as it is more robust. At the same time, if the variance is equal the power of this test comes close to the power of the $t$-test based on the pooled standard deviation.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='mean_two_samples_paired'/>
### The mean in two paired samples 

This is usually the case when each observation in the same sample is measured twice in different conditions. For example for a group of patients the level of cholesterol in blood is measured before and after the treatment. The null hypothesis would assume no change in the level of cholesterol.

The test statistic which is appropriate in this case is paired (or dependent) $t$-test. According to this test, for each observation the difference in two measures is calculated so that the average and the standard deviation of those differences can be obtained. We need to test whether this average difference is sufficiently different from 0.

&nbsp;&nbsp;&nbsp;&nbsp;
$t=\frac{\bar X_D}{\frac{s_D}{\sqrt{n}}}$

Notice that this test statistic is very similar from the one when the mean of one sample is compared to the mean of population.

Compared to the case of independent samples, paired test has smaller standard error, and therefore it has more statistical power in rejecting the null hypothesis.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='mean_more_samples'/>
### The mean in more than two independent samples

This is usually the case when there are more than two sample groups, the means of which are assumed to be equal under the null hypothesis. For example the average score of 5 parallel classes at the same school is assumed to be equal.

One might be tempted to use the $t$-test for each pair of the samples but this might lead to the increased percentage of type I error (as the error will add up with each additional test). Instead, the analysis of variance (ANOVA) could be applied to all samples at once maintaining the global significance level.

The idea of ANOVA is that if there is a difference in the means of at least two groups of samples then the between-group variance will be more prominent that the within-group variance. In other words, the average distance by which the means of each group depart from the global mean should be greater than the average spread of the values around the means of each group.

If all samples come from the same population it is reasonable to assume that they have the same variance and mean. Therefore the variance of the population should be the only source of variance in the dataset, and the variance of means should be close to the within-group variance.

The between-group sum of squares is calculated like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$\sum_{i=1}^{k}n_i(\bar X_i - \bar X)^2$

where $n_i$ and $\bar X_i$ are the number of observations and the mean of the $i$th sample, and $\bar X$ is the global mean.

There are ($k$ - 1) [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}) for this metric so the average mean of the between-group sum of squares (or the variance of the means of the groups) is obtained by dividing by ($k$ - 1).

The within-group sum of squares is calculated like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$\sum_{i=1}^{k}\sum_{j=1}^{n_i}(X_{ij} - \bar X_i)^2$

where $X_{ij}$ is the $j$th observation in the $i$th group. The number of degrees of freedom for the within-group variance is ($n$-$k$), where $n$ is the total number of observations in all groups.

At last, there is a measure of global variability in the whole dataset consisting of multiple groups - the total sum of squares:

&nbsp;&nbsp;&nbsp;&nbsp;
$\sum_{i=1}^{k}\sum_{j=1}^{n_i}(X_{ij} - \bar X)^2$

The total sum of squares is also obtained by adding up the between-group and within-group sums of squares. The global variance has ($n$-1) degrees of freedom.

The between-group and the within-group variances actually follow the [chi-square distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#chi_distribution) (because they represent the sum of squared random variables) with the according number of degrees of freedom, and the ratio of these two variances, also called F-statistic, follows the F-distribution.

Intuitively, if the null hypothesis is true, the F-statistic should not be too high. For a given significance level it is possible to get the critical value from the F-distribution, the excess of which should be a reason to reject the null hypothesis.

The analysis of variance only checks whether the mean values of multiple samples are the same. However, it does not give an answer which exactly group is different if the null hypothesis is rejected, so the post-hoc analysis should be performed. The recommended type of test in this case is the Games-Howell test which tests the difference in each pair combination from the group of samples, and does not assume equal sample size and variance in the samples.

The Games-Howell test is very similar to Welch's $t$-test, including the way it determines the number of degrees of freedom for each pair of samples. However, the standard error is calculated slightly differently:

&nbsp;&nbsp;&nbsp;&nbsp;
$SE = \sqrt{\frac{1}{2}(\frac{s_1^2}{n_1}+\frac{s_2^2}{n_2})}$

In determining the critical values the Games-Howell test relies on the [studentized range distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#studentized_distribution), so it depends on the number of degrees of freedom, as well as the total number of samples.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='difference_proportions'/>
## Testing the difference in proportions

<div id='proportion_sample_and_population'/>
### Sample proportion and population proportion

<div id='proportion_sample_and_population_binomial'/>
#### Sample proportion and population proportion for the binomial distribution

This type of testing is popular for the cases of binomially distributed data where each observation has only two possible outcomes. For example we know that the average rate of college dropout across a country is 7%. For a particular college we conducted a survey and found out that among 500 originally enlisted students 31 left before graduation. We would like to test the hypothesis that the dropout rate for this college is the same as the average across the country. The alternative hypothesis would be that it is less than the average.

Considering that each student may or may not leave before graduation we're dealing with the [binomial distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#binomial_distribution). For this kind of distribution we can employ its probability mass function and calculate directly the $p$-value - the probability of having from 0 to 31 dropouts among 500 considering that the average dropout rate is 7%:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(x \leq 31) = \sum_{i=0}^{31} {\binom{500}{i}}0.07^{i}(1-0.07)^{500-i} \approx 0.275$

So under the significance level of 0.05 we cannot reject the null hypothesis.

For large samples the [Central limit theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}) helps to make an approximation of the binomial distribution with the normal distribution. In this case the mean and the variance of the population are estimated as $np$ and $np(p-1)$ respectively, so it is possible to calculate the $z$-score and get the corresponding $p$-value for it.

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
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='proportion_sample_and_population_multinomial'/>
#### Sample proportion and population proportion for the multinomial distribution

In case of multinomial distributed data, when we compare the proportion in the sample among multiple categories with the expected proportion, Pearson's chi-square test may be used, also known as goodness of fit test. This test uses chi-square statistic which is calculated like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$\chi^2 = \sum_{i=1}^k \frac{(O_{i}-E_{i})^2}{E_{i}}$

where $k$ is the number of categories, $O_i$ and $E_i$ are the observed and the expected numbers for the $i$th category respectively.

When the total number of observations is large enough, the chi-square statistic may be approximated with the [chi-square distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#chi_distribution) with ($k$-1) [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}). A rule of thumb is that both the observed and expected values in each category should be at least greater than 5.

The $p$-value obtained from the chi-square statistic corresponds to the area of probability for the numbers greater or equal to this statistic, so the test is in fact an upper-tailed test. Nonetheless, it is used in the context of distribution in the sample not being equal to the distribution in the population, just as with the two-tailed tests. When applied to the binomially distributed data, the chi-square test produces the same result as the two-tailed $z$-test.

A better alternative to the chi-square test would be the G-test which is based on [log-likelihood ratio test]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}#likelihood_ratio). According to this test, under the null hypothesis the theoretical distribution is defined by the parameters of maximum likelihood. Each parameter is defined as a ratio of datapoints belonging to a specific category: $\tilde \theta_i = \frac{e_i}{n}$ where $e_i$ is the theoretical number of observations belonging to the $i$th category. The likelihood function will assume the following form: $\prod_{i=1}^m \tilde \theta_i^{x_i}$, where $x_i$ is the observed number of observations belonging to the $i$th category.

The actually observed proportion defines the parameters of another model: $\hat \theta_i = \frac{x_i}{n}$, and the likelihood function: $\prod_{i=1}^m \hat \theta_i^{x_i}$.

So that the log-likelihood ratio can be calculated as follows:

&nbsp;&nbsp;&nbsp;&nbsp;
$\ln \left(\frac{\mathcal L(\tilde \theta \mid x)}{\mathcal L(\hat \theta \mid x)}\right) = \ln \left(\frac {\prod_{i=1}^{m} \tilde \theta_{i}^{x_{i}}}{\prod_{i=1}^{m} \hat \theta_{i}^{x_{i}}}\right) = \ln \prod_{i=1}^{m} \left(\frac{\tilde \theta_{i}}{\hat \theta_{i}}\right)^{x_{i}} = \ln \prod_{i=1}^{m} \left(\frac{e_{i}}{x_{i}}\right)^{x_{i}} = \sum_{i=1}^{m} x_i \ln \left(\frac{e_{i}}{x_{i}}\right)$

Having this expression multiplied by -2 makes it asymptotically chi-square distribution with the same number of degrees of freedom as the chi-square statistic. In fact, the chi-square test statistic is an approximation of the G-test statistic, so the latter is preferred.

The final formula of the G-statistic looks like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$2\sum_{i=1}^{m}O_{i}\ln \left(\frac{O_{i}}{E_{i}}\right)$

<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='proportion_two_samples_independent'/>
### Proportions in two independent samples

<div id='proportion_two_samples_binomial'/>
#### Proportions in two samples for the binomial distribution

For the binomially distributed variables in order to test the equality of proportions in two samples, we may also use the normally distributed random variable which is the difference of means in two samples. Application of normal approximation is justified via the [Central limit theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}) provided that the sample sizes are large enough.

&nbsp;&nbsp;&nbsp;&nbsp;
$\hat p_1 - \hat p_2 = N(p_1 - p_2, \sqrt{\frac{p_1(1-p_1)}{n_1} + \frac{p_2(1-p_2)}{n_2}})$

The $z$-score is calculated similarly to the $t$-statistic for the difference in means of two samples using the pooled version of variance:

&nbsp;&nbsp;&nbsp;&nbsp;
$z=\frac{\hat p_1 - \hat p_2}{\sqrt{\hat p(1- \hat p)(\frac{1}{n_1}+\frac{1}{n_2})}}$

where 

&nbsp;&nbsp;&nbsp;&nbsp;
$\hat p = \frac{\hat p_1 n_1 +\hat p_2 n_2}{n_1+n_2}$

And after applying continuity correction:

&nbsp;&nbsp;&nbsp;&nbsp;
$z=\frac{\hat p_1 - \hat p_2 \pm \frac{1}{2}(\frac{1}{n_1}+\frac{1}{n_2})}{\sqrt{\hat p(1- \hat p)(\frac{1}{n_1}+\frac{1}{n_2})}}$

<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='proportion_two_samples_multinomial'/>
#### Proportions in two samples for the multinomial distribution

In case of multinomial distribution of data the chi-square test is used, which in case of testing the difference in two or more samples is known as the chi-square test of independence.

Let's see an example. Suppose we had two types of classes at school studying physics and languages, and we want to test whether there is a difference between the distribution of school graduates among disciplines in college depending on their specialty at school. Below is the contingency table of the observed distribution.

|           |Physics at school|Languages at school|_Row Total_|
|:---------:|:-------:|:---:|:---:|
|Science|113|56|169|
|Arts|42|87|129|
|Business|58|73|131|
|___Column Total___|213|216|429|

Under the null hypothesis the proportion of distribution is equal in both types of school classes, and thus it should be equal to the general distribution which is obtained from the totals. Therefore, the generally observed distribution adjusted by the sample size is viewed as the expected value with which the actual distributions in the groups are compared.

In our example the general proportion of students who went to study science is $\frac{169}{429}$, so considering that there were 213 students at physics class at school, the expected value for the first cell would be 213 $\cdot \frac{169}{429} \approx$ 83.91.

The chi-square test statistic is calculated like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$\chi^2 = \sum_{i=1}^r \sum_{j=i}^c \frac{(O_{i,j}-E_{i,j})^2}{E_{i,j}}$

where $r$ is the number of rows, $c$ is the number of columns of the contingency table, $O_{i,j}$ is the observed number in a cell from $i$th row and $j$th column, and $E_{i,j}$ is the expected number.

Similarly to the case of single sample and population, if the number of observations is sufficiently high, the chi-square statistic is approximated with the [chi-square distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#chi_distribution) with the number of [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}) equal to $(r-1)(c-1)$.

Similar to the case of testing the sample distribution with theoretical one, G-test is preferred to the chi-square test.

<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='contingency_tables_small_numbers'/>
#### Proportion in samples with small numbers

For small samples the normal approximation of discrete variables won't work, so exact methods of calculating the $p$-value should be used instead. This is similar to calculating the exact $p$-value from the PMF of the binomial distribution, as was the case of one sample and known probability of a single Bernoulli trial in the population. However, in case of two samples the probability of success can only be estimated from the sample data. The null hypothesis is then constructed as the equality of probability of success in two samples, which is also equal to the general probability.

&nbsp;&nbsp;&nbsp;&nbsp;
$H_0: p_1 = p_2 = p$

For example we want to test whether the taxi drivers are more likely to receive a 5-star rating when they are silent during the whole ride. For this we gathered two samples of drivers: those who tend to talk with the customers, and those who prefer to stay silent, and counted the number of rides where the driver was given a 5-star rating through the app. The result is shown in the following contingency table:

|                      |Talkative|Silent|_Row Total_|
|:--------------------:|:-------:|:---:|:---:|
|Received 5-star rating|12|15|27|
|Did not receive 5-star rating|23|21|44|
|___Column Total___|35|36|71|

One method of calculating the $p$-value here would be the exact Fisher's test which relies on conditional probability. The method sets the general number of successes across two samples, and the size of each sample fixed. So in our example it considers possible only cases when the total number of receiving a 5-star rating is 27, and the sample sizes are 35 and 36. Therefore, the general probability of success is $\frac{12+15}{35+36}$. It is possible to calculate the conditional probability of having 12 successes out of 35 trials and 15 successes out of 36 trials provided that the general probability is $\frac{27}{71}$. This is how the probability of this particular distribution is calculated:

&nbsp;&nbsp;&nbsp;&nbsp;
$p = \frac{\binom{35}{12}\binom{36}{15}}{\binom{71}{27}}$

From combinatorics recall that the binomial operator $\binom{n}{k}$ calculates the number of ways to choose $k$ elements from $n$.

Similarly, the probability of less likely distributions are also calculated so that eventually the $p$-value is defined as the sum of these distributions. Whether the distribution is less likely or not from that of the contingency table may be determined with the Wald statistic (may be viewed as the pooled $z$-score):

&nbsp;&nbsp;&nbsp;&nbsp;
$W = \frac{\hat p_1 - \hat p_2}{\sqrt{\hat p(1-\hat p)(\frac{1}{n_1}+\frac{1}{n_2})}}$

where $\hat p_1$ and $\hat p_2$ are hypothetically observed proportions, and $\hat p$ is the general proportion (in our example $\frac{27}{71}$).

In our setting the resulting $p$-value is 0.63 which does not give us the reason to reject the null hypothesis.

Fisher's exact method may be overly conservative in rejecting the null hypothesis in case of small samples, hence it has low power. This happens due to its discreteness. If the number of samples is small, big chunks of probability are distributed among a relatively small number of possible combinations of successes and failures. Therefore, the rare combinations might get too big shares of the combined probability, and the $p$-value will end up being too high.

Barnard’s test was designed to combat the shortcoming of Fisher's exact method by increasing the power. In real life situations the sample sizes, and the distribution of successes among them may vary. Provided that the null hypothesis is true, the probability of success in a single experiment might not be equal to the one obtained from the totals of the contingency table. Instead, it is equal to some hypothetical value $\hat p$. In this case the probability of distribution observed in the contingency table is calculated similarly to the PMF of the [binomial distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#binomial_distribution):

&nbsp;&nbsp;&nbsp;&nbsp;
$p = \binom{35}{12}\binom{36}{15} \hat p^{(12+15)}(1-\hat p)^{(72-12-15)}$

Then the probability of less likely distributions is also computed in order to obtain the $p$-values. Within Barnard’s test the $p$-value is calculated for each possible value of $\hat p$ between 0 and 1, so that a continuous range of hypothetical $p$-values can be built. The value of $\hat p$ is then selected as the value which produces the largest $p$-value, which will still be less than the $p$-value obtained with Fisher's exact method. This is due to the fact that Barnard's method does not set a strict condition of total number of successes equal to some number, so it makes the distribution of probabilities among possible combinations less discrete.

In Barnard's test the rule of maximization of the $p$-value may work against preserving the statistical power if the number of rows and columns in contingency tables grows. Therefore, the method should be generally applied only for 2 $\times$ 2 tables.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='proportion_two_samples_paired'/>
### Proportions in two paired samples

Similarly to the testing of the mean, this is usually the case when each observation in the same sample is measured twice in different conditions but when the output of each observation is a binomially distributed variable. For example the same respondent may be asked two questions implying yes or no answer, or the same question may be asked twice where the second time it is asked after provision of some additional evidence. The null hypothesis is then set as no change is the proportion of yes and no answers.

Say we've gathered a pool of respondents and asked them whether they enjoy jogging. After that we ask them to try going out and jogging regularly despite their attitude, and ask the same question in a couple of months. The result of the paired measuring can be condensed into a 2 $\times$ 2 contingency table.

|                      |Enjoyed jogging after|Did not enjoy jogging after|_Row Total_|
|:--------------------:|:-------------------:|:-------------------------:|:---------:|
|Enjoyed jogging before|631|157|788|
|Did not enjoy jogging before|498|948|1446|
|___Column Total___|1129|1105|2234|

McNemar's test can be used to test whether there is a significant difference in responses after a period of jogging practice. It is expected that some people who responded previously as positive changed their mind and stopped enjoying jogging. On the other hand, some people could get into it and change their response from negative to positive. If the period of jogging had no effect on the people's attitude, then the numbers of people changing their response in either direction should be random and more or less the same. If there is an effect after all, then the change in one of the directions should outweigh the other.

The McNemar's test statistic follows [chi-square distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#chi_distribution) with 1 degree of freedom and looks like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$\chi^2 = \frac{(b-c)^2}{b+c}$

where $b$ and $c$ are the numbers from the contingency table corresponding to the cells where the response was changed. In our example this will be

&nbsp;&nbsp;&nbsp;&nbsp;
$\chi^2 = \frac{(157-498)^2}{157+498} \approx 177.5$

This test statistic is extremely unlikely if the null hypothesis is true (for 1 degree of freedom and significance level of 0.05 the critical value of chi-squared statistic is 3.85) so we may conclude that regular exercising helped in changing people's attitude to jogging.

If either $b$ or $c$ is small (less than 25) then an exact version of a test should be used which is based on the binomial test. Here we are testing whether the sample is not balanced provided that the probability of a single Bernoulli experiment is 0.5. This is done by calculating the $p$-value for obtaining $b$ (if $b$ is less than $c$) successes out of $(b+c)$ observations.

&nbsp;&nbsp;&nbsp;&nbsp;
$2 \sum_{i=0}^{x} {\binom{b+c}{i}}0.5^{i}(1-0.5)^{b+c-i}$

where $x$ is the smallest of $b$ and $c$. Multiplication by 2 is done in order to get the $p$-value of a two-tailed test.

Due to its discreteness this particular version of the exact McNemar's test might be overly conservative in rejecting the null hypothesis. The recommended way to perform continuity correction is by calculating the so-called mid-$p$-value, that is by taking only half of the point estimate of probability for the case when the number of successes equals the observed number. This is equivalent to removal of one point estimate from the calculation of the two-tailed $p$-value.

&nbsp;&nbsp;&nbsp;&nbsp;
$p = 2 \sum_{i=0}^{x} {\binom{b+c}{i}}0.5^{i}(1-0.5)^{b+c-i} - {\binom{b+c}{b}}0.5^{b}(1-0.5)^{b+c-b}$
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>