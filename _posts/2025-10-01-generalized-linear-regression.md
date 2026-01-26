---
layout: single
title: "Generalized Linear Models"
category: "Regression"
tags: statistics linear-regression GLM OLS probability-density-function probability-mass-function normal-distribution maximum-likelihood-estimation MLE iteratively-reweighted-least-squares IRLS generalized-estimating-equations GEE information-matrix standard-error sandwitch-estimator Fisher-information
date: 2026-01-25
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

Generalized Linear Models (GLMs) provide a powerful and flexible framework for modeling a response variable ($Y$) that is non-normally distributed or related to the predictors ($X$) in a nonlinear way. GLMs generalize [Ordinary Least Squares]({{ site.baseurl }}{% link _posts/2019-10-25-linear-regression.md %}) (OLS) regression by allowing for response variables that have error distribution models other than a [normal distribution]({{ site.baseurl }}{% link _posts/2025-08-23-normal-distribution.md %}).

In standard linear regression, we assume the response variable $Y$ can range from $−\infty$ to $+\infty$. However, real-world data is often restricted, for example:

* Probabilities ([Binary]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#binomial_distribution) data) must be between 0 and 1.
* Counts ([Poisson]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#poisson_distribution) data) must be positive integers.

If we tried to predict these directly with a linear equation $X \beta$ (which is unbounded), we might predict a probability of -0.5 or a count of -10, which is physically impossible.

## Components of GLM

A GLM consists of three key components:

1. Random Component: The [probability distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}) of the response variable, $Y$, must belong to the Exponential Family of Distributions.

2. Systematic Component (Linear Predictor): A linear combination of the predictor variables, $\eta=x^T \beta$.

3. Link Function: A function, $g(⋅)$, that maps the bounded expected value of the response, $\mu=E[Y]$, to the linear predictor: $g(\mu)=\eta$.

It is important to realize that each observation is drawn from a separate distribution which is determined by the predictor variables $X$. Even though the aim of the regression is to estimate the common parameters $\beta$, each observation has its individual $X$ variables which in turn define a separate distribution (sharing the same family, but with unique mean and variance parameters).

During model fitting, we view the observed data $Y$ as a random realization drawn from these distributions, while the model attempts to estimate the underlying vector of means $\mu$ that generated them.

## The Exponential Family of Distributions

### The Foundation

The Random Component of a GLM relies entirely on the Exponential Family of Distributions. This is a class of probability distributions (including Normal, Poisson, Binomial, Gamma, etc.) whose density/mass function can be written in the standardized, canonical form:

$$ f(y; \theta, \phi) = \exp \left(\frac{y \theta - b(\theta)}{a(\phi)} + c(y, \phi) \right)$$

* $\theta$ (Canonical Parameter) relates to the mean $\mu$ of the distribution and represents the "location" of the distribution.
* $y \theta$ (Interaction) "rewards" the likelihood function. If both the observation $y$ and the parameter $\theta$ are large and positive, the exponent increases, maximizing the probability.
* $b(\theta)$ (Cumulant) is a convex function which balances $y \theta$ by not letting it increase to infinity during the optimization $\theta$.
* $a(\phi)$ (Dispersion) is a function of a dispersion parameter $\phi$ (often the variance, $\sigma^2$). It scales the distribution.
* $c(y, \phi)$ is a normalization term for the data structure itself (e.g., factorials or constants). It encodes properties which do not depend on $\theta$, and thus on the mean.

### The Utility of the Exponential Family

The canonical form of Exponential Family yields a unified set of mathematical properties essential for efficient model fitting.

#### Mean-Variance Relationship

The mean ($\mu$) and the variance ($V$) of the distribution are directly defined by the cumulant function $b(\theta)$ and the dispersion parameter $\phi$.

* Mean: $E[Y]=b'(\theta)$
* Variance: $Var(Y)=b''(\theta) \cdot a(\phi)$

##### Deriving the Mean

If $f(y; \theta)$ is a probability density, its [integral]({{ site.baseurl }}{% link _posts/2019-09-24-integrals.md %}) over all possible values of $y$ is 1.

$$\int \exp \left(\frac{y \theta - b(\theta)}{a(\phi)} + c(y, \phi) \right) dy = 1$$

We can put both sides under the [derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) with respect to $\theta$ and land with this equation:

$$\frac{d}{d\theta} \int \exp \left(\frac{y \theta - b(\theta)}{a(\phi)} + c(y, \phi) \right) dy = 0$$

By putting the derivative under the integral and by applying the chain rule we get this:

$$\int f(y; \theta) \cdot \left(\frac{y}{a(\phi)} - \frac{'b(\theta)}{a(\phi)}\right) dy = 0$$

And then by distributing and rearranging:

$$\int \frac{y}{a(\phi)} \cdot f(y; \theta) dy = \int \frac{'b(\theta)}{a(\phi)} \cdot f(y; \theta) dy$$

$$\int y \cdot f(y; \theta) dy = \int b'(\theta) \cdot f(y; \theta) dy$$

The expression on the left is the expected value of $Y$. In the second term, $b'(\theta)$ is a constant (it doesn't depend on $y$), so it pulls out. What's left is simply the integral over the density function which equals 1.

And therefore,

$$E[Y]=b'(\theta)$$

##### Deriving the Variance

We start from our previous result: $\int f(y; \theta) \cdot \left(\frac{y}{a(\phi)} - \frac{'b(\theta)}{a(\phi)}\right) dy = 0$. This expression is differentiated from both sides with respect to $\theta$ using the product rule ($uv' + u'v$).

$$\int -\frac{b''(\theta)}{a(\phi)} f(y; \theta) dy + \int \left(\frac{y}{a(\phi)} - \frac{'b(\theta)}{a(\phi)}\right)^2 f(y; \theta) dy = 0$$

Then again, considering that the integral over the density function which equals 1 and by rearranging we get this:

$$\frac{1}{a(\phi)^2} \int \left(y - 'b(\theta)\right)^2 f(y; \theta) dy = \frac{b''(\theta)}{a(\phi)}$$

$$\int \left(y - \mu \right)^2 f(y; \theta) dy = b''(\theta) \cdot a(\phi)$$

The expression on the left is the variance of $Y$. Therefore, 

$$Var[Y]=b''(\theta) \cdot a(\phi)$$

#### Sufficient Statistics (Data Compression)

This is a critical property for Big Data. Because the data $y$ enters the probability formula only through the linear product $y \theta$, the likelihood can be factored.

Below you can find details on the maximum likelihood estimation but here it suffices to say that if the Canonical Link is used (where $\theta=X\beta$), the term becomes $y(X\beta)$. This means the sum $\sum y_{i} ​x_{ij}$​ is a sufficient statistic for $\beta$. 

This means that the algorithm does not need to store millions of raw rows in memory; it can compress the entire dataset into a simple vector of sums to perform the optimization.

#### Canonical Link Function

The canonical link function $g_{\text{canonical}}​(\mu)$ is the specific link that maps the mean directly to the canonical parameter:

$$g_{\text{canonical}}​(\mu)=\theta$$

In this case $\theta$ is linearly modeled as $x^{T} \beta$. So essentially $\theta = \eta$.

Since $\mu = b'(\theta)$, the canonical link function $g_{\text{canonical}}​(\mu)$ is the inverse function of  $b'(\theta)$.

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

Using the canonical form results in a concave log-likelihood function, which guarantees a unique global maximum. This makes the MLE process simpler and more robust. More to it the section below.

## Maximul Likelihood Estimation

In GLMs, the model parameters $\beta$ (the coefficients) are estimated using [Maximum Likelihood Estimation]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}) (MLE). The goal of MLE is to find the values of $\beta$ that make the observed data most probable.

### The Likelihood and Log-Likelihood Functions

For a set of $n$ independent observations $Y=(y_1​,y_2​,…,y_n​)$, the Likelihood Function, $\mathcal{L}(\beta∣Y)$, is the product of the individual density/mass functions at each observation, $f(y_i​)$, where each $f(y_i​)$ is parameterized by a unique $\theta_i$​ that depends on $\beta$ via the link function:

$$\mathcal{L}(\beta∣Y)=\prod_{i=1}^n ​f(y_i​;\theta_i​)$$

For computational simplicity (turning a product into a sum) and numerical stability, we maximize the Log-Likelihood Function:

$$l(\beta∣Y)= \sum_{i=1}^n \log (​f(y_i​;\theta_i​))$$

Expanding the density function with the canonical form of Exponential Family:

$$l(\beta∣Y)= \sum_{i=1}^n \left(\frac{y_i \theta_i - b(\theta_i)}{a(\phi_i)} + c(y_i, \phi_i) \right)$$

* The first term, $\sum_{i=1}^n \frac{y_i \theta_i - b(\theta_i)}{a(\phi_i)}$​, is the kernel of the log-likelihood and contains all the terms dependent on the parameters $\beta$ (since $\theta$​ is a function of $\beta$).
* The second term, $\sum_{i=1}^n c(y_, \phi_i)$, does not depend on the regression coefficients $\beta$, so it can be ignored when solving for the MLEs.

Therefore, the likelihood is proportionate to this construct: 

$$l(β) \propto \sum_{i=1}^n ​(y_i \theta_i - b(\theta_i))$$

### The Maximization Process (Finding the Score)

To find the values of $\beta$ that maximize the log-likelihood, we take the partial [derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) of $l(\beta)$ with respect to each $\beta_j$​ and set the resulting expression (the Score Function) equal to zero:

$$U(\beta_j) = \frac{\partial l}{\partial \beta_j} = 0$$

Using the chain rule, the score equation becomes:

$$\frac{\partial l}{\partial \beta_j} = \frac{\partial l}{\partial \theta} \cdot \frac{\partial \theta}{\partial \mu} \cdot \frac{\partial \mu}{\partial \eta} \cdot \frac{\partial \eta}{\partial \beta_j}$$

From deriving the mean and the variance of $Y$ in the section above we know that $\mu = b'(\theta)$, therefore $\frac{\partial \mu}{\partial \theta} = b''(\theta)$. We also know that $Var(Y) = b''(\theta) \cdot a(\phi)$, thus $\frac{\partial \mu}{\partial \theta} = \frac{Var(Y)}{a(\phi)}$. Inverting this gives us the term we need:
$\frac{\partial \theta}{\partial \mu} = \frac{a(\phi)}{Var(Y)}$.

By applying it to the equation above we arrive at the general score equation:

$$\sum_{i=1}^n \left[\frac{y_i - \mu_i}{Var(Y_i)} \cdot \frac{\partial \mu_i}{\partial \eta_i} \cdot x_{ij} \right] = 0$$

Intuitively, the variance appearing in the denominator acts as a weighting mechanism. The term $(y−\mu)$ is the error (residual), while the term $1/Var(Y)$ down-weights observations that are naturally noisy. In this way the model "tries harder" to fit observations with low variance and "forgets" about observations with high variance.

#### Simplification with the Canonical Link

We can expand a part of the chain rule described above as this:

$$\frac{\partial \mu_i}{\partial \eta_i} = \frac{\partial \mu_i}{\partial \theta_i} \cdot \frac{\partial \theta_i}{\partial \eta_i}$$

Then if we use the Canonical Link ($g_c​(\mu)=\theta$), we have $\mu=b'(\theta)$ and $\theta=\eta$. Therefore the expression above simplifies as follows:

$$\frac{\partial \mu_i}{\partial \eta_i} = b''(\theta) \cdot 1 = \frac{Var(Y)}{a(\phi)}$$

When putting this into the original score equation the terms $Var(Y)$ cancels out. Considering that $a(\phi)$ is constant we have this simpliefied form:

$$\sum_{i=1}^n (y_i - \mu_i) x_{ij} = 0$$

This removal of the complex non-linear variance term from the denominator is why canonical link models are so computationally robust and guaranteed to converge, and why we can utilize the sufficient statistic by aggregating the data.

### Solving the Equation

The score equation has no closed-form solution (except for a few special cases like [OLS]({{ site.baseurl }}{% link _posts/2019-10-27-linear-least-squares.md %}) and Poisson regression with a canonical link). Since the Score Equation is non-linear, we use an iterative algorithm called Fisher Scoring (or Newton-Raphson), which can be expressed as Iteratively Reweighted Least Squares (IRLS).

Recall the multivariate [Newton's update rule]({{ site.baseurl }}{% link _posts/2020-07-05-newton-method.md %}) for a parameter vector $\beta$:

$$\beta_t = \beta_{t-1} - \left[Hf(\beta_{t-1}) \right]^{-1} \Delta f(\beta_{t-1})$$

In the context of GLMs, we are maximizing the [log-likelihood]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}) $l(\beta)$. Therefore the [gradient]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) $\Delta f$ is the Score Function $U(\beta)$, and the the hessian $Hf$ is the matrix of second derivatives. In practice, we often use the Expected Hessian (the negative [Fisher Information Matrix]({{ site.baseurl }}{% link _posts/2025-10-13-fisher-information.md %})), a variation known as Fisher Scoring.

Substituting these into the Newton formula, the update becomes:

$$\beta_t = \beta_{t-1} + \left[I(\beta_{t-1}) \right]^{-1} U(\beta_{t-1})$$

#### Elaboration on Fisher Information

For a GLM, the Information Matrix is derived as the variance of the Score Function (the gradient of the log-likelihood). It takes the form of a "weighted sandwich" of your data:

$$I(\beta) = X^T WX =\sum_{i=1}^N x_i W_i x_{i}^{T}$$

where 

* $N$ is the total number of observations.
* $x_i$ is the vector of predictors for observation $i$ (the $i$-th row of the design matrix $X$).
* $W_i$ is the Working Weight for observation i, defined as:

$$W_i = \frac{1}{Var(Y_i)} \left(\frac{\partial \mu_i}{\partial \eta_i}\right)^2$$

The weight $W_i$ is the mathematical result of the Fisher Information of a single observation. It accounts for two critical factors:

1. Precision $\frac{1}{Var(Y_i)}$: This term accounts for the mean-variance relationship of the chosen distribution. Observations with higher predicted variance are considered "noisier" and are down-weighted.

2. Sensitivity $\left(\frac{\partial \mu_i}{\partial \eta_i}\right)^2$: This derivative reflects the link function's curvature. Observations where a small change in the linear predictor $\eta$ leads to a large change in the mean $\mu$ are more informative and receive higher weight.

#### Linearization for the Newton Update

Due to the non-linear link function, the variable $y$ which we want to predict lives in another dimension as the linear predictor $\eta = X \beta$. Therefore we set $z$ as a First-order [Taylor expansion({{ site.baseurl }}{% link _posts/2020-05-08-taylor-series.md %})] of the link function $g(y)$ around the current mean $\mu$:

$$z_i \approx g(\mu_i) + (y_i - \mu_i) g'(\mu_i)$$

$$z_i \approx \eta_i + (y_i - \mu_i) \frac{\partial \eta_i}{\partial \mu_i}$$

This produces the Working Dependent Variable. Intuitively it's a current linear prediction $\eta$, adjusted by the current error $(y−\mu)$, which has been "stretched" or "shrunk" by the slope of the link function. By making approximation $y \approx z$ we transition from the outcome space of $y$ to a linear dimension, and the error $(y−\mu)$ is translated into the same space. 

Now let's look again at the score equation. We can force $W$ into it by multiplying and dividing by $\frac{\partial \mu_i}{\partial \eta_i}$:

$$U_i = \left[\frac{1}{Var(Y_i)}  \left(\frac{\partial \mu_i}{\partial \eta_i}\right)^2 \right] \cdot \left[(y_i - \mu_i) \frac{\partial \eta_i}{\partial \mu_i} \right] \cdot x_i$$

$$U_i = X^T W e$$

where $e$ is the vector of scaled errors. From the expression of the Working Dependent Variable $e$ is equivalent to $(z - \eta)$.

#### Putting it all together

By plugging the information matrix, and the linearized score function into the newton update we get this equation:

$$\beta_t = \beta_{t-1} + \left(X^T W X \right)^{-1} X^T W (z - \eta)$$

Then when we redistribute $\left(X^T W X \right)^{-1} X^T W$ across $(z - \eta)$, the part involving $\eta$ (which is $X \beta_{t-1}$) becomes negative $\beta_{t-1}$. Which simplifies to this:

$$\beta_t = \left(X^T W X \right)^{-1} X^T W z$$

#### The Algorithm Steps

1. Initialize: Start with an initial guess for $\beta$.

2. Calculate $\mu$ and $W$: Use the current $\beta$ to calculate the predicted means and the weights based on the chosen distribution.

3. Construct $z$: Form the working dependent variable using the residuals and the link function derivative.

4. Solve WLS: Calculate the new $\beta$ using the WLS formula.

5. Repeat: Iterate until the change in $\beta$ is smaller than a pre-defined threshold (convergence).

## Standard Error of Coefficients

In [statistics]({{ site.baseurl }}{% link _posts/2025-08-18-probability-statistics.md %}), the variance of an estimator (like a regression coefficient) is inversely related to the amount of information the data contains about that parameter. This relationship is tied to the shape of the likelihood function: the more sharply peaked the likelihood function is at its maximum, the more "certain" we are of the estimate. A sharper peak corresponds to a smaller variance and, consequently, a smaller standard error.

The matrix that mathematically quantifies this information—and specifically the curvature of the log-likelihood—is called the [Fisher Information Matrix]({{ site.baseurl }}{% link _posts/2025-10-13-fisher-information.md %}), $I(\beta)$. The estimated variance-covariance matrix for the coefficients, $V(\hat \beta)$, is obtained by inverting the Information Matrix at the final Maximum Likelihood estimates:

$$V(\hat \beta) = I(\hat \beta)^{-1}$$

The diagonal elements of $V(\hat \beta)$, provide the variances of individual coefficients, and their square roots are the Standard Errors you see in model output.

## Generalized Estimating Equations (GEE)

Standard Generalized Linear Models (GLMs) have a crucial assumption:

* Independence: All observations ($Y_i$​) are independent of each other, conditional on the covariates.

This assumption is violated when data is [clustered]({{ site.baseurl }}{% link _posts/2021-01-03-clustering-overview.md %}) (grouped) or longitudinal (repeated measures over time on the same subject). An example of clustered data is student test scores clustered within a classroom. Students in the same classroom are likely more similar due to the same teacher, curriculum, and environment.

In these cases, fitting a standard GLM (like logistic or Poisson regression) is problematic because the     standard errors of coefficients (and thus p-values and [confidence intervals]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#confidence_interval)) will be incorrectly small, leading to an inflated sense of precision and potentially false conclusions of statistical significance.

Generalized Estimating Equations (GEE) provide a robust, non-likelihood-based approach to analyzing clustered or longitudinal data where observations within groups are correlated. It is an extension of the GLM framework, but with a critical focus on getting the standard errors correct.

### How GEE works 

Suppose you have 10 different classrooms, each with 30 students. You want to determine if spending more time on homework (your covariate) leads to better test scores.

1. **Initial Estimate**: GEE begins exactly like a standard GLM by calculating the initial coefficients $\beta^{(0)}$. For example, it might estimate that for every extra hour of homework, scores increase by 5 points. This estimate is usually unbiased even if the internal correlation is initially ignored.

2. **Define Correlation Structure**: You must define a "working correlation structure" ($R$) that describes how students within the same classroom are related.

A common choice is Exchangeable (Compound Symmetry), which assumes every pair of students in a class shares the same correlation level, $\alpha$. At this stage, you only define the shape of the matrix; the actual numerical value of $\alpha$ is estimated later from the data.

The following steps are then repeated until the coefficients converge:

Note, each cluster is processed separately.

3. **Calculate Means and Variances ($A_i$​)**: Using the current coefficient estimate $\beta^{(t−1)}$, we calculate the cluster mean vector $\mu_i$​ and the variance matrix $A_i$​.

$$\mu_i^{(t-1)} = g^{-1}(X_i \beta^{(t−1)})$$

$A_i$ is a diagonal matrix where each entry is the variance of a single observation based on the distribution's mean-variance relationship (e.g., for Poisson, the variance is simply $μ_{ij}$​). 

$$A_i​=\text{diag}(V(\mu_{i1}​),V(\mu_{i2}​),…,V(\mu_{in}​))$$

4. **Calculate and Standardize Residuals**: We determine the raw residuals $S_i$​ and then "standardize" them by dividing the error by the predicted standard deviation (from matrix $A$):

$$S_i^{(t-1)}= Y_i - \mu_i^{(t-1)}$$

$$r_{ij} = \frac{y_{ij}-\mu_{ij}}{\sqrt{V(\mu_{ij})}}$$

5. **Update Global Parameters ($\alpha$ and $\phi$)**: These are global parameters shared across all clusters. While each classroom has its own data, the "rules of the game"—the noise level ($\phi$) and the correlation strength ($\alpha$)—are estimated as single values for the entire dataset.

$\phi$ accounts for overdispersion (when data is noisier than theoretically expected). It is calculated from the average of the squared Pearson residuals:

$$\phi = \frac{1}{N - p} \sum_{i=1}^{K} \sum_{j=1}^{n_i} r_{ij}^2$$

here 

* $N$ is the total number of observations.
* $p$ is number of regression coefficients ($\beta$).

If $\phi$ is 1, the data matches the theoretical variance perfectly. If it is equal 2, the data is twice as noisy as a standard Poisson/Binomial distribution would expect. GEE uses this to "inflate" the standard errors so you don't overstate your confidence.

$\alpha$ is estimated by looking at the "co-movement" of residuals within the same cluster. For the Exchangeable structure (where every pair has the same correlation), we sum the products of residuals for all possible pairs within each cluster:

$$\alpha = \frac{1}{\text{Total pairs} \cdot \phi} \sum_{i=1}^K \sum_{j>k} r_{ij} r_{ik}$$

If student $j$ and student $k$ consistently both have "higher than expected" scores (positive $r$ $\times$ positive $r$) or "lower than expected" scores (negative $r$ $\times$ negative $r$), the product is positive, and $$alpha$ goes up. If their residuals are totally unrelated, the positive and negative products cancel out, and $\alpha$ stays near zero.

6. **Construct Cluster Covariance ($V_i$​)**: We combine the theoretical variance ($A_i$​), the correlation structure ($R_i$​), and the dispersion ($\phi$) into a single covariance matrix for the cluster:

$$V_i^{t} = \phi A_i^{1/2} R_i(\hat \alpha^{(t)}) A_i^{1/2}$$

* $A_i^{1/2}$ is diagonal matrix where the j-th diagonal entry is the square root of the GLM variance 

$V_i^{t}$​ represents the total estimated variance of the response vector $Y_i$​, accounting for both the distribution type and the clustering effect.

7. **Update Coefficients ($\beta$)**: Finally, we solve the Generalized Estimating Equation to find the new estimate $β^{(t)}$:

$$U(\beta^{(t)})=  \sum_{i=1}^K ​D_i^T​ (V_i^{t}​)^{−1} (Y_i​−\mu_i^{(t)}​)=0$$

Here $D_i$ is the derivative matrix $\frac{\partial \mu_i}{\partial \beta}$. It acts like the design matrix X but is "adjusted" for the link function. (In the standard GLM section, this derivative was included within the weight matrix $W$, allowing for the use of the "clean" $X$ matrix instead).

This non-linear equation is solved iteratively (via Newton-Raphson or Fisher Scoring), approximating the solution as:

$$\beta^{(t)}=\beta^{(t-1)}+ \left[\sum_{i=1}^{K} ​D_i^T ​(V_i^{t}​)^{−1} D_i \right]^{-1} \sum_{i=1}^{K} ​D_i^T ​(V_i^{t}​)^{−1} S_i^{(t−1)​}$$

### Robust Estimation of Parameters Covariance

Once the $\hat \beta$​ has converged, the final step is to calculate the robust standard errors, which are necessary for hypothesis testing and confidence intervals.

The Robust (Sandwich) Covariance Matrix for $\hat \beta$​ is calculated as:

$$V_{\text{robust}}(\hat \beta) = B^{-1} C B^{-1}$$

The standard errors for the coefficients are the square roots of the diagonal elements of this matrix.

#### $B$ (The Bread, or Model-Based Part) 

This is the term calculated from the final iteration of the fitting process. It represents the Model-Based (or Naive) covariance estimate.

$$B = \sum_{i=1}^{K} ​D_i^T ​(V_i^{t}​)^{−1} D_i$$

This is exactly the same "Information Matrix" we discussed for standard GLMs ($X^{T}WX$). In GEE, it represents what the variance of your coefficients should be if your "guess" about the correlation ($V_i$​) was 100% correct. It’s called the "Bread" because it surrounds the center. In a perfect world where your model is perfect, the variance would just be $B^{−1}$.

#### $C$ (The Meat, or Empirical Part)

This matrix captures the observed variability between the clusters, making no assumptions about the internal correlation structure. It is the sum of the outer products of the weighted residuals from each cluster.

$$C = \sum_{i=1}^{K} ​D_i^T ​V_{i}​^{-1} S_i S_i^T V_i^{-1} D_i$$

$S_i S_i^T$: This is the "outer product" of the residuals. While $V_i$​ is what your model thinks the covariance is, $S_i S_i^T$ is the actual, raw covariance observed in the data for that cluster.

For example, if students in Classroom 5 are much more similar to each other than your model predicted, $S_i S_i^T$ will be much larger than $V_i$​.

If S_i S_i^T$ is equal to $V_i$ then the "meat" simplifies and becomes equal to $B$. Consequently, the robust estimator is simply $B^{-1}$, same as the standard GLM variance.

The beauty of the Sandwich Estimator is its consistency. Even if the "working" correlation structure $V_i$​ is specified incorrectly, the Meat ($C$) uses the actual observed residuals to correct the Model-Based Bread ($B$). As long as your sample size of clusters ($K$) is sufficiently large, the resulting standard errors will be asymptotically correct.

