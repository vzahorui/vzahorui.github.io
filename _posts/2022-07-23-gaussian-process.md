---
layout: single
title: "Gaussian process"
category: "Regression"
tags: normal-distribution gaussian-distribution covariance PDF probability-density-function conditional-probability kernel prior-distribution posterior-distribution log-marginal-likelihood
date: 2022-08-14
---

The Gaussian process may be viewed as a prediction technique which mainly solves regression problems by fitting a line to some given data (although it may be extended for classification and clustering problems as well).

In the essence the Gaussian process takes an infinite number of all possible regression estimations, and using the [normal distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution) it assigns probability to each of them. Then, the mean value and the standard deviation in the space of those estimations can be used for making predictions and building the confidence intervals.

<div id='multivariate_gaussian_distribution'/>
## Multivariate Gaussian distribution

The [Gaussian distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution) is a core element upon which the whole idea of the Gaussian process is built.

Let's take a look at two-dimensional examples of the Gaussian distribution with the mean at the origin and variance of 1 along each of the dimensions:

![](/assets/images/distributions/2d_gaussian_distribution.png){: .align-center}

On the left-hand side the [covariance]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}) is 0, which means that both dimensions are independent. So for example if an observation is spotted with a value greater than the mean along $X_1$ (like $X_1$ = 1.1 on the plot above) it has equal chances of being higher or lower than the mean along $X_2$.

On the contrary, if there is some non-zero covariance between two dimensions, then the distribution is no longer centered around the origin. As we see on the right-hand side of the charts above, the covariance is a positive number. So at $X_1$ = 1.1, which is greater than the mean along $X_1$, it is more likely that its value along $X_2$ is also greater than its corresponding mean.

All things considered, it makes sense to operate in terms of conditional probability, where the expected values of one variable (in our case $X_2$) depends on the observed value of another ($X_1$ in our example). Here is a neat mathematical property: if one normally distributed variable is conditioned on another normally distributed variable, then the resulting conditional distribution is also normal. On the visualization above we can see a familiar bell-shaped curve where a plane ($X_1$ = 1.1) slices through a bivariate normal distribution. This curve exactly defines the probability density function of the conditional distribution here.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='conditional_distribution_properties'/>
## Conditional distribution properties

Suppose there is a set of variables which is split into two parts: $X$ and $Y$. Either of them may be a single dimension or a vector containing multiple dimensions. Assuming that both $X$ and $Y$ are normally distributed, it is possible to calculate the conditional mean and the conditional covariance matrix. As stated above, the resulting conditional distribution will be also Gaussian.

$$
\left(\begin{array}{c}X\\
Y \end{array}\right) \sim N \left(\left(\begin{array}{c}\mu_X\\
\mu_Y \end{array}\right), \left(\begin{array}{cc} \Sigma_{XX} & \Sigma_{XY} \\
\Sigma_{YX} & \Sigma_{YY} \end{array}\right)\right)
$$

Here $\mu_x$, $\mu_y$ are respective means of $X$ and $Y$, which are either numbers or vectors depending on whether $X$ and $Y$ contain more than one variable.<br>
If $X$ is a single vector then $\Sigma_{XX}$ is just a number which corresponds to the variance within the variable. If however $X$ contains more than one variable then $\Sigma_{XX}$ is the variance-covariance matrix of the variables within $X$. Same goes for $\Sigma_{YY}$.<br>
$\Sigma_{XY}$ and $\Sigma_{XX}$ contain the covariances between the elements of $X$ and $Y$.

The mean and variance of the conditional distribution of $Y$ given $X$ are calculated like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$E(Y \mid X) = \mu_Y + \Sigma_{YX} \Sigma_{XX}^{-1} (X - \mu_X)$

&nbsp;&nbsp;&nbsp;&nbsp;
$Var(Y \mid X) = \Sigma_{YY} - \Sigma_{YX} \Sigma_{XX}^{-1} \Sigma_{XY}$

The distribution of $Y$ depends on the distribution of $X$, so intuitively, the conditional variance is the marginal variance of $Y$ which is reduced after discovery of the distribution of $X$.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='gaussian_process_realization'/>
## Realization of the Gaussian process

It is reasonable to assume that a particular point in regression bears a value which is not much different from the values in its nearest proximity. The closer the values are to each other - the more similar they are. In case of a linear regression, this is absolutely certain because there cannot be any more similar values to that of a certain point than the ones of its nearest neighbors. Bearing that in mind, it is possible to apply the idea of the covariance in the multiple dimensions to the points which are used as an input to some regression. If we consider each point as a separate variable then those points which are close to each other may be viewed as highly correlated variables.

