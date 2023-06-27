
const { DataProject } = require("./data/DataProject");
const { DTOProject } = require("./entity/DTOProject");

// // //#region PROJECTS


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
           

    //         let registerProject =
    //          await DataProject.updateDescriptionNameProject(idproject,projectname,description);
    //         if (registerProject===-1) {
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


            //  async function getProjectsDelayed() {

         
            // let getProjectsDelayed =
            // await DataProject.getProjectsDelayed();
            // console.log(getProjectsDelayed);
            //  }
            //  getProjectsDelayed().then()

//  async function calculateProjectDuration() {

//             let calculateProjectDuration =
//             await DataProject.calculateProjectDuration(1);
//             console.log(calculateProjectDuration);
//         }
//     calculateProjectDuration().then()
    


// // //#endregion PROJECTS

