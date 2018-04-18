$(document).ready(function(){
  let response = "";
  const util = require('util');
  var exec = require('child_process').exec;
  const exc = util.promisify(exec);
  exc('mysql --version').then((stats) => {
    if(stats.substring(0,5)=='mysql'){
        $('#databases').append('<option>MySQL</option>');
        $('#databases').selectpicker('refresh');
        $('#connectDb').hide();
    }
  }).catch((error) => {
    console.log(error);
    // Handle the error.
  });
  exc('mongod --version').then((stats) => {
    if(stats.substring(0,10)=='db version'){
        $('#databases').append('<option>MongoDB</option>');
        $('#databases').selectpicker('refresh');
        $('#connectDb').hide();
    }
  }).catch((error) => {
    console.log(error);
    // Handle the error.
  });

  $('#databases').on('change',function(){
    $('#connectDb').show();
  });
});
