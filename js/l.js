// S�curit� login (Slider)
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
  console.log("enter");
  var result = false;
  $.ajax({
      url: "./data/login.json",
      dataType: "json",
      success:function(data){
      	console.log("success1");
      	console.log("inputEmail : " + inputEmail + " inputPassword " + inputPassword);
        $.each(data.login, function(index, x) {
        	console.log("email data : " + x.cemail + " password data : " + x.cpassword);
        	if((inputEmail == x.cemail) && (inputPassword == x.cpassword)){
            console.log("success2");
            result = true;
          }
        });
      },
      error:function(xhr, ajaxOptions, thrownError){
        console.log('error');
        console.log(thrownError);
      }
    });
    console.log(result);
    return result;
}
