---
layout: single
title: "Principal component analysis and singular value decomposition"
description: Explaining what SVD and PCA are, how they are related, and what is their use case
category: "Feature Extraction"
tags: svd vector principal-components pca principal-component-analysis dimensionality-reduction matrix-transformation matrix pseudoinverse inverse positive-definite-matrix symmetric-matrix feature-extraction variance covariance-matrix eigendecomposition singular-vectors singular-values scatter-matrix truncated-svd
date: 2021-03-17
---

## Principal component analysis

In general principal component analysis (PCA) is a method of reducing the number of dimensions in data by employing unsupervised feature extraction. In its core the method transforms the matrix of data so that all vectors become orthogonal to each other while also capturing all variation in the dataset. If the transformed features display high variance across different observations then they can be used to make a distinction among them, and therefore they become good candidates for usage in machine learning models. Among these new features only those are kept that capture the most of the variation in the dataset, while the others are viewed as noise, and, therefore, discarded. If the dataset consists of highly correlated dimensions their number may be dramatically reduced after applying PCA, however the remaining new dimensions (or features) become harder to interpret.

Before performing PCA all features in the dataset should be centered, that is the mean value of each variable should be subtracted from the observed values. The point of centering is to make all of the directions have the same origin (zero), so that the variance will be measured around a single point. If this step is omitted then the difference in mean values across different features will be captured as part of the variance across new dimensions, leading to incorrect results.

The [covariance matrix]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}) is used as a generalization of the variance within the dataset. It is a square, symmetric and positive semidefinite matrix, so it is possible to find its [eigenvectors and eigenvalues]({{ site.baseurl }}{% link _posts/2019-11-02-eigenvectors-and-eigenvalues.md %}) in order to detect the orthogonal axes within the matrix, and the magnitude of variance along these directions.

For the matrix with centered features $X$ the covariance matrix is calculated just like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$C = \frac{1}{n-1}X^{T}X$

The eigenvalues of the covariance matrix represent the total amount of the variance - each in its respective direction, so it is possible to calculate the percentage of total variance which is explained by a set of the biggest eigenvalues. Usually the biggest eigenvalue accounts to more than 50% of the total variance. As the next step the principal directions are selected - namely the eigenvectors corresponding to the biggest eigenvalues. The number of selected principal directions will correspond to the number of final features left in the model. As for the optimal number of required features - there is no single answer as the desired amount of reduced features should be leveraged against the amount of variance which should be kept. One should be careful with PCA since although it is meant to reduce noise in the dataset it could also remove part of the essential variance from the model.

After the principal directions are selected the linear transformation encoded in the original dataset is projected into the [basis]({{ site.baseurl }}{% link _posts/2020-07-17-change-of-basis.md %}) formed by these vectors.

&nbsp;&nbsp;&nbsp;&nbsp;
$X_T = XV_r$

where $V_r$ is the matrix of eigenvectors of the covariance matrix which is reduced to contain only the principal direction. The transformed vectors of matrix $X_T$ are known as principal components.

Note that PCA may also be performed on $X^{T}X$ (also known as the scatter matrix) instead of the covariance matrix, as the former is just the scaled version of the latter. All eigenvalues of $X^{T}X$ will be scaled accordingly but the eigenvectors will remain as in the covariance matrix, so eventually the measure of variance in the dataset will be captured all the same.

## Singular value decomposition

Singular value decomposition (SVD) is an important algorithm of transforming any matrix into a set of special matrices which are useful for solving [linear least squares]({{ site.baseurl }}{% link _posts/2019-10-27-linear-least-squares.md %}) problem, and also for dimensionality reduction. SVD may also be viewed as a generalization of PCA which does not require computation of the covariance matrix, and therefore its results suffer less from the rounding errors.

Similarly to PCA the data needs to be mean-centered before performing SVD.

Say we have a matrix $X$ is of size $n \times m$, where $n$ is the number of observations and $m$ is the number of dimensions. The dimensions of this matrix may not lie on orthogonal axes, which means that some of them may be correlated. This is how SVD will decompose the matrix:

&nbsp;&nbsp;&nbsp;&nbsp;
$X = U \Sigma V^{T}$

