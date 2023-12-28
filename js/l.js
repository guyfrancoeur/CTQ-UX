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
      $("#cinvalidMessage").show();
      $("#cpassword, #cemail").addClass("is-invalid");
    }
    else{
      $("#cinvalidMessage").hide();
      $("#cpassword, #cemail").addClass("is-valid");
    }
    
    var currentURL = window.location.href;
    var typeLogin = currentURL.substr(currentURL.length - 1); // 0 = Créateur de chargement | 1 = Transporteur
    
    if (typeLogin == 0) $("#formlogin").attr("action","https://www.salutem.co/CTQ-UX/d.html");
    if (typeLogin == 1) $("#formlogin").attr("action","https://www.salutem.co/CTQ-UX/t.html");

    return result;
}
$( document ).ready(function() {
  var currentURL = window.location.href;
  var typeLogin = currentURL.substr(currentURL.length - 1); // 0 = Créateur de chargement | 1 = Transporteur
  console.log(currentURL);
  console.log(typeLogin);
});

// Retirer input invalide quand la valeur est changée
$("#cpassword, #cemail").change(function() {
  if($(this).val() != ""){
    $(this).removeClass("is-invalid");
    $("#cinvalidMessage").hide();
  }
});

// Mot de passe caché/visible (bouton oeil)
$(document).ready(function() {
  $("#beyeslash").hide();
});
$("#beye").click(function(){
  $("#cpassword").attr('type',"text");
  $("#beye").hide();
  $("#beyeslash").show();
});
$("#beyeslash").click(function(){
  $("#cpassword").attr('type',"password");
  $("#beyeslash").hide();
  $("#beye").show();
});