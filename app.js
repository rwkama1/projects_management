
const { DataAssignments } = require("./data/DataAssignment");
const { DataMember } = require("./data/DataMember");
const { DataProject } = require("./data/DataProject");
const { DataTask } = require("./data/DataTask");
const { DTOAssignments } = require("./entity/DTOAssignment");
const { DTOMember } = require("./entity/DTOMember");
const { DTOProject } = require("./entity/DTOProject");
const { DTOTask } = require("./entity/DTOTask");

//#region PROJECTS


    // async function registerProject() {

    //     for (let index = 1; index < 8; index++) {

    //         let dtoproject = new DTOProject();
    //         dtoproject.Project_name = "Projectname" + index.toString();
    //         dtoproject.Descriptionn = "Descriptionn" + index.toString();
    //         dtoproject.Start_datee = `2023-07-1${index}`;
    //         dtoproject.End_date = `2023-08-1${index}`;
    //         dtoproject.Project_manager = "Projectmanager" + index.toString();
    //         dtoproject.Priorityy = "Medium";
    //         dtoproject.Client = "Client" + index.toString();
    //         dtoproject.Budget = 444+index;
           

    //         let registerProject = await DataProject.registerProject(dtoproject);
    //         if (registerProject===-1) {
    //             throw new
    //              Error("The Priority must be High , Medium , Low");
    //         }
    //         if (registerProject===-2) {
    //             throw new 
    //             Error("The End Date must be higher than Start Date");
    //         }
    //             console.log("Project registered successfully");
    //     }
    // }
    // registerProject().then()


    //  async function updateDescriptionNameProject() {

      

           
    //         let idproject = 1;
    //         let projectname = "ProjectNameUpdate";
    //         let description = "ProjectDescriptionnUpdate";
           

    //         let updateDescriptionNameProject =
    //          await DataProject.updateDescriptionNameProject(idproject,projectname,description);
    //         if (updateDescriptionNameProject===-1) {
    //             throw new
    //              Error("The Project does not exists");
    //         }
    //         console.log("Project updated successfully");
    //     }
   
    // updateDescriptionNameProject().then()


    // async function updateEndDateProject() {

    
    //     let idproject = 9;
    //     let end_date = '2023-08-30';
      

    //     let updateEndDateProject =
    //      await DataProject.updateEndDateProject(idproject,end_date);
    //     if (updateEndDateProject===-1) {
    //         throw new
    //          Error("The Project does not exists");
    //     }
    //     if (updateEndDateProject===-2) {
    //         throw new
    //         Error("The End Date must be higher than Start Date");
    //     }
    //     console.log("Project updated successfully");
    // }

    // updateEndDateProject().then()


    //    async function updatePriorityProject() {

    
    //    let idproject = 1;
    //     let priority = 'High';

    //     let updatePriorityProject =
    //      await DataProject.updatePriorityProject(idproject,priority);
    //     if (updatePriorityProject===-1) {
    //         throw new
    //          Error("The Project does not exists");
    //     }
    //     if (updatePriorityProject===-2) {
    //         throw new
    //          Error("The Priority must be High , Medium , Low");
    //     }
    //     console.log("Project updated successfully");
    // }

    // updatePriorityProject().then()



    // async function completeProject() {

    
    //     let idproject = 1;
       
      

    //     let completeProject =
    //      await DataProject.completeProject(idproject);
        
    //     if (completeProject===-1) {
    //         throw new
    //        Error("The Project does not exists");
    //     }
    //     console.log("Project updated successfully");
    // }

    // completeProject().then()

    //  async function onholdProject() {

    
    //     let idproject = 8;
       
      

    //     let onholdProject =
    //      await DataProject.onholdProject(idproject);
        
    //     if (onholdProject===-1) {
    //         throw new
    //        Error("The Project does not exists");
    //     }
    //     console.log("Project updated successfully");
    // }

    //onholdProject().then()

    //    async function cancelProject() {

    
    //     let idproject = 8;


    //     let cancelProject =
    //      await DataProject.cancelProject(idproject);
        
    //     if (cancelProject===-1) {
    //         throw new
    //        Error("The Project does not exists");
    //     }
    //     console.log("Project updated successfully");
    // }

    // cancelProject().then()


        //    async function getProjectsHighPriority() {

        //         let getProjectsHighPriority =
        //         await DataProject.getProjectsHighPriority();
        //         console.log(getProjectsHighPriority);
        // }
        // getProjectsHighPriority().then()

    //     async function getProjectsMediumPriority() {

    //         let getProjectsMediumPriority =
    //         await DataProject.getProjectsMediumPriority();
    //         console.log(getProjectsMediumPriority);
    // }
    // getProjectsMediumPriority().then()


    //     async function getProjectsLowPriority() {

    //         let getProjectsLowPriority =
    //         await DataProject.getProjectsLowPriority();
    //         console.log(getProjectsLowPriority);
    // }
    // getProjectsLowPriority().then()


    //     async function getProjects() {

    //         let getProjects =
    //         await DataProject.getProjects();
    //         console.log(getProjects);
    // }
    // getProjects().then()


    //     async function getProjectById() {

    //         let getProjectById =
    //         await DataProject.getProjectById(1);
    //         console.log(getProjectById);
    // }
    // getProjectById().then()

    
    //     async function getProjectByStatus() {

    //         let getProjectByStatus =
    //         await DataProject.getProjectByStatus("Compl");
    //         console.log(getProjectByStatus);
    // }
    // getProjectByStatus().then()


    //      async function getProjectsByClientName() {

    //         let getProjectsByClientName =
    //         await DataProject.getProjectsByClientName("Client2");
    //         console.log(getProjectsByClientName);
    // }
    // getProjectsByClientName().then()

    //      async function getProjectsByManagerName() {

    //         let getProjectsByManagerName =
    //         await DataProject.getProjectsByManagerName("Projectmanager1");
    //         console.log(getProjectsByManagerName);
    // }
    // getProjectsByManagerName().then()

    //        async function getProjectsByDateRange() {

    //         let startdate='2023-06-26';
    //         let enddate='2023-08-26';
    //         let getProjectsByDateRange =
    //         await DataProject.getProjectsByDateRange(startdate,enddate);
    //         console.log(getProjectsByDateRange);
    // }
    // getProjectsByDateRange().then()

        //    async function getProjectsByBudgetRange() {

        //     let minbudget=0;
        //     let maxbudget=500;
        //     let getProjectsByBudgetRange =
        //     await DataProject.getProjectsByBudgetRange(minbudget,maxbudget);
        //     console.log(getProjectsByBudgetRange);
        //      }
        //       getProjectsByBudgetRange().then()


            //  async function getProjectsOverdue() {

         
            // let getProjectsOverdue =
            // await DataProject.getProjectsOverdue();
            // console.log(getProjectsOverdue);
            //  }
            //  getProjectsOverdue().then()

