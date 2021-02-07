# Prescriptly
## Inspiration
Our grandparents are at a stage in their lives, where they have take lots of medications and at various times in the day. Keeping track of all these medications and going through their day-to-day lives is not an easy task. Using technology to remind them about their pills throughout the day would enhance their lives. Keeping this at the core of our project, we took on the task of developing this medications app 

## What it does
Keeps track of current and past medications. It enables users to add reminders that send email reminders, reminding users to take their medications in a timely fashion. In addition, this web application also has an inspirational quote displayed on the home page to encourage them to live their lives to fullest each day. In detail:
1. It allows users to create an account and add any currently prescribed medications
2. It allows users to move current medications to the past, in-case they are no longer prescribed, or even edit the current medications, in-case the prescription changes. 
3. It also allows users to schedule reminders that send email reminders reminding them to take their medications.
4. It displays a new inspiring quote 

## How we built it
We built is using ReactJs and NodeJs as our web-development tools, along with MongoDB being our primary Database. We started out by creating an idea of what our goal from this project was and executed by creating a rough sketch. We then started a Reactapp to begin the project. To connect to MongoDB, we used NodeJs. To get inspiring quotes that not only encourage people, but could bring joy in them, we use an external API to query for quotes. Finally, to schedule reminders, we used Cron library through NodeJs that handles scheduling and emailing aspect. 

## Challenges we ran into
Some of the biggest challenges we ran into includes the fact that we had a huge learning curve in this project. Not only were we new to React and NodeJS, we were also quite unsure on how to create a reminders system. Using our effective teamworking skills, we were able to conquer these challenges.

## Accomplishments that we're proud of
Connecting to MongoDB database as a backend to our application and effectively supporting the frontend is one of the things that we are proud of. We are also very happy that we were able to query an API to get various inspiring quotes from famous people that not only encourages people, but also just serves as a positive reminder, when things seem negative. Finally, implementing a reminder system is something completely new and we were able to learn a lot about how NodeJS libraries work, in general. 

## What we learned
ReactJs, NodeJs, MongoDB, API, teamwork, and a lot more. This project helped us explore newer libraries and coding techniques. 

## What's next for Prescriptly
1. To schedule a reminder, currently, users can only enter one time of the day (For example, if the user needs to take their pills twice a day, one at 6am and one at 6pm, they currently would have to add a reminder twice, as opposed to doing it in one go. For our future improvement, we would definitely want to make that an option. 
2. Graphing the progress of the medications over time is something that we hope to add for this app. So, we hope to implement a Graph API to add progress of medications. We would also hope to represent all the medications in a more visual way to track progress. 
3. In addition to sending reminders through emailing system, we hope to send SMS reminders as well. 
4. While creating medications, as opposed to letting the users type in their type of medication, we hope to add a list of options to enable the users to choose from them. 
5. Finally, we also hope to add a mechanism of editing reminders that have already been scheduled to make it more user-friendly to use reminders. 
