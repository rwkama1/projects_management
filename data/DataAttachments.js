const { Date } = require("mssql");
const { DTOAttachments } = require("../entity/DTOAttachments");
const { Conection } = require("./Connection");

class DataAttachments
{
      //SET

      static  addAttachments=async(dtoattachments)=>
      {
          let {ID_task ,File_namee ,File_path ,
            Upload_date}=dtoattachments;
          let resultquery;
          let queryinsert = `
         
          DECLARE @ID_task INT = ${ID_task};
          DECLARE @File_namee VARCHAR(100) ='${File_namee}';
          DECLARE @File_path VARCHAR(100)  = '${File_path}';
          DECLARE @Upload_date DATE = '${Upload_date}';
         
          IF NOT EXISTS (SELECT 1 FROM Tasks WHERE ID_task = @ID_task)
          BEGIN
              SELECT -1 AS TaskNotFound;
              RETURN;
          END

            INSERT INTO Attachments (ID_task, File_namee, File_path, Upload_date)
            VALUES (@ID_task, @File_namee, @File_path, @Upload_date);
                   
           SELECT 1 AS insertsuccess;
         
          
            `;
            let pool = await Conection.conection();
              const result = await pool.request()
              .query(queryinsert)
              resultquery = result.recordset[0].TaskNotFound;
              if(resultquery===undefined)
              {   
                 resultquery = result.recordset[0].insertsuccess;
              }
          pool.close();
          return resultquery;
          
      }
      static  deleteAttachment=async(idattachment)=>
       {
         
           let resultquery;
           let queryinsert = `
          
           DECLARE @ID_attachment INT = ${idattachment};
       
           IF NOT EXISTS (SELECT 1 FROM Attachments WHERE ID_attachment = @ID_attachment)
           BEGIN
               SELECT -1 AS AttachmentNotFound;
               RETURN;
           END
              
           DELETE FROM Attachments
           WHERE ID_attachment = @ID_attachment;
                    
          SELECT 1 AS deletesuccess;
          
           
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
             
               resultquery = result.recordset[0].AttachmentNotFound;
                    if(resultquery===undefined)
                    {
                    resultquery = result.recordset[0].deletesuccess;
                    }
               
           pool.close();
           return resultquery;
           
       }

         //GET
         static  getAttachmentById=async(idattachment)=>
         {
             let resultquery;
     
             let queryinsert = `
          
                  DECLARE @ID_attachment INT = ${idattachment};
                  IF NOT EXISTS (SELECT 1 FROM Attachments WHERE ID_attachment = @ID_attachment)
                  BEGIN
                      SELECT -1 AS AttachmentNotFound;
                      RETURN;
                  END
  
                     SELECT 
                     A.ID_attachment,
                     A.File_namee,
                     A.File_path,
                     A.Upload_date,

                      T.ID_task,
                      T.Task_name
                                    
                      FROM Attachments A
                      JOIN Tasks T ON A.ID_task = T.ID_task
                      WHERE A.ID_attachment = @ID_attachment;
             
     
             `
             let pool = await Conection.conection();
             const result = await pool.request()
              .query(queryinsert)
              resultquery = result.recordset[0].AttachmentNotFound;
              if(resultquery===undefined)
              {
                     let dtoattachment = new DTOAttachments();   
                     this.getInformation(dtoattachment,result.recordset[0]);
                     resultquery=dtoattachment;
     
             }
          return resultquery;
             
         }

         static  getAttachmentByTask=async(idtask)=>
         {
          let arrayn=[];
     
             let queryinsert = `

                    DECLARE @ID_task INT =${idtask};
              
                     SELECT 
                     A.ID_attachment,
                     A.File_namee,
                     A.File_path,
                     A.Upload_date,

                      T.ID_task,
                      T.Task_name
                                    
                      FROM Attachments A
                      JOIN Tasks T ON A.ID_task = T.ID_task
                      WHERE A.ID_task = @ID_task;
             
     
             `
             let pool = await Conection.conection();
             const result = await pool.request()
              .query(queryinsert)
              for (let re of result.recordset) {
                let dtoattachment = new DTOAttachments();   
                this.getInformation(dtoattachment,re);
                arrayn.push(dtoattachment);
            }
            return arrayn;
             
         }

         //GET INFORMATION
  
        static getInformation(dtoattachment , result) {

            
            
          dtoattachment.ID_attachment = result.ID_attachment;
          dtoattachment.File_namee = result.File_namee;
          dtoattachment.File_path = result.File_path;
          dtoattachment.Upload_date = result.Upload_date;

          dtoattachment.ID_task = result.ID_task;
          dtoattachment.Task_name = result.Task_name;

          
      }

}
module.exports = { DataAttachments };