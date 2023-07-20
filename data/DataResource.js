
const { Conection } = require("./Connection");

class DataResource
{

    //SET

    static  registerResource=async(dtoresource)=>
    {
        let {Resource_name , Descriptionn, Unit_cost
         ,Available_quantity}=dtoresource;
        let resultquery;
        let queryinsert = `
       


        DECLARE @Resource_name  VARCHAR(100) = '${Resource_name}';
        DECLARE @Descriptionn Varchar(100) = '${Descriptionn}';
        DECLARE @Unit_cost DECIMAL = ${Unit_cost};
        DECLARE @Available_quantity int = ${Available_quantity};
        

        IF @Unit_cost < 0
        BEGIN
            SELECT -1 AS errorunitcost;
            RETURN;
        END

        IF @Available_quantity < 0
        BEGIN
            SELECT -2 AS errorquantity;
            RETURN;
        END

        INSERT INTO Resources
        VALUES 
        (
         @Resource_name, 
         @Descriptionn,
          @Unit_cost, 
          @Available_quantity
         );
        
        SELECT 1 AS InsertSuccess;

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
           
            .query(queryinsert)
            resultquery = result.recordset[0].errorunitcost;
            if(resultquery===undefined)
            {                
                resultquery = result.recordset[0].errorunitcost; 
                if(resultquery===undefined)
                {                
                  resultquery = result.recordset[0].InsertSuccess; 
                           
                }    
            }
        pool.close();
        return resultquery;
        
    }
    static  updateResourceDescriptionName=async(idresource,projectname,description)=>
    {
       
        let resultquery;
        let queryinsert = `

                declare @ID_resource int = ${idresource};
                declare @Resource_name VARCHAR(100) = '${projectname}';
                declare @Descriptionn VARCHAR(255) = '${description}';

                IF NOT EXISTS (SELECT ID_resource 
                    FROM Resources WHERE ID_resource = @ID_resource)
                BEGIN
                    SELECT -1 AS notexistresource;
                    RETURN;
                END
            
                UPDATE Resources SET
                Resource_name = @Resource_name,
                Descriptionn = @Descriptionn
                WHERE ID_resource = @ID_resource;

                select 1 as updatesucess
          

          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].notexistresource;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updatesucess;
            }
        pool.close();
        return resultquery;
        
    }
    static  updateResourceUnitCost=async(idproject,unitcost)=>
    {
       
        let resultquery;
        let queryinsert = `

                declare @ID_resource int = ${idproject};
                declare @Unit_cost DECIMAL(18, 2) = ${unitcost};

                IF NOT EXISTS (SELECT ID_resource 
                    FROM Resources WHERE ID_resource = @ID_resource)
                BEGIN
                    SELECT -1 AS notexistresource;
                    RETURN;
                END
            
                UPDATE Resources SET
                Unit_cost = @Unit_cost
                WHERE ID_resource = @ID_resource;

                select 1 as updatesucess
          
          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].notexistresource;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].updatesucess;
            }
        pool.close();
        return resultquery;
        
    }
    static  addAvailableQuantity=async(idresource,quantity)=>
    {
       
        let resultquery;
        let queryinsert = `

                declare @ID_resource int = ${idresource};
                declare @Quantity int = ${quantity};

                IF NOT EXISTS (SELECT ID_resource 
                    FROM Resources WHERE ID_resource = @ID_resource)
                BEGIN
                    SELECT -1 AS notexistresource;
                    RETURN;
                END

                IF @Quantity >= (SELECT Available_quantity 
                    FROM Resources WHERE ID_resource = @ID_resource)
                BEGIN
                    SELECT -2 AS InvalidQuantity;
                    RETURN;
                END

                UPDATE Resources SET
                Available_quantity = Available_quantity - @Quantity
                WHERE ID_resource = @ID_resource;

                select 1 as updatesucess
          
          `;
          let pool = await Conection.conection();
            const result = await pool.request()
            .query(queryinsert)
            resultquery = result.recordset[0].notexistresource;
            if(resultquery===undefined)
            {  
                resultquery = result.recordset[0].InvalidQuantity;
                if(resultquery===undefined)
                {  
                    resultquery = result.recordset[0].updatesucess;
                }
            }
        pool.close();
        return resultquery;
        
    }
}
module.exports = { DataResource };