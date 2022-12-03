---
layout: single
title: "Classification metrics"
category: "Classification"
tags: accuracy recall precision ROC AUC confusion-matrix
date: 2022-12-03
---

In this article we shall review the most commonly used metrics which describe how good the predictions in the classification machine learning problems are made. 

One important consideration when choosing the metrics for classification is how the error impacts the end user. Depending on the domain, false positives and false negatives might be penalized differently. For example, when detecting fraudulent operations it may be acceptable to wrongly identify a regular operation as fraudulent,  while allowing the actual fraud should be considered as a serious problem.

## Single model metrics

The most general performance metric out there is accuracy. It measures the share of the correctly classified observations among all. 

However in case of imbablanced data, where a certain class has only a small share, the accuracy becomes irrelevant. As with the example about the fradulent transactions, the high accuracy is achieved by simply "predicting" all of the transactions being non-frauadulent (because the share of the actual frad operations is presumable low). In practice this will lead to dire consequences though, so other metric like precision and recall should be used instead.

Let's take a look at the confusion matrix - a special contingency table which shows the actual and the predicted distributions among classes: 

|$x_1$|$x_2$|$x_3$|$s_1$|$s_2$|$s_3$| $Z$ |     |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  3  |  5  |  2  |  1  |  0  |  0  |  0  | 189 |
|  4  |  2  |  1  |  0  |  1  |  0  |  0  | 300 |

some text

$$
\begin{tabular}{l|l|c|c|c}
\multicolumn{2}{c}{}&\multicolumn{2}{c}{True diagnosis}&\\
\cline{3-4}
\multicolumn{2}{c|}{}&Positive&Negative&\multicolumn{1}{c}{Total}\\
\cline{2-4}
\multirow{2}{*}{Screening test}& Positive & $a$ & $b$ & $a+b$\\
\cline{2-4}
& Negative & $c$ & $d$ & $c+d$\\
\cline{2-4}
\multicolumn{1}{c}{} & \multicolumn{1}{c}{Total} & \multicolumn{1}{c}{$a+c$} & \multicolumn{    1}{c}{$b+d$} & \multicolumn{1}{c}{$N$}\\
\end{tabular}
$$

