---
layout: single
title: "Hypothesis test non-parametric statistics"
description: "overview of test statistics: when to use each"
category: "Probability"
tags: degrees-of-freedom significance-test hypothesis-testing p-value normal-distribution binomial-distribution median sign-test Wilcoxon-signed-rank-test rank Mann–Whitney-U-test U-statistic
date: 2021-08-12
---

This is an overview of the most commonly used non-parametric statistics in [hypothesis testing]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}) explaining when to use each. Unlike the [parametric counterparts]({{ site.baseurl }}{% link _posts/2021-03-22-hypothesis-test-parametric-statistics.md %}), these tests do not assume that the data is [normally distributed]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution), and therefore do not make use of its parameters, such as the mean and the variance.

The benefit of not assuming the normal distribution of the data in the non-parametric tests comes at a cost - they might be less powerful than the parametric ones, if the distribution is normal after all. In practice however, it is difficult to assess the measure of normality of a distribution in order to decide whether to go with the parametric or non-parametric tests. Also if there are only slight departures from the normality then parametric tests perform fairly well.

## In this article

## One sample or two paired samples

### Sign test

This test uses the median of a sample as a central tendency metric, and the null hypothesis is constructed as the median being equal to some constant $\theta$.

Then in order to test the null hypothesis, the $p$-value is calculated with the following [binomial distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#binomial_distribution) which gets the probability of having $k$ or less numbers out of $n$ greater than $\theta$:  

&nbsp;&nbsp;&nbsp;&nbsp;
$P(x \leq k) = \sum_{i=0}^{k} {\binom{n}{i}}p^{i}(1-p)^{n-i}$

where $p$ should be equal to 0.5, because each observation from a sample which is being tested has equal chances of being smaller or bigger than $\theta$ if the null hypothesis is true.

For large samples the given expression can be also approximated with the [normal distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution), and the $z$-score can be used just like in case of [testing the proportion for the binomial distribution]({{ site.baseurl }}{% link _posts/2021-03-22-hypothesis-test-parametric-statistics.md %}#proportion_sample_and_population_binomial).

In case of paired observations this test is performed for the number of times when the first observation was greater than the second one (or vice versa). If the null hypothesis is true, then the number of times the value becomes greater should be approximately equal to the number of times when the value becomes smaller.

For example we want to know whether a new method of training causes improvement in the running speed of sportsmen during races. Out of 1000 sportsmen 583 improved their results, and 417 had them worse. The null hypothesis here will be that the change in training did not have an impact on the race results. Then the $p$-value is calculated as the probability of having 417 or less improvements out of 1000.

&nbsp;&nbsp;&nbsp;&nbsp;
$P(x \leq 417) = \sum_{i=0}^{417} {\binom{1000}{i}}0.5^{i}0.5^{1000-i}$

If the results for some of the observations do not change, they might be either added to the bigger category (treated as an evidence of the null hypothesis), or excluded from the sample altogether.

### Wilcoxon signed-rank test

Unlike the sign test, the Wilcoxon test takes into account not only the sign of the difference but also its magnitude. This makes sense in case of the paired tests because if the number of improvements and worsening is approximately the same, the magnitude of improvement might be much bigger than the magnitude of worsenings, which leads to a conclusion that there was an improvement on the whole. Under the null hypothesis the distribution of the differences is symmetric. If the test is two-sided then the median of the difference is assumed to be equal to zero, and if the test is one-sided then it is either positive or negative against the opposite alternative hypothesis.

This is how the test is performed:

1. At first the absolute differences are measured (for each pair of observations or for an observation and a constant). Zero difference observations are usually discarded.
2. These differences are ordered, and the rank is assigned to each observation based on its order. If there are equal differences then the rank is assigned as the average, so that the same values have the same rank.
3. Two sums of ranks are taken for the differences with different signs. For the two-sided test, if the null hypothesis is true, these sums should be approximately equal.
4. For the two-sided test, the smallest of the sums is compared to the critical value for a given number of observations and the significance level. If it is smaller than the critical value then the null hypothesis is rejected. For the one-sided test the chosen sum is the one which has the sign corresponding to the alternative hypothesis.

Generally if the number of observations is greater than 25, then instead of the exact values the normal approximation is used. It is applied to the following test statistic:

&nbsp;&nbsp;&nbsp;&nbsp;
$W = \sum_{i=1}^n(\operatorname{sgn}(x_{1, i} - x_{2, i})\cdot R_i)$

which is the sum of signed ranks. Under the null hypothesis the mean value of $W$ is zero, and the variance is $\frac{n(n+1)(n+2)}{6}$. Then the usual [$z$-test]({{ site.baseurl }}{% link _posts/2021-03-22-hypothesis-test-parametric-statistics.md %}#mean_sample_and_population) may be applied.

## Independent observations

### Mann–Whitney U test

This is yet another rank-based test, which is aimed at finding out whether two unpaired distributions are the same. In other words, the null hypothesis here is that the distribution of ranks in two samples is equal. Intuitively, if the ranks of the different samples are clustered on the opposite sides of the range, then there is a reason to assume that their underlying values do not come from the same distribution.

The test uses the following $U$-statistic, which is an aggregated measure of pairwise comparison of ranks from two samples:

&nbsp;&nbsp;&nbsp;&nbsp;
$U = \sum_{i=1}^n \sum_{j=1}^m S(X_{i},Y_{j})$

where $X$ and $Y$ are the samples of ranks which are compared, and $S$ is a special function which does the comparison of two values:

$$
S(X,Y)={\begin{cases}
1,&{\text{if }}Y<X,\\{\tfrac {1}{2}},&{\text{if }}Y=X,\\0,&{\text{if }}Y>X.
\end{cases}}
$$

Then the sum of ranks for each group is calculated.