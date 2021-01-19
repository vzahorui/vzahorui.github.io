---
layout: single
title: "Probability bounds"
description: Describing how to determine bounds of probability
category: "Probability"
tags: Hoeffding's-inequality Markov's-inequality Chebyshev's-inequality variance mean Chernoff-bound moment-generating-function Weak-law-of-large-numbers Bernoulli-distribution confidence-interval
date: 2021-01-19
---

When applying a model to a certain process it is mostly impossible to be fully certain about the values of the parameters, the output of the process, and the nature of relationship between variables. Usually we only assume that the model and its parameters represent the underlying process, where the "truthfulness" of each factor has its own probability. Introducing probability bounds helps to convey the uncertainty of the output by taking into account the actual distribution of the input values. This article gives an overview of the useful inequalities which help to determine the bounds for the outputs in statistical models.

## Markov's inequality

Markov's inequality gives an upper bound of the probability that a value of a non-negative function is greater than some constant.

&nbsp;&nbsp;&nbsp;&nbsp;
$P(X \geq a) \leq \frac{E[X]}{a}$

where $E[X]$ is the expected value of $X$.

According to this inequality, if the expected value is small, and the constant is large, then the likelihood of drawing a value greater than the constant is low. Here is how the inequality derived. Recall that the mean value of a continuous function can be determined with the [integral]({{ site.baseurl }}{% link _posts/2019-09-24-integrals.md %}) like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$E[X] = \int_{-\infty}^\infty xf(x)dx$

If $X$ is a non-negative value then the expression can be simplified a bit:

&nbsp;&nbsp;&nbsp;&nbsp;
$E[X] = \int_{0}^\infty xf(x)dx$

Further, if $a \geq 0$ then:

&nbsp;&nbsp;&nbsp;&nbsp;
$\int_{0}^\infty xf(x)dx = \int_{0}^a xf(x)dx + \int_{a}^\infty xf(x)dx \geq \int_{a}^\infty xf(x)dx$

Here we end up with the integration over the smaller range, hence the resulting value is smaller. In the last expression integration is performed over $X$ which is at least as large as $a$. From this follows:

&nbsp;&nbsp;&nbsp;&nbsp;
$\int_{a}^\infty xf(x)dx \geq \int_{a}^\infty af(x)dx = a \int_{a}^\infty f(x)dx = a P(X \geq a)$

Dividing by $a$ and comparing with the original expression of $E[X]$ produces Markov's inequality.

## Chebyshev's inequality

This inequality may be considered as a consequence of Markov's inequality, and can be directly derived from it. It sets an upper bound for probability that a variable assumes value farther from its mean than a certain constant.

&nbsp;&nbsp;&nbsp;&nbsp;
$P(\lvert X-\mu \rvert \geq \varepsilon) \leq \frac{\sigma^2}{\varepsilon^2}$

According to Chebyshev's inequality if the variance is small that the likelihood of drawing a value far from the mean is low. Here is one of the most useful practical aspects of the inequality. Suppose we want to know the upper bound of probability of $X$ being outside a number of standard deviations from its mean. For that we replace $c$ with $k\sigma$ and proceed with the inequality:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(\lvert X-\mu \rvert \geq k\sigma) \leq \frac{\sigma^2}{k^2 \sigma^2} \leq \frac{1}{k^2}$

Therefore, no more than $\frac{1}{k^2}$ of the distribution's values can be more than $k$ standard deviations away from the mean. On the contrary, at least $(1-\frac{1}{k^2})$ samples of the distribution are within $k$ standard deviations from the mean.

One of the consequences of Chebyshev's inequality is the Weak law of large numbers. It states that if the number of independent samples drawn from population goes to infinity, [the sample mean]({{ site.baseurl }}{% link _posts/2021-01-16-sample-distribution.md %}) converges to the population mean. Or in other words, the more samples we have, the closer the sample mean represents the true mean. Here is how it plays out. For a set of independently drawn samples from some population we can take the sample mean and use it as a random variable in the inequality:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(\lvert \bar X -\mu \rvert \geq \varepsilon) \leq \frac{Var(\bar X)}{\varepsilon^2} = \frac{\sigma^2}{n \varepsilon^2}$

If $n$ goes to infinity the probability that the difference between the sample and the population means exceeds some constant becomes zero.

## Chernoff bound

Chernoff bound makes use of exponential function which produces sharper bounds than Markov's and Chebyshev's inequalities. It is applied to a random variable $X$ which is in turn is a sum of $n$ other independent random variables.

