---
layout: single
title: "Generalized Linear Models"
category: "Regression"
tags: statistics linear-regression GLM OLS probability-density-function probability-mass-function normal-distribution maximum-likelihood-estimation MLE iteratively-reweighted-least-squares IRLS generalized-estimating-equations GEE information-matrix standard-error sandwitch-estimator Fisher-information
date: 2025-10-13
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

Generalized Linear Models (GLMs) provide a powerful and flexible framework for modeling a response variable ($Y$) that is non-normally distributed or related to the predictors ($X$) in a nonlinear way. GLMs generalize [Ordinary Least Squares]({{ site.baseurl }}{% link _posts/2019-10-25-linear-regression.md %}) (OLS) regression by allowing for response variables that have error distribution models other than a [normal distribution]({{ site.baseurl }}{% link _posts/2025-08-23-normal-distribution.md %}).

## Components of GLM

A GLM consists of three key components:

1. Random Component: The [probability distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}) of the response variable, $Y$, must belong to the Exponential Family of Distributions.

2. Systematic Component (Linear Predictor): A linear combination of the predictor variables, $\eta=x^T \beta$.

3. Link Function: A function, $g(⋅)$, that connects the expected value of the response, $\mu=E[Y]$, to the linear predictor: $g(\mu)=\eta$.

## The Exponential Family of Distributions

### The Foundation

The Random Component of a GLM relies entirely on the Exponential Family of Distributions. This is a class of probability distributions (including Normal, Poisson, Binomial, Gamma, etc.) whose density/mass function can be written in the standardized, canonical form:

$$ f(y; \theta, \phi) = \exp \left(\frac{y \theta - b(\theta)}{a(\phi)} + c(y, \phi) \right)$$

where

* $\theta$ is known as canonical parameter, which links to the mean $\mu$.
* $b(\theta)$ is a cumulant function which ensures the distribution integrates to 1.
* $a(\phi)$ is a dispersion parameter function which is often proportional to variance.
* $c(y, \phi)$ is a normalization term.

### The Utility of the Exponential Family

The canonical form is essential because it yields a simplified and unified set of mathematical properties for all distributions in the family, which are crucial for model fitting:

#### Mean-Variance Relationship

The mean ($\mu$) and the variance ($V$) of the distribution are directly defined by the cumulant function $b(\theta)$ and the dispersion parameter $\phi$:

* Mean: $\mu=E[Y]=b'(\theta)$
* Variance: $Var[Y]=b''(\theta) \cdot a(\phi)$

The ability to express the mean and variance as simple derivatives of the function b(θ) is one of the most elegant mathematical properties of the Exponential Family. This is derived directly from these requirements:
* The probability density/mass function must integrate or sum to one ($\int f(y;\theta,\phi)dy=1$ or $\sum f(y;\theta,\phi)=1$). 
* The mean of a variable $Y$ is $\int y f(y;\theta,\phi)dy$.
* The variance is expressed via the mean like $E[Y^2]−(E[Y])^2$.

#### Canonical Link Function

This is the most powerful feature. The canonical link function $g_{\text{canonical}}​(\mu)$ is simply the function that maps the mean to the canonical parameter:

$$g_{\text{canonical}}​(\mu)=\theta$$

When the canonical link is used, the model is simplified to $\theta=x^{T} \beta$. Since $\mu = b'(\theta)$, the canonical link function $g_{\text{canonical}}​(\mu)$ is the inverse function of the mean structure $b'(\theta)$.

Here is an overview of the common canonical link functions:

