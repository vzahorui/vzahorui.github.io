---
layout: single
title: "Main Probability Concepts"
category: "Probability & Statistics"
tags: statistics 
date: 2025-09-01
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

## Introduction

Probability theory provides the mathematical framework for quantifying this uncertainty. It is the study of random phenomena and provides a foundation for [statistical inference]({{ site.baseurl }}{% link _posts/2025-09-01-statistical-inference.md %}), allowing us to draw logical conclusions and make informed decisions in the face of incomplete information. At its core, probability assigns a numerical value, between 0 and 1, to the chance of a specific event occurring.

## Fundamental Concepts

**Experiment**: A procedure that can be repeated and has a well-defined set of possible outcomes. For example, rolling a single six-sided die.

**Outcome**: A single result of a random experiment. For example, rolling a '3'.

**Sample Space ($S$)**: The set of all possible outcomes of an experiment. For a six-sided die, the sample space is $S=\{1,2,3,4,5,6\}$.

**Event**: A subset of the sample space. It is a specific outcome or a group of outcomes. For example, the event of rolling an even number is $E=\{2,4,6\}$. The probability of an event A is denoted as $P(A)$.

## The Rules of Probability

**Addition Rule**: Used to find the probability of one event OR another event occurring. For two events, $A$ and $B$, the probability of their union is given by:

$$P(A\cup B)=P(A)+P(B)−P(A \cap B)$$

If events $A$ and $B$ are mutually exclusive (they cannot happen at the same time, e.g., flipping a heads and a tails on a single toss), the rule simplifies to:

$$P(A\cup B)=P(A)+P(B)$$

**Multiplication Rule**: Used to find the probability of one event AND another event occurring. For two events, $A$ and $B$, the probability of their intersection is:

$$P(A\cap B)=P(A) \times P(B∣A)$$

If events $A$ and $B$ are independent (the occurrence of one does not affect the other), the rule simplifies to:

$$P(A\cap B)=P(A) \times P(B)$$

**Conditional Probability**: The probability of an event $A$ occurring given that another event $B$ has already occurred. This is written as $P(A∣B)$ and is read as "the probability of A given B." It is calculated as:

$$P(A∣B)=\frac{P(A\cap B)}{P(B)}​$$

## The Law of Large Numbers

A core concept in probability is the Law of Large Numbers. It states that as the number of trials of an experiment increases, the average of the outcomes will get closer and closer to the expected value or theoretical probability. For example, while a coin might land on heads or tails in an unpredictable sequence, the proportion of heads will approach 0.5 as the number of flips becomes very large.