If we apply Markov's inequality to $e^{tX}$ we will get the general expression of Chernoff bound:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(X \geq a) = P(e^{tX} \geq e^{ta}) \leq \frac{E[e^{tX}]}{e^{ta}}$

Here $E[e^{tX}]$ is the [moment generating function]({{ site.baseurl }}{% link _posts/2021-01-13-moment-generating-functions.md %}). The tightest bound is then achieved by minimizing the expression on the right-hand side over $t$.

Now let's build an inequality for the upper bound of probability that a random variable deviates from its mean by some constant.

&nbsp;&nbsp;&nbsp;&nbsp;
$P(X \geq \mu(1+\delta)) = P(e^{tX} \geq e^{t \mu(1+\delta)}) \leq \frac{E[e^{tX}]}{e^{t \mu(1+\delta)}}$

Let's assume that $X$ follows Bernoulli distribution with $E[X] = p$. The expectation of $X$ will then be the sum of expectations of each individual observation:

&nbsp;&nbsp;&nbsp;&nbsp;
$\mu = E[X] = \sum_{i=i}^n E[X_i] = \sum_{i=i}^n p$

&nbsp;&nbsp;&nbsp;&nbsp;
$E[e^{tX}] = E[e^{t\sum_{i=1}^n X_i}] = E[\Pi_{i=1}^n e^{tX_i}] = \Pi_{i=1}^n E[e^{tX_i}]$

Each variable $X_i$ may take value 1 with probability $p$, or 0 with probability $(1-p)$. Then

&nbsp;&nbsp;&nbsp;&nbsp;
$E[e^{tX}] = \Pi_{i=1}^n (p \cdot e^t + (1-p) \cdot 1) = \Pi_{i=1}^n (1 + p(e^t - 1))$

Since $1 + y$ is always less than or equal to $e^y$.

&nbsp;&nbsp;&nbsp;&nbsp;
$E[e^{tX}] \leq \Pi_{i=1}^n e^{p(e^t - 1)} = e^{\sum_{i=1}^n p(e^t - 1)} = e^{\mu (e^t - 1)}$

Putting this into the original equation will produce the following:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(X \geq \mu(1+\delta)) \leq \frac{e^{\mu (e^t - 1)}}{e^{t \mu(1+\delta)}}$

The minimizing of the right-hand size over $t$ can be done by taking the [derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) of it and setting it equal to 0. In this case $t$ should be equal to $ln(1+\delta)$. So,

&nbsp;&nbsp;&nbsp;&nbsp;
$P(X \geq \mu(1+\delta)) \leq e^{((e^{ln(1+\delta)}-1) - (1+\delta)ln(1+\delta))\mu}$

By applying [Taylor expansion]({{ site.baseurl }}{% link _posts/2020-05-08-taylor-series.md %}) to $ln(1+\delta)$, and assuming that $\delta \geq 0$, it is possible to simplify the inequality to this:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(X \geq \mu(1+\delta)) \leq e^{\frac{-\delta^2 \mu}{2+\delta}}$

A similar calculation for the lower bound produces the following:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(X \leq \mu(1-\delta)) \leq e^{\frac{-\delta^2 \mu}{2+\delta}}$

## Hoeffding's inequality

Hoeffding's inequality sets bounds for probability that the sum of independent random variables $X$ deviates from its mean by a certain amount. Just like Chernoff bound, it makes use of exponential function:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(\lvert X-\mu \rvert \geq \varepsilon) \leq 2e^{-2n\varepsilon^2}$

One great thing about Hoeffding's inequality is that it does not require the prior knowledge of the value of $\mu$.

This probability may be treated as the level of significance $\alpha$ (probability of making an error) when setting the confidence interval of $\varepsilon$ around both sides of the expected value. Using the inequality it is possible to derive the minimum required number of observations in order for the random variable to be within its confidence interval $[E[X]-\varepsilon, E[X]+\varepsilon]$ with a given level of significance:

&nbsp;&nbsp;&nbsp;&nbsp;
$n \geq \frac{ln(2/\alpha)}{2\varepsilon^2}$

On the whole Hoeffding's inequality is statistics is a tool for making statements that the mean of the sample is approximately (due to the presence of the confidence interval) probably (since we have a significance level) is equal to the mean of population. The probability increases with the number of samples and with the width of the confidence interval. On the other hand applying tight confidence interval will cause reduction of the probability, so the smaller $\varepsilon$ we take, the bigger $n$ we should take in order to compensate, while $n$ should be at least as big as the square of $\varepsilon$.