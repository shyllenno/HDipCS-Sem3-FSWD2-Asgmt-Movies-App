# Welcome to Movies App

## Overview

Full Stack Web Development 2 - Assignment - Professor Frank Walsh

This project extends the LabMoviesApp developed throughout the FSWD2 lectures & labs

## Work Carried Out

1) Cloned LabMoviesApp repo
2) Created README.md with "Work Carried Out" section
3) Added Back-End using Hapi and Atlas MongoDB; Persistence added to Favourites and Reviews
4) Added My Reviews Page to fetch user's review written for favourite movies, using a new type constructed by Type Intersection, and rendering it in a table-like format
5) Changed view from one movie per row with many reviews to one review per row with many movies rows, using flatMap method
6) Added delete method for deleting a review in the back-end & add a delete button in front-end
7) Added sort by title method to filter UI; Applied sorting to Home, Upcoming, and Favourites pages
8) Removed Filter UI from My Reviews Page, as it renders in table format, and the filter component is not compatible. ***Future improvement***
9) Added TV Series Page: Page replicated from Movies HomePage. The Data Model and several Components were modified to accept the two data types: movie & tv, because, firstly, they call different end-points, and secondly, because few fields are named differently, e.g. movie uses title, but tv series use name, and thirdly, they have different fields
10) (Work-In-Progress): TODO: Revisit My Reviews Page as it needs to be adapted to fetch/render tv series 
11) (Work-Scheduled): TODO: Start working on "My Fantasy Movie"
