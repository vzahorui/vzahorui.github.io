---
layout: single
title: "Matrix properties"
description: Explaining some of the properties of matrices
category: "Linear Algebra"
tags: rank full-rank-matrix vector matrix condition-number ill-conditioned-matrix column-space null-space kernel span linear-combination symmetric-matrix positive-definite-matrix
date: 2020-07-26
---
 
Below I've provided intuition behind some of the properties of matrices, which are useful to understand in order to apply them in more complex algorithms.    
 
## Rank of a matrix
 
Rank of matrix is defined as a number of linearly independent rows (or columns) in the matrix.<br>
If all rows (or columns) of a matrix are independent then such matrix is called a full-rank matrix. That being said, in a full rank matrix there are no vectors which can be represented as a linear combination of other vectors of this matrix.
 
Rank defines the number of dimensions in which a matrix performs transformations.   
 
## Column space
 
Column space is a closely related term to the rank of a matrix and it means the span of all linearly independent vectors from the matrix. Span of vectors is a set of all possible linear combinations of vectors. So to speak, any type of transformation which is achievable by multiplying a matrix with a vector form the column space of this matrix, and the number of dimensions in the column space is the same as the rank of the matrix.
 
$$
\left[\begin{array}{cccc}
a_{11} & a_{12} & ... & a_{1n} \\
a_{21} & a_{22} & ... & a_{2n} \\
... & ... & ... & ... \\
a_{m1} & a_{m2} & ... & a_{mn}
\end{array} \right]
\left[\begin{array}{c}
v_{1} \\
v_{2} \\
... \\
v_{m}      
\end{array} \right]
= v_{1}      
\left[\begin{array}{c}
a_{11} \\
a_{21} \\
... \\
a_{m1}      
\end{array} \right] + v_{2} \left[\begin{array}{c}
a_{12} \\
a_{22} \\
... \\
a_{m2}      
\end{array} \right] + ... + v_{m} \left[\begin{array}{c}
a_{1n} \\
a_{2n} \\
... \\
a_{mn}      
\end{array} \right]
$$
 
As we see, matrix vector multiplication produces a linear combination of vectors which form the matrix. At the same time the components of the vector which is being multiplied with the matrix serve as scalers. The scalers could be any real numbers since the scaled version of vectors belong to the same subspace as the original vectors.   
 
## Null space
 
If a matrix is not full-rank then some of its vectors may be represented as linear combinations of other vectors of this matrix. This also means that there are such combinations where vectors of the matrix cancel each other out, thus resulting in zero vector. A set of all such combinations is known as the null space, or the kernel of a matrix.   
 
The linear combination of vectors from the matrix is nothing else than matrix vector multiplication, where the components of the vector represent scaled versions of the vectors from the matrix. Therefore the null space of a matrix can be described as a set of all vectors, which by multiplying with the matrix produces zero vector.   
 
&nbsp;&nbsp;&nbsp;&nbsp;
$N(A) = \\{v \in K^n|Av=0\\}$
 
If the columns of a matrix are linearly independent then the null space of this matrix is just zero vector. Any column space includes zero vector, as multiplying a matrix with a vector which contains only zero results into another zero vector. Zero vector can be viewed as a dot - the origin of vectors and matrices. Any type of linear transformation keeps origin in the same place.
 
In practice it is usually desired that the matrices are reduced to the form where their columns become independent vectors, so that the null space contains only zero vector.
 
## Poorly conditioned matrices
 
Also called ill-conditioned matrices have high relation between their biggest and smallest [eigenvalues]({{ site.baseurl }}{% link _posts/2019-11-02-eigenvectors-and-eigenvalues.md %}). Such a relation is actually called a condition number, and it is used to estimate how hard it would be to invert a matrix. High condition number means that the direction with the smallest eigenvalue corresponds with a nonsignificant eigenvector. The whole linear transformation of a matrix does not produce any variation along this eigenvector, and thus, at least one vector on the original matrix is highly correlated with the others and represents mainly noise in the input data. Computation of the inverse of such matrices may be inaccurate due to the rounding in floating point numbers.
 
## Symmetric matrices
 
A symmetric matrix is a square matrix which has its elements along rows and columns mirroring each other around the diagonal matrix. Here is a small example:
 
$$
\left[\begin{array}{cccc}
4 & 7 & 11 & 9 \\
7 & 3 & 4 & 8 \\
11 & 4 & 5 & 3 \\
9 & 8 & 3 & 6
\end{array} \right]
$$
 
For any symmetric matrix the following hold true:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$S = S^{T}$
 
Also the [eigenvectors]({{ site.baseurl }}{% link _posts/2019-11-02-eigenvectors-and-eigenvalues.md %}) of a symmetric matrix are orthogonal, meaning they are perpendicular in a vector space. The orthogonal eigenvectors can be scaled appropriately to become orthonormal vectors, so that their lengths become 1. The nice property about the matrix of orthonormal vectors is that its inverse equals its transpose. Bringing it all together we define eigenvector decomposition to a symmetric matrix as follows:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$S = Q\Lambda Q^{-1} = Q\Lambda Q^{T}$

where $Q$ is a matrix of orthonormal eigenvectors and $\Lambda$ is a diagonal matrix of eigenvalues.
 
The most important property of the symmetric matrices is that it is guaranteed for them to have eigenvalues as the real numbers, which might not be the case for other matrices (for example, a rotation matrix does not have any real eigenvalues).
 
By the way, diagonal matrices are a subset of symmetric matrices.
 
## Positive definite matrices
 
Positive definite matrices are matrices which have strictly positive eigenvalues.
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\lambda = v^{T}Av > 0$
 
In fact, performing operation $x^{T}Ax$, where $x$ is any vector and $A$ is a positive definite matrix, results in a positive number.
 
Matrices which have eigenvalues greater or equal to zero are called positive semidefinite matrices. Having at least one eigenvalue equal to zero means that the determinant of a matrix is also zero, hence the matrix is degenerate.
 
Positive definite matrices are especially useful when they are also symmetric, since in this case their eigenvectors are orthonormal and the eigenvalues are real, so they can be easily diagonalized. Provided that some $m \times n$ matrix $A$ is full-rank we can transform it into a symmetric positive definite matrix by multiplying it with its transpose: $A^{T}A$. However, if the initial matrix was not full-rank, such transformation will only make it positive semidefinite.
 
In optimization problems, as in [Newton's method]({{ site.baseurl }}{% link _posts/2020-07-05-newton-method.md %}), a symmetric positive definite Hessian matrix guarantees the descent towards the minimum.