---
layout: single
title: "Clustering overview"
description: Describing what clustering is and its main types
category: "Clustering"
tags: grouping segmentation unsupervised-learning machine-learning hierarchical-clustering agglomerative-clustering dendrogram k-means linkage ward mean-shift
date: 2021-01-09
---

Clustering may be viewed as grouping of datapoints according to their similarity so that the most similar points end up being in the same cluster. Clustering has wide practical application, including customers and products segmentation, and detection of anomalies. There are numerous models which can be used for clustering. Primarily they differentiate by how they determine the level of similarity between datapoints, while also they can rely on other conditions, such as enforcing only some fixed number of clusters and allowing datapoints to not belong to any cluster.

Below are descriptions of some of the clustering models.

## K-means

This is the most simple clustering model which can be used as a benchmark when comparing performance of other ones. Under K-means the number of clusters should be provided beforehand so that the points could be distributed among $n$ groups. The distribution is done by minimizing the sum of inner variance within each cluster (also called inertia).

&nbsp;&nbsp;&nbsp;&nbsp;
$\sum_{i=1}^n (\lvert\lvert x_i - \mu_j \rvert\rvert^2)$

where $\mu_j$ is the centroid of $j$th cluster.

The initialization of the algorithm is done by specifying centeroids - they might be selected as some of the existing points in the dataset but can be really any random points in the dataspace. Each sample is assigned to the nearest centroid, and then new centroids are recalculated as the mean values over each of the formed clusters. Then the process is repeated a number of times until the change in centroid values becomes small enough.

The choice of initial centroids is important as the algorithm may converge to some local optimum. Other than that, K-means performs poorly if the clusters have elongated or folded shapes.

![](/assets/images/clustering/K_means_clustering.png){: .align-center}

## Hierarchical clustering

These models can be divided into two groups: agglomerative and divisive. The former start off by considering each single datapoint as a separate cluster and then merge them into bigger ones until a single cluster is formed. The latter start off with a single cluster and then divide it into smaller one.

In exploratory data analysis dendrograms are used for visual representation of the linkage between clusters, so that the number of clusters may be deduced.

![](/assets/images/clustering/agglomerative_clustering.png){: .align-center}

The dendrogram displays connections between the initial datapoints and newly formed clusters. The vertical lines indicate which points and clusters are being merged, and the height of the upper link indicates the distance between then. From the example above we can see that the distance between clusters in the last two merges is significantly larger than the distances of the previous merges, therefore we may reasonably assume that there are 3 clusters in total.

Before merging clusters in the agglomerative type of clustering some measure of distance should be evaluated in order to determine which ones are the closest ones, so that they can be merged together. The distance may be calculated using different type of linkage:

 * _**single linkage**_ - where the distance between clusters is the shortest possible distance between the points belonging to each of the two clusters.
 * _**maximum (or complete) linkage**_ - where the distance is the biggest possible distance between the points of two clusters.
 * _**average linkage**_ - where the distance is the average distance of every point in the cluster with every point in another cluster.

Other than that, _**ward**_ linkage may be used which determines clusters by minimizing the sum of squared distances within each bigger cluster when merging smaller ones. The concept is similar to the one of K-means but the initial centroids are the samples of the dataset, and at each iteration there becomes less of them as the clusters are being merged. Compared to K-means, ward linkage in agglomerative clustering has better grasp on the structure of clusters producing more accurate results. As opposed to the single linkage, ward forces clusters to be more evenly spaced which may not always be the case, especially if the shapes of the clusters are irregular. On the other hand, single linkage may fail if it is expected for clusters to be round and somewhat evenly spaced, as the outliers may lead to classifying them as separate clusters.

![](/assets/images/clustering/agglomerative_linkage_comparison.png){: .align-center}

From the example above we see how single linkage clustering only slightly outperformed ward in case of irregular but more or less evenly spaced clusters. However it fully failed in case of evenly spaced round clusters due to the presence of an outlier.