Below is an example of how the covariance made from a variable which contains 20 evenly spaced values could look like.

![](/assets/images/regression/covariance.png){: .align-center}

The covariance matrix is built by applying the kernels to each pairwise combination of an input variable. The kernels are special functions which take two values and compute their similarity. The overview of the commonly used kernels can be found [here]({{ site.baseurl }}{% link _posts/2022-08-01-kernels-overview.md %}).

The Gaussian process is basically the generalization of a multivariate Gaussian distribution when the number of dimensions goes to infinity. In the scope of regression, each point is considered to be normally distributed so that their combined distribution is normal as well.

Similarly to the multivariate Gaussian distribution, the Gaussian process is characterized by its mean and covariance. However, the mean is not a mere vector but instead a function which can produce the mean value for an infinite number of points. And instead of covariance the kernel is used.

&nbsp;&nbsp;&nbsp;&nbsp;
$f(x) \sim \mathcal{GP}(m(X), k(XX^{T}))$

Here $m(X)$ is the mean function, and $k(XX^{T})$ is the kernel function which produces the similarity measure for each pairwise combination within $X$.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='prior_and_posterior'/>
## Prior and posterior distribution in the Gaussian process

Without having any data from observations we may assume for example that $Y$ is normally distributed over the range of $X$ variable with mean equal to 0, and variance equal to 1. We may draw a random set of points from a normal distribution which would correspond to some points in the input space $X$, and then make predictions of $Y$ over unknown regions of $X$. Assuming that $Y$ depends on $X$, the predictions can be made using the notion of the mean and variance of the conditional normal distribution as described above, that is using using the covariance of the input variables $X$ with themselves, and the covariance between known values of $Y$ and corresponding values of $X$. In the context of [Bayesian inference]({{ site.baseurl }}{% link _posts/2022-07-15-bayesian-inference.md %}) the resulting function distribution is considered prior distribution.

![](/assets/images/regression/gp_priors_example.png){: .align-center}

The shaded regions around the mean function correspond to the areas of one, two, and three standard deviations from the mean.

Provided that we can draw a random sample an infinite number of times - there is an infinite number of these sampled functions, and they are normally distributed around the given mean.

After observing some points, the function is similarly adjusted so that it passes through the points (or close to them), and the resulting distribution is now called the posterior. Below is an example of making predictions over unknown regions using the Gaussian process where the training points are generated using a sinusoid function with some added noise.

![](/assets/images/regression/gp_rbf_fit_example.png){: .align-center}

Since the kernels define the relationship between the point and thus the shape of the resulting function, the choice of their hyperparameters plays an important role. These hyperparameters are estimated by maximizing the log marginal [likelihood]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}) of observing the set of predicted points:

&nbsp;&nbsp;&nbsp;&nbsp;
$\log p(y|X) = -\frac{1}{2}y^T(K+\sigma^2_n I)^{-1}y - \frac{1}{2}\log|K+\sigma^2_n I|-\frac{n}{2}\log2\pi$ 

where $K$ is the covariance function of $y$, and $\sigma^2$ is the variance of the noise. 

The equation above is derived from the expression of the joint probability density of multivariate Gaussian distribution, and the logarithm is used because it transforms the product into sum so that it would be easier to calculate the [derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) of the resulting function. 

The local maximum points are found using gradient-based algorithms, such as [L-BFGS-B]({{ site.baseurl }}{% link _posts/2020-07-29-quasi-newton-methods.md %}), in a multidimensional space where the number of dimensions is equal to the number of the parameters.

In case of the posterior distribution above, the kernel was constructed as a sum of [the squared exponential kernel]({{ site.baseurl }}{% link _posts/2022-08-01-kernels-overview.md %}#squared_exponential_kernel) and the white noise. Let's look at the contour plot of the log likelihood dependent on two hyperparameters of the resulting kernel:

![](/assets/images/optimization/gp_contour_log_marginal_likelihood.png){: .align-center}

As we can see, there are at least two points of the local maxima here, so that the optimization algorithm could land at any of them. Choosing the right set of initial parameters could lead the algorithm to the desired spot of the local maxima, as well as prevent its exhaustion.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='large_datasets'/>
## Gaussian process at large datasets

When optimizing the hyperparameters one has to invert a matrix of size $n \times n$ which becomes intractable for large datasets, and thus the exact calculation becomes impossible. Therefore, approximate methods appeared where the input dataset in reduced


