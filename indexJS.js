




function fun(){
   var search = document.getElementById("search").value;
  

   var string = ["This is Sparta","They are Sparta"];

   var re = new RegExp(search,'gi');
   var result ;

   var i;

   for(i=0;i<string.length;i++){
        result = string[i].match(re);
           document.getElementById("print").innerHTML += string[i] + "<br>";
   }

}


function checkValidation(){
  if(document.getElementById("search").value.length === 0 ){
    alert("Please Enter the Search String");
    return false;
  }

  return true;
}

function submitClick(){

  document.getElementById("print").innerHTML="";

  if(checkValidation() === true){
    readTextFile();
    }

  
}



function readTextFile(){
  var rawFile = new XMLHttpRequest();
  var file = "strings.txt";
  rawFile.open("GET",file,false);

  var search = document.getElementById("search").value.trim();
  var re = new RegExp(search,'gi');
   var result ;


  rawFile.onreadystatechange = function(){
     if(rawFile.readyState === 4 ){
        if(rawFile.status === 200 || rawFile.status === 0 ){
            var allText = rawFile.responseText;
            var lines = allText.split('\n');
             for(var i = 0; i < lines.length; i++){
                  console.log(lines[i]);
                  result = lines[i].match(re);

                  console.log(result);
                          if(result != null){
                             document.getElementById("print").innerHTML += lines[i] + "<br>";
                           }


               }
            
       
        }
     }

     
  }

  rawFile.send(null);
}

