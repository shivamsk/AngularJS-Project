
var app = angular.module('app',[]);




angular.module('app').directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

app.controller('BodyCtrl',['$scope',
  function($scope){

    $scope.submit = function(){
      //document.getElementById("print").innerHTML=""; 
      $scope.printMessage = "";

      if(checkValidation() === true  ){
        readTextFile();
      }
    };

    var checkValidation =function(){
    if(document.getElementById("search").value.length === 0 ){
       // var len = ($scope.message).length;

      //console.log("Length is " + len);
     // if( len === 0){
        alert("Please Enter the Search String");
        return false;
      }

      return true;
    };

    
    var readTextFile = function(){
      var rawFile = new XMLHttpRequest();
      var file = "strings.txt";
      rawFile.open("GET",file,false);

      //var search = document.getElementById("search").value.trim();
      var search = ($scope.message + '').trim();

      console.log('Search is ' + search.length);

      if(search.length != 0){
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
             //document.getElementById("print").innerHTML += lines[i] + "<br>";
             $scope.printMessage += lines[i] + "<br>";
           }


         }
         
         
       }
     }

     
   }

 }

   rawFile.send(null);
 }

}]);