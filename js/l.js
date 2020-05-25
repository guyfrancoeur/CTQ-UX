// Sécurité login (Slider)
$("#nsecure").slider({tooltip: 'always'}); //a la JQuery

$("#nsecure").change(function(){
  if (parseInt(this.value) == 20) {
    $("#bsubmit").prop('disabled', false);
  }
});

// Validation login
$("#bsubmit").click(function() {
	var inputEmail = $("#cemail").val();
	var inputPassword = $("cpassword").val(); 
	$.ajax({
      url: "./data/login.json",
      dataType: "json",
      success:function(data){	
        $.each(data.login, function(index, x) {
        	if((inputEmail == x.cemail) && (inputPassword == x.cpassword)){
        		url = "http://salutem.co/CTQ-UX/d.html";
            $("#bsubmit").attr("href", url);
            return true;
          }
        });
        alert("email ou mot de passe invalide")
        return false;
      },
      error:function(xhr, ajaxOptions, thrownError){
        console.log('error');
        console.log(thrownError);
      }
    })
});
