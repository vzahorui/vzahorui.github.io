---
layout: single
title: "Kernels overview"
category: "Optimization"
tags: gaussian-process RBF radial-basis-function-kernel squared-exponential-kernel covariance matern-kernel rational-quadratic-kernel periodic-kernel linear-kernel dot-product-kernel kernel-density-estimation KDE bandwidth
date: 2024-04-19
---


<div id='kernels_gausian_process'/>
## Kernels in Gaussian process

In scope of the [Gaussian process]({{ site.baseurl }}{% link _posts/2022-07-23-gaussian-process.md %}) the kernels takes input of two numbers and produces the measure of their similarity. Thus they define the behavior of the resulting function distribution.

Kernels may be combined by adding or multiplying them together.

The result of adding kernels has the same effect on the [covariance]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}) matrix as the addition of matrices. So for example if any of the two kernels which are added together produces the high number - the correlation between the two points is high. Usually noise is added to the kernel of a choice in order to prevent overfitting. As a consequence, the resulting mean function is no longer forced to pass through each observed point, and becomes more flexible.

In case of kernel multiplication the correlation between the two points is high if either of the individual kernels produces high correlation.

Let's take a look at the commonly used kernels and see which effects their hyperparameters have.

<div id='squared_exponential_kernel'/>
### Squared exponential kernel

Also known as Radial basis function (RBF) kernel, this kernel is infinitely differentiable, and has only two hyperparameters which eventually produces a nice-looking smooth function.

&nbsp;&nbsp;&nbsp;&nbsp;
$k(x_i, x_j) = \sigma^2\exp\left(-\frac{(x_i - x_j)^2}{2\ell^2}\right)$

The hyperparameter $\sigma^2$ corresponds to the magnitude of deviations of the function's values from its mean by scaling the covariance matrix appropriately. In other words it represents the level of uncertainty at unobserved areas.

The hyperparameter $\ell$ is the length scale factor which determines how long the correlation between the two points lasts, and so, how far the effect of a certain observation impacts the shape of a function in the neighboring areas. Increasing $\ell$ makes an effect of higher similarity for the two points which would otherwise be considered distant.

Below is an example of the function estimation with the squared exponential kernel with some added noise.

![](/assets/images/regression/gp_rbf_fit_example.png){: .align-center}
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='matern_kernel'/>
### Matern kernel

This kernel is a generalization of the RBF kernel, which has an additional hyperparameter $\nu$ which defines how many times the resulting function may be differentiated. If $\nu$ is set to infinity then the kernel converges to the RBF kernel, however a popular choice of its value is 1.5 which makes the resulting function differentiable at least once, and in shape more realistic to the physical processes.

![](/assets/images/regression/gp_matern_example.png){: .align-center}
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='periodic_kernel'/>
### Periodic kernel

This kernel is also known as exponential sine-squared, and it allows modeling periodic processes.

&nbsp;&nbsp;&nbsp;&nbsp;
$k(x_i, x_j) = \sigma^2\exp\left(-\frac{2 \sin^2 (\pi \lvert x_i - x_j\rvert / p)}{\ell^2}\right)$

In addition to the parameters already present in the RBF kernel, it also has the hyperparameter $p$ which adjusts the periodicity of the function.

![](/assets/images/regression/gp_periodic_example.png){: .align-center}

By taking the product of the squared exponential kernel and the periodic one, we may get a function of a periodic nature which yet varies over time.

![](/assets/images/regression/gp_periodic_and_rbf_example.png){: .align-center}
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='dot_product_kernel'/>
### Dot product kernel

Also known as the linear kernel, it belongs to a family of so-called non-stationary kernels where the measure of similarity depends not only on the relative distance between the two points but also on the absolute values of the coordinates.

&nbsp;&nbsp;&nbsp;&nbsp;
$k(x_i, x_j) = \sigma^2 + x_i \cdot x_j$

On its own this kernel produces just a straight line so it is used in combination with other kernels, when some sort of trend needs to be represented. Below is an example of adding the linear kernel to the periodic one.

![](/assets/images/regression/gp_periodic_and_linear_example.png){: .align-center}

The product of the linear and periodic kernels produces a periodic function with ever increasing amplitude.

![](/assets/images/regression/gp_periodic_times_linear_example.png){: .align-center}
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
