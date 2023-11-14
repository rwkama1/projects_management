const { Date } = require("mssql");
const { DTOComments } = require("../entity/DTOComments");

const { Conection } = require("./Connection");

class DataComments
{
       //SET

       static  registerComment=async(dtocomment)=>
       {
           let {ID_task ,ID_member ,Comment_date ,
            Content}=dtocomment;
           let resultquery;
           let queryinsert = `
          
           DECLARE @ID_task INT = ${ID_task};
           DECLARE @ID_member INT = ${ID_member};
           DECLARE @Comment_date DATE = '${Comment_date}';
           DECLARE @Content VARCHAR(255) = '${Content}';
          
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
              
            INSERT INTO Comments 
            VALUES (@ID_task, @ID_member, @Comment_date, @Content);
                    
            SELECT 1 AS insertsuccess;
          
           
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
                    resultquery = result.recordset[0].insertsuccess;
                    }
               }
           pool.close();
           return resultquery;
           
       }
       static  updateComment=async(idcomment, Content)=>
       {
         
           let resultquery;
           let queryinsert = `
          
           DECLARE @ID_comment INT = ${idcomment};
           DECLARE @Content VARCHAR(255) = '${Content}';
          
           IF NOT EXISTS (SELECT 1 FROM Comments WHERE ID_comment = @ID_comment)
           BEGIN
               SELECT -1 AS CommentNotFound;
               RETURN;
           END
              
           UPDATE Comments
           SET Content = @Content
           WHERE ID_comment = @ID_comment;
                    
            SELECT 1 AS updatesuccess;
          
           
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
             
               resultquery = result.recordset[0].CommentNotFound;
                    if(resultquery===undefined)
                    {
                    resultquery = result.recordset[0].updatesuccess;
                    }
               
           pool.close();
           return resultquery;
           
       }
       static  deleteComment=async(idcomment)=>
       {
         
           let resultquery;
           let queryinsert = `
          
           DECLARE @ID_comment INT = ${idcomment};
       
           IF NOT EXISTS (SELECT 1 FROM Comments WHERE ID_comment = @ID_comment)
           BEGIN
               SELECT -1 AS CommentNotFound;
               RETURN;
           END
              
           DELETE FROM Comments
           WHERE ID_comment = @ID_comment;
                    
          SELECT 1 AS deletesuccess;
          
           
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
             
               resultquery = result.recordset[0].CommentNotFound;
                    if(resultquery===undefined)
                    {
                    resultquery = result.recordset[0].deletesuccess;
                    }
               
           pool.close();
           return resultquery;
           
       }

       //GET
       static  getCommentById=async(idcomment)=>
       {
           let resultquery;
   
           let queryinsert = `
        
                DECLARE @ID_comment INT = ${idcomment};
                IF NOT EXISTS (SELECT 1 FROM Comments WHERE ID_comment = @ID_comment)
                BEGIN
                    SELECT -1 AS CommentNotFound;
                    RETURN;
                END

               SELECT 
                    C.ID_comment,
                    C.Content,
                    C.Comment_date,

                    T.ID_task,
                    T.Task_name,
                    
                    M.ID_member, 
                    M.First_name,
                    M.Last_name               
                    FROM Comments C
                    INNER JOIN Tasks T ON C.ID_task = T.ID_task
                    INNER JOIN Members M ON C.ID_member = M.ID_member
                    WHERE C.ID_comment = @ID_comment;
           
   
           `
           let pool = await Conection.conection();
           const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].CommentNotFound;
            if(resultquery===undefined)
            {
                   let dtocomment = new DTOComments();   
                   this.getInformation(dtocomment,result.recordset[0]);
                   resultquery=dtocomment;
   
           }
        return resultquery;
           
       }
       static  getCommentsByTask=async(idtask)=>
       {
           let arrayn=[];
           let queryinsert = `
   
            DECLARE @ID_task INT =${idtask};

            SELECT 
            C.ID_comment,
            C.Content,
            C.Comment_date,

            T.ID_task,
            T.Task_name,
            
            M.ID_member, 
            M.First_name,
            M.Last_name               
            FROM Comments C
            INNER JOIN Tasks T ON C.ID_task = T.ID_task
            INNER JOIN Members M ON C.ID_member = M.ID_member
            WHERE C.ID_task = @ID_task;
   
           `
           let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtocomment = new DTOComments();   
                this.getInformation(dtocomment,re);
                arrayn.push(dtocomment);
            }
            return arrayn;
           
       }
       //GET INFORMATION
  
        static getInformation(dtocomment , result) {

            
            
            dtocomment.ID_comment = result.ID_comment;
            dtocomment.Content = result.Content;
            dtocomment.Comment_date = result.Comment_date;

            dtocomment.ID_task = result.ID_task;
            dtocomment.Task_name = result.Task_name;

            dtocomment.ID_member = result.ID_member;
            dtocomment.Member_First_name = result.First_name;
            dtocomment.Member_Last_name = result.Last_name;
        }

}
module.exports = { DataComments };