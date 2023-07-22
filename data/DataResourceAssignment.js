
const { DTOResourceAssignment } = require("../entity/DTOResourceAssignment");
const { Conection } = require("./Connection");

class DataResourceAssignments
{
         //SET
      
         static  registerResourceAssignment=async(dtorassigment)=>
         {
             let {ID_task  ,ID_resource ,Assigned_quantity}
             =dtorassigment;
             let resultquery;
             let queryinsert = `
            
             DECLARE @ID_task INT = ${ID_task};
             DECLARE @ID_resource int = ${ID_resource};
             DECLARE @Assigned_quantity int  = ${Assigned_quantity};
             
             IF NOT EXISTS (SELECT 1 FROM Tasks WHERE ID_task = @ID_task)
             BEGIN
                 SELECT -1 AS TaskNotFound;
                 RETURN;
             END
             
             IF NOT EXISTS (SELECT 1 FROM Resources WHERE ID_resource = @ID_resource)
             BEGIN
                 SELECT -2 AS ResourceNotFound;
                 RETURN;
             END
             
             IF @Assigned_quantity < 0
             BEGIN
                 SELECT -3 AS InvalidAssignedQuantity;
                 RETURN;
             END
  
             INSERT INTO ResourceAssignments 
             VALUES (@ID_task, @ID_resource, @Assigned_quantity);

             UPDATE Resources
             SET Available_quantity = Available_quantity - @Assigned_quantity
             WHERE ID_resource = @ID_resource;

             
             SELECT 1 AS InsertSuccess;
  
               `;
               let pool = await Conection.conection();
                 const result = await pool.request()
                 .query(queryinsert)
                 resultquery = result.recordset[0].TaskNotFound;
                 if(resultquery===undefined)
                 {
                       resultquery = result.recordset[0].ResourceNotFound;
                      if(resultquery===undefined)
                      {
                          resultquery = result.recordset[0].InvalidAssignedquantity;
                          if(resultquery===undefined)
                          {
                           resultquery = result.recordset[0].InsertSuccess;
                              
                          }
                      }
                 }
             pool.close();
             return resultquery;
             
         }
 
         //GET

        static  getResourceAssignmentBetweenIds=async(id1=0,id2=99999)=>
            {

            let arrayn=[];

            let queryinsert = `

                declare @id1 int=${id1};
                declare @id2 int=${id2};

                SELECT 
                RS.ID_resource_assignment, 
                RS.ID_task,
                T.Task_name,
                RS.ID_resource,
                R.Resource_name,
                RS.Assigned_quantity
                FROM ResourceAssignments RS
                INNER JOIN Tasks T ON RS.ID_task = T.ID_task
                INNER JOIN Resources R ON RS.ID_resource = R.ID_resource
                WHERE RS.ID_resource_assignment BETWEEN @id1 AND @id2;
        
            `
            let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoresourceassignment = new DTOResourceAssignment();   
                this.getInformation(dtoresourceassignment,re);
                arrayn.push(dtoresourceassignment);
            }
            return arrayn;
            
        }
        static  getResourceAssignmentBetweenTaskIds=async(id1=0,id2=99999)=>
         {

            let arrayn=[];

            let queryinsert = `

                declare @id1 int=${id1};
                declare @id2 int=${id2};
                
                SELECT 
                RS.ID_resource_assignment, 
                RS.ID_task,
                T.Task_name,
                RS.ID_resource,
                R.Resource_name,
                RS.Assigned_quantity
                FROM ResourceAssignments RS
                INNER JOIN Tasks T ON RS.ID_task = T.ID_task
                INNER JOIN Resources R ON RS.ID_resource = R.ID_resource
                WHERE T.ID_task BETWEEN @id1 AND @id2;
        
            `
            let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtoresourceassignment = new DTOResourceAssignment();   
                this.getInformation(dtoresourceassignment,re);
                arrayn.push(dtoresourceassignment);
            }
            return arrayn;
            
        }
        static  getResourceAssignmentBetweenResourceIds=async(id1=0,id2=99999)=>
        {

           let arrayn=[];

           let queryinsert = `

               declare @id1 int=${id1};
               declare @id2 int=${id2};
               
               SELECT 
               RS.ID_resource_assignment, 
               RS.ID_task,
               T.Task_name,
               RS.ID_resource,
               R.Resource_name,
               RS.Assigned_quantity
               FROM ResourceAssignments RS
               INNER JOIN Tasks T ON RS.ID_task = T.ID_task
               INNER JOIN Resources R ON RS.ID_resource = R.ID_resource
               WHERE R.ID_resource BETWEEN @id1 AND @id2;
       
           `
           let pool = await Conection.conection();
           const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
               let dtoresourceassignment = new DTOResourceAssignment();   
               this.getInformation(dtoresourceassignment,re);
               arrayn.push(dtoresourceassignment);
           }
           return arrayn;
           
        }
        static  getResourceAssignmentBetweenQuantity=async(quantity1=0,quantity2=99999)=>
        {

           let arrayn=[];

           let queryinsert = `

               declare @quantity1 int=${quantity1};
               declare @quantity2 int=${quantity2};
               
               SELECT 
               RS.ID_resource_assignment, 
               RS.ID_task,
               T.Task_name,
               RS.ID_resource,
               R.Resource_name,
               RS.Assigned_quantity
               FROM ResourceAssignments RS
               INNER JOIN Tasks T ON RS.ID_task = T.ID_task
               INNER JOIN Resources R ON RS.ID_resource = R.ID_resource
               WHERE RS.Assigned_quantity BETWEEN @quantity1 AND @quantity2;
       
           `
           let pool = await Conection.conection();
           const result = await pool.request()
           .query(queryinsert)
           for (let re of result.recordset) {
               let dtoresourceassignment = new DTOResourceAssignment();   
               this.getInformation(dtoresourceassignment,re);
               arrayn.push(dtoresourceassignment);
           }
           return arrayn;
           
        }


        
         //GET INFORMATION
                
        static getInformation(dtoresourceassignment, result) {

            dtoresourceassignment.ID_resource_assignment = result.ID_resource_assignment;
            dtoresourceassignment.ID_task = result.ID_task;
            dtoresourceassignment.Task_name = result.Task_name;
            dtoresourceassignment.ID_resource = result.ID_resource;
            dtoresourceassignment.Resource_name = result.Resource_name;
            dtoresourceassignment.Assigned_quantity = result.Assigned_quantity;
            
        }
    
}

module.exports = { DataResourceAssignments };