where $U$ is an orthonormal matrix (meaning each column of the meatrix is normalized and is orthogonal with respect to any other column) of size $n \times n$. $V$ is an orthonormal matrix of size $m \times m$. $\Sigma$ is a rectangular diagonal matrix of size $n \times m$ the values of each appear in decreasing order. If $n$ is not equal to $m$ then $\Sigma$ is extended with additional zero vectors in order to account for the change in dimensions. The vectors in matrices $U$ and $V$ are called singular vectors, and the values along the diagonal in $\Sigma$ are called singular values. Also $V$ happens to be a matrix of  eigenvectors of the covariance matrix, and the values along the diagonal in $\Sigma$ are square roots of the eigenvalues - this will be explained below.

Since both $U$ and $V$ are orthonormal matrices, the transpose of each of them is equivalent to their respective inverses:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$U^{-1} = U^{T}$; $V^{-1} = V^{T}$

Recall that the eigendecomposition of a square matrix looks like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$C = V \Lambda V^{-1}$

where $V$ is the matrix of eigenvectors, and $\Lambda$ is a diagonal matrix of eigenvalues.

PCA may be viewed as a natural consequence of SVD which is solved by performing eigendecomposition of the scatter matrix.

&nbsp;&nbsp;&nbsp;&nbsp;
$X^{T}X = V \Sigma^{T} U^{T} U \Sigma V^{T} = V \Sigma^{T} \Sigma V^{-1}$

The expression $\Sigma^{T} \Sigma$ is actually the matrix of eigenvalues, and this is why the singular values are square roots of the eigenvalues of either the scatter or the covariance matrix. When both $V$ and $\Sigma$ are found, finding $U$ becomes also trivial.

&nbsp;&nbsp;&nbsp;&nbsp;
$U = XV\Sigma^{-1}$

where the elements of $\Sigma^{-1}$ are just the reciprocals of the singular values.

Similar operation can be performed for eigendecomposition of $XX^{T}$ if $m$ is greater than $n$, and in this case $U$ will serve as a matrix of eigenvectors.

### Numerical computation of SVD

As stated before, for numerical stability SVD is actually meant to be computed without performing eigendecomposition of $X^{T}X$, and fortunately there are numerous methods out there which do the job. Usually at first the original matrix is transformed into upper bidiagonal form using sequences of unitary matrices $U^{\ast}$ and $V^{\ast}$ which are applied from left and right in a similar manner as in [QR factorization]({{ site.baseurl }}{% link _posts/2019-11-19-qr-decomposition.md %}). After that the bidiagonal matrix is further decomposed so that its singular values are approximated using iterative procedures.

### Dimensionality reduction with SVD

With respect to dimensionality reduction SVD may be used analogously to PCA. At the final step of PCA the principal components are found via $XV$ but in case of SVD it simply becomes:

&nbsp;&nbsp;&nbsp;&nbsp;
$XV = U \Sigma V^{T}V = U \Sigma$

The reduction of dimensions is done by selecting only the first $k$ columns from $U$ (columns corresponding to the biggest singular values), and the upper left $k \times k$ part of $\Sigma$.

If we similarly reduce $V$ by leaving only $k$ first columns, then multiplying back by $V_r^{T}$ from the right reconstructs the original dimensions from the reduced principal components. However the resulting matrix will be of rank $k$ which is lower than the original one. The type of decomposition where we leave only $k$ first elements in matrices $U$, $\Sigma$ and $V$ is known as truncated SVD.

Thin SVD is yet another type of reduction which makes sense to do in order to significantly speed up computations if the number of observations is much bigger than the number of dimensions ($n \gg m$). It simply removes all columns from $U$ after the $m$th one, as well as all rows with zero elements from $\Sigma$. At the same time the resulting matrix will preserve the same rank as the original one.

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

While the Euclidean norm for the expression $ \lvert AA^{-1}-I\rvert_{2} $ is zero, the norm for $ \lvert AA^{+}-I\rvert_{2} $ is maximally close to zero. Therefore, if the true inverse of a matrix exists it will be found via the algorithm of finding pseudoinverses.   
 
Suppose we cannot obtain an inverse of a matrix. Yet, we can apply singular value decomposition to any matrix, get its diagonal representation, and then take the inverse of it:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$A^{+} = (V \Sigma U^{T})^{-1}=U \Sigma^{-1} V^{T}$
 
$V^{-1}$ is $V^{T}$, as well as $U^{-1}$ is $U^{T}$, since these matrices are orthonormal. An inverse of a diagonal matrix $\Sigma$ is easy to find - just by taking the reciprocal of all the non-zero elements and leaving all zero elements as they are. If the diagonal matrix is of size $n \times m$, where $n \ne m$ then its inverse will be a diagonal matrix of size $m \times n$.
