const { Date, Int } = require("mssql");
const { DTOAssignments } = require("../entity/DTOAssignment");

const { Conection } = require("./Connection");

class DataAssignments
{
       //SET

       static  registerAssignments=async(dtoAssignments)=>
       {
           let {ID_task ,ID_member ,Assignment_date ,Worked_hours}=dtoAssignments;
           let resultquery;
           let queryinsert = `
          
           DECLARE @ID_task INT = ${ID_task};
           DECLARE @ID_member INT = ${ID_member};
           DECLARE @Assignment_date DATE = '${Assignment_date}';
           DECLARE @Worked_hours INT = ${Worked_hours};
           DECLARE @Current_date DATE = GETDATE();
           
           IF NOT EXISTS (SELECT 1 FROM Tasks WHERE ID_task = @ID_task)
           BEGIN
               SELECT -1 AS TaskNotFound;
               RETURN;
           END
           
           IF NOT EXISTS (SELECT 1 FROM Members WHERE ID_member = @ID_member)
           BEGIN
               SELECT -2 AS MemberNotFound;
               RETURN;
           END
           
           IF @Assignment_date < @Current_date
           BEGIN
               SELECT -3 AS InvalidAssignmentDate;
               RETURN;
           END

            DECLARE @Hours_estimate INT;
            DECLARE @Total_worked_hours INT;

            SELECT @Hours_estimate = Hours_estimate
            FROM Tasks
            WHERE ID_task = @ID_task;

            SELECT @Total_worked_hours = SUM(Worked_hours)
            FROM Assignments
            WHERE ID_task = @ID_task;

            IF (@Worked_hours + ISNULL(@Total_worked_hours, 0)) > @Hours_estimate
            BEGIN
                SELECT -4 AS ExceededEstimation;
                RETURN;
            END

           INSERT INTO Assignments (ID_task, ID_member, Assignment_date, Worked_hours)
           VALUES (@ID_task, @ID_member, @Assignment_date, @Worked_hours);
           
           SELECT 1 AS InsertSuccess;

             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
               resultquery = result.recordset[0].TaskNotFound;
               if(resultquery===undefined)
               {
                     resultquery = result.recordset[0].MemberNotFound;
                    if(resultquery===undefined)
                    {
                        resultquery = result.recordset[0].InvalidAssignmentDate;
                        if(resultquery===undefined)
                        {
                         resultquery = result.recordset[0].InsertSuccess;
                            if(resultquery===undefined)
                            {
                            resultquery = result.recordset[0].ExceededEstimation;
                            
                            }
                        }
                    }
               }
           pool.close();
           return resultquery;
           
       }
       static  updateAssignmentDate=async(ID_assignment,Assignment_date)=>
       {
          
           let resultquery;
           let queryinsert = `
   
                DECLARE @ID_assignment INT = ${ID_assignment};
                DECLARE @Assignment_date DATE = '${Assignment_date}';
                DECLARE @Current_date DATE = GETDATE();
           
                IF NOT EXISTS (SELECT 1 FROM Assignments WHERE ID_assignment = @ID_assignment)
                BEGIN
                    SELECT -1 AS AssignmentNotFound;
                    RETURN;
                END

                IF @Assignment_date < @Current_date
                BEGIN
                    SELECT -2 AS InvalidAssignmentDate;
                    RETURN;
                END

                UPDATE Assignments SET
                Assignment_date = @Assignment_date
                WHERE ID_assignment = @ID_assignment;
           
                SELECT 1 AS updatesucess;
   
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
               resultquery = result.recordset[0].AssignmentNotFound;
               if(resultquery===undefined)
               {  
                   resultquery = result.recordset[0].InvalidAssignmentDate;
                   if(resultquery===undefined)
                   {
                    resultquery = result.recordset[0].InsertSuccess;
                   
                   }
               }
           pool.close();
           return resultquery;
           
       }
       static  updateAssignmentWorked_hours=async(ID_assignment,Worked_hours)=>
       {
          
           let resultquery;
           let queryinsert = `
   
                DECLARE @ID_assignment INT = ${ID_assignment};
                DECLARE @Worked_hours int = '${Worked_hours}';
               
           
                IF NOT EXISTS (SELECT 1 FROM Assignments
                     WHERE ID_assignment = @ID_assignment)
                BEGIN
                    SELECT -1 AS AssignmentNotFound;
                    RETURN;
                END

                UPDATE Assignments SET
                Worked_hours = @Worked_hours
                WHERE ID_assignment = @ID_assignment;
           
                SELECT 1 AS updatesucess;
   
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
               resultquery = result.recordset[0].AssignmentNotFound;
               if(resultquery===undefined)
               {  
                    resultquery = result.recordset[0].InsertSuccess;
               }
           pool.close();
           return resultquery;
           
       }

       //GET

       static  getAssignments=async()=>
       {
           let arrayn=[];
           let queryinsert = `
   
           

            SELECT 
            A.ID_assignment,
            A.Assignment_date,
            A.Worked_hours,
            T.ID_task,
            T.Task_name,
            M.ID_member,
            M.First_name,
            M.Last_name     
            FROM Assignments A
            INNER JOIN Tasks T ON A.ID_task = T.ID_task
            INNER JOIN Members M ON A.ID_member = M.ID_member
            ORDER BY A.Assignment_date DESC;
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments();   
                this.getInformation(dtoAssignments,re);
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
       static  getAssignmentById=async(idassignment)=>
       {
           let resultquery;
   
           let queryinsert = `
   
            DECLARE @AssignmentID INT =${idassignment};

            SELECT 
            A.ID_assignment,
            A.Assignment_date,
            A.Worked_hours,
            T.ID_task,
            T.Task_name,
            M.ID_member,
            M.First_name,
            M.Last_name     
            FROM Assignments A
            INNER JOIN Tasks T ON A.ID_task = T.ID_task
            INNER JOIN Members M ON A.ID_member = M.ID_member
            WHERE A.ID_assignment = @AssignmentID;
   
           `
           let pool = await Conection.conection();
           const result = await pool.request()
            .query(queryinsert)
           
            if(resultquery===undefined)
            {
                   let dtoAssignments = new DTOAssignments();   
                   this.getInformation(dtoAssignments,result.recordset[0]);
                   resultquery=dtoAssignments;
   
           }
        return resultquery;
           
       }
       static  getAssignmentByTask=async(idtask)=>
       {
           let arrayn=[];
           let queryinsert = `
   
            DECLARE @ID_task INT =${idtask};

            SELECT 
            A.ID_assignment,
            A.Assignment_date,
            A.Worked_hours,
            T.ID_task,
            T.Task_name,
            M.ID_member,
            M.First_name,
            M.Last_name     
            FROM Assignments A
            INNER JOIN Tasks T ON A.ID_task = T.ID_task
            INNER JOIN Members M ON A.ID_member = M.ID_member
            WHERE A.ID_task  = @ID_task;
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments();   
                this.getInformation(dtoAssignments,re);
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
       static  getAssignmentByMember=async(idmember)=>
       {
           let arrayn=[];
           let queryinsert = `
   
            DECLARE @MemberID INT =${idmember};

            SELECT 
            A.ID_assignment,
            A.Assignment_date,
            A.Worked_hours,
            T.ID_task,
            T.Task_name,
            M.ID_member,
            M.First_name,
            M.Last_name     
            FROM Assignments A
            INNER JOIN Tasks T ON A.ID_task = T.ID_task
            INNER JOIN Members M ON A.ID_member = M.ID_member
            WHERE A.ID_member = @MemberID;
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments();   
                this.getInformation(dtoAssignments,re);
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
       static  getAssignmentByProject=async(idproject)=>
       {
           let arrayn=[];
           let queryinsert = `
   
            DECLARE @ProjectID INT =${idproject};

            SELECT 
            A.ID_assignment,
            A.Assignment_date,
            A.Worked_hours,
            T.ID_task,
            T.Task_name,
            M.ID_member,
            M.First_name,
            M.Last_name     
            FROM Assignments A
            INNER JOIN Tasks T ON A.ID_task = T.ID_task
            INNER JOIN Members M ON A.ID_member = M.ID_member
            WHERE T.ID_project = @ProjectID;
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments();   
                this.getInformation(dtoAssignments,re);
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
       static  getAssignmentByDepartment=async(department)=>
       {
           let arrayn=[];
           let queryinsert = `
   
            DECLARE @Department varchar(100) ='${department}';

            SELECT 
            A.ID_assignment,
            A.Assignment_date,
            A.Worked_hours,
            T.ID_task,
            T.Task_name,
            M.ID_member,
            M.First_name,
            M.Last_name     
            FROM Assignments A
            INNER JOIN Tasks T ON A.ID_task = T.ID_task
            INNER JOIN Members M ON A.ID_member = M.ID_member
            WHERE M.Department = @Department;
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments();   
                this.getInformation(dtoAssignments,re);
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
       static  getAssignmentByWorkedHours=async(workedhours)=>
       {
           let arrayn=[];
           let queryinsert = `
   
            DECLARE @WorkedHours int  =${workedhours};

            SELECT 
            A.ID_assignment,
            A.Assignment_date,
            A.Worked_hours,
            T.ID_task,
            T.Task_name,
            M.ID_member,
            M.First_name,
            M.Last_name     
            FROM Assignments A
            INNER JOIN Tasks T ON A.ID_task = T.ID_task
            INNER JOIN Members M ON A.ID_member = M.ID_member
            WHERE A.Worked_hours = @WorkedHours;
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments();   
                this.getInformation(dtoAssignments,re);
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
       static  getAssignmentByCountByMember=async()=>
       {
           let arrayn=[];
           let queryinsert = `

            SELECT 
            M.ID_member,
            M.First_name,
            M.Last_name,
            COUNT(*) AS AssignmentsCount
            FROM Assignments A
            INNER JOIN Members M ON A.ID_member = M.ID_member
            GROUP BY M.ID_member,M.First_name, M.Last_name
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments();   
                this.getInformation(dtoAssignments,re);
                dtoAssignments.AssignmentsCount = re.AssignmentsCount;
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
       static  getAssignmentByCountByTask=async()=>
       {
           let arrayn=[];
           let queryinsert = `

            SELECT 
            T.ID_task,
            T.Task_name,
            COUNT(*) AS AssignmentsCount
            FROM Assignments A
            INNER JOIN Tasks T ON A.ID_task = T.ID_task
            GROUP BY T.ID_task, T.Task_name
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments();   
                this.getInformation(dtoAssignments,re);
                dtoAssignments.AssignmentsCount = re.AssignmentsCount;
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
       static  getTotalWorkedHoursByTaskAndMember=async()=>
       {
           let arrayn=[];
           let queryinsert = `

           SELECT 
           T.ID_task,
           T.Task_name,
           M.ID_member,
           M.First_name,
           M.Last_name,
           SUM(A.Worked_hours) AS TotalWorkedHours
        FROM Assignments A
        INNER JOIN Tasks T ON A.ID_task = T.ID_task
        INNER JOIN Members M ON A.ID_member = M.ID_member
        GROUP BY 
           T.ID_task,
           T.Task_name,
           M.ID_member,
           M.First_name,
           M.Last_name;
       
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments();   
                this.getInformation(dtoAssignments,re);
                dtoAssignments.TotalWorkedHours = re.TotalWorkedHours;
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
       static  getAssignmentsBetweenWorked_hours=async(minworkedhours=0,maxworkedhours=9999)=>
       {
           let arrayn=[];
           let queryinsert = `

           SELECT 
           A.ID_assignment,
           A.Assignment_date,
           A.Worked_hours,
           T.ID_task,
           T.Task_name,
           M.ID_member,
           M.First_name,
           M.Last_name     
           FROM Assignments A
           INNER JOIN Tasks T ON A.ID_task = T.ID_task
           INNER JOIN Members M ON A.ID_member = M.ID_member
           WHERE A.Worked_hours BETWEEN @MinWorked_hours AND @MaxWorked_hours;

           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .input('MinWorked_hours', Int,minworkedhours)
            .input('MaxWorked_hours', Int, maxworkedhours)
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments();   
                this.getInformation(dtoAssignments,re);
           
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
       static  getAssignmentsStatistics=async()=>
       {
           let arrayn=[];
           let queryinsert = `
   
            SELECT 
            MIN(A.Worked_hours) AS MinWorkedHours,
            MAX(A.Worked_hours) AS MaxWorkedHours,
            AVG(A.Worked_hours) AS AvgWorkedHours,
            SUM(A.Worked_hours) AS TotalWorkedHours     
            FROM Assignments A
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments();   
                dtoAssignments.MinWorkedHours = re.MinWorkedHours;
                dtoAssignments.MaxWorkedHours = re.MaxWorkedHours;
                dtoAssignments.AvgWorkedHours = re.AvgWorkedHours;
                dtoAssignments.TotalWorkedHours = re.TotalWorkedHours;
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
      static  getTotalWorkedHoursByMember=async(idmember)=>
       {
           let arrayn=[];
           let queryinsert = `
   
           DECLARE @MemberID INT =${idmember};

           SELECT
           Assignments.ID_member,
           SUM(Worked_hours)
           AS TotalWorkedHours
           FROM Assignments
           WHERE ID_member = @MemberID
           GROUP BY Assignments.ID_member
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoAssignments = new DTOAssignments(); 
                dtoAssignments.ID_member = re.ID_member;  
                dtoAssignments.TotalWorkedHours = re.TotalWorkedHours;
                arrayn.push(dtoAssignments);
            }
            return arrayn;
           
       }
     
      //GET INFORMATION
  
     static getInformation(dtoAssignments, result) {

           
            dtoAssignments.ID_assignment = result.ID_assignment;
            dtoAssignments.Assignment_date = result.Assignment_date;
            dtoAssignments.Worked_hours = result.Worked_hours;
            dtoAssignments.ID_task = result.ID_task;
            dtoAssignments.Task_name = result.Task_name;
            dtoAssignments.ID_member = result.ID_member;
            dtoAssignments.First_name = result.First_name;
            dtoAssignments.Last_name = result.Last_name;
        }

}

module.exports = { DataAssignments };