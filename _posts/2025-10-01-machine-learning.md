---
layout: single
title: "Machine Learning"
category: "Machine Learning"
tags: statistics clustering regression classification dimensionality-reduction natural-language-processing computer-vision CV NLP
date: 2025-10-01
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

Machine Learning (ML) is the field of study dedicated to building algorithms that allow computers to learn patterns from data without being explicitly programmed. Instead of writing rigid rules, we feed the machine data and let it develop its own logic to make predictions or decisions.

ML serves as the foundation for modern artificial intelligence, powering everything from search engine recommendations and facial recognition to autonomous vehicles.

## Machine Learning vs Statistics

While both machine learning and [statistics]({{ site.baseurl }}{% link _posts/2025-08-18-probability-statistics.md %}) use data to draw conclusions, they often prioritize different goals and methodologies. They are highly complementary disciplines, but their core intentions differ:

| |Statistics|Machine Learning|
|:---:|:---:|:---:|
|**Goal**|Inference and Explanation| Prediction and Automation |
|**Key Question**|How do the variables relate? Why did this happen?| What will happen? |
|**Focus**|Understanding the relationship between variables (e.g., "Does variable _X_ cause variable _Y_?").| Maximizing predictive accuracy (e.g., "Can we predict _Y_ given _X_?"). |
|**Model Philosophy**|Model-Driven: Assumes a specific, pre-defined model (e.g., linear relationship, normal error distribution) of the underlying data-generating process. The goal is to prove/disprove that model.| Data-Driven/Algorithmic: The goal is to find a function $f(X)≈Y$ that is as accurate as possible. Less concern for the true underlying process or model assumptions. |
|**Methods**|Hypothesis testing, confidence intervals, model validation via assumptions (e.g., normality, linearity).| Cross-validation, algorithm performance metrics (e.g., precision, recall), scalability. |

ML is heavily based on statistical theory but focuses on engineering the best predictive performance possible.

## Core Learning Paradigms

All machine learning algorithms fall into one of three main categories based on the nature of the data they are trained on.

### Supervised Learning

In supervised learning, the model learns from data that is already labeled. This means the data includes the correct "answers" or target outputs. The model's task is to map inputs to these known outputs.

* Classification: Predicting a discrete label or category (e.g., "Is this email spam or not spam?").
* Regression: Predicting a continuous numerical value (e.g., predicting house prices, temperatures, or stock values).

### Unsupervised Learning

In unsupervised learning, the model works with data that is unlabeled—it has no predefined answers. The goal is for the algorithm to discover inherent structures, patterns, or groupings within the data on its own.

* [Clustering]({{ site.baseurl }}{% link _posts/2021-01-03-clustering-overview.md %}): Grouping similar data points together (e.g., market segmentation based on customer behavior).
* Dimensionality Reduction: Reducing the number of features while retaining most of the important information (e.g., [Principal Component Analysis]({{ site.baseurl }}{% link _posts/2019-11-03-singular-value-decomposition.md %})).

### Reinforcement Learning (RL)

Reinforcement learning involves an agent that learns to make decisions by interacting with an environment. The agent receives rewards for desirable actions and penalties for undesirable ones. The goal is to learn a policy that maximizes the cumulative reward over time.

** Use Cases**: Training robots, optimizing resource allocation in server farms, and developing game-playing AI.

## Specialized Realms of Machine Learning

Many modern ML applications focus on specialized domains that use deep learning techniques to handle complex data structures like images and text.

### Natural Language Processing (NLP)

NLP is the field dedicated to teaching computers to understand, interpret, and generate human language. It typically involves supervised learning for tasks like classification or deep learning for more complex generative tasks.

**Applications**: Sentiment analysis, machine translation, chatbots, and text summarization.

### Computer Vision (CV)

Computer Vision aims to enable machines to "see" and interpret visual data (images and video). Modern CV relies heavily on Deep Learning, particularly Convolutional Neural Networks (CNNs).

**Applications**: Object detection (identifying cars and pedestrians in autonomous driving), facial recognition, and medical image analysis.