export function dataFormato(data) {
   var dataArray = data.split("T")[0].split("-")
   var horaArray = data.split("T")[1].split(":")
   //return parseInt(horaArray[0]) - 3 +":"+horaArray[1]
   const hora = (parseInt(horaArray[0]) < 3 ? parseInt(horaArray[0]) + 21 : parseInt(horaArray[0]) - 3)
   console.log(hora)
   const dia = dataArray[2]+"/"+ dataArray[1] +"/"+ dataArray[0] 
   return dia + " as " + InserirZero(hora) + hora +":"+ horaArray[1] + "h"   
}

console.log(InserirZero("0"))

function InserirZero(hora) {
   const colocarZero = [0,1,2,3,4,5,6,7,8,9]
   const res = colocarZero.find((elem, key)=>{
      if (hora === elem) {
         return true
      }
   })
   if(!res){
      return ""
   }
   return "0"
}