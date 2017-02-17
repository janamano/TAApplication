API List

APIs requred for both applications:

1. ListOpenings (i.e. list of all courses, including description and other relevant info)


APIs required for the Applicant Application:

2. RegisterApplicant: Allows an applicant to be registered in the system(Student Number and Password)
3. GetApplicantApplication: Returns an applicants Application
4. SaveApplication: Saves an applicants application.
5. SubmitApplication: Submits the applicant's application. 

APIs required for the TA Application:

6. ListApplicantsByCourses: List applicants based on course.
7. RetrieveCourseDetails: Returns details about a course.
8. ModifyCourseSpec: Modifies details such about a course. (i.e add/modify additional requirements, enrollment, instructor for a course)
9. RetrieveApplicantsForCourse: Returns a list of all the applicants for a particular course (list of all applicants who applied to TA a course)
10. AssignApplicant: Assign an applicant to a particular course   (i.e. assign a single applicant)
11. AssignApplicants: Assign a set of applicants to a course   (i.e. assign a set of applicants)
12. UnassignApplicant: Unassigns an assigned applicant for a particular course. (i.e. unassign a single applicant)
13. UnassignApplicants: Unassigns a set of assigned applicants for a course. (i.e. unassign a set of applicants)
14. MarkProvisionalApplicant: Marks a particular applicant as provisional. (i.e not selected but possible candidate for a course)
15. UnMarkProvisionalApplicant: Removes the provisional flag from an applicant for a course. (i.e Remove provisional mark for the course)
16. SearchApplicant: Search for applicants based on various categories.   (i.e. search applicant by program, YofStudy ,assigned/unassigned, etc.)
17. ListUnassignedPositions: Returns a list of all positions for which no applicant has been assigned.
18. FlagApplicant: Adds a declined flag to an applicant and stores the declined offer details. (i.e. flag applicant as having declined offer)
19. RetrieveUnassignedApplicants: Returns a list of all applicants who have not been assigned to any course.
20. ViewApplication: View an applicants submitted application.









