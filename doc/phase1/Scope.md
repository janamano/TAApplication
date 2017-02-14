# Top Of The  Heap

### Members: 
Alex Yan, Atheed Thameem, Gabrielle Singh Cadieux, Janarthanan Manoharan, Sajid Ahmed, and Siddarth Gautam,  

# Scope

## Applicant Side
  1. Identify self by logging in with uTORID
  2. Apply for TA postions: Applicant fills out job application listing their personal information
    and UofT details:
        - Personal Information
            - Family Name
            - Given Name(s)
            - Phone Number
            - Student Number
            - Email Address
        - Student Information
            - Program (Undergrad, Masters, PhD)
            - Year of Study (1st, 2nd, ...)
            - Program of Study (Computer Science, etc.)
            - Work Status (Eligibility to work)
            - Student Status (Currently enrolled or not)
        - Academic/Work History
            - Courses TA'd in the past and number of times TA'd
            - Courses taken in the past that is relevant to the TA position
  3. Save an incomplete profile/application
  4. Applicants can save an incomplete application, log out, sign back in and
     to resume editing their application at a later time    
  5. Finish an application and mark it as complete so that it can be viewed by the coordinator.
        - This will set the date of application
  6. For the courses chosen, the applicant can choose a preference for each course by rating them from 1 to 5 


## TA Coordinator Side
  1. Call an API (Rosi) for courses for term
  2. Enter 'additional' requirements and qualifications for each course  [PREPOPULATED]
  3. Enter instructor assignment  [WILL BE PREPOPULATED]
  4. Assign set of applicants to course
  5. Enter instructors requests, anti-requests
  6. Share named set of provisional applicants (presumably for discussion with course instructor)
  7. List unassigned applicants
  8. Search for unassigned applicants by fields:
        - Previous Experience
        - Program
        - Preferred Courses
        - Year of Program
        - Type of Program (Undergrad, Masters, PhD)
        - Application Date
        - Whether applicant has been offered and declined a course in the past
  9. See applicant record (all information applicant entered)
  10. List open TA positions

## Learning Goals
One of our goals as a team is to learn how to create different interfaces for the same product. For example, in this case, we have taken on the task of building an applicant interface and a coordinator interface. So one of our goals is to facilitate the process of encapsulating one interface from the other, such that, the applicant is unaware of the coordinator's interface and vice versa. 
