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
  var inputPassword = $("cpassword").val();
  console.log("enter");
  $.ajax({
      url: "./data/login.json",
      dataType: "json",
      success:function(data){
      	console.log("success1");
        $.each(data.login, function(index, x) {
        	if((inputEmail == x.cemail) && (inputPassword == x.cpassword)){
            console.log("success2");
            result = true;
          }
        });
        result = false
      },
      error:function(xhr, ajaxOptions, thrownError){
        console.log('error');
        console.log(thrownError);
      }
    });
    return result;
}
