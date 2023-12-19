---
layout: single
title: "Fourier series"
category: "Calculus"
tags: periodic-function sine cosine integral
date: 2023-11-24
---

A Fourier series is a way to approximate a periodic function as the sum of simple sine and cosine functions which makes it useful for analyzing and synthesizing functions with periodic behavior, such as signals in signal processing or periodic phenomena in physics. The benefit of trigonometric functions is that they can be easily modelled and their [derivatives]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) are understood. Additionally, Fourier Series makes use of the orthogonality relationships of the sine and cosine functions.

A function is periodic of period $P$ if $f(x+P) = f(x)$ for all $x$ in the domain of $f$. The smallest positive value of $P$ is called the fundamental period.

Number $\pi$ is the ratio of circle circumference to its diameter, hence the ratio of circumference to its radius is $2 \pi$. The trigonometric functions $\sin x$ and $\cos x$ are examples of periodic functions with fundamental period $2 \pi$.


#TODO: make a circle animation here


The general form of a Fourier series for a periodic function $f(t)$ with period $T$ is given by:

#TODO: review the formula
$$f(t)=a_0+\sum_{n=1}^{∞} (a_{n} cos⁡(\frac{2πnt}{T})+b_{n} sin⁡(\frac{2πnt}{T}))$$

where:

- $a_0$ is the average value of the function over one period.
- $a_n$​ and $b_n$​ are the Fourier coefficients, representing the amplitude of the cosine and sine components at the $n$-th harmonic frequency.

The derivation of these coefficients will be expained further down below.

In the context of Fourier series and signal processing, a harmonic frequency refers to a frequency that is an integer multiple of the fundamental frequency of a periodic waveform. The fundamental frequency is the lowest frequency at which a system or object vibrates, and harmonics are higher frequencies that occur at integer multiples of the fundamental. Thus $n$ is the harmonic frequency.

The Fourier series essentially breaks down a complex periodic function into simpler sinusoidal components, each associated with a specific frequency. By including more terms in the series, it is posible approximate the original function more accurately. This is somewhat similar to what [Taylor expansion]({{ site.baseurl }}{% link _posts/2020-05-08-taylor-series.md %}) does.

A more general way to represent the Fourier series is via the sum of rotating vectors through time. As the most basic example let's take a look how a single rotating vector can produce a sinusoid function: 


#TODO: build rotating vector


#TODO: by adding varying frequencies it is possible to aproximate step-function which has discontinuity when the number of terms goes to infinity.
#TODO: build a chart of adding terms


## Breaking down the formula







The most basic approximation a period function is just taking its average.

The whole circle circumference can be viewed as a wave of period $P$. The average value of periodic function $f(t)$ can be calculated via integral using [density function]({{ site.baseurl }}{% link _posts/2019-09-24-integrals.md %}#probability_density_function), just like the mean of a continuous function.

$$a_0 = \frac{1}{P} \int_{-P/2}^{P/2} f(t) dt$$

The circle spans its whole period, hence integration from $-P/2$ to $P/2$.


<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>