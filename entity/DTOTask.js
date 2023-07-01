
 class DTOTask
 {
 
    ID_task=0;
    Task_name="";
    Descriptionn="";
    Start_datee=new Date();
    End_date=new Date();
    Statuss="";
    Task_owner="";
    Priorityy=""; 
    Hours_estimate=0;

    ID_project=0;
    Project_name="";
     constructor()
     {  
         
     }
      
 }
 module.exports = { DTOTask };