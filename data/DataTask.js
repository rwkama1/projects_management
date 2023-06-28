const { Date } = require("mssql");

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
  
  
    //GET INFORMATION
            
   

}
module.exports = { DataTask };