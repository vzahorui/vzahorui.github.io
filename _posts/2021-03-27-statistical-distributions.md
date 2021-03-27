---
layout: single
title: "Normal distribution"
description: In this post I described all the essential stuff in order to understand normal distribution and how to use it.
category: "Probability"
tags: normal-distribution statistics z-score z-table six-sigma z-value central-limit-theorem Student's-distribution t-distribution probability-density-function PDF degrees-of-freedom
date: 2021-03-21
---

Normal distribution is one of the most fundamental building blocks of statistics. According to the Central limit theorem, averages of random samples, which are drawn independently from some independent distribution converge around some central value. They become normally distributed when the number of observations is sufficiently large. At this point the distribution of the original values from which the samples are drawn doesn't even have to be normally distributed.

Suppose, we decided to measure the weight of all newborns in a multitude of different hospitals and calculate the average weight in each hospital. Most likely the distribution of those average weights will resemble a bell-shaped curve.

![](/assets/images/distributions/toy_newborn_weight_distribution.png){: .align-center}

Here we see that the average of all measured averages converges around a certain central value, 3.2 kilos in this case. This means that among all measured averages we encountered mostly values which are very close or equal to 3.2. The closer the hospital average to 3.2 - the higher the frequency of such encounters. By contrast, we see that there are very few averages that have values, say, higher than 4 or lower than 2.5 kilos. The type of bell-shaped function that we have above is actually the probability density function (PDF), and the values of this function provide relative likelihood of a random variable (in our example the weight of the newborn) to assume certain values.

Normal distribution has nice statistical properties, with regard to probability in particular. From the example above we can see that  we have a 50% chance of getting an average newborn weight higher or lower than 3.2 kilos, whereas the whole area under the curve represents 100% of the overall probability.  

## Z-score

Before moving on to calculating the probability of getting certain interval values let’s introduce $z$-score metric. Plainly speaking, $z$-score tells us how many standard deviations a given value is away from the mean of its distribution.

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{x-\mu}{\sigma}$

In general, in order to calculate the area under the curve we would have to perform [integral calculus]({{ site.baseurl }}{% link _posts/2019-09-24-integrals.md %}), however for the normal distribution we can simply use precalculated $z$-table by looking up probability for a specific $z$-score. $Z$-table has recorded values of calculated integral for cumulative normal distribution function. So to speak, it tells us the probability of value being less than some other value. There are two parts of $z$-table - for $z$-scores which are higher or lower than the mean of distribution.

Suppose we want to calculate the percentage of newborns who have weight less than 3 kilos and the percentage of newborns with weight from 3 to 3.5 kilos. That is equal to calculating the filled areas under the curves below.

![](/assets/images/distributions/toy_newborn_weight_distribution_area.png){: .align-center}

In the first case we simply calculate $z$-score of the value 3 and look up the area under the curve from the $z$-table for negative values (since 3 is lower than the mean 3.2). In this example it approximates to 0.2514. So conclude that only 25.14% of all newborns have weight 3 kilos or less.

In the second example we have an area with two cut-off points. $Z$-table allows us to find the area to the left from a specific value, so here is what we do. First we calculated $z$-scores for 3.5 and for 3, then we look up the area under the curve for all weights which are less than 3.5 kilos and those which are less than 3 kilos. Then we simply subtract the second from the first. Finally we end up with something like 0.8413 - 0.2514, which equals to 0.59. Here we conclude that nearly 59% of all newborns have weight between 3 and 3.5 kilos.

## Six Sigma rule

One other interesting property of normal distribution is the spread of its values around the mean.

![](/assets/images/distributions/toy_newborn_6_sigma.png){: .align-center}

Based on the example above, we see that:
* 68.26% of all newborns have weight from 2.9 to 3.5 kilos (one standard deviation away from the mean)
* 95.44% - from 2.6 to 3.8 kilos (two standard deviations away from the mean)
* 99.73% - from 2.3 to 4.1 kilos (three standard deviations away from the mean)

## Student's t-distribution

If there is a need to estimate the mean of population using a sample, and if the population's variance is unknown then the mean of the population itself becomes random variable with its [own variance]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}). As a consequence, the estimated variance of the population becomes higher than just the variance of the sample.

Student's distribution (or $t$-distribution) is used as the probability density function for the expected value of population based on the sample statistics. This type of distribution is very similar to the normal distribution but it has thicker tails if the number of samples is small (roughly less than 30), and thus values which are more distant from the sample mean have higher probability of occurring. On the other hand, if the size of a sample goes to infinity then the $t$-distribution converges to the normal distribution. The shape of the PDF is actually defined by the number of [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}) of the distribution, which is the same as for the estimated variance - namely $(n-1)$, where $n$ is the number of observations in the sample. Below is a comparison of probability density functions with different numbers of degrees of freedom for the same example of the newborn weight which we used earlier.

![](/assets/images/probability/normal_and_t_distributions.png){: .align-center}

Similarly to $z$-scores for the normal distribution, for $t$-distribution there are also tables of precomputed values for different numbers of degrees of freedom, so no need to perform integration when calculating probability.