//  async function calculateProjectDuration() {

//             let calculateProjectDuration =
//             await DataProject.calculateProjectDuration(1);
//             console.log(calculateProjectDuration);
//         }
//     calculateProjectDuration().then()
    
    //      async function getProjectsSearchNameDesc() {

        
    //         let getProjectsSearchNameDesc =
    //         await DataProject.getProjectsSearchNameDesc("1","");
    //         console.log(getProjectsSearchNameDesc);
    // }
    // getProjectsSearchNameDesc().then()


        
    //      async function getProjectWithMostTasks() {

        
    //         let getProjectWithMostTasks =
    //         await DataProject.getProjectWithMostTasks();
    //         console.log(getProjectWithMostTasks);
    // }
    // getProjectWithMostTasks().then()

    //     async function getProjectsByMember() {

        
    //         let getProjectsByMember =
    //         await DataProject.getProjectsByMember(6);
    //         console.log(getProjectsByMember);
    // }
    // getProjectsByMember().then()

    // async function getProjectByDepartament() {

        
    //         let getProjectByDepartament =
    //         await DataProject.getProjectByDepartament('Department2');
    //         console.log(getProjectByDepartament);
    // }
    // getProjectByDepartament().then()

    
    // async function getProjectsSumary() {

    //     let getProjectsSumary =
    //     await DataProject.getProjectsSumary();
    //     console.log(getProjectsSumary);
    // }
    // getProjectsSumary().then()
    


 //#endregion PROJECTS

//#region TASK

//  async function registerTask() {

//      for (let index = 1; index < 8; index++) {

//             let dtotask = new DTOTask();
//             dtotask.ID_project = index+1;
//             dtotask.Task_name = "Task_name" + index.toString();
//             dtotask.Descriptionn = "Descriptionn" + index.toString();
//             dtotask.Start_datee = `2023-07-1${index}`;
//             dtotask.End_date = `2023-08-1${index}`;
//             dtotask.Task_owner = "Task_owner" + index.toString();
//             dtotask.Priorityy = "Low";
//             dtotask.Hours_estimate = index+1;

