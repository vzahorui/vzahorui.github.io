---
layout: single
title: "Matrix properties"
description: Explaining some of the properties of matrices
category: "Linear Algebra"
tags: rank full-rank-matrix vector matrix condition-number ill-conditioned-matrix column-space null-space kernel span linear-combination
date: 2020-07-15
---
 
Below I've provided intuition behind some of the properties of matrices, which are useful to understand in order to apply them in more complex algorithms.   

## Rank of a matrix
 
Rank of matrix is defined as a number of linearly independent rows (or columns) in the matrix.<br>
If all rows (or columns) of a matrix are independent then such matrix is called a full-rank matrix. That being said, in a full rank matrix there are no vectors which can be represented as a linear combination of other vectors of this matrix.
 
Rank defines the number of dimensions in which a matrix performs transformations.  
 
## Column space
 
Column space is a closely related term to the rank of a matrix and it means the span of all linearly independent vectors from the matrix. Span of vectors is a set of all possible linear combinations of vectors. So to speak, any type of transformation which is achievable by multiplying a matrix with a vector form the column space of this matrix, and the number of dimensions in the column space is the same as the rank of the matrix.
 
&nbsp;&nbsp;&nbsp;&nbsp;
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
 
In practice it is usually desired that the matrices are reduced to the form where its columns become independent vectors.
 
## Poorly conditioned matrices
 
Also called ill-conditioned matrices have high relation between their biggest and smallest eigenvalues. Such a relation is actually called a condition number, and it is used to estimate how hard it would be to invert a matrix. High condition number means that at least one vector is highly correlated with the others and represents mainly noise in the input data. Computation of the inverse of such matrices may be inaccurate due to the rounding in floating point numbers.
