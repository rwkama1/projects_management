const { Date } = require("mssql");

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



      //GET INFORMATION
                
        static getInformation(dtomember, result) {

            dtomember.ID_member = result.ID_member;
            dtomember.First_name = result.First_name;
            dtomember.Last_name = result.Last_name;
            dtomember.Position = result.Position;
            dtomember.Department = result.Department;
            dtomember.Email = result.Email;
        }
    
}

module.exports = { DataAssignments };