//             let registerTask = await DataTask.registerTask(dtotask);
//             if (registerTask===-1) {
//                 throw new
//                  Error("The Priority must be High , Medium , Low ");
//             }
//             if (registerTask===-2) {
//                 throw new 
//                 Error("The End Date must be higher than Start Date");
//             }
//             if (registerTask===-3) {
//                 throw new
//                 Error("The Project does not exists");
//             }
//         console.log("Task registered successfully");
//         }
//     }
//     registerTask().then()


    // async function updateDescriptionNameTask() {

    //         let idtask = 1;
    //         let taskname = "TaskNameUpdate";
    //         let descriptiontask = "ProjectDescriptionnTaskUpdate";
           

    //         let updateDescriptionNameTask =
    //          await DataTask.updateDescriptionNameTask(idtask,taskname,descriptiontask);
    //         if (updateDescriptionNameTask===-1) {
    //             throw new
    //              Error("The Task does not exists");
    //         }
    //         console.log("Task updated successfully");
    //     }
   
    //     updateDescriptionNameTask().then()


    //  async function updateEndDateTask() {

    
    //     let idtask = 9;
    //     let end_date = '2023-08-30';
      

    //     let updateEndDateTask =
    //      await DataTask.updateEndDateTask(idtask,end_date);
    //     if (updateEndDateTask===-1) {
    //         throw new
    //          Error("The Task does not exists");
    //     }
    //     if (updateEndDateTask===-2) {
    //         throw new
    //         Error("The End Date must be higher than Start Date");
    //     }
    //     console.log("Task updated successfully");
    // }

    // updateEndDateTask().then()

    //    async function updatePriorityTask() {

    
    //    let idtask = 8;
    //     let priority = 'High';

    //     let updatePriorityTask =
    //      await DataTask.updatePriorityTask(idtask,priority);
    //     if (updatePriorityTask===-1) {
    //         throw new
    //          Error("The Task does not exists");
    //     }
    //     if (updatePriorityTask===-2) {
    //         throw new
    //          Error("The Priority must be High , Medium , Low");
    //     }
    //     console.log("Task updated successfully");
    // }

    // updatePriorityTask().then()


//    async function updateTaskOwner() {

    
//        let idtask = 17;
//         let Task_owner = 'TaskOwnerNameUpdate';

//         let updateTaskOwner =
//          await DataTask.updateTaskOwner(idtask,Task_owner);
//         if (updateTaskOwner===-1) {
//             throw new
//              Error("The Task does not exists");
//         }
      
//         console.log("Task updated successfully");
//     }

//     updateTaskOwner().then()



    //    async function completeTask() {

    
    //    let idtask = 8;
     

    //     let completeTask =
    //      await DataTask.completeTask(idtask);
    //     if (completeTask===-1) {
    //         throw new
    //          Error("The Task does not exists");
    //     }
       
    //     console.log("Task updated successfully");
    // }

    // completeTask().then()

    


    //    async function onholdTask() {

    
    //    let idtask = 9;
     

    //     let onholdTask =
    //      await DataTask.onholdTask(idtask);
    //     if (onholdTask===-1) {
    //         throw new
    //          Error("The Task does not exists");
    //     }
       
    //     console.log("Task updated successfully");
    // }

    // onholdTask().then()




    //     async function cancelTask() {

    
    //    let idtask = 10;
     

    //     let cancelTask =
    //      await DataTask.cancelTask(idtask);
    //     if (cancelTask===-1) {
    //         throw new
    //          Error("The Task does not exists");
    //     }
       
    //     console.log("Task updated successfully");
    // }

    // cancelTask().then()



    //  async function getTaskById() {

    //         let getTaskById =
    //         await DataTask.getTaskById(1);
    //         console.log(getTaskById);
    // }
    // getTaskById().then()


    //      async function getTaskByStatus() {

    //         let getTaskByStatus =
    //         await DataTask.getTaskByStatus("On");
    //         console.log(getTaskByStatus);
    // }
    // getTaskByStatus().then()


    //  async function getTaskByOwnerName() {

    //         let getTaskByOwnerName =
    //         await DataTask.getTaskByOwnerName("Task_owner6");
    //         console.log(getTaskByOwnerName);
    // }
    // getTaskByOwnerName().then()


    //  async function getTasks() {

    //         let getTasks =
    //         await DataTask.getTasks();
    //         console.log(getTasks);
    // }
    // getTasks().then()

    
    //  async function getTasksByProject() {

    //         let getTasksByProject =
    //         await DataTask.getTasksByProject(8);
    //         if (getTasksByProject===-1) {
    //             throw new
    //             Error("The Project does not exists");
    //          }
    //         console.log(getTasksByProject);
    // }
    // getTasksByProject().then()


    //   async function getTasksHighPriority() {

    //         let getTasksHighPriority =
    //         await DataTask.getTasksHighPriority();
           
    //         console.log(getTasksHighPriority);
    // }
    // getTasksHighPriority().then()

    //     async function getProjectsMediumPriority() {

    //         let getProjectsMediumPriority =
    //         await DataTask.getProjectsMediumPriority();
        
    //         console.log(getProjectsMediumPriority);
    // }
    // getProjectsMediumPriority().then()

    // async function getProjectsLowPriority() {

    //     let getProjectsLowPriority =
    //     await DataTask.getProjectsLowPriority();
    
    //     console.log(getProjectsLowPriority);
    // }
    // getProjectsLowPriority().then()

    //     async function getTasksByDateRange() {

    //         let startdate='2023-06-26';
    //         let enddate='2023-07-26';
    //         let getTasksByDateRange =
    //         await DataTask.getTasksByDateRange(startdate,enddate);
    //         console.log(getTasksByDateRange);
    // }
    // getTasksByDateRange().then()


    //      async function getTasksSearchNameDesc() {

        
    //         let getTasksSearchNameDesc =
    //         await DataTask.getTasksSearchNameDesc("","");
    //         console.log(getTasksSearchNameDesc);
    // }
    // getTasksSearchNameDesc().then()



    //         async function getTasksOverdue() {

        
    //         let getTasksOverdue =
    //         await DataTask.getTasksOverdue();
    //         console.log(getTasksOverdue);
    // }
    // getTasksOverdue().then()

    
    // async function getAssignedTasks() {

    //     let getAssignedTasks =
    //     await DataTask.getAssignedTasks(6);
    //     console.log(getAssignedTasks);
    // }
    // getAssignedTasks().then()

    // async function getAssignedTasks() {

    //     let getAssignedTasks =
    //     await DataTask.getAssignedTasks(6);
    //     console.log(getAssignedTasks);
    // }
    // getAssignedTasks().then()

