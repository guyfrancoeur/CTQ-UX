/* Espace résultats */
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




/* LOGIN (modal) */
$(function(){
  $('#login-form').submit(function(e) {
    e.preventDefault()
    var $form = $(this)
    $.post($form.attr('action'), $form.serialize())
    .done(function(data) {
      $('#login').html(data)
      $('#formulaire').modal('hide')
    })
    .fail(function() {
      alert('ça ne marche pas...')
    })
  })
  $('.modal').on('shown.bs.modal', function(){
    $('input:first').focus()
  })
})

