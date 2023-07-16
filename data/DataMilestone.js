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
       static  updateNameDescriptionMilestone=async(idmilestone,milestonename,description)=>
       {
          
           let resultquery;
           let queryinsert = `
   
               declare @ID_milestone int = ${idmilestone};
               declare @Milestone_name VARCHAR(100) = '${milestonename}';
               declare @Descriptionn VARCHAR(255) = '${description}';
   
                IF NOT EXISTS (SELECT ID_milestone 
                   FROM Milestones WHERE ID_milestone = @ID_milestone)
                BEGIN
                    SELECT -1 AS notexistidmilestone
                END
                ELSE
                BEGIN
                   UPDATE Milestones SET
                   Milestone_name = @Milestone_name,
                   Descriptionn = @Descriptionn
                   WHERE ID_milestone = @ID_milestone;
   
                   select 1 as updatesucess
                END
   
             `;
               let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
               resultquery = result.recordset[0].notexistidmilestone;
               if(resultquery===undefined)
               {  
                   resultquery = result.recordset[0].updatesucess;
               }
           pool.close();
           return resultquery;
           
       }
        static  updateDateMilestone=async(idmilestone,Datee)=>
        {
        
            let resultquery;
            let queryinsert = `

        
            declare @ID_milestone int = ${idmilestone};
        
            IF NOT EXISTS (SELECT ID_milestone 
                FROM Milestones WHERE ID_milestone = @ID_milestone)
            BEGIN
                SELECT -1 AS notexistidmilestones
            END
            ELSE
            BEGIN
                UPDATE Milestones SET
                Datee = @Datee
                WHERE ID_milestone = @ID_milestone;

                select 1 as updatesucess
            END

            `;
                let pool = await Conection.conection();
                const result = await pool.request()
                .input('Datee', Date,Datee)
                .query(queryinsert)
                resultquery = result.recordset[0].notexistidmilestones;
                if(resultquery===undefined)
                {        
                    resultquery = result.recordset[0].updatesucess;
                }
            pool.close();
            return resultquery;
            
        }
        static  completeMilestone=async(idmilestone)=>
        {
        
            let resultquery;
            let queryinsert = `

        
            declare @ID_milestone int = ${idmilestone};
        
            IF NOT EXISTS (SELECT ID_milestone 
                FROM Milestones WHERE ID_milestone = @ID_milestone)
            BEGIN
                SELECT -1 AS notexistidmilestones
            END
            ELSE
            BEGIN
                UPDATE Milestones SET
                statuss = 'Completed'
                WHERE ID_milestone = @ID_milestone;

                select 1 as updatesucess
            END

            `;
                let pool = await Conection.conection();
                const result = await pool.request()
                .query(queryinsert)
                resultquery = result.recordset[0].notexistidmilestones;
                if(resultquery===undefined)
                {        
                    resultquery = result.recordset[0].updatesucess;
                }
            pool.close();
            return resultquery;
            
        }
        static  onholdMilestone=async(idmilestone)=>
        {
        
            let resultquery;
            let queryinsert = `

        
            declare @ID_milestone int = ${idmilestone};
        
            IF NOT EXISTS (SELECT ID_milestone 
                FROM Milestones WHERE ID_milestone = @ID_milestone)
            BEGIN
                SELECT -1 AS notexistidmilestones
            END
            ELSE
            BEGIN
                UPDATE Milestones SET
                statuss = 'On Hold'
                WHERE ID_milestone = @ID_milestone;

                select 1 as updatesucess
            END

            `;
                let pool = await Conection.conection();
                const result = await pool.request()
            
                .query(queryinsert)
                resultquery = result.recordset[0].notexistidmilestones;
                if(resultquery===undefined)
                {        
                    resultquery = result.recordset[0].updatesucess;
                }
            pool.close();
            return resultquery;
            
        }
        static  cancelMilestone=async(idmilestone)=>
        {
        
            let resultquery;
            let queryinsert = `

        
            declare @ID_milestone int = ${idmilestone};
        
            IF NOT EXISTS (SELECT ID_milestone 
                FROM Milestones WHERE ID_milestone = @ID_milestone)
            BEGIN
                SELECT -1 AS notexistidmilestones
            END
            ELSE
            BEGIN
                UPDATE Milestones SET
                statuss = 'Canceled'
                WHERE ID_milestone = @ID_milestone;

                select 1 as updatesucess
            END

            `;
                let pool = await Conection.conection();
                const result = await pool.request()
                .query(queryinsert)
                resultquery = result.recordset[0].notexistidmilestones;
                if(resultquery===undefined)
                {        
                    resultquery = result.recordset[0].updatesucess;
                }
            pool.close();
            return resultquery;
            
        }
}

module.exports = { DataMilestone };