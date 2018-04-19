$(document).ready(function($){     
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });       
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');    
        $('.collapse.in').toggleClass('in');
         $('a[aria-expanded=true]').attr('aria-expanded', 'false');    
    });    

   

    $('.droppable-item').droppable({        
        tolerance: 'touch',
        drop: handleCardDrop2,        
    });     
    $.each(JSON.parse(localStorage.getItem("schemas")),function(index,databaseName){
        $("#db-schemas").append('<option value="'+databaseName.Database+'">'+databaseName.Database+'</option>');        
    });    
    $('.selectpicker').selectpicker('refresh');

});

$("#db-schemas").change(function () {
    var selectedText = $(this).find("option:selected").text();
    var selectedValue = $(this).val();
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:$(this).val()
});

con.connect(function(err) {
  if (err){
      console.log("error",err);
  }else{
      con.query("SHOW Tables;", function (err, result, fields) {
        if (err) {
            console.log("error");
        }   
        $('#tableNames-list').empty();     
        $.each(result,function(index,tableNames){            
            $('#tableNames-list').append('<li><a href="#" class="draggable-item"><p style="border: dotted 1px black">'+tableNames.Tables_in_lms+'</p></a></li>');            
        });
        $('.draggable-item').draggable({        
            cursor: 'move',
            helper: 'clone',        
            revert: true
        });
      });
  }
}); 
});

function handleCardDrop2(event, ui) {    
    if (true) {
        $('.droppable-item').empty();
        var $dragged = ui.draggable,
            $draggedClone = $dragged.clone(),
            $target = $(event.target);
        $draggedClone.position({
            of: $(this),
            my: 'left top',
            at: 'left top'
        }).css({
            position: 'absolute',
            display: 'block',
            margin: '0 auto'
        });
        ui.draggable.draggable('option', 'revert', false);
        $('body').append($draggedClone);    
        console.log(ui.draggable[0].text);    
        buildquery(ui.draggable[0].text);
    }    
}

function buildquery(tableName){
    console.log(tableName);
    var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:"lms"
});
con.connect(function(err) {
    if (err){
        console.log("error",err);
    }else{
        con.query("DESCRIBE "+ tableName+";", function (err, result, fields) {
          if (err) {
              console.log("error");
          }          
          console.log(result);
          createQuery(result,tableName)
        });
    }
  });
}



function createQuery(columnsList,tableName){
    var query='select ';
    $.each(columnsList,function(index,tableNames){         
         query +=tableNames.Field +",";
    });
    query= query.substring(0, query.length - 1);
    query+= " from "+tableName;    
    $('#query-output').empty();
    $('#query-output').append(query);
}
