const sql  = require("mssql");

 class Conection
{
     static conection=async () => {
        let sqlconfig = {
         
            user: 'rwkama72_SQLLogin_1',
            password:'ixuar41o36',
            database: 'project_management',
           server: 'project_management.mssql.somee.com',
            options: {
                    trustedConnection: false,
                    enableArithAbort: true,
                    encrypt: false
                }
            
        }
        const pool = await  sql.connect(sqlconfig);
        return pool
  
       }
}
module.exports = { Conection };