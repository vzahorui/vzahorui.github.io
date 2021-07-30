---
layout: single
title: "Distance metrics"
description: which metrics to use when determining the distance between datapoints
category: "Linear Algebra"
tags: vector Euclidean-distance Manhattan-distance Minkowski-distance vector-norm normed-vector-space
date: 2021-07-29
---


In machine learning the distance metrics are used as a measure of similarity between two datapoints - smaller distance means more similarity. They are utilized as a key concept in [clustering]({{ site.baseurl }}{% link _posts/2021-01-03-clustering-overview.md %}), and it is also widely used in other fields such as classification, computer vision and natural language processing.

The distance metrics are induced from the normed vector spaces, so let's first take a look at what they are before moving on to an overview of the most common distance metrics.

## Normed vector space

This is a special type of space where vectors have norms - special functions which measure the distance of a vector from the origin. The norms are commonly denoted with double vertical lines, like this: $\| x \|$. The normed vector space has the following useful properties:

* The norm is always non-negative, and it is equal to zero at the origin.
* For any vector $x$ and every scalar $a$ the following holds true: $\lvert a \rvert \|x\| = \|ax\|$
* Triangular inequality holds: $\|x+y\| \leq \|x\| + \|y\|$.

The norm of the difference of two vectors calculates an aggregate measure of the pairwise difference of their elements, and this is equivalent to the distance metric between two points to which the vectors are pointing. So this is how the distance metrics are induced from the vector norms:

&nbsp;&nbsp;&nbsp;&nbsp;
$d(x,y) = \|x-y\|$

## Overview of the most common distance metrics

<div id='euclidean_distance'/>
### Euclidean distance

This is the most widely used distance metric out there. The key assumption here is that the distance is the shortest straight line which is measured in some space consisting of orthogonal dimensions.

It's like the generalization of the Pythagorean theorem for the high-dimensional space where the orthogonal axes are treated as sides, and the distance is the hypotenuse:

&nbsp;&nbsp;&nbsp;&nbsp;
$d(x, y) = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}$

<div id='manhattan_distance'/>
### Manhattan distance

Also known as the cityblock distance of taxicab geometry. This metric measures distance as the sum of absolute values of movement along each of the axes in space.

&nbsp;&nbsp;&nbsp;&nbsp;
$d(x, y) = \sum_{i=1}^n \lvert x_i - y_i \rvert$

In highly dimensional space the matrix of data may become sparse. Under this condition the typical Euclidean distance metric will mark many points as highly dissimilar. This is where the Manhattan distance becomes more preferred. It also makes the impact of outliers along some of the dimensions less important when determining similarity between points.

<div id='minkowski_distance'/>
### Minkowski distance

This is a generalization of both Euclidean and Manhattan distance which is expressed like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$d(x, y) = \left(\sum_{i=1}^n \lvert x_i - y_i \rvert^p \right)^{1/p}$

If $p$ equals to 1 or 2, then we have the Manhattan or Euclidean distance respectively.

<div id='mahalanobis_distance'/>
### Mahalanobis distance

This metric behaves like Euclidean distance but it takes into consideration the [correlation]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}) between the directions of the axes so it may be applied when the axes are not orthogonal.

Mahalanobis distance can also be viewed as generalization of the idea of measuring the [$z$-score]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution), that is how many standard deviations away a given point is from the mean value.