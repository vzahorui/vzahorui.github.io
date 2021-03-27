---
layout: single
title: "Statistical distributions"
description: In this post I described all essential stuff statistical distributions
category: "Probability"
tags: probability-distribution normal-distribution statistics z-score z-table six-sigma z-value central-limit-theorem Student's-distribution t-distribution probability-mass-function probability-density-function PDF degrees-of-freedom chi-square-distribution binomial-distribution Bernoulli-trial
date: 2021-03-27
---

A set of discrete values or a range of continuous values of a random variable is characterized by a certain probability distribution. In statistics various distributions arise in the context of estimating probabilities of random values or events.

In case of discrete variables the distribution is described by probability mass function (PMF) which assigns a certain probability value for each individual value from the set. For continuous random variables probability density functions (PDF) provide values of relative likelihood of assuming a certain value. Although the probability that a continuous variable will assume a certain exact value is 0, PDF allows to compare the relative likelihoods in different ranges of values, as well as to calculate the probability of assuming a value within a specific range (using [integral calculus]({{ site.baseurl }}{% link _posts/2019-09-24-integrals.md %})).

In this article the most useful probability distributions will be explained, as well as some of the distributions which derive from them.

## Normal distribution

Normal distribution is one of the most fundamental building blocks of statistics. According to the [Central limit theorem ]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}), averages of random samples, which are drawn independently from some independent distribution converge around some central value. They become normally distributed when the number of observations is sufficiently large. At this point the distribution of the original values from which the samples are drawn doesn't even have to be normally distributed.

Suppose, we decided to measure the weight of all newborns in a multitude of different hospitals and calculate the average weight in each hospital. Most likely the distribution of those average weights will resemble a bell-shaped curve.

![](/assets/images/probability/toy_newborn_weight_distribution.png){: .align-center}

Here we see that the average of all measured averages converges around a certain central value, 3.2 kilos in this case. This means that among all measured averages we encountered mostly values which are very close or equal to 3.2. The closer the hospital average to 3.2 - the higher the frequency of such encounters. By contrast, we see that there are very few averages that have values, say, higher than 4 or lower than 2.5 kilos. The bell-shaped function that we have above is actually the approximation of probability density function for the given distribution, and its values provide relative likelihood of a random variable (in our example the weight of the newborn) to assume certain values.

Normal distribution has nice statistical properties, with regard to probability in particular. From the example above we can see that  we have a 50% chance of getting an average newborn weight higher or lower than 3.2 kilos, whereas the whole area under the curve represents 100% of the overall probability.

One other interesting property of normal distribution is the spread of its values around the mean, known as the six sigma rule.

![](/assets/images/distributions/toy_newborn_6_sigma.png){: .align-center}

Based on the example above, we may deduce that:

* 68.26% of all newborns have weight from 2.9 to 3.5 kilos (one standard deviation away from the mean)
* 95.44% - from 2.6 to 3.8 kilos (two standard deviations away from the mean)
* 99.73% - from 2.3 to 4.1 kilos (three standard deviations away from the mean)

### Z-score

Before moving on to calculating the probability of getting certain interval values let’s introduce $z$-score metric. Plainly speaking, $z$-score tells us how many standard deviations a given value is away from the mean of its distribution.

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{x-\mu}{\sigma}$

In general, in order to calculate the area under the curve we would have to perform [integral calculus]({{ site.baseurl }}{% link _posts/2019-09-24-integrals.md %}), however for the normal distribution we can simply use precalculated $z$-table by looking up probability for a specific $z$-score. $Z$-table has recorded values of integral for cumulative normal distribution function, and it shows the probability of a random variable to assume value less than some other value. There are two parts of $z$-table - for $z$-scores which are higher or lower than the mean of distribution.

Suppose we want to calculate the percentage of newborns who have weight less than 3 kilos and the percentage of newborns with weight from 3 to 3.5 kilos. That is equal to calculating the filled areas under the curves below.

![](/assets/images/distributions/toy_newborn_weight_distribution_area.png){: .align-center}

In the first case we simply calculate $z$-score of the value 3 and look up the area under the curve from the $z$-table for negative values (since 3 is lower than the mean 3.2). In this example it approximates to 0.2514. So conclude that only 25.14% of all newborns have weight 3 kilos or less.

