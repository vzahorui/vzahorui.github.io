---
layout: single
title: "Probability & Statistics"
category: "Probability & Statistics"
tags: distribution
date: 2025-08-18
---

While often taught together, probability and statistics approach problems from opposite directions, focusing on the relationship between parameters (the true, unknown characteristics of a population) and data (the observed information).

## Probability: Modeling the Data from Known Parameters

Probability is a branch of mathematics that uses a deductive approach. It assumes we know the true parameters of a population or process and, based on these parameters, it provides a model for how the data should behave.

Think of it this way: a fair coin's parameter is that the probability of landing on heads is exactly 0.5. Probability uses this known parameter to predict the behavior of the data—for example, modeling the likelihood of getting 5 heads in a row. It moves from the parameters to the data.

## Statistics: Inferring Parameters from Observed Data

Statistics uses an inductive approach. It starts with a sample of observed data and uses it to make inferences or draw conclusions about the true, unknown parameters of the entire population or process.

For example, imagine you are given a coin and told to determine if it's fair. You flip the coin 100 times and observe 90 heads. Statistics would use this specific sample of data to infer that the true parameter (the probability of heads) is likely not 0.5. It moves from the data to the parameters.

## The Inference-and-Prediction Cycle

In the real world, probability and statistics form a continuous cycle. We first use statistics to analyze a sample of data, inferring the underlying parameters that govern a process or population. Once we've established these parameters, we can then use probability to model the system and make predictions about future events.

## Practical Application

### Hypothesis Testing

[Hypothesis testing]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}) is a fundamental statistical method that demonstrates this relationship. It uses a sample of data to make an informed decision about the parameters of a population. Then, given these parameters one can model various scenarios and make a conclusion on whether there is a difference between two groups (or the same group before and after some treatment). 

### Risk Assessment and Management

Insurance companies use statistical data on past events (like accidents, illnesses, or natural disasters) to infer the probability of future occurrences. Based on these inferred probabilities, they calculate premiums and determine payout structures to ensure profitability while covering potential claims.

In finance, analysts use statistical models to understand market volatility and infer the probability of stock price movements or investment losses. This helps investors make informed decisions about diversifying portfolios and managing risk.

### Predictive Modeling and Forecasting

Meteorologists use statistical analysis of vast amounts of historical weather data to identify patterns and infer parameters for atmospheric models. Then, they use probability to express the likelihood of future weather events, like "an 80% chance of rain."

In business, companies use statistical techniques to analyze past sales data and infer parameters for consumer behavior. These inferred parameters are then used in probabilistic models to forecast future sales, manage inventory, and optimize staffing schedules.

### Quality Control and Monitoring

Statistical Process Control (SPC) uses statistical methods to monitor and control a process to ensure it operates within desired parameters. By analyzing samples of output, statisticians can infer if the process is "in control" or if there's a deviation that needs addressing, reducing defects and waste.

### Artificial Intelligence and Machine Learning

Many machine learning models, such as [Logistic Regression ]({{ site.baseurl }}{% link _posts/2022-09-25-logistic-regresion.md %}) or Naive Bayes, are inherently probabilistic, using inferred parameters to classify data or make predictions.

Statistical learning methods are used to train algorithms, infer patterns from large datasets, and optimize model performance.

## Building Blocks in Practice

When we model probability distributions from data, these three concepts work together:

1. The Law of Large Numbers gives the confidence that as we collect more data, our sample statistics (like the sample mean) are becoming more reliable estimates of the true population parameters.

2. We model the data by fitting a [probability distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}) (e.g., a normal, binomial, or Poisson distribution depending on the nature of the data) to your observed sample.

3. The [Central Limit Theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}) then allows us to use the properties of this distribution to make formal statistical inferences, such as building confidence intervals or conducting hypothesis tests, about the true population parameters.

4. If prior knowledge on the given process exists then it can be used to further augment the statistics via [Bayesian Inference]({{ site.baseurl }}{% link _posts/2022-07-15-bayesian-inference.md %}). Unlike traditional frequentist methods that only use the data at hand, Bayesian statistics starts with a prior distribution representing your initial belief about a parameter. As you collect data, it uses Bayes' theorem to update this belief, resulting in a posterior distribution that reflects the combined evidence of your prior knowledge and the new data. This is particularly useful for making inferences when data is scarce or when you want to explicitly incorporate information from previous studies or expert opinions to get a more robust and nuanced conclusion.