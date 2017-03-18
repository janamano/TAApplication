# Progress Report

## Intial Scope

Phase 2 was planned as our core developement phase. During this cycle, we planned to implement the base framework of our application that will enable us to build the features we mentioned in our initial [scope document]() in the previous phase. This includes setting up the projects and the dev environment for the different components of our app, designing and implementing the data model, and incorporating any new APIs that would be required by the client applications. In addition, we planned (and implemented) a sizeable subset of the features as mentioned in detail below.

## Tasks Completed
A significant portion of our entire application has been implemented during this phase. Apart from setting up the basic structures of the different components, we were able to implement the following set of features into our app:

* Applicant client:
 * User authentication
 * View list of courses with open TA positions
 * Mark courses interested in TAing, and rank them based on level of interest / preference
 * Ability to enter personal and academic information
 * Ability to add courses to a virtual cart, and revisit them with ease at a later time
 * Ability to save an incomplete application and resume editing at a later time

* TA Coordinator client:
 * TODO

* Applicant System Backend:
 * [Design and implementation of database schema](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/22)
 * Following web APIs to support the above features of the Applicant and the TA Coordinator client:
   
     [Applicant Login](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/21), [GetAllApplicants](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/23), [GetCourses](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/30), [GetCourseInfo](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/31), [GetUnassignedPositions](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/38), [GetApplicantsByCourse](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/39), [GetApplicantProfile](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/53), [AssignApplicant](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/68)
     
## Pending / Incomplete Tasks
Although we made significant inroads towards our final product, there are still outstanding features and some integration work left which we would have liked to complete within this phase. These are as follows:

* [API for saving applicant profile](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/52)
* [Prepopulate applicant info with saved data](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/61)
* [Apply consistent and usable design to all UI layouts](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/36)
* [Ability to submit an application](https://github.com/csc302-2017-spring/proj-TopOfTheHeap/issues/75)

## Task(s) Not Part of Initial Scope
There is a particular enhancement that we added to our feature list, as we think this will add value to the user experience and will make the application process more comfortable and seemless.

* We introduced the concept of a "virtual cart", which will allow applicants to mark / shortlist courses they are interested in applying, so that can access / revisit them with ease at a later time.



# High-level Design
As mentioned in our [architecture document]() in Phase 1, our entire application is partitioned into three separate components: two client apps (i.e. the Applicant and the TA-Coordinator apps) and one central backend system.

Each client app is only responsible for providing an interface to its respective users. These applications do not persist or modify any data by themselves. They only call out APIs provided by the central backend system to retrieve or update relevant data.

The central backend system is regarded as a container / wrapper around the database instance, and is responsible for providing  an interface / gateway between client applications and the database instance.

Moreover, in order to decouple the implementation logic and to be consistent with general best practices, we have created separate modules pertaining to specific types of operations within each of these applications. We believe, this greatly helped in keeping our codebase organized and readable.

# Testing
???????

# Technical Highlights
??????? interesting bugs, challenges, lessons learned, observations, etc ????

# Teamork and Process
BEING WORKED ON...