//  async function getTaskProgress() {

//         let getTaskProgress =
//         await DataTask.getTaskProgress(1);
//         console.log(getTaskProgress);
//     }
//     getTaskProgress().then()

//  async function getTasksByDepartment() {

//         let getTasksByDepartment =
//         await DataTask.getTasksByDepartment("Department2");
//         console.log(getTasksByDepartment);
//     }
//     getTasksByDepartment().then()

//  async function getTasksGanttChart() {

//         let getTasksGanttChart =
//         await DataTask.getTasksGanttChart(3);
//         console.log(getTasksGanttChart);
//     }
//     getTasksGanttChart().then()



//#endregion TASK

//region MEMBERS

//  async function registerMember() {

//         for (let index = 1; index < 20; index++) {

//             let dtomember = new DTOMember();
//             dtomember.First_name = "First_name" + index.toString();
//             dtomember.Last_name = "Last_name" + index.toString();
//             dtomember.Department = `Department${index}`;
//             dtomember.Email = `email${index}@gmail.com`;
//             dtomember.Position = `Position${index}`;
          
//             let registerMember = await DataMember.registerMember(dtomember);
//             if (registerMember===-1) {
//                 throw new
//                  Error("Incorrect Email");
//             }
//             if (registerMember===-2) {
//                 throw new
//                  Error("Email already exists in the system");
//             }
//             console.log("Member registered successfully");
//         }
//     }
//     registerMember().then()

    //   async function updateMemberName() {

    //         let idmember = 12;
    //         let memberfirstname = "FirstNameUpdate";
    //         let memberlastname = "LastNameUpdate";
           

    //         let updateMemberName =
    //          await DataMember.updateMemberName(idmember,memberfirstname,memberlastname);
    //         if (updateMemberName===-1) {
    //             throw new
    //              Error("The Memmber does not exists");
    //         }
    //         console.log("Memmber updated successfully");
    //     }
   
    //     updateMemberName().then()

//   async function updateMemberDepartament() {

//             let idmember = 11;
//             let departament = "DepartamentUpdate";
            
//             let updateMemberDepartament =
//              await DataMember.updateMemberDepartament(idmember,departament);
//             if (updateMemberDepartament===-1) {
//                 throw new
//                  Error("The Memmber does not exists");
//             }
//             console.log("Member updated successfully");
//         }
   
