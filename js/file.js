/* ********* Languages ********* */
$(function() {
	$('.translate').click(function() {
    var lang = $(this).attr('id');
    console.log(lang);
    $.ajax({
	    url: "./data/" + lang + ".json",
	    dataType: "json",
	    success:function(data){
	    	console.log('success');
	    	
				// Changement des attributs :
	  	  $("#home").text(data[0].home);
	  	  $("#bsubmit").text(data[0].bsubmit);
	  	  $("#lpass").text(data[0].lpass);
	  	  $("#forgot").text(data[0].forgot);
	  	  $("#hours").text(data[0].hours);
	  	  $("#requirements").text(data[0].requirements);
	  	  $("#loading").text(data[0].loading);
	  	  $("#dimensions").text(data[0].dimensions);
	  	  $("#search").text(data[0].search);
	  	  $("#logintitle").text(data[0].logintitle);
	  	  $("#refrigerated").text(data[0].refrigerated);
	  	  
	  	  // Changement des placeholder :
	  	  $("#origin").attr('placeholder', data[0].origin);
	  	  $("#destination").attr('placeholder', data[0].destination);
	  	  $("#longueur").attr('placeholder', data[0].longueur);
	  	  $("#quantity").attr('placeholder', data[0].quantity);
	  	  $("#weight").attr('placeholder', data[0].weight);
	  	  $("#time").attr('placeholder', data[0].time);
	  	  $("#value").attr('placeholder', data[0].value);
	  	  $("#password").attr('placeholder', data[0].password);
	  	  $("width").attr('placeholder', data[0].width);
	  	  $("height").attr('placeholder', data[0].height);
	  	  
    	  // Bouton de langues :
	  	  $(".other-lang-button").click(function(){
					var val1 = $(".lang-button").text();
				 	var id1 = $(".lang-button").attr("id");
				  var val2 = $(".other-lang-button").text();
				  var id2 = $(".other-lang-button").attr("id");
				  $(".other-lang-button").text(val1);
				  $(".other-lang-button").val(val1);
				  $(".other-lang-button").attr("id",id1);
				  $(".lang-button").text(val2);
				  $(".lang-button").val(val2);
				  $(".lang-button").attr("id",id2);
				})
	    },
	    error:function(xhr, ajaxOptions, thrownError){
	  	  console.log('error');
	      console.log(thrownError);
	    }
	  })
	})
});



/* ********* Validation Formulaire ********* */
(function() {
	'use strict';
	window.addEventListener('load', function() {
		var forms = document.getElementsByClassName('needs-validation');
		var validation = Array.prototype.filter.call(forms, function(form) {
			form.addEventListener('submit', function(event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);
})();




/* ********* Sécurité Login ********* */
$("#nsecure").slider({tooltip: 'always'}); //a la JQuery

$("#nsecure").change(function(){
  if (parseInt(this.value) == 20) {
    $("#bsubmit").prop('disabled', false);
  }
});



/* ********* Espace résultats ********* */
function modify(){
	$('#container').addClass('col-12');
	$('#div1').addClass('row');
	$('#div2').addClass('col-12');
	$('#div2').addClass('col-xl-6');
	$('#div7').addClass('col-12');
	$('#div7').addClass('col-xl-6');
	$('#div3').addClass('bloc');
	$('#div3').addClass('second-bloc');
	$('#div4').addClass('interieur');
		
	document.getElementById("contenu").innerHTML += "<h3>Results</h3>";
}