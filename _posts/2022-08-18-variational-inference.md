---
layout: single
title: "Variational inference"
category: "Optimization"
tags: gaussian-process Kullback–Leibler-divergence KL-divergence bayesian-statistics conditional-probability prior-distribution posterior-distribution Bayes-theorem evidence-lower-bound ELBO mean-field-variational-family coordinate-ascent-variational-inference CAVI
date: 2022-08-24
---

Variational inference is a technique which is usually employed for approximating complex models, where computation of the exact conditional distribution is intractable.

## The issue with the direct inference

For example, suppose we have a set of observed data $X$, and unobserved data $Z$ (latent variables) which jointly form distribution $P(X, Z)$. $Z$ could be set as some unknown variables, as well as separate observation points. We set some prior probability distribution $P(Z)$ which we believe best describes $Z$, then

$$P(X, Z) = P(X \mid Z)P(Z)$$

where $P(X \mid Z)$ is the [likelihood]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}) of observing $X$ given $Z$ under condition that the prior is true.

On the other hand, $P(X)$, also called the evidence, is the average probability of observing $X$ over all possible values of $Z$:

$$P(X) = \int P(X \mid Z)P(Z) dZ$$

The objective now is to fit the latent variables $Z$ so that the evidence is maximized, however solving this task directly usually becomes intractable for because of the [integral]({{ site.baseurl }}{% link _posts/2019-09-24-integrals.md %}).

Further on, the complexity of calculating $P(X)$ also blocks calculation of the posterior probability distribution of $Z$, since according to the [Bayes' theorem]({{ site.baseurl }}{% link _posts/2022-07-15-bayesian-inference.md %}):

$$P (Z \mid X) = \frac{P(X \mid Z)P(Z)}{P(X)} = \frac{P(X \mid Z)P(Z)}{ \int P(X \mid Z)P(Z) dZ}$$

## Variational inference approach

Instead of trying to calculate the posterior distribution $P(Z \mid X)$ directly, variational inference is aimed at finding some distribution $Q(Z)$ which would serve as its best approximation, therefore the objective is to fit the function, and not the parameters of a function. This new distribution is fit by minimizing the [KL divergence]({{ site.baseurl }}{% link _posts/2021-07-29-distance-metrics.md %}#kullback_leibler_divergence).

$$Q(Z) = \underset{\theta \in \Theta}{\operatorname{arg\;max}}\, D_{\text{KL}}(Q(Z)\parallel P(Z\mid X))$$

$$\text{KL}(Q(Z)\parallel P(Z\mid X))= \mathbb{E}_{Q(Z)}[\log Q(Z) - \log P(Z\mid X)]$$

The choice of the divergence here (divergence of $Q$ from $P$ instead of the other way around) is caused by the fact that the calculation of expectation with respect to $P$ is intractable.

Note that $P(Z\mid X)$ is still unknown, however using the Bayes' theorem and rearranging the expression of the KL divergence a bit we get the following:

$$
\begin{aligned}
\text{KL}(Q(Z)\parallel P(Z\mid X))=\mathbb{E}_{Q(Z)}[\log Q(Z) - \log P(X, Z) + \log P(X)] \\[.5em]
&= \mathbb{E}_{Q(Z)}[\log Q(Z) - \log P(X, Z)] + \log P(X)
\end{aligned}
$$

$$
\begin{aligned}
\log P(X) = \text{KL}(Q(Z)\parallel P(Z\mid X)) - \mathbb{E}_{Q(Z)}[\log Q(Z) - \log P(X, Z)] \\[.5em]
&= \text{KL}(Q(Z)\parallel P(Z\mid X)) + \mathbb{E}_{Q(Z)}[\log P(X, Z) - \log Q(Z)]
\end{aligned}
$$

Since we cannot calculate the KL divergence, and alternative would be maximizing the evidence $P(X)$ by maximizing the expression $\mathbb{E}_{Q(Z)}[\log P(X, Z) - \log Q(Z)]$, which is known as evidence lower bound or ELBO. This new objective function is tractable since $Q(Z)$ is designed to be tractable, and log joint distribution of $X$ and $Z$ is just the sum of the prior distribution $P(Z)$, and the likelihood function $P(X\mid Z)$ which can be calculated either.

Since the KL divergence is always non-negative, ELBO is treated as a variational lower bound of the evidence: $\log P(X) \geq \text{ELBO}(Q)$.

Further decomposition of the ELBO provides some interesting insights:

$$
\begin{aligned}
\text{ELBO} &= \underbrace{\mathbb{E}_{Q(Z)}\left[\log P(X \mid Z)\right] + \mathbb{E}_{Q(Z)}\left[\log P(Z)\right]}_{\mathbb{E}_{Q(Z)}\left[\log P(Z, X)\right]} -  \mathbb{E}_{Q(Z)}\left[\text{log } Q(Z) \right] \\[.5em]
&= \mathbb{E}_{Q(Z)}\left[\log P(X \mid Z)\right] + \mathbb{E}_{Q(Z)}\left[\text{log } \frac{P(Z)}{Q(Z)}\right] \\[.5em]
&= \mathbb{E}_{Q(Z)}\left[\log P(X \mid Z)\right] - \mathbb{E}_{Q(Z)}\left[\text{log } \frac{Q(Z)}{P(Z)}\right] \\[.5em]
&= \mathbb{E}_{Q(Z)}\left[\log P(X \mid Z)\right] - \text{KL}\left(Q(Z) \parallel P(Z)\right)
\end{aligned}
$$

Thus we can see that ELBO is maximized when the log likelihood function is maximized, and when the divergence of $Q(Z)$ from $P(Z)$ is minimized.

### The choice of the approximating function

A popular choice of the family which approximates the posterior is the so-called mean-field variational family. Assuming that the latent variables are mutually independent, each of them is defined by its own variational factor $q_i(z_i)$, then the approximating function looks like this:

$$Q(Z) = \prod_{j=1}^m Q_j(Z_j)$$

For each particular $Z_j$ it is possible to find the best function $Q_j$ which would describe the conditional distribution $P(Z_i \mid Z_{i \neq j}, X)$. So if we initialize all of the latent variables with some arbitrary values, and then fix all of them except $Z_j$, the optimal $Q_i$ with respect to ELBO is proportional to this:

$$Q_j(Z_j) \propto \exp\left(\mathbb{E}_{i \neq j}\left[ \log P(Z_i \mid Z_{i \neq j}, X) \right]\right)$$

Alternatively, the optimal function is also proportional to the expression where the join distribution is used instead of the conditional (this is because we assumed that all latent variables are independent).

$$Q_j(Z_j) \propto \exp\left(\mathbb{E}_{i \neq j}\left[ \log P(Z_i, Z_{i \neq j}, X) \right]\right)$$

Then the given expression is iteratively optimized for each $Q_i$ while keeping the rest of the latent variables $Z$ fixed until convergence is reached. This approach is known as Coordinate ascent variational inference (CAVI algorithm).