//         updateMemberDepartament().then()

        // async function updateMemberPosition() {

        //     let idmember = 12;
        //     let position = "PositionUpdate";
            
        //     let updateMemberPosition =
        //      await DataMember.updateMemberPosition(idmember,position);
        //     if (updateMemberPosition===-1) {
        //         throw new
        //          Error("The Memmber does not exists");
        //     }
        //     console.log("Member updated successfully");
        // }
   
        // updateMemberPosition().then()


    //  async function getMemberById() {

    //         let getMemberById =
    //         await DataMember.getMemberById(11);
    //         console.log(getMemberById);

    //      }
    // getMemberById().then()

        //  async function getMemberByPosition() {

        //     let getMemberByPosition =
        //     await DataMember.getMemberByPosition("Position7");
        //     console.log(getMemberByPosition);

        //  }
        //  getMemberByPosition().then()

         
        //  async function getMemberByDepartament() {

        //     let getMemberByDepartament =
        //     await DataMember.getMemberByDepartament("Department19");
        //     console.log(getMemberByDepartament);

        //  }
        //  getMemberByDepartament().then()

        // async function getMemberByName() {

        //     let getMemberByName =
        //     await DataMember.getMemberByName("","");
        //     console.log(getMemberByName);

        //  }
        //  getMemberByName().then()


        //  async function getMemberAll() {

        //     let getMemberAll =
        //     await DataMember.getMemberAll();
        //     console.log(getMemberAll);

        //  }
        //  getMemberAll().then()

    // async function getMembersByTask() {

    //     let getMembersByTask =
    //     await DataMember.getMembersByTask(6);
    //     console.log(getMembersByTask);
    // }
    // getMembersByTask().then()


    //     async function getMembersByProject() {

    //     let getMembersByProject =
    //     await DataMember.getMembersByProject(6);
    //     console.log(getMembersByProject);
    // }
    // getMembersByProject().then()



    //    async function getMemberProductivity() {

        //     let getMemberProductivity =
        //     await DataMember.getMemberProductivity(2);
        //     console.log(getMemberProductivity);
    // }
    //     getMemberProductivity().then()

    //  async function getMemberCompletedPercentage() {

    //         let getMemberCompletedPercentage =
    //         await DataMember.getMemberCompletedPercentage(2);
    //         console.log(getMemberCompletedPercentage);
    // }
    // getMemberCompletedPercentage().then()

    //    async function getMemberUnassignedInProject() {

    //         let getMemberUnassignedInProject =
    //         await DataMember.getMembersUnassignedInProject(1);
    //         console.log(getMemberUnassignedInProject);
    // }
    // getMemberUnassignedInProject().then()

//#endregion MEMBERS

//#region ASSIGNMENTS

// async function registerAssignments() {

      

//             let dtoAssignments = new DTOAssignments();
            
//             dtoAssignments.ID_member = 2;
//             dtoAssignments.ID_task = 2;
//             dtoAssignments.Worked_hours = 1;
//             dtoAssignments.Assignment_date = `2023-07-11`;

//             let registerAssignments = await DataAssignments.registerAssignments
//             (dtoAssignments);
//             if (registerAssignments===-1) {
//                 throw new
//                  Error("Task not Found");
//             }
//             if (registerAssignments===-2) {
//                 throw new 
//                 Error("Member not Found");
//             }
//             if (registerAssignments===-3) {
//                 throw new 
//                 Error("The assignment date must be greater than or equal to the current date");
//             }
//             if (registerAssignments===-4) {
//                 throw new 
//                 Error("The hours worked for that task exceeds the estimated hours of the task ");
//             }
//                 console.log("Assignment registered successfully");
//         }
    
//     registerAssignments().then()


// async function updateAssignmentDate() {

//             let ID_assignment = 11;
//             let Assignment_date = `2023-07-07`;
            

//             let updateAssignmentDate = await DataAssignments.updateAssignmentDate
//             (ID_assignment,Assignment_date);
//             if (updateAssignmentDate===-1) {
//                 throw new
//                  Error("Assignment not Found");
//             }
//             if (updateAssignmentDate===-2) {
//                 throw new 
//               Error("The assignment date must be greater than or equal to the current date");
//             }
//                 console.log("Assignment updated successfully");
       
//     }
//  updateAssignmentDate().then()


// async function updateAssignmentWorked_hours() {

//             let ID_assignment = 11;
//             let Worked_hours = 5;
            

//             let updateAssignmentWorked_hours =
//              await DataAssignments.updateAssignmentWorked_hours
//             (ID_assignment,Worked_hours);
//             if (updateAssignmentWorked_hours===-1) {
//                 throw new
//                  Error("Assignment not Found");
//             }
            
//          console.log("Assignment updated successfully");
       
//     }
// updateAssignmentWorked_hours().then()

     
     async function getAssignmentById() {

            let getAssignmentById =
            await DataAssignments.getAssignmentById(2);
            console.log(getAssignmentById);
    }
    getAssignmentById().then()

//#endregion ASSIGNMENTS