In the second example we have an area with two cut-off points. $Z$-table allows us to find the area to the left from a specific value, so here is what we do. First we calculated $z$-scores for 3.5 and for 3, then we look up the area under the curve for all weights which are less than 3.5 kilos and those which are less than 3 kilos. Then we simply subtract the second from the first. Finally we end up with something like 0.8413 - 0.2514, which equals to 0.59. Here we conclude that nearly 59% of all newborns have weight between 3 and 3.5 kilos.

## Student's t-distribution

If there is a need to estimate the mean of population using a sample, and if the population's variance is unknown then the mean of the population itself becomes random variable with its [own variance]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}). As a consequence, the estimated variance of the population becomes higher than just the variance of the sample.

Student's distribution (or $t$-distribution) is used as the probability density function for the expected value of population based on the sample statistics. This type of distribution is very similar to the normal distribution but it has thicker tails if the number of samples is small (roughly less than 30), and thus values which are more distant from the sample mean have higher probability of occurring. On the other hand, if the size of a sample goes to infinity then the $t$-distribution converges to the normal distribution. The shape of the PDF is actually defined by the number of [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}) of the distribution, which is the same as for the estimated variance - namely $(n-1)$, where $n$ is the number of observations in the sample. Below is a comparison of probability density functions with different numbers of degrees of freedom for the same example of the newborn weight which we used earlier.

![](/assets/images/probability/normal_and_t_distributions.png){: .align-center}

Similarly to $z$-scores for the normal distribution, for $t$-distribution there are also tables of precomputed values for different numbers of degrees of freedom, so no need to perform integration when calculating probability.

## Binomial distribution

This is a discrete probability distribution for cases where each observation may have one of the two possible outcomes. These observations are known as Bernoulli trials or experiments and their end results are restricted to only two possible outcomes. The most referred example would be tossing of a coin and expecting the outcome to be either heads or tails. However in fact any variable may be translated into a Bernouli trial, even a continuous one. For example we may consider one of the possible outcomes as a success, and all the rest as a failure. For continuous variables we may specify a threshold, and then consider the outcomes as crossing or not crossing of it.

Binomial distribution provides the expected number of successes in realizations of $n$ Bernoulli trials using prior knowledge of probability of success in a single experiment. The assumption of this type of distribution are independence of each observation and the same probability of success for each individual Bernoulli trial.

Let's set the value of success as 1, and the value of failure as 0. Then the probability of 1 is $p$ while the probability of 0 is $(1-p)$. The weighted average of a single experiment will be:

&nbsp;&nbsp;&nbsp;&nbsp;
$E(x) = 1*p+0(1-q) = p$

From this the expected value (or the mean) of the distribution is simply $np$.

Now let's recall that the variance measures the squared distance between the observed value of a random variable and its expected value. For a successful outcome of a Bernoulli trial where we have 1, the distance to the mean ($p$) will be $(1-p)$. SImilarly, for the unsuccessful outcome where we have 0 the distance to the mean will be $(0-p)$. Then the weighted average of these two will be:

&nbsp;&nbsp;&nbsp;&nbsp;
$Var(x) = p(1-p)^2+(1-p)(0-p)^2 = p(1-p)^2+(1-p)p^2 = p(1-p)(1-p+p) = p(1-p)$

Therefore the variance for the binomial distribution is $np(1-p)$.

In order to achieve better accuracy with binomial distribution testing the whole experiment may be performed multiple times (or the observations may be resampled with replacement). For example we want to estimate how well the audience likes a new movie. The outcome for each individual cinema visitor is viewed as a Bernoulli trial while the number of satisfied visitors after a session is the result of a single binomial test. Since this measure itself may depend on many factors the results after each session may be quite different. In order to understand the average percentage of the audience satisfaction it may be useful to visualize with a histogram the total number of outcomes for the binomial tests across all sessions. Below is a plot displaying distribution of binomial test
results for 1000 sessions each containing 200 visitors.

![](/assets/images/probability/binomial_distribution.png){: .align-center}

As we see just like in the normal distribution the resulting values are concentrated around a certain central value - the mean of the binomial distribution. In fact, if the number of tests is reasonably high (at least both $np$ and $n(1-p)$ are greater than 5) then the binomial distribution may be approximated with the normal distribution.