|Distribution | Type of Data | $Var(Y)$ | Canonical link $g_c(\mu) = \theta$ |Application |
|:---:|:---:|:---:|:---:|:---:|
|Normal|Continuous, Unbounded|$\phi$ (constant variance)| Identity: $\mu$|Classic Linear Regression (OLS)|
|[Poisson]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#poisson_distribution)|Count data|$\mu$ (variance equals mean)|$\log(\mu)$|Modeling counts of events: website clicks, call center arrivals, number of accidents, disease incidence rates.|
|[Binomial]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#binomial_distribution)|Binary/Proportion Data (Out of $N$ Trials)|$\frac{\mu(1-\mu)}{N}$|Logit: $\log(\frac{\mu}{1-\mu})$|Modeling probabilities/proportions: survival rate, proportion of successes, customer churn probability, Yes/No responses (Logistic Regression).|
|Gamma|Continuous, Positive, Right-Skewed |$\mu^2 \phi$|$\frac{1}{\mu}$|Modeling non-negative, non-count data: insurance claim amounts, rainfall totals, income (when modeling the mean).|
|Inverse Gaussian|Continuous, Positive, Highly Skewed |$\mu^3 \phi$|$\frac{1}{\mu^2}$|Modeling first passage times in stochastic processes: time to failure/default, survival analysis, financial duration modeling, highly skewed physical data.|

##### Other Important (Non-Canonical) Models

Sometimes, the distribution's theoretical variance structure is deemed inappropriate for the data, but the mean structure is fine. This leads to commonly used extensions:

|Distribution | Canonical Link Function | $Var(Y)$ | Why Use It?|
|:---:|:---:|:---:|:---:|
|[Negative Binomial]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#negative_binomial_distribution)|Log|$\mu + \alpha \mu^2$ ($\alpha > 0$)|Used for Overdispersed Count Data where the variance is significantly greater than the mean.|
|Quasi-Binomial|Logit|$\phi \frac{\mu (1-\mu)}{N}$|Used for Over/Underdispersed Proportion Data (e.g., in ecological or developmental studies where variance is too high or too low).|

#### Maximum Likelihood Estimation (MLE) Simplification

Using the canonical form results in a concave log-likelihood function, which guarantees a unique global maximum. This makes the MLE process simpler and more robust.

## Maximul Likelihood Estimation

In GLMs, the model parameters $\beta$ (the coefficients) are almost always estimated using [Maximum Likelihood Estimation]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}) (MLE). The goal of MLE is to find the values of $\beta$ that make the observed data most probable.

### The Likelihood and Log-Likelihood Functions

For a set of $n$ independent observations $Y=(y_1​,y_2​,…,y_n​)$, the Likelihood Function, $\mathcal{L}(\beta∣Y)$, is the product of the individual density/mass functions at each observation, $f(y_i​)$, where each $f(y_i​)$ is parameterized by a unique $\theta_i$​ that depends on $\beta$ via the link function:

$$\mathcal{L}(\beta∣Y)=\prod_{i=1}^n ​f(y_i​;\theta_i​)$$

For computational simplicity (turning a product into a sum) and numerical stability, we maximize the Log-Likelihood Function:

$$l(\beta∣Y)= \sum_{i=1}^n \log (​f(y_i​;\theta_i​))$$

Substituting the density function with the canonical form:

$$l(\beta∣Y)= \sum_{i=1}^n \left(\frac{y_i \theta_i - b(\theta_i)}{a(\phi_i)} + c(y_i, \phi_i) \right)$$

* The first term, $\sum_{i=1}^n \frac{y_i \theta_i - b(\theta_i)}{a(\phi_i)}$​, is the kernel of the log-likelihood and contains all the terms dependent on the parameters $\beta$ (since $\theta$​ is a function of $\beta$).
* The second term, $\sum_{i=1}^n c(y_, \phi_i)$, does not depend on the regression coefficients $\beta$, so it can be ignored when solving for the MLEs.

Therefore, the likelihood is proportionate to this construct: 

$$l(β) \propto \sum_{i=1}^n ​(y_i \theta_i - b(\theta_i))$$

### The Maximization Process (Finding the Score)

To find the values of $β$ that maximize the log-likelihood, we take the partial [derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) of $l(\beta)$ with respect to each $\beta_j$​ and set the resulting expression (the Score Function) equal to zero:

$$\frac{\partial l}{\partial \beta_j} = 0$$

Using the chain rule, the score equation becomes:

$$\sum_{i=1}^n \left[\frac{y_i - \mu_i}{Var(Y_i)} \cdot \frac{\partial \mu_i}{\partial \eta_i} \cdot x_{ij} \right]$$

This equation has no closed-form solution (except for a few special cases like [OLS]({{ site.baseurl }}{% link _posts/2019-10-27-linear-least-squares.md %}) and Poisson regression with a canonical link).

