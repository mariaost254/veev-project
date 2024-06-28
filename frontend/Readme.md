# Full Stack Developer - Home Assignment
Welcome 🙂 <br/>
We know how stressful home assignments can be (especially those with a time limit), so this is your reminder to breathe, read the assignment slowly - and simply do what you do best.
It’s all about getting to know you, as a developer.

We don’t expect you to finish everything in 3 hours, we want to see where your focus is.
## Intro
Veev is part of a wave of innovation in the construction industry, committed to optimizing the process of building homes. As a subsidiary of Lennar, the second-largest home developer in the US, we leverage extensive resources and a forward-thinking approach to redefine what is possible in our field. 

This particular assignment involves developing an internal dashboard for project management - a tool that's essential in our drive toward optimizing and streamlining project workflows. By focusing on this task, we aim to evaluate your technical skills in real-world applications that are directly aligned with our operational goals. 

This assignment will help us understand your coding style, your design thinking, and how you approach problems technically and pragmatically. It will also allow you to showcase your strengths in a controlled, relevant context that mirrors the challenges you will face as part of our team.

## Instructions
- You have 3 hours to complete this assignment, we don’t look at how long it takes you to finish, so feel free to use every remaining minute to review or just have a cup of coffee.
- Just make sure you submit it before the end of the 3 hours.
- As mentioned, this assignment is made for us to get to know you as a developer, therefore invest your time in showing us your strengths, and focus on what’s important to you.
- Backend: You may use **Python** or **NodeJS**.
- Frontend: You may use whatever framework you’re comfortable with.

## Questions & Technical Issues
For any question or technical issue, you may call the person you were assigned to.
Make sure to introduce yourself and explain calmly what you need help with.
If, for some reason, the assigned person isn’t available, you may call your recruiter (from HR).

## Submitting
Upon submitting the assignment, make sure to include all relevant files that are needed for us to run your app (i.e. requirements.txt if you’re using Python, or node modules if using NodeJS).
Running the app should be as easy and seamless as possible, please make it readable and easy to run for us.

It is recommended to take ~15 minutes to organize your files, projects, and any drawings if you have, and readme files, to help us understand how to run your system, please take the necessary time to do so.

If you’ve passed this assignment, your next interview will require you to present what you’ve done and why you have made certain decisions, it is highly advised to write to yourself key points of decisions, to have with you during the next interview.
<hr/>
<br/>
<br/>
<br/>

# Assignment: Internal Dashboard for Project Management

## Objective
Develop a simple internal dashboard that enables team members to view and update the status of various construction projects. This dashboard will help streamline project management and improve communication within teams.

## Backend Requirements
1. Develop a RESTful API that handles
    - Retrieval of all projects.
    - Retrieval of a single project’s details.
    - Updating the status of a project.
    - Adding a new project to the database.
2. Utilize a .txt, .csv, .json or any other file format file to store the data (this will serve as the database).

## Frontend Requirements
1. Use any JS framework you like to develop the front-end.
2. The UI should be clean and user-friendly.

## Features
1. **Project List View**
    - Display a list of projects with basic details: Project Name, Start Date, Estimated Completion Date, and Current Status (e.g., Planning, In Progress, Completed).
    - Provide a filter option to view projects by status.

2. **Project Details View**
    - Clicking on a project in the list should open a detailed view page.
    - This page should display more detailed information about the project, such as project description, project date, starting budget, **and** current cost.
    - Include functionality to update the status of the project (dropdown menu) and the  current cost of the project.
    - Projects that cost more than their budget should be flagged with a unique status.
    - Assume that each project by default costs 10% of its **starting budget** per day (therefore each project should end within 10 days).
        - The  current cost should be updated automatically.
        - The  current cost can be updated manually (if there was a specific unexpected problem in the inventory for example)
        - A project can be finished ahead of time, with an extra budget remaining.
    - Projects whose cost is more than 50% of their original budget, should be automatically closed and marked with a unique status for a forced-closed project.
        - **Example:** Consider a project with an initial budget of $100,000. Daily Budget Consumption: The project spends 10% of its starting budget each day, so the cost accrues as follows:
            - Day 1: $10,000
            - Day 2: $20,000 (accumulating $10,000 from Day 1 and $10,000 from Day 2)
            - Continuing this pattern, by Day 5, the cost should reach $50,000.
            - Unexpected Costs: On Day 5, there is an issue with missing inventory items, necessitating an unplanned expense of $100,000. This brings the total cost of the project on Day 5 to $150,000 (the $50,000 from the first five days plus the additional $100,000).
        
            Automatic Closure: Since the total cost now exceeds the original budget by 50% ($150,000 is 150% of $100,000), the project is automatically closed and marked with a unique status indicating a forced closure due to exceeding the budget.

3. **Add New Project**
    - Include a form to add a new project to the database.

4. **Statistics and Insights**
    - Add any graphs or statistics that you see fit, that can generate value and insights to our management.

## Bonus Points
1. Implement authentication for the dashboard.
2. Enhance the UI/UX with advanced front-end techniques and animations.
3. Build a machine learning model that will predict when will a project finish, based on the changes in cost of similar projects, can be integrated with an NLP model that will allow management to freely ask questions.
###### Just kidding, of course, don’t do the last point.

Good Luck 🙂
