$(document).ready(function($){        
    $('.selectpicker').selectpicker();
});

$("#databaseConnector").click(function(){
    var mysql = require('mysql');
    var con = mysql.createConnection({
      host: "localhost",
      user: $('#userName').val(),
      password: $('#password').val()
    });
    
    con.connect(function(err) {
      if (err){
          console.log("error");
      }else{
          con.query("SHOW DATABASES;", function (err, result, fields) {
            if (err) {
                console.log("error");
            }
            localStorage.setItem("schemas",JSON.stringify(result));
            console.log("Connected!");
            window.location='Home.html';
          });
      }
    }); 
});
