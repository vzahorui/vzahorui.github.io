---
layout: single
title: "Singular value decomposition"
description: Explaining what singular value decomposition is and how it is used
category: "Linear Algebra"
tags: svd vector principal-components dimension-reduction matrix-transformation matrix pseudoinverse inverse positive-definite-matrix symmertic-matrix
date: 2020-07-28
---
 
As a matter of fact, singular value decomposition (SVD) is an algorithm of transforming any matrix into a set of special matrices which are useful for dimension reduction and extracting principal components.
 
In its core SVD transforms each vector of a matrix into its projections on orthogonal axes.     
 
![](/assets/images/linear_algebra/simple_vector_decomposition.png){: .align-center}
 
Decomposed elements share two properties:     
 * Unit vectors $\overrightarrow{v_i}$, representing directions onto which the vector is projected.
 * Magnitudes of projections $s_i$, which represent the amount of unit vectors $\overrightarrow{v_i}$ in each direction.
 
## Components of singular value decomposition
 
The formula for SVD looks like this:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$A = U \Sigma V^{T}$
 
Say, matrix $A$ is of size $n \times m$, where $n$ is the number of observations and $m$ is the number of original dimensions. The dimensions of the original matrix may not lie on orthogonal axes, which means that some of them may be correlated.  
 
$U$ is an orthonormal matrix (meaning each column of the meatrix is normalized and is orthogonal with respect to any other column) of observations, which is of size $n \times n$. $V$ is an orthonormal matrix of dimensions, which is of size $m \times m$. Whereas $U$ shows distribution of observations (their vectors) within the space of orthogonal axes, $V$ represents distribution of original dimensions within the same space of orthogonal axes, which eliminates multicollinearity. The newly derived axes are also called principal directions and the vectors in matrices $U$ and $V$ are called singular vectors. Since both $U$ and $V$ are orthonormal matrices, the transpose of each of them is equivalent to their respective inverses:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$U^{-1} = U^{T}$; $V^{-1} = V^{T}$  
 
$\Sigma$ is a matrix of size $n \times m$, which represents the magnitude of movement along each of the derived orthogonal axes. It is a diagonal matrix, where the elements along the diagonal (also called singular values) show the variance of each principal component, in other words their relative strengths. These elements should appear in decreasing order. For practical reasons, based on this matrix we can decide which and how many principal components to choose for further use in models. Usually only the ones with the highest variance are chosen while all the others are treated as noise.    
 
## Calculation of SVD
 
If we multiply the original matrix $A$ with its transpose from the left we will get a square $m \times m$ matrix. This square matrix $A^{T}A$ is guaranteed to be symmetric positive semidefinite so it is possible to apply [eigenvectors and eigenvalues]({{ site.baseurl }}{% link _posts/2019-11-02-eigenvectors-and-eigenvalues.md %}) decomposition to it:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$A^{T}A = V\Lambda V^{-1}$

where $V$ is a matrix of eigenvectors, and $\Lambda$ is a matrix of eigenvalues. Since $A^{T}A$ is symmetric its eigenvectors are orthonormal.
 
Same operation can be performed for $n \times n$ matrix $AA^{T}$ matrix where we can decompose it in the following form:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$AA^{T} = U\Lambda U^{-1}$
 
From the original equation $A = U \Sigma V^{T}$ we can derive a system of two equations which can help to solve SVD.
 
&nbsp;&nbsp;&nbsp;&nbsp;
$$\begin{cases}
A^{T}A = V \Sigma^{T} \Sigma V^{T} \\
AV = U \Sigma
\end{cases}$$
 
The first equation of the system is derived from multiplication of the original matrix by its transpose $V \Sigma U^{T}$. Since $U$ is orthonormal, multiplication $U^{T}U$ produces an identity matrix. Similarly, the second equation is derived by multiplying the original equation by $V$ from the right side.
 
Obviously, the expression $V \Sigma^{T} \Sigma V^{T}$ is our previously derived eigenvalue diagonalization, where $V$ is a matrix of eigenvectors, and $\Sigma^{T} \Sigma$ is a matrix of eigenvalues.
 
&nbsp;&nbsp;&nbsp;&nbsp;
$A^{T}A = V\Lambda V^{-1} = V \Sigma^{T} \Sigma V^{T}$
 
If $A$ is square then its eigenvalues are the same as of its transpose. However, if it's non-square then either $A$ or $A^{T}$ is singular, and the set of eigenvalues for the singular matrix will be extended with additional zeroes as diagonal elements in order to account for additional dimensions. The other eigenvalues will be the same as in the invertible matrix. As for the square matrices $A^{T}A$ and $AA^{T}$, they both will share the same set of eigenvalues, which will be equal to the squared versions of non-zero eigenvalues of the original matrix. The diagonal elements of $\Sigma^{T} \Sigma$ while being the eigenvalues of $A^{T}A$ are also squared singular values.
 
## Getting pseudoinverse of a matrix with SVD
 
Recall that the inverse of a matrix is a square matrix which by multiplication with its original matrix produces the identity matrix.   
 
&nbsp;&nbsp;&nbsp;&nbsp;
$AA^{-1}=A^{-1}A=I$
 
The inverse of a matrix represents such a linear transformation, which is opposite to the one of the original matrix. Performing multiplication between these two matrices results into no transformation.<br>
However, if the determinant of a matrix is zero then such matrix has no inverse matrix and represents shrinking into lower dimensional space.
 
A pseudoinverse matrix is a generalization of an inverse matrix, which can be defined for all matrices (even non-square). Yet, it inherits fewer guaranteed properties than a "regular" inverted matrix.<br>
The general solution which can be obtained with the pseudoinverse looks like this:
 
$AA^{+}A=A$

where $A^{+}$ is the pseudoinverse of a matrix.
 
While the Euclidean norm for the expression $\left |AA^{-1}-I\right|_{2}$ is zero, the norm for $\left |AA^{+}-I\right|_{2}$ is maximally close to zero.

Therefore, if the true inverse of a matrix exists it will be found via the algorithm of finding pseudoinverses.   
 
Suppose we cannot obtain an inverse of a matrix. Yet, we can apply singular value decomposition to any matrix, get its diagonal representation, and then take the inverse of it:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$A^{+} = (V \Sigma U^{T})^{-1}=U \Sigma^{-1} V^{T}$
 
$V^{-1}$ is $V^{T}$, as well as $U^{-1}$ is $U^{T}$, since these matrices are orthonormal. An inverse of a diagonal matrix $\Sigma$ is easy to find - just by taking the reciprocal of all the non-zero elements and leaving all zero elements as they are. If the diagonal matrix is of size $n \times m$, where $n \ne m$ then its inverse will be a diagonal matrix of size $m \times n$.
