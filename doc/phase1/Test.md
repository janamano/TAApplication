# Testing

In this project, our team plans to follow the paradigm of Test-Driven 
Development (TDD) wherever possible and necessary -- most notably, within 
our back-end architecture. 

### Back-end Testing
We plan to build the back end of our TA application system in NodeJS (with 
Express); as such, we plan to build a suite of unit tests that provides 
wholesome coverage for every REST API that we expose. 

We will build the test suite using [Mocha](https://mochajs.org/), a robust
and effective testing framework, with supporting libraries such as 
[Chai](http://chaijs.com/). With every API that we build to expose to the font
end, we will simultaneously build unit tests that appropriately cover it. This
will allow us to continually evaluate the performance of our back-end
functionality, allowing us to have an effective and structured development 
workflow.

At the same time, we may also use more informal testing solutions when 
necessary, such as [Postman](https://www.getpostman.com/), to 'eyeball' some 
API calls and provide a flexible way of sanity testing before building unit
tests.

### Front-end Testing
On the front end, we plan to use the [React](https://facebook.github.io/react/)
library. Testing on the front end is often less structured and more based on 
visually asserting that the UI and API calls are what they should be, so we 
plan to have a mixed testing workflow.

Naturally, a significant portion of informal testing on the front end will 
comprise of each developer continually ensuring that each component and/or view
they build renders as expected onscreen. As the app progresses, various 
conditions (such as screen size) will be 'eyeball' tested to ensure accuracy
and correctness.

At the same time, we will also perform more structured front-end testing using
[Jest](https://facebook.github.io/jest/) and [Facebook's own recommended 
testing workflow](https://facebook.github.io/react/docs/test-utils.html).
Primarily, this will allow us to perform some minimal testing by shallow 
rendering. 

### Continuous Integration
*TODO*