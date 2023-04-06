export function dataFormato(data) {
   var dataArray = data.split("T")[0].split("-")
   var horaArray = data.split("T")[1].split(":")
   //return parseInt(horaArray[0]) - 3 +":"+horaArray[1]
   const hora = parseInt(horaArray[0]) - 3 +":"+horaArray[1]
   const dia = dataArray[2]+"/"+ dataArray[1] +"/"+ dataArray[0] 
   return dia + " as " + hora+" h"   
}