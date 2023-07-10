
const { DTOMember } = require("../entity/DTOMember");
const { Conection } = require("./Connection");

class DataMember
{
       //SET

       static  registerMember=async(dtomember)=>
       {
           let {First_name ,Last_name ,Position ,Department ,
            Email}=dtomember;
           let resultquery;
           let queryinsert = `
          
           DECLARE @First_name VARCHAR(100) = '${First_name}';
           DECLARE @Last_name VARCHAR(100) = '${Last_name}';
           DECLARE @Position VARCHAR(100) = '${Position}';
           DECLARE @Department VARCHAR(100) = '${Department}';
           DECLARE @Email VARCHAR(100) = '${Email}';
           
           IF @Email LIKE '%@%.%'
               AND @Email NOT LIKE '%@%@%'
               AND @Email NOT LIKE '%..%'
               AND PATINDEX('%[^a-zA-Z0-9.@_-]%', @Email) = 0
               AND LEN(@Email) - LEN(REPLACE(@Email, '.', '')) <= 1
               AND LEN(@Email) - LEN(REPLACE(@Email, '@', '')) = 1
               AND LEN(@Email) - LEN(REPLACE(@Email, '-', '')) <= 1
               AND RIGHT(@Email, 1) != '.'
               AND CHARINDEX('.', @Email) > CHARINDEX('@', @Email) + 1
               AND CHARINDEX('@', @Email) > 1
           BEGIN
               IF EXISTS (SELECT 1 FROM Members WHERE Email = @Email)
               BEGIN
                   SELECT -2 AS duplicateemail;
               END
               ELSE
               BEGIN
                   INSERT INTO Members 
                   VALUES (@First_name, @Last_name, @Position, @Department, @Email);
                   
                   SELECT 1 AS insertsuccess;
               END
           END
           ELSE
           BEGIN
               SELECT -1 AS incorrectemail;
           END
           
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
               resultquery = result.recordset[0].incorrectemail;
               if(resultquery===undefined)
               {
               resultquery = result.recordset[0].insertsuccess;
                    if(resultquery===undefined)
                    {
                    resultquery = result.recordset[0].duplicateemail;
                    }
               }
           pool.close();
           return resultquery;
           
       }
       static  updateMemberName=async(idmember,firstname,lastname)=>
       {
          
           let resultquery;
           let queryinsert = `
   
               declare @ID_member int = ${idmember};
               declare @First_name VARCHAR(100) = '${firstname}';
               declare @Last_name VARCHAR(100) = '${lastname}';
   
                IF NOT EXISTS (SELECT ID_member 
                   FROM Members WHERE ID_member = @ID_member)
                BEGIN
                    SELECT -1 AS notexistidmember
                END
                ELSE
                BEGIN
                   UPDATE Members SET
                   First_name = @First_name,
                   Last_name = @Last_name
                   WHERE ID_member = @ID_member;
   
                   select 1 as updatesucess
               END
   
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
               resultquery = result.recordset[0].notexistidmember;
               if(resultquery===undefined)
               {  
                   resultquery = result.recordset[0].updatesucess;
               }
           pool.close();
           return resultquery;
           
       }
       static  updateMemberPosition=async(idmember,position)=>
       {
          
           let resultquery;
           let queryinsert = `
   
               declare @ID_member int = ${idmember};
               declare @Position VARCHAR(100) = '${position}';
             
   
                IF NOT EXISTS (SELECT ID_member 
                   FROM Members WHERE ID_member = @ID_member)
                BEGIN
                    SELECT -1 AS notexistidmember
                END
                ELSE
                BEGIN
                   UPDATE Members SET
                   Position = @Position
                   WHERE ID_member = @ID_member;
   
                   select 1 as updatesucess
               END
   
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
               resultquery = result.recordset[0].notexistidmember;
               if(resultquery===undefined)
               {  
                   resultquery = result.recordset[0].updatesucess;
               }
           pool.close();
           return resultquery;
           
       }
       static  updateMemberDepartament=async(idmember,departament)=>
       {
          
           let resultquery;
           let queryinsert = `
   
               declare @ID_member int = ${idmember};
               declare @Department VARCHAR(100) = '${departament}';
             
   
                IF NOT EXISTS (SELECT ID_member 
                   FROM Members WHERE ID_member = @ID_member)
                BEGIN
                    SELECT -1 AS notexistidmember
                END
                ELSE
                BEGIN
                   UPDATE Members SET
                   Department = @Department
                   WHERE ID_member = @ID_member;
   
                   select 1 as updatesucess
               END
   
             `;
             let pool = await Conection.conection();
               const result = await pool.request()
               .query(queryinsert)
               resultquery = result.recordset[0].notexistidmember;
               if(resultquery===undefined)
               {  
                   resultquery = result.recordset[0].updatesucess;
               }
           pool.close();
           return resultquery;
           
       }

       //GET

       static  getMemberById=async(id_member)=>
       {
           let resultquery;
   
           let queryinsert = `
   
           DECLARE @MemberID INT = ${id_member};

           IF NOT EXISTS (SELECT 1 FROM Members WHERE ID_member = @MemberID)
           BEGIN
               SELECT -1 AS MemberNotFound;
           END
           ELSE
           BEGIN
               SELECT 
                   M.ID_member, 
                   M.First_name,
                   M.Last_name,
                   M.Position,
                   M.Department,
                   M.Email
               FROM Members M
               WHERE ID_member = @MemberID;
           END
   
           `
           let pool = await Conection.conection();
           const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].MemberNotFound;
            if(resultquery===undefined)
            {
                   let dtomember = new DTOMember();   
                   this.getInformation(dtomember,result.recordset[0]);
                   resultquery=dtomember;
   
           }
        return resultquery;
           
       }
       static  getMemberByPosition=async(position="")=>
       {
           let arrayn=[];
   
           let queryinsert = `
     
               SELECT 
                   M.ID_member, 
                   M.First_name,
                   M.Last_name,
                   M.Position,
                   M.Department,
                   M.Email
               FROM Members M
               WHERE  M.Position like '%${position}%'
  
           `
           let pool = await Conection.conection();
           const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtomember = new DTOMember();   
                this.getInformation(dtomember,re);
                arrayn.push(dtomember);
             }
              return arrayn;
           
       }
       static  getMemberByDepartament=async(departament="")=>
       {
           let arrayn=[];
   
           let queryinsert = `
     
               SELECT 
                   M.ID_member, 
                   M.First_name,
                   M.Last_name,
                   M.Position,
                   M.Department,
                   M.Email
               FROM Members M
               WHERE  M.Department like '%${departament}%'
  
           `
           let pool = await Conection.conection();
           const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtomember = new DTOMember();   
                this.getInformation(dtomember,re);
                arrayn.push(dtomember);
             }
              return arrayn;
           
       }
       static  getMemberByName=async(firstname="",lastname="")=>
       {
           let arrayn=[];
   
           let queryinsert = `
     
               SELECT 
                   M.ID_member, 
                   M.First_name,
                   M.Last_name,
                   M.Position,
                   M.Department,
                   M.Email
               FROM Members M
               WHERE  M.First_name like '%${firstname}%'
               AND  M.Last_name LIKE '%${lastname}%'
  
           `
           let pool = await Conection.conection();
           const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtomember = new DTOMember();   
                this.getInformation(dtomember,re);
                arrayn.push(dtomember);
             }
              return arrayn;
           
       }
       static  getMemberAll=async()=>
       {
           let arrayn=[];
   
           let queryinsert = `
     
               SELECT 
                   M.ID_member, 
                   M.First_name,
                   M.Last_name,
                   M.Position,
                   M.Department,
                   M.Email
               FROM Members M
    
           `
           let pool = await Conection.conection();
           const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtomember = new DTOMember();   
                this.getInformation(dtomember,re);
                arrayn.push(dtomember);
             }
              return arrayn;
           
       }
       static  getMembersByTask=async(idtask)=>
       {
           let arrayn=[];
   
           let queryinsert = `
     
            declare @idtask int=${idtask};

            SELECT 
            M.ID_member, 
            M.First_name,
            M.Last_name,
            M.Position,
            M.Department,
            M.Email
            FROM Members M
            JOIN Assignments A ON M.ID_member = A.ID_member
            JOIN Tasks T ON A.ID_task = T.ID_task
            WHERE T.ID_task = @idtask
       
  
           `
           let pool = await Conection.conection();
           const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtomember = new DTOMember();   
                this.getInformation(dtomember,re);
                arrayn.push(dtomember);
             }
              return arrayn;
           
       }
       static  getMembersByProject=async(idproject)=>
       {
           let arrayn=[];
   
           let queryinsert = `

           declare @idproject int=${idproject};
     
            SELECT 
            M.ID_member, 
            M.First_name,
            M.Last_name,
            M.Position,
            M.Department,
            M.Email
            FROM Members M
            JOIN Assignments A ON M.ID_member = A.ID_member
            JOIN Tasks T ON A.ID_task = T.ID_task
            JOIN Projects P ON T.ID_project = P.ID_project
            WHERE P.ID_project=${idproject}
       
  
           `
           let pool = await Conection.conection();
           const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtomember = new DTOMember();   
                this.getInformation(dtomember,re);
                arrayn.push(dtomember);
             }
              return arrayn;
           
       }
     
       
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

module.exports = { DataMember };