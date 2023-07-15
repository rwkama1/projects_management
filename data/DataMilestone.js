const { Date, Int } = require("mssql");
const { DTOMilestone } = require("../entity/DTOMilestone");

const { Conection } = require("./Connection");

class DataMilestone
{

       //SET

       static  registerMilestone=async(dtomilestone)=>
       {
           let {ID_project ,Milestone_name ,Descriptionn 
            ,Datee}=dtomilestone;
           let resultquery;
           let queryinsert = `
          
           DECLARE @ID_project INT = ${ID_project};
           DECLARE @Milestone_name Varchar(100) = '${Milestone_name}';
           DECLARE @Descriptionn Varchar(255) = '${Descriptionn}';
         
        
           
           IF NOT EXISTS (SELECT 1 FROM Projects WHERE ID_project = @ID_project)
           BEGIN
               SELECT -1 AS ProjectNotFound;
               RETURN;
           END
           
           INSERT INTO Milestones
           VALUES 
           (@ID_project, 
            @Milestone_name, @Descriptionn, @Datee,'Pending');
           
           SELECT 1 AS InsertSuccess;

             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .input('Datee', Date,Datee)
               .query(queryinsert)
               resultquery = result.recordset[0].ProjectNotFound;
               if(resultquery===undefined)
               {                
                resultquery = result.recordset[0].InsertSuccess;     
               }
           pool.close();
           return resultquery;
           
       }

}

module.exports = { DataMilestone };