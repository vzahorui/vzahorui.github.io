---
layout: single
title: "Distance metrics"
description: which metrics to use when determining the distance between datapoints
category: "Optimization"
tags: vector Euclidean-distance Manhattan-distance Minkowski-distance vector-norm normed-vector-space Mahalanobis-distance cosine-distance cosine-similarity Hamming-distance Levenshtein-distance Kullback–Leibler-divergence KL-divergence relative-entropy
date: 2022-08-18
---


In machine learning the distance metrics are used as a measure of similarity between two datapoints - smaller distance means more similarity. They are utilized as a key concept in [clustering]({{ site.baseurl }}{% link _posts/2021-01-03-clustering-overview.md %}), and it is also widely used in other fields such as classification, computer vision and natural language processing.

The distance metrics are induced from the normed vector spaces, so let's first take a look at what they are before moving on to an overview of the most common distance metrics.

## In this article
* [Normed vector space](#normed_vector_space)
* [Overview of the most common distance metrics](#distance_metrics)
  * [Euclidean distance](#euclidean_distance)
  * [Manhattan distance](#manhattan_distance)
  * [Minkowski distance](#minkowski_distance)
  * [Mahalanobis distance](#mahalanobis_distance)
  * [Cosine similarity and cosine distance](#cosine_similarity)
  * [Hamming distance](#hamming_distance)
  * [Levenshtein distance](#levenshtein_distance)
* [Divergence metrics](#divergence_metrics)
  * [Kullback–Leibler divergence](#kullback_leibler_divergence)

<div id='normed_vector_space'/>
## Normed vector space

This is a special type of space where vectors have norms - special functions which measure the distance of a vector from the origin. The norms are commonly denoted with double vertical lines, like this: $\lVert x \rVert$. The normed vector space has the following useful properties:

* The norm is always non-negative, and it is equal to zero at the origin.
* For any vector $x$ and every scalar $a$ the following holds true: $\lvert a \rvert \cdot \lVert x\rVert = \lVert ax\rVert$
* Triangular inequality holds: $\lVert x+y\rVert \leq \lVert x\rVert + \lVert y\rVert$.

The norm of the difference of two vectors calculates an aggregate measure of the pairwise difference of their elements, and this is equivalent to the distance metric between two points to which the vectors are pointing. So this is how the distance metrics are induced from the vector norms:

&nbsp;&nbsp;&nbsp;&nbsp;
$d(x,y) = \lVert x-y\rVert$
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='distance_metrics'/>
## Overview of the most common distance metrics

<div id='euclidean_distance'/>
### Euclidean distance

This is the most widely used distance metric out there. The key assumption here is that the distance is the shortest straight line which is measured in some space consisting of orthogonal dimensions.

It's like the generalization of the Pythagorean theorem for the high-dimensional space where the orthogonal axes are treated as sides, and the distance is the hypotenuse:

&nbsp;&nbsp;&nbsp;&nbsp;
$d(x, y) = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}$
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='manhattan_distance'/>
### Manhattan distance

Also known as the cityblock distance of taxicab geometry. This metric measures distance as the sum of absolute values of movement along each of the axes in space.

&nbsp;&nbsp;&nbsp;&nbsp;
$d(x, y) = \sum_{i=1}^n \lvert x_i - y_i \rvert$

In highly dimensional space the matrix of data may become sparse. Under this condition the typical Euclidean distance metric will mark many points as highly dissimilar. This is where the Manhattan distance becomes more preferred. It also makes the impact of outliers along some of the dimensions less important when determining similarity between points.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='minkowski_distance'/>
### Minkowski distance

This is a generalization of both Euclidean and Manhattan distance which is expressed like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$d(x, y) = \left(\sum_{i=1}^n \lvert x_i - y_i \rvert^p \right)^{1/p}$

If $p$ equals to 1 or 2, then we have the Manhattan or Euclidean distance respectively.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='mahalanobis_distance'/>
### Mahalanobis distance

This metric behaves like Euclidean distance but it takes into consideration the [correlation]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}) between the directions of the axes so it may be applied when the axes are not orthogonal.

Mahalanobis distance can also be viewed as generalization of the idea of measuring the [$z$-score]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution), that is how many standard deviations away a given point is from the mean value. In the univariate space we would have had this:

&nbsp;&nbsp;&nbsp;&nbsp;
$z = \frac{x-\mu}{\sigma}$

where $\mu$ is the mean, and $\sigma$ is the standard deviation. 

In the multivariate space however, instead of the single scalar representing the standard deviation, we have a [covariance matrix]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}). Dividing by a matrix is equivalent to multiplying by an inverse of this matrix. Also, instead of the difference of two numbers we have the difference of two vectors. Eventually the formula above is transformed into this:

&nbsp;&nbsp;&nbsp;&nbsp;
$d(x, y) = \sqrt{(x-y)S^{-1}(x-y)}$

where $S$ is the covariance matrix.

As we see, the metric takes care of the correlated directions by adjusting with the covariance matrix, and if the axes are orthogonal then the covariance matrix becomes the identity matrix, and this whole metric becomes equivalent to the Euclidean distance.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='cosine_similarity'/>
### Cosine similarity and cosine distance

These metrics are generally used to compare similarity of vectors. Cosine similarity does not take into account the magnitude of vectors when determining whether they are similar, as it only measures the angle between them. The wider the angle - the less similar the vectors.

&nbsp;&nbsp;&nbsp;&nbsp;
$\frac{\overrightarrow{x} \cdot \overrightarrow{y}}{\lVert x\rVert  \cdot \lVert y\rVert }$

The derivation of this metric is based on the definition of cosine, and can be found [here]({{ site.baseurl }}{% link _posts/2020-03-04-vector-projection.md %}#cosine_calc).

And the cosine distance is simply the difference between 1 and the cosine similarity:

&nbsp;&nbsp;&nbsp;&nbsp;
$1 - \frac{\overrightarrow{x} \cdot \overrightarrow{y}}{\lVert x\rVert  \cdot \lVert y\rVert }$

If the two vectors are the same then the cosine similarity is 1, and the distance is 0.

It makes sense to use these metrics in text analysis, when assessing the [similarity of the texts]({{ site.baseurl }}{% link _posts/2020-03-03-text-similarity.md %}). For example each unique word or a particular word combination from two texts may be viewed as one of many orthogonal directions in space. Then both texts are represented as vectors in this space whose elements represent the number of times when each word is occured. Both texts might be of different length but still convey the same meaning, so the magnitude of the vectors should be accounted for. Instead, the departure from the general direction should be considered as a measure of dissimilarity.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='hamming_distance'/>
### Hamming distance

This is a measure of similarity of two strings of text of the same length. The distance here is the number of corresponding characters which are different, so it may also be viewed as the number of required substitutions to make the strings equal.

<div id='levenshtein_distance'/>
### Levenshtein distance
Unlike the Hamming distance, this is a more general metric for assessing text similarity, and it represents the number of single-character transformations such as word insertion, removals or substitution needed for one text to become another one. For example, the word "swan" is two points away from the word "swamp" as it needs to have one character substituted and another one added, while "Levenshtein" and "Levenstein" are only 1 point away (guess why).
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='divergence_metrics'/>
## Divergence metrics

Divergence may be viewed as a special type of statistical distance which measures how distant one probability distribution is from another. For identical distributions the divergence is equal to zero, otherwise it is a positive number.

Unlike distance or any other similarity metric, divergence is not necessarily symmetric. For example, having two probability distributions $P$ and $Q$, the divergence of $P$ from $Q$ may be different than the divergence of $Q$ from $P$. An intuitive way of thinking about this asymmetry is that one of the two distributions may approximate another fairly well but not the other way around.

<div id='kullback_leibler_divergence'/>
### Kullback–Leibler divergence

Also known as relative entropy, this type of divergence is perhaps one of the most important in statistical analysis. Having two probability distributions $P$ and $Q$, we might want to know how good $Q$ approximates $P$, and this is what the Kullback–Leibler divergence does. Below is the formula for calculating the divergence from $Q$ from $P$:

&nbsp;&nbsp;&nbsp;&nbsp;
$\text{KL}(P\parallel Q)=\sum_{i=1}^n p(x_i)\log \left({\frac {p(x_i)}{q(x_i)}}\right)$

Essentially it calculates the logarithmic difference between $p(x)$ and $q(x)$ over all possible values of $x$, assuming that each particular $x_i$ has its own probability under $p(x)$.

For continuous distributions the formula looks like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$\text{KL}(P\parallel Q)=\int_{-\infty }^{\infty }p(x)\log \left({\frac {p(x)}{q(x)}}\right)\,dx$

If $q(x_i)$ is the same as $p(x_i)$ the relationship between them is 1, the expression in the logarithm is 0. This is why for the identical distributions the Kullback–Leibler divergence is 0.

If $q(x_i)$ is smaller than $p(x_i)$, the expression in the logarithm is a positive number. Then, this positive number is multiplied by the probability of $x_i$ assuming $p(x)$. Points of hight probability multiplied by high logarithm expression numbers will cause the resulting Kullback–Leibler divergence to be a large positive number, so this will be an evidence that $q(x)$ does not approximate $p(x)$ well.

On the contrary, if $q(x_i)$ is greater than $p(x_i)$, the expression in the logarithm is a negative number. However since $p(x_i)$ is true, these resulting negatives numbers are multiplied by small probability, and thus have smaller effect on the resulting divergence number, and will eventually be overwritten by the bigger numbers at regions where $p(x_i)$ is greater.

As we can see, the goodness of approximation is defined by how good the probability distribution $q(x)$ covers the regions of high probability of $p(q)$.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>