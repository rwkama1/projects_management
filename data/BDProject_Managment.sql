USE project_management
go
---------------------------------------------
----TABLES

-- Table "Projects"
CREATE TABLE Projects (
    ID_project  INT not null PRIMARY KEY Identity(1,1),
    Project_name  VARCHAR(100) not null,
    Descriptionn  VARCHAR(255) not null,
    Start_datee  DATE not null,
    End_date  DATE not null,
    Statuss   VARCHAR (50) not null,
    Project_manager VARCHAR(100) not null,
    Priorityy VARCHAR(50) not null,
    Client VARCHAR(100) not null,
    Budget DECIMAL(18, 2) not null
);
go
-- Table "Tasks"
CREATE TABLE Tasks (
    ID_task INT   not null PRIMARY KEY Identity(1,1),
    ID_project int not null Foreign Key References Projects(ID_project),
    Task_name VARCHAR(100)  not null,
    Descriptionn VARCHAR(255)  not null,
    Start_datee DATE  not null,
    End_date DATE  not null,
    Statuss VARCHAR(50)  not null,
    Task_owner VARCHAR(100) not null,
    Priorityy VARCHAR(50) not null,
    Hours_estimate INT
);
go
-- Table "Members"
CREATE TABLE Members (
    ID_member INT PRIMARY KEY Identity(1,1)  not null,
    First_name VARCHAR(100)  not null,
    Last_name VARCHAR(100)  not null,
    Position VARCHAR(100)  not null,
    Department VARCHAR(100)  not null,
    Email VARCHAR(100)  not null
);
go
-- Table "Assignments"
CREATE TABLE Assignments (
    ID_assignment INT  not null PRIMARY KEY Identity(1,1) ,
    ID_task INT  not null FOREIGN KEY REFERENCES Tasks(ID_task),
    ID_member INT  not null FOREIGN KEY REFERENCES Members(ID_member),
    Assignment_date DATE  not null,
    Worked_hours INT  not null
);
go
-- Table "Milestones"
CREATE TABLE Milestones (
    ID_milestone INT  not null PRIMARY KEY Identity(1,1),
    ID_project INT  not null FOREIGN KEY REFERENCES Projects(ID_project),
    Milestone_name VARCHAR(100)  not null,
    Descriptionn VARCHAR(255)  not null,
    Datee DATE  not null,
    Statuss VARCHAR(50)  not null
);
go
-- Table "Resources"
CREATE TABLE Resources (
    ID_resource INT not null PRIMARY KEY Identity(1,1),
    Resource_name  VARCHAR(100) not null,
    Descriptionn  VARCHAR(255) not null,
	Unit_cost DECIMAL not null,
    Available_quantity INT not null
);
go
-- Table "ResourceAssignments"
CREATE TABLE ResourceAssignments (
    ID_resource_assignment INT  not null PRIMARY KEY Identity(1,1),
    ID_task INT  not null FOREIGN KEY REFERENCES Tasks(ID_task),
    ID_resource INT  not null FOREIGN KEY REFERENCES Resources(ID_resource),
    Assigned_quantity INT  not null
);
go
-- Table "Comments"
CREATE TABLE Comments (
    ID_comment INT  not null PRIMARY KEY Identity(1,1),
    ID_task INT  not null FOREIGN KEY REFERENCES Tasks(ID_task),
    ID_member INT  not null FOREIGN KEY REFERENCES Members(ID_member),
    Comment_date DATE  not null,
    Content VARCHAR(255) not null
);
go
-- Table "Attachments"
CREATE TABLE Attachments (
    ID_attachment INT  not null PRIMARY KEY Identity(1,1),
    ID_task INT  not null FOREIGN KEY REFERENCES Tasks(ID_task),
    File_namee VARCHAR(100) not null,
    File_path VARCHAR(255) not null,
    Upload_date DATE  not null
);
go




DROP TABLE Projects;
DROP TABLE Tasks;
DROP TABLE Members;
DROP TABLE Assignments;
DROP TABLE ResourceAssignments;
DROP TABLE Milestones;
DROP TABLE Resources;
DROP TABLE Comments;
DROP TABLE Attachments;



SELECT * FROM Projects;
SELECT * FROM Tasks;
SELECT * FROM Members;
SELECT * FROM Assignments;
SELECT * FROM Milestones;
SELECT * FROM Resources;
SELECT * FROM ResourceAssignments;
SELECT * FROM Comments;
SELECT * FROM Attachments;





   SELECT
    P.ID_project, 
    P.Project_name,
    P.Descriptionn,
    P.Start_datee,
    P.End_date,
    P.Statuss,
    P.Project_manager,
    P.Priorityy,
    P.Client,
    P.Budget,
    COUNT(T.ID_task) AS Total_tasks,
    COUNT(CASE WHEN T.Statuss = 'Completed' THEN 1 END) AS Completed_tasks,
    SUM(T.Hours_estimate) AS Total_hours_estimate,
    SUM(A.Worked_hours) AS Total_hours_worked,
    P.Budget AS Project_budget,
    SUM(A.Worked_hours) / NULLIF(SUM(T.Hours_estimate), 0) * 100 AS Completion_percentage,
    P.Budget - SUM(A.Worked_hours) AS Remaining_budget
FROM Projects P
LEFT JOIN Tasks T ON P.ID_project = T.ID_project
LEFT JOIN Assignments A ON T.ID_task = A.ID_task
GROUP BY P.ID_project, P.Project_name, P.Descriptionn, P.Start_datee, P.End_date, P.Statuss, P.Project_manager, P.Priorityy, P.Client, P.Budget


		