Because the score equation is nonlinear, the solution β^​ is found numerically using an iterative algorithm, most commonly Iteratively Reweighted Least Squares (IRLS).

The IRLS algorithm works by iteratively updating the estimate β(t) using a weighted least squares solution until the estimates converge:

$$\beta^{(t+1)} = \beta^{(t)} + (X^{T} W^{(t)} X)^{-1} X^{T} W^{(t)} z^{(t)}$$

* $X$ is the design matrix of predictors.
* $z^{(t)}$ is the working dependent variable, a linear approximation of the model at the current estimate.
* $W^{(t)}$ is a diagonal matrix of weights (the inverse of the expected variance of the working dependent variable).

The ability of a single algorithm (IRLS) to fit a wide range of distributions (Poisson, Binomial, Normal, etc.) is one of the most elegant and powerful aspects of the Generalized Linear Model framework.

When you use the Canonical Link ($g_c​(\mu)=\theta$), the chain rule described above simplifies:

$$\frac{\partial \mu_i}{\partial \eta_i} = \frac{\partial \mu_i}{\partial \theta_i} \cdot \frac{\partial \theta_i}{\partial \eta_i}$$

Since $\mu=b'(\theta)$, and the canonical link means $\theta=\eta$, we have:

$$\frac{\partial \mu_i}{\partial \eta_i} = b''(\theta) \cdot 1 = Var(Y)/a(\phi)$$

So it can be seen that the term $\frac{\partial \mu_i}{\partial \eta_i}$ in the score equation is directly related to the variance. This means the weight matrix $W$ used in the IRLS algorithm is implicitly defined by $b′′(\theta)$ which simplifies the solving.

## Standard Error of Coefficients

In [statistics]({{ site.baseurl }}{% link _posts/2025-08-18-probability-statistics.md %}) , the variance of an estimator (like a regression coefficient) is inversely related to the amount of information the data contains about that parameter. So it is related to the likelihood function is this way: the more sharply peaked the likelihood function is at the estimated maximum, the more "certain" we are of the estimate, and the smaller the variance (and thus the smaller the standard error).

The matrix that mathematically quantifies this information and curvature is called the [Fisher Information Matrix]({{ site.baseurl }}{% link _posts/2025-10-13-fisher-information.md %}), $I(\beta)$. The final estimated variance-covariance matrix for the coefficients, $V(\hat \beta​)$, is determined by the inverse of the Information Matrix, evaluated at the final coefficient estimates $\hat \beta$​:

$$V(\beta) = I(\hat \beta)^{-1}$$

The $I(\beta)$ matrix has the general form:

$$I(\beta) = \sum_{i=1}^N D_i^T W_i D_i$$

where 

* $N$ is the total number of observations.
* $D_i$ is the Derivative Matrix $\frac{\partial \mu_i}{\partial \beta}$ which incorporates the link function. For a linear model, $D_i​=x_i^T$​.
* $W_i$ is the Weight Matrix (Inverse Variance) $\frac{1}{Var(Y_i)} (\frac{\partial \mu_i}{\partial \eta_i})^2$. This is a single number for each observation that acts as a weight, accounting for the mean-variance relationship of the model's chosen distribution. It weights the data points based on their variance and the curvature of the link function. Observations with higher variance are down-weighted.

## Generalized Estimating Equations (GEE)

Standard Generalized Linear Models (GLMs) have a crucial assumption:

* Independence: All observations ($Y_i$​) are independent of each other, conditional on the covariates.

This assumption is violated when data is [clustered]({{ site.baseurl }}{% link _posts/2021-01-03-clustering-overview.md %}) (grouped) or longitudinal (repeated measures over time on the same subject). An example of clustered data is student test scores clustered within a classroom. Students in the same classroom are likely more similar due to the same teacher, curriculum, and environment.

