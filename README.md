# Random Spanning Tree Visualizer
Site is here: https://nuagetsu.github.io/random-spanning-tree-visualizer/

Preview:
![Alt text](https://github.com/nuagetsu/random-spanning-tree-visualizer/blob/master/images/screenshot.png)

## Description
A website to generate random spanning trees and visualize them. The spanning trees are generated using Wilson's Algorithm, which guarantees a uniformly random spanning tree generation (meaning all spanning trees given a set of points have an equal chance of being generated). Otherwise, can be used as a constellation generator!

Can adjust number of nodes in the random spanning tree, or draw your own set of points and generate a random spanning tree based on those points.

Potential future additional features: Animations for Wilson's Algorithm, as well as visualizing how Prim's and Kruskal's algorithms generate minimum spanning trees.

## Motivation
Randomly thought that generating spanning trees would eventually make pretty constellation patterns while looking at star constellations, but the top google search results were about minimum spanning trees, so I decided to make my own. After a bit of searching, I came across Wilson's algorithm, which uses "Loop Erased Random Walks" instead of regular random walks to generate the spanning trees and has the beautiful property of guaranteeing uniform spanning trees. I thought this was really cool and wanted to attempt to implement it.




