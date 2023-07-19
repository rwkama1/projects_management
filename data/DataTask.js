const { Date } = require("mssql");
const { DTOTask } = require("../entity/DTOTask");
const { Conection } = require("./Connection");

class DataTask
{
    //SET

    static  registerTask=async(dtotask)=>
    {
        let {ID_project ,Task_name,Descriptionn ,Start_datee ,End_date ,
            Task_owner,Priorityy,Hours_estimate}=dtotask;
        let resultquery;
        let queryinsert = `
       
            declare @ID_project int = ${ID_project};
            declare @Task_name VARCHAR(100) = '${Task_name}';
            declare @Descriptionn VARCHAR(100) = '${Descriptionn}';
            declare @Start_datee date = '${Start_datee}';
            declare @End_date date = '${End_date}';
            declare @Task_owner VARCHAR(100) ='${Task_owner}';
            declare @Priorityy VARCHAR(100) = '${Priorityy}';
            declare @Hours_estimate  int = ${Hours_estimate};

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

                    IF NOT EXISTS (SELECT 1 FROM Projects WHERE ID_project = @ID_project)
                    BEGIN
                        SELECT -3 AS ProjectNotFound;
                    END
                    ELSE
                    BEGIN
                        insert into Tasks 
                        VALUES (@ID_project, @Task_name, @Descriptionn,
                        @Start_datee, @End_date, 'Pending',@Task_owner,
                        @Priorityy, @Hours_estimate)
                    END
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
                    if(resultquery===undefined)
                    {
                         resultquery = result.recordset[0].ProjectNotFound;
                    }
                }
            }
        pool.close();
        return resultquery;
        
    }
    static  updateDescriptionNameTask=async(idtask,taskname,descriptiontask)=>
    {
       
        let resultquery;
        let queryinsert = `

            declare @idtask int = ${idtask};
            declare @taskname VARCHAR(100) = '${taskname}';
            declare @descriptiontask VARCHAR(100) = '${descriptiontask}';

             IF NOT EXISTS (SELECT ID_task 
                FROM Tasks WHERE ID_task = @idtask)
             BEGIN
                 SELECT -1 AS notexistidtask
             END
             ELSE
             BEGIN
                UPDATE Tasks SET
                Task_name = @taskname,
                Descriptionn = @descriptiontask
                WHERE ID_task = @idtask;

                select 1 as updatesucess
            END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].notexistidtask;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updatesucess;
            }
        pool.close();
        return resultquery;
        
    }
    static  updateEndDateTask=async(idtask,End_date)=>
    {
       
        let resultquery;
        let queryinsert = `

        -- Declare variables
        DECLARE @ID_task INT = ${idtask};
        DECLARE @End_date DATE = '${End_date}';
        
      
        IF EXISTS (SELECT 1 FROM Tasks WHERE ID_task = @ID_task)
        BEGIN
            -- Check if end date is greater than start date
            IF @End_date > (SELECT Start_datee FROM Tasks 
                WHERE ID_task = @ID_task)
            BEGIN
              
                UPDATE Tasks
                SET End_date = @End_date
                WHERE ID_task = @ID_task;
                
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
    static  updatePriorityTask=async(id_task,Priority)=>
    {
       
        let resultquery;
        let queryinsert = `

        -- Declare variables
        DECLARE @ID_task INT = ${id_task};
        DECLARE @Priority VARCHAR(100) = '${Priority}';
        
        -- Check if task with given ID exists
        IF EXISTS (SELECT 1 FROM Tasks WHERE ID_task = @ID_task)
        BEGIN
            -- Task with given ID exists
            
            -- Check if priority is valid
            IF @Priority IN ('High', 'Medium', 'Low')
            BEGIN
               
                UPDATE Tasks
                SET Priorityy = @Priority
                WHERE ID_task = @ID_task;
                
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
            -- Task with given ID does not exist
            SELECT -2 AS taskDoesNotExist;
        END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].taskDoesNotExist;
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
    static  updateTaskOwner=async(id_task,Task_owner)=>
    {
       
        let resultquery;
        let queryinsert = `

        -- Declare variables
        DECLARE @ID_task INT = ${id_task};
        DECLARE @Task_ownerName VARCHAR(100) = '${Task_owner}';
        
        -- Check if task with given ID exists
        IF EXISTS (SELECT 1 FROM Tasks WHERE ID_task = @ID_task)
        BEGIN
                UPDATE Tasks
                SET Task_owner = @Task_ownerName
                WHERE ID_task = @ID_task;
                
                SELECT 1 AS updateSuccess;
           
        END
        ELSE
        BEGIN
            -- Task with given ID does not exist
            SELECT -2 AS taskDoesNotExist;
        END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].taskDoesNotExist;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updateSuccess;
            
            }
        pool.close();
        return resultquery;
        
    }
    static  completeTask=async(ID_task)=>
    {
       
        let resultquery;
        let queryinsert = `

        -- Declare variable
        DECLARE @ID_task INT = ${ID_task};
     
        
        -- Check if task with given ID exists
        IF EXISTS (SELECT 1 FROM Tasks WHERE ID_task = @ID_task)
        BEGIN
          
               
                UPDATE Tasks
                SET Statuss = 'Completed'
                WHERE ID_task = @ID_task;
                
                SELECT 1 AS updateSuccess;
         
        END
        ELSE
        BEGIN
            -- Task with given ID does not exist
            SELECT -1 AS taskDoesNotExist;
        END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].taskDoesNotExist;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updateSuccess;
            
            }
        pool.close();
        return resultquery;
        
    }
    static  onholdTask=async(ID_task)=>
    {
       
        let resultquery;
        let queryinsert = `

        -- Declare variable
        DECLARE @ID_task INT = ${ID_task};
     
        
        -- Check if task with given ID exists
        IF EXISTS (SELECT 1 FROM Tasks WHERE ID_task = @ID_task)
        BEGIN
          
               
                UPDATE Tasks
                SET statuss = 'On Hold'
                WHERE ID_task = @ID_task;
                
                SELECT 1 AS updateSuccess;
         
        END
        ELSE
        BEGIN
            -- Task with given ID does not exist
            SELECT -1 AS taskDoesNotExist;
        END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].taskDoesNotExist;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updateSuccess;
            
            }
        pool.close();
        return resultquery;
        
    }
    static cancelTask=async(ID_task)=>
    {
       
        let resultquery;
        let queryinsert = `

        -- Declare variable
        DECLARE @ID_task INT = ${ID_task};
     
        
        -- Check if task with given ID exists
        IF EXISTS (SELECT 1 FROM Tasks WHERE ID_task = @ID_task)
        BEGIN
          
               
                UPDATE Tasks
                SET statuss = 'Canceled'
                WHERE ID_task = @ID_task;
                
                SELECT 1 AS updateSuccess;
         
        END
        ELSE
        BEGIN
            -- Tasks with given ID does not exist
            SELECT -1 AS taskDoesNotExist;
        END

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].taskDoesNotExist;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updateSuccess;
            
            }
        pool.close();
        return resultquery;
        
    }

    //GET
    
    static  getTasks=async()=>
    {
        let arrayn=[];

        let queryinsert = `

    
                SELECT 
                T.ID_task, 
                T.ID_project,
                T.Task_name,
                T.Descriptionn,
                T.Start_datee,
                T.End_date,
                T.Statuss,
                T.Task_owner,
                T.Priorityy,
                T.Hours_estimate,
                P.Project_name
                FROM Tasks T
                INNER JOIN Projects P ON T.ID_project = P.ID_project

        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getTasksByProject=async(idproject)=>
    {
        let arrayn=[];

        let queryinsert = `

        DECLARE @projectid INT = ${idproject};

        IF NOT EXISTS (SELECT 1 FROM Projects 
            WHERE ID_project = @projectid)
        BEGIN
            SELECT -1 AS ProjectNotFound;
        END
        ELSE
        BEGIN
            SELECT 
                T.ID_task, 
                T.ID_project,
                T.Task_name,
                T.Descriptionn,
                T.Start_datee,
                T.End_date,
                T.Statuss,
                T.Task_owner,
                T.Priorityy,
                T.Hours_estimate,
                P.Project_name
            FROM Tasks T
            INNER JOIN Projects P ON T.ID_project = P.ID_project
            WHERE T.ID_project = @projectid;
        END

        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
        
    }
    static  getTaskById=async(id_task)=>
    {
        let resultquery;

        let queryinsert = `
        DECLARE @TaskID INT = ${id_task};

        IF NOT EXISTS (SELECT 1 FROM Tasks 
            WHERE ID_task = @TaskID)
        BEGIN
            SELECT -1 AS TaskNotFound;
        END
        ELSE
        BEGIN
            SELECT 
                T.ID_task, 
                T.ID_project,
                T.Task_name,
                T.Descriptionn,
                T.Start_datee,
                T.End_date,
                T.Statuss,
                T.Task_owner,
                T.Priorityy,
                T.Hours_estimate,
                P.Project_name
            FROM Tasks T
            INNER JOIN Projects P ON T.ID_project = P.ID_project
            WHERE T.ID_task = @TaskID;
        END
        


        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        resultquery = result.recordset[0].TaskNotFound;
        if(resultquery===undefined)
        {
                let dtotask = new DTOTask();   
                this.getInformation(dtotask,result.recordset[0]);
                resultquery=dtotask;

        }
        return resultquery;
        
    }
    static  getTaskByStatus=async(Status="")=>
    {
        let arrayn=[];

        let queryinsert = `

    
                SELECT 
                T.ID_task, 
                T.ID_project,
                T.Task_name,
                T.Descriptionn,
                T.Start_datee,
                T.End_date,
                T.Statuss,
                T.Task_owner,
                T.Priorityy,
                T.Hours_estimate,
                P.Project_name
                FROM Tasks T
                INNER JOIN Projects P ON T.ID_project = P.ID_project
                WHERE T.Statuss like '%${Status}%' ;


        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getTaskByBetweenId=async(id1=0,id2=99999)=>
    {
        let arrayn=[];

        let queryinsert = `

                declare @id1 int=${id1};
                declare @id2 int=${id2};

                SELECT 
                T.ID_task, 
                T.ID_project,
                T.Task_name,
                T.Descriptionn,
                T.Start_datee,
                T.End_date,
                T.Statuss,
                T.Task_owner,
                T.Priorityy,
                T.Hours_estimate,
                P.Project_name
                FROM Tasks T
                INNER JOIN Projects P ON T.ID_project = P.ID_project
                WHERE
                T.ID_task
                between @id1 and @id2

        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getTaskByOwnerName=async(Ownername="")=>
        {
            let arrayn=[];

            let queryinsert = `
    
            SELECT 
            T.ID_task, 
            T.ID_project,
            T.Task_name,
            T.Descriptionn,
            T.Start_datee,
            T.End_date,
            T.Statuss,
            T.Task_owner,
            T.Priorityy,
            T.Hours_estimate,
            P.Project_name
            FROM Tasks T
            INNER JOIN Projects P ON T.ID_project = P.ID_project
            WHERE T.Task_owner like '%${Ownername}%' ;

            `
            let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtotask = new DTOTask();   
                this.getInformation(dtotask,re);
                arrayn.push(dtotask);
            }
            return arrayn;
            
    }
    static  getTasksHighPriority=async()=>
    {
        let arrayn=[];

        let queryinsert = `
  
        SELECT 
        T.ID_task, 
        T.ID_project,
        T.Task_name,
        T.Descriptionn,
        T.Start_datee,
        T.End_date,
        T.Statuss,
        T.Task_owner,
        T.Priorityy,
        T.Hours_estimate,
        P.Project_name
        FROM Tasks T
        INNER JOIN Projects P ON T.ID_project = P.ID_project
         WHERE T.Priorityy = 'High'

        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getTasksMediumPriority=async()=>
    {
        let arrayn=[];

        let queryinsert = `
  
        SELECT 
        T.ID_task, 
        T.ID_project,
        T.Task_name,
        T.Descriptionn,
        T.Start_datee,
        T.End_date,
        T.Statuss,
        T.Task_owner,
        T.Priorityy,
        T.Hours_estimate,
        P.Project_name
        FROM Tasks T
        INNER JOIN Projects P ON T.ID_project = P.ID_project
         WHERE T.Priorityy = 'Medium'

        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getTasksLowPriority=async()=>
    {
        let arrayn=[];

        let queryinsert = `
  
        SELECT 
        T.ID_task, 
        T.ID_project,
        T.Task_name,
        T.Descriptionn,
        T.Start_datee,
        T.End_date,
        T.Statuss,
        T.Task_owner,
        T.Priorityy,
        T.Hours_estimate,
        P.Project_name
        FROM Tasks T
        INNER JOIN Projects P ON T.ID_project = P.ID_project
         WHERE T.Priorityy = 'Low'

        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getTasksByDateRange=async(start_date,end_date)=>
    {
        let arrayn=[];

        let queryinsert = `
  
        SELECT 
        T.ID_task, 
        T.ID_project,
        T.Task_name,
        T.Descriptionn,
        T.Start_datee,
        T.End_date,
        T.Statuss,
        T.Task_owner,
        T.Priorityy,
        T.Hours_estimate,
        P.Project_name
        FROM Tasks T
        INNER JOIN Projects P ON T.ID_project = P.ID_project
        WHERE  T.Start_datee BETWEEN @StartDate AND @EndDate

        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .input('StartDate', Date,start_date)
        .input('EndDate', Date, end_date)
      
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getTasksOverdue=async()=>
    {
        let arrayn=[];

        let queryinsert = `
  
        SELECT 
        T.ID_task, 
        T.ID_project,
        T.Task_name,
        T.Descriptionn,
        T.Start_datee,
        T.End_date,
        T.Statuss,
        T.Task_owner,
        T.Priorityy,
        T.Hours_estimate,
        P.Project_name
        FROM Tasks T
        INNER JOIN Projects P ON T.ID_project = P.ID_project
        WHERE T.End_date < GETDATE() AND T.Statuss <> 'Completed'

        `
        let pool = await Conection.conection();
        const result = await pool.request()
       
      
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getTasksSearchNameDesc=async(taskname="",taskdesc="")=>
    {
        let arrayn=[];

        let queryinsert = `
  
        SELECT 
        T.ID_task, 
        T.ID_project,
        T.Task_name,
        T.Descriptionn,
        T.Start_datee,
        T.End_date,
        T.Statuss,
        T.Task_owner,
        T.Priorityy,
        T.Hours_estimate,
        P.Project_name
        FROM Tasks T
        INNER JOIN Projects P ON T.ID_project = P.ID_project
        WHERE  
        T.Task_name LIKE '%${taskname}%'
        AND T.Descriptionn LIKE '%${taskdesc}%'

        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getAssignedTasks=async(idmember)=>
    {
        let arrayn=[];

        let queryinsert = `
  
        SELECT 
        T.ID_task, 
        T.ID_project,
        T.Task_name,
        T.Descriptionn,
        T.Start_datee,
        T.End_date,
        T.Statuss,
        T.Task_owner,
        T.Priorityy,
        T.Hours_estimate,
        P.Project_name,
        M.First_name,
        M.Last_name
        FROM Tasks T
        JOIN Assignments A ON T.ID_task = A.ID_task
        JOIN Members M ON A.ID_member = M.ID_member
        JOIN Projects P ON T.ID_project = P.ID_project
        WHERE
        M.ID_member = ${idmember}
       
        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getTaskProgress=async(idtask)=>
    {
        let resultquery;

        let queryinsert = `
  
        declare @TaskID INT=${idtask}

        SELECT (SUM(A.Worked_hours) * 100) / T.Hours_estimate
         AS Progress
        FROM Tasks T
        JOIN Assignments A ON T.ID_task = A.ID_task
        WHERE T.ID_task = @TaskID
        GROUP BY T.Hours_estimate
       
        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        resultquery = result.recordset[0].Progress;
        pool.close();
        return resultquery;
        
    }
    static  getTasksByDepartment=async(departament)=>
    {
        let arrayn=[];

        let queryinsert = `

        SELECT 
        T.ID_task, 
        T.ID_project,
        T.Task_name,
        T.Descriptionn,
        T.Start_datee,
        T.End_date,
        T.Statuss,
        T.Task_owner,
        T.Priorityy,
        T.Hours_estimate,
        P.Project_name,
        M.First_name,
        M.Last_name
        FROM Tasks T
        INNER JOIN Projects P ON T.ID_project = P.ID_project
        INNER JOIN Assignments A ON T.ID_task = A.ID_task
        INNER JOIN Members M ON A.ID_member = M.ID_member
        WHERE M.Department = '${departament}'

        `
          let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getTasksGanttChart=async(idproject)=>
    {
        let arrayn=[];

        let queryinsert = `

        declare @ProjectID INT=${idproject}

        SELECT 
        T.ID_task, 
        T.ID_project,
        T.Task_name,
        T.Descriptionn,
        T.Start_datee,
        T.End_date,
        T.Statuss,
        T.Task_owner,
        T.Priorityy,
        T.Hours_estimate
        FROM Tasks T
        WHERE T.ID_project = @ProjectID
        ORDER BY T.Start_datee ASC

        `
          let pool = await Conection.conection();
        const result = await pool.request()
        .query(queryinsert)
        for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
        return arrayn;
        
    }
    static  getTasksUnfinished=async()=>
    {
        let arrayn=[];
        let queryinsert = `

        SELECT 
        DISTINCT
        T.ID_task, 
        T.ID_project,
        T.Task_name,
        T.Descriptionn,
        T.Start_datee,
        T.End_date,
        T.Statuss,
        T.Task_owner,
        T.Priorityy,
        T.Hours_estimate
        FROM Tasks T
        INNER JOIN Assignments
         ON T.ID_task = Assignments.ID_task
        WHERE T.Statuss <> 'Completed';

        `
        let pool = await Conection.conection();
         const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
         return arrayn;
        
    }
    static  getTasksUnassigned=async()=>
    {
        let arrayn=[];
        let queryinsert = `

        SELECT 
        DISTINCT
        T.ID_task, 
        T.ID_project,
        T.Task_name,
        T.Descriptionn,
        T.Start_datee,
        T.End_date,
        T.Statuss,
        T.Task_owner,
        T.Priorityy,
        T.Hours_estimate
        FROM Tasks T
        INNER JOIN Assignments
         ON T.ID_task = Assignments.ID_task
        WHERE T.Statuss <> 'Completed';

        `
        let pool = await Conection.conection();
         const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtotask = new DTOTask();   
            this.getInformation(dtotask,re);
            arrayn.push(dtotask);
        }
         return arrayn;
        
    }
    //GET INFORMATION 

    static getInformation(dtotask,result)
    {
        dtotask.ID_task = result.ID_task;
        dtotask.Task_name = result.Task_name;
        dtotask.Descriptionn = result.Descriptionn;
        dtotask.Start_datee = result.Start_datee;
        dtotask.End_date = result.End_date;
        dtotask.Statuss = result.Statuss;
        dtotask.Task_owner = result.Task_owner;
        dtotask.Priorityy = result.Priorityy;
        dtotask.Hours_estimate = result.Hours_estimate;
        dtotask.ID_project = result.ID_project;
        dtotask.Project_name = result.Project_name;
        dtotask.First_name = result.First_name;
        dtotask.Last_name = result.Last_name;
   
    }
    
}
module.exports = { DataTask };