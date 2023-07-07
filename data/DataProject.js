const { Date } = require("mssql");
const { DTOProject } = require("../entity/DTOProject");
const { Conection } = require("./Connection");

class DataProject
{
    //SET

    static  registerProject=async(dtoproject)=>
    {
        let {Project_name ,Descriptionn ,Start_datee ,End_date ,
            Project_manager,Priorityy,Client,Budget}=dtoproject;
        let resultquery;
        let queryinsert = `
       
            declare @Project_name VARCHAR(100) = '${Project_name}';
            declare @Descriptionn VARCHAR(100) = '${Descriptionn}';
            declare @Start_datee date = '${Start_datee}';
            declare @End_date date = '${End_date}';
            declare @Project_manager VARCHAR(100)  = '${Project_manager}';
            declare @Priorityy VARCHAR(100) ='${Priorityy}';
            declare @Client VARCHAR(100) = '${Client}';
            declare @Budget  DECIMAL(18, 2) = ${Budget};

            IF @Priorityy NOT IN ('High', 'Medium', 'Low')
            BEGIN
                SELECT -1 AS PriorityError;
            END
            ELSE
            BEGIN
                IF @End_date <= @Start_datee
                BEGIN
                    SELECT -2 AS DateError;
                END
                ELSE
                BEGIN
                    insert into Projects 
                    VALUES (@Project_name, @Descriptionn, @Start_datee,
                    @End_date, 'Pending', @Project_manager,
                    @Priorityy, @Client, @Budget)

                    select 1 as insertsuccess
                END
            END
       
          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].PriorityError;
            if(resultquery===undefined)
            {
            resultquery = result.recordset[0].insertsuccess;
                if(resultquery===undefined)
                {
                resultquery = result.recordset[0].DateError;
                }
            }
        pool.close();
        return resultquery;
        
    }
    static  updateDescriptionNameProject=async(idproject,projectname,description)=>
    {
       
        let resultquery;
        let queryinsert = `

            declare @ID_project int = ${idproject};
            declare @Project_name VARCHAR(100) = '${projectname}';
            declare @Descriptionn VARCHAR(255) = '${description}';

             IF NOT EXISTS (SELECT ID_project 
                FROM Projects WHERE ID_project = @ID_project)
             BEGIN
                 SELECT -1 AS notexistidproject
             END
             ELSE
             BEGIN
                UPDATE Projects SET
                Project_name = @Project_name,
                Descriptionn = @Descriptionn
                WHERE ID_project = @ID_project;

                select 1 as updatesucess
            END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].notexistidproject;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updatesucess;
            }
        pool.close();
        return resultquery;
        
    }
    static  updateEndDateProject=async(ID_project,End_date)=>
    {
       
        let resultquery;
        let queryinsert = `

        -- Declare variables
        DECLARE @ID_project INT = ${ID_project};
        DECLARE @End_date DATE = '${End_date}';
        
        -- Check if project ID exists
        IF EXISTS (SELECT 1 FROM Projects WHERE ID_project = @ID_project)
        BEGIN
            -- Check if end date is greater than start date
            IF @End_date > (SELECT Start_datee FROM Projects WHERE ID_project = @ID_project)
            BEGIN
                -- Update project's end date
                UPDATE Projects
                SET End_date = @End_date
                WHERE ID_project = @ID_project;
                
                SELECT 1 AS updatesuccess;
            END
            ELSE
            BEGIN
                SELECT -2 AS DateError;
            END
        END
        ELSE
        BEGIN
            SELECT -1 AS IDNotFound;
        END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].IDNotFound;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updatesucess;
                if(resultquery===undefined)
                {  
                    resultquery = result.recordset[0].DateError;
                }
            }
        pool.close();
        return resultquery;
        
    }
    static  updatePriorityProject=async(ID_project,Priority)=>
    {
       
        let resultquery;
        let queryinsert = `

        -- Declare variables
        DECLARE @ID_project INT = ${ID_project};
        DECLARE @Priority VARCHAR(100) = '${Priority}';
        
        -- Check if project with given ID exists
        IF EXISTS (SELECT 1 FROM Projects WHERE ID_project = @ID_project)
        BEGIN
            -- Project with given ID exists
            
            -- Check if priority is valid
            IF @Priority IN ('High', 'Medium', 'Low')
            BEGIN
                -- Update project's priority
                UPDATE Projects
                SET Priorityy = @Priority
                WHERE ID_project = @ID_project;
                
                SELECT 1 AS updateSuccess;
            END
            ELSE
            BEGIN
                -- Invalid priority
                SELECT -1 AS priorityError;
            END
        END
        ELSE
        BEGIN
            -- Project with given ID does not exist
            SELECT -2 AS projectDoesNotExist;
        END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].projectDoesNotExist;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updateSuccess;
                if(resultquery===undefined)
                {  
                    resultquery = result.recordset[0].priorityError;
                }
            }
        pool.close();
        return resultquery;
        
    }
    static  completeProject=async(ID_project)=>
    {
       
        let resultquery;
        let queryinsert = `

        -- Declare variable
        DECLARE @ID_project INT = ${ID_project};
     
        
        -- Check if project with given ID exists
        IF EXISTS (SELECT 1 FROM Projects WHERE ID_project = @ID_project)
        BEGIN
          
               
                UPDATE Projects
                SET statuss = 'Completed'
                WHERE ID_project = @ID_project;
                
                SELECT 1 AS updateSuccess;
         
        END
        ELSE
        BEGIN
            -- Project with given ID does not exist
            SELECT -1 AS projectDoesNotExist;
        END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].projectDoesNotExist;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updateSuccess;
            
            }
        pool.close();
        return resultquery;
        
    }
    static  onholdProject=async(ID_project)=>
    {
       
        let resultquery;
        let queryinsert = `

        -- Declare variable
        DECLARE @ID_project INT = ${ID_project};
     
        
        -- Check if project with given ID exists
        IF EXISTS (SELECT 1 FROM Projects WHERE ID_project = @ID_project)
        BEGIN
          
               
                UPDATE Projects
                SET statuss = 'On Hold'
                WHERE ID_project = @ID_project;
                
                SELECT 1 AS updateSuccess;
         
        END
        ELSE
        BEGIN
            -- Project with given ID does not exist
            SELECT -1 AS projectDoesNotExist;
        END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].projectDoesNotExist;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updateSuccess;
            
            }
        pool.close();
        return resultquery;
        
    }
    static cancelProject=async(ID_project)=>
    {
       
        let resultquery;
        let queryinsert = `

        -- Declare variable
        DECLARE @ID_project INT = ${ID_project};
     
        
        -- Check if project with given ID exists
        IF EXISTS (SELECT 1 FROM Projects WHERE ID_project = @ID_project)
        BEGIN
          
               
                UPDATE Projects
                SET statuss = 'Canceled'
                WHERE ID_project = @ID_project;
                
                SELECT 1 AS updateSuccess;
         
        END
        ELSE
        BEGIN
            -- Project with given ID does not exist
            SELECT -1 AS projectDoesNotExist;
        END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].projectDoesNotExist;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updateSuccess;
            
            }
        pool.close();
        return resultquery;
        
    }

    //GET

    static  getProjectById=async(idproject)=>
    {
        let resultquery;

        let queryinsert = `

        DECLARE @ProjectID INT = ${idproject};

        IF NOT EXISTS (SELECT 1 FROM Projects 
            WHERE ID_project = @ProjectID)
        BEGIN
            SELECT -1 AS ProjectNotFound;
        END
        ELSE
        BEGIN
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
                P.Budget
            FROM Projects P
            WHERE ID_project = @ProjectID;
        END
 

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         resultquery = result.recordset[0].ProjectNotFound;
         if(resultquery===undefined)
         {
                let dtoproject = new DTOProject();   
                this.getInformation(dtoproject,result.recordset[0]);
                resultquery=dtoproject;

        }
          return resultquery;
        
    }
    static  getProjectByStatus=async(Status="")=>
    {
        let arrayn=[];

        let queryinsert = `

      
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
                P.Budget
            FROM Projects P
            WHERE Statuss like '%${Status}%' ;
       
 

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }
    static  calculateProjectDuration=async(idproject)=>
    {
        let resultquery;

        let queryinsert = `

             declare @ID_project INT=${idproject};

             IF NOT EXISTS (SELECT 1 FROM Projects 
                WHERE ID_project = @ID_project)
            BEGIN
                SELECT -1 AS ProjectNotFound;
            END
            ELSE
            BEGIN
                SELECT  (DATEDIFF(day, Start_datee, End_date)) as  projectduration
                FROM Projects
                WHERE ID_project = @ID_project
            END

        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        resultquery = result.recordset[0].ProjectNotFound;
        if(resultquery===undefined)
        {
            resultquery = result.recordset[0].projectduration;

       }
         return resultquery;
        
    }
    static  getProjects=async()=>
    {
        let arrayn=[];

        let queryinsert = `
  
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
            P.Budget
            FROM Projects P
            

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }
    static  getProjectWithMostTasks=async()=>
    {
        let arrayn=[];

        let queryinsert = `
  
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
        COUNT(T.ID_task) AS TaskCount
        FROM Projects P
        INNER JOIN Tasks T ON P.ID_project = T.ID_project
        GROUP BY P.ID_project, P.Project_name, P.Descriptionn, 
        P.Start_datee, P.End_date, P.Statuss, P.Project_manager,
        P.Priorityy, P.Client, P.Budget
        ORDER BY TaskCount DESC
    

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }
    static  getProjectsHighPriority=async()=>
    {
        let arrayn=[];

        let queryinsert = `
  
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
            P.Budget
            FROM Projects P
            WHERE Priorityy = 'High'

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }
    static  getProjectsMediumPriority=async()=>
    {
        let arrayn=[];

        let queryinsert = `
  
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
            P.Budget
            FROM Projects P
            WHERE Priorityy = 'Medium'

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }
    static  getProjectsLowPriority=async()=>
    {
        let arrayn=[];

        let queryinsert = `
  
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
            P.Budget
            FROM Projects P
            WHERE Priorityy = 'Low'

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }
    static  getProjectsByClientName=async(clientname="")=>
    {
        let arrayn=[];

        let queryinsert = `
  
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
            P.Budget
            FROM Projects P
            WHERE
            P.Client LIKE '%${clientname}%'

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }
    static  getProjectsByManagerName=async(managername="")=>
    {
        let arrayn=[];

        let queryinsert = `
  
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
            P.Budget
            FROM Projects P
            WHERE
            P.Project_manager  LIKE '%${managername}%'

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }
    static  getProjectsByDateRange=async(start_date,end_date)=>
    {
        let arrayn=[];

        let queryinsert = `
  
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
            P.Budget
            FROM Projects P   
            WHERE Start_datee BETWEEN @StartDate AND @EndDate

        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .input('StartDate', Date,start_date)
        .input('EndDate', Date, end_date)
      
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }
    static  getProjectsByBudgetRange=async(minbudget,maxbudget)=>
    {
        let arrayn=[];

        let queryinsert = `
  
            declare @MinBudget DECIMAL(18, 2)=${minbudget};
            declare @MaxBudget DECIMAL(18, 2)=${maxbudget};

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
            P.Budget
            FROM Projects P   
            WHERE Budget BETWEEN @MinBudget AND @MaxBudget

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }
    static  getProjectsOverdue=async()=>
    {
        let arrayn=[];

        let queryinsert = `

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
            P.Budget
            FROM Projects P   
            WHERE End_date < GETDATE() AND Statuss <> 'Completed'

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }

    static  getProjectsByMemberNameLastName=async(firstname="",lastname="")=>
    {
        let arrayn=[];

        let queryinsert = `
  
        SELECT P.ID_project, 
        P.Project_name,
        P.Descriptionn,
        P.Start_datee,
        P.End_date,
        P.Statuss,
        P.Project_manager,
        P.Priorityy,
        P.Client,
        P.Budget,
        COUNT(T.ID_task) AS TaskCount
        FROM Projects P
        INNER JOIN Tasks T ON P.ID_project = T.ID_project
        INNER JOIN Assignments A ON T.ID_task = A.ID_task
        INNER JOIN Members M ON A.ID_member = M.ID_member
        WHERE M.First_name LIKE 
        '%${firstname}%'
        AND M.Last_name LIKE '%${lastname}%'
        GROUP BY P.ID_project, P.Project_name, P.Descriptionn, P.Start_datee, 
        P.End_date, P.Statuss, P.Project_manager, 
        P.Priorityy, P.Client, P.Budget, COUNT(T.ID_task)
        ORDER BY TaskCount DESC
        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproject = new DTOProject();   
            this.getInformation(dtoproject,re);
            arrayn.push(dtoproject);
         }
          return arrayn;
        
    }


    //GET INFORMATION
            
    static getInformation(dtoproject,result)
    {
        dtoproject.ID_project = result.ID_project;
        dtoproject.Project_name = result.Project_name;
        dtoproject.Descriptionn = result.Descriptionn;
        dtoproject.Start_datee = result.Start_datee;
        dtoproject.End_date = result.End_date;
        dtoproject.Statuss = result.Statuss;
        dtoproject.Project_manager = result.Project_manager;
        dtoproject.Priorityy = result.Priorityy;
        dtoproject.Client = result.Client;
        dtoproject.Budget = result.Budget;
        dtoproject.TaskCount = result.TaskCount;
       
        
    }

}
module.exports = { DataProject };