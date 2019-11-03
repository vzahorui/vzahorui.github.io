---
layout: single
title: "Singular value decomposition"
description: Explaining what singular value decomposition is and how it is used
category: "Machine Learning Concepts"
tags: svd vector principal-components dimension-reduction matrix-transformation matrix
date: 2019-11-03
---
 
As a matter of fact, singular value decomposition (SVD) is an algorithm of transforming any matrix into a set of special matrices which are useful for dimension reduction and extracting principal components.
 
In its core SVD transforms each vector of a matrix into its projections on orthogonal axes.   
 
![](/assets/images/concepts/simple_vector_decomposition.png){: .align-center}
 
Decomposed elements share two properties:   
 * Unit vectors $\overrightarrow{v_i}$, representing directions onto which the vector is projected.
 * Magnitudes of projections $s_i$, which represent the amount of unit vectors $\overrightarrow{v_i}$ in each direction.
 
## Components of singular value decomposition
 
The formula for SVD looks like this:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$A = U \Sigma V^{T}$
 
Say, matrix $A$ is of size $n \times m$, where $n$ is the number of observations and $m$ is the number of original dimensions. The dimensions of the original matrix may not lie on orthogonal axes, which means that some of them may be correlated.
 
$U$ is an orthonormal matrix (meaning each column of the meatrix is normalized and is orthogonal with respect to any other column) of observations, which is of size $n \times d$, where $d$ is the number of orthogonal axes.
$V^{T}$ is an orthonormal matrix of dimensions, which is of size $d \times m$.  
 
Whereas $U$ shows distribution of observations (their vectors) within space of orthogonal axes, $V^{T}$ represents distribution of original dimensions within the same space of orthogonal axes, which eliminates multicollinearity. The newly derived axes are also called principal directions.
 
$\Sigma$ is a square matrix of size $d \times d$, which represents the magnitude of movement along each of the derived orthogonal axes. It is a diagonal matrix, where the elements along the diagonal (also called singular values) show variance of each principal component, in other words their relative strengths. For practical reasons, based on this matrix we can decide which and how many principal components to choose for further use in models. Usually only the ones with the highest variance are chosen while all the others are treated as noise.  
 
## Calculation
 
From the original equation $A = U \Sigma V^{T}$ we can derive a system of two equations which can help to slove SVD.
 
&nbsp;&nbsp;&nbsp;&nbsp;
$$\begin{cases}
A^{T}A = V \Sigma^{T} \Sigma V^{T} \\
AV = U \Sigma
\end{cases}$$
 
The first equation of the system is derived from the multiplication of original matrix by its transpose $V \Sigma U^{T}$. Since $U$ (as well as $V$) is orthonormal multiplication $U^{T}U$ results into unit matrix. Similarly, the second equation is derived by multiplying the original equation by $V$ from the right side.
 
Obviously, the result of $A^{T}A$ is a square matrix, and the expression $V \Sigma^{T} \Sigma V^{T}$ is its diagonalization, where $V$ is a matrix of eigenvectors, and $\Sigma^{T} \Sigma$ is a matrix of eigenvalues. I've written an article about eigenvectors and eigenvalues and about the mechanism of matrix diagonalization [here]({{ site.baseurl }}{% link _posts/2019-11-02-eigenvectors-and-eigenvalues.md %}).
 
Since $\Sigma$ is a square diagonal matrix, multiplication $\Sigma^{T} \Sigma$ results into another square diagonal matrix where the elements are squared. From this follows that the elements of $\Sigma$ are square roots of eigenvalues.
