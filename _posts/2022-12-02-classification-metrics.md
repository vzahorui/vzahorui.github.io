---
layout: single
title: "Classification metrics"
category: "Classification"
tags: accuracy recall precision ROC AUC confusion-matrix true-positive false-positive false-negative true-negative
date: 2022-12-03
---

In this article we shall review the most commonly used metrics which describe how good the predictions in the classification machine learning problems are made. Although the most obvious metric which comes to mind is the share of the correctly classified observations among all (the accuracy), it may still be irrelevant in many cases, and we will see why.

## Confusion matrix

An important consideration when choosing the metrics for classification is how the error impacts the end user. For example, not being able to detect fraudulent transactions is a serious problem for a bank, while it may be acceptable to a certain extent to wrongly identify a regular operation as fraudulent. On the other hand, for a news recommender it would be more preferable to miss a few interesting articles instead of throwing tons of irrelevant content.

Let's take a look at the confusion matrix - a special contingency table which shows the actual and the predicted distributions among classes:

|True Positive (TP)|False Positive (FP)|
|:---:|:---:|
|**False Negative (FN)**|**True Negative (TN)**|

With respect to a certain class, true positive - is the area which corresponds to the number of correctly identified observations as belonging to that class (the correctly identified fraudulent transactions). False positive corresponds to the mislabeled observation which were identified as belonging to that specific class but in fact weren't (the transactions marked as fraud but which in fact were normal).

Similarly, true negative with respect to a certain class is when the observation does not belong to this class, and the model does not mark it as such as well. False negatives happen when the model fails to detect that an observation belongs to a certain class (not able to identify fraudulent transactions and see them as normal).

As with the example about the fraudulent transactions, the high accuracy is achieved by simply "predicting" all of the transactions being non-fraudulent (because the share of the actual fraud operations is presumably low). In practice this will lead to dire consequences though, so other metrics like precision and recall should be used instead.

Recall measures the share of the correctly identified observations among all which were supposed to be identified.

$$\text{Recall} = \frac{TP}{TP+FN}$$

And the precision measures the share of the positive identifications which was correct indeed.

$$\text{Precision} = \frac{TP}{TP+FP}$$

## Multiple models metrics
