
 class DTOTask
 {
 
    ID_task=0;
    ID_project=0;
    Task_name="";
    Descriptionn="";
    Start_datee=new Date();
    End_date=new Date();
    Statuss="";
    Task_owner="";
    Priorityy=""; 
    Hours_estimate=0;
 
     constructor()
     {  
         
     }
      
 }
 module.exports = { DTOTask };