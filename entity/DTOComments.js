class DTOComments
{

    ID_comment =0;
    
    ID_task=0;
    Task_name="";

    ID_member=0;
    Member_First_name="";
    Member_Last_name= "";
    
    Comment_date=new Date();
    Content="";
   
 
     constructor()
     {  
         
     }
}
module.exports = { DTOComments };