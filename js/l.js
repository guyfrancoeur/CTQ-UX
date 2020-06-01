// Sécurité login (Slider)
$("#nsecure").slider({tooltip: 'always'}); //a la JQuery

$("#nsecure").change(function(){
  if (parseInt(this.value) == 20) {
    $("#bsubmit").prop('disabled', false);
  }
});

// Validation login
function verificationLogin(){
  var inputEmail = $("#cemail").val();
  var inputPassword = $("#cpassword").val();
  var result = false;
  $.ajax({
      url: "./data/login.json",
      dataType: "json",
      async: false,
      success:function(data){
        $.each(data.login, function(index, x) {
        	if((inputEmail == x.cemail) && (inputPassword == x.cpassword)){
            result = true;
          }
        });
      },
      error:function(xhr, ajaxOptions, thrownError){
        console.log('error');
        console.log(thrownError);
      }
    });
    if(result == false){
    	$("#cinvalidMessage").addClass("alert-danger");
    	$("#cinvalidMessage").html("<i class='fas fa-exclamation-circle'></i> This email or this password is invalid.");
    }
    else{
    	$("#cinvalidMessage").text("");
    }
    return result;
}

$( document ).ready(function() {
  console.log("doc is ready!");
  $('[data-toggle="tooltip"]').tooltip();
});
