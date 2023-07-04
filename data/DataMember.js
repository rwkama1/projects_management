const { Date } = require("mssql");

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
}

module.exports = { DataMember };