In these cases, fitting a standard GLM (like logistic or Poisson regression) is problematic because the     standard errors of coefficients (and thus p-values and [confidence intervals]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#confidence_interval)) will be incorrectly small, leading to an inflated sense of precision and potentially false conclusions of statistical significance.

Generalized Estimating Equations (GEE) provide a robust, non-likelihood-based approach to analyzing clustered or longitudinal data where observations within groups are correlated. It is an extension of the GLM framework, but with a critical focus on getting the standard errors correct.

### How GEE works

Suppose you have 10 different classrooms, and in each classroom, you have 30 students, and you are trying to figure out if spending more time on homework (your covariate) actually leads to better test scores. 

1. GEE starts exactly like a standard GLM: it calculates the coefficients $\beta$. For every extra hour of homework, scores go up by 5 points, for example. This estimate is usually correct (unbiased) even if the correlation is ignored.

2. Then you have to define your "best guess" about how students in the same classroom are related. This is the Working Correlation Structure ($R$). For example you could guess that student A's score is equally correlated with student B's as it is with student C's score, because they share the same classroom.

The following steps are performed until convergence is reached: 

3. Using the current coefficient estimate, $\beta^{(t−1)}$, cluster mean vector and residual vectors are found.

$$\mu_i^{(t-1)} = g^{-1}(X_i \beta^{(t−1)})$$

$$S_i^{(t-1)}= Y_i - \mu_i^{(t-1)}$$

4. The Working Correlation Parameter $\alpha$ is estimated. It is often the average of the pairwise standardized cross-products of the residuals.

5. The working covariance matrix for cluster $i$ is calculated using the Working Correlation ($R_i$​) and the Variance Function ($A_i$​)

$$V_i^{t} = \phi A_i^{1/2} R_i(\hat \alpha^{(t)}) A_i^{1/2}$$

* $R_i(\hat \alpha^{(t)})$ is an working correlation matrix.
* $A_i^{1/2}$ is diagonal matrix where the j-th diagonal entry is the square root of the GLM variance function, $\sqrt{v(\mu_{ij}​)}$​.
* $\phi$ is an over-dispersion parameter, often estimated from the Pearson residuals squared.

$V_i^{t}$ is now the estimated variance of the response vector $Y_i$​, including both the correlation and the theoretical variance of the outcome.

6. Solve the Generalized Estimating Equation. 

Use the current $V_i^{t}$​ to update the coefficient vector. The equation for the new estimate $\beta^{(t)}$ is:

$$U(\beta^{(t)})=  \sum_{i=1}^K ​D_i^T​ (V_i^{t}​)^{−1} (Y_i​−\mu_i^{(t)}​)=0$$

This non-linear equation is solved using an iterative method (like Newton-Raphson or Fisher Scoring), which approximates the solution as:

$$\beta^{(t)}=\beta^{(t-1)}+ \left[\sum_{i=1}^{K} ​D_i^T ​(V_i^{t}​)^{−1} D_i \right]^{-1} \sum_{i=1}^{K} ​D_i^T ​(V_i^{t}​)^{−1} S_i^{(t−1)​}$$

* $D_i$​ is the derivative matrix $\frac{\partial \mu_i}{\partial \beta}$.
* The first term in brackets is a key component, often called the "Information Matrix" or $B$ (the "Bread" of the sandwich, though in GEE it's often denoted $M$ for model).

### Robust Estimation of Parameters Covariance

Once the $\hat \beta$​ has converged, the final step is to calculate the robust standard errors, which are necessary for hypothesis testing and confidence intervals.

The Robust (Sandwich) Covariance Matrix for $\hat \beta$​ is calculated as:

$$V_{\text{robust}}(\hat \beta) = B^{-1} C B^{-1}$$

* $B$ (The Bread, or Model-Based Part): This is the term calculated from the final iteration of the fitting process. It represents the Model-Based (or Naive) covariance estimate.
* $C$ (The Meat, or Empirical Part): This matrix captures the observed variability between the clusters, making no assumptions about the internal correlation structure. It is the sum of the outer products of the weighted residuals from each cluster.

$$C = \sum_{i=1}^{K} ​D_i^T ​V_{i}​^{-1} S_i S_i^T V_i^{-1} D_i$$

The term $S_i S_i^T$ approximates the true covariance matrix for the cluster residuals.

$V_{\text{robust}}(\hat \beta)$ is the final sandwich-form matrix. The standard errors for the coefficients are the square roots of the diagonal elements of this matrix.



