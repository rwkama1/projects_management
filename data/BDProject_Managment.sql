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




--DROP TABLE Projects;
--DROP TABLE Tasks;
--DROP TABLE Members;
--DROP TABLE Assignments;
--DROP TABLE Milestones;
--DROP TABLE Resources;
--DROP TABLE ResourceAssignments;
--DROP TABLE Comments;
--DROP TABLE Attachments;


SELECT * FROM Projects;
SELECT * FROM Tasks;
SELECT * FROM Members;
SELECT * FROM Assignments;
SELECT * FROM Milestones;
SELECT * FROM Resources;
SELECT * FROM ResourceAssignments;
SELECT * FROM Comments;
SELECT * FROM Attachments;

 
 delete from Tasks where 