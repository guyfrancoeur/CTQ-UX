//exemple long
$( document ).ready(function() {
  //$('#m_profil').load('../modal/m.profil.html', function () { m_profil_ready('#m_profil'); });
  $('#m_template').load('./m.template.html');
  $('#m_broker').load('./m.broker.html');
  $('#m_trucker').load('./m.trucker.html');

  // Taille card index.html
  // est utile ??
  var heightDivLogin = $('#divLogin').height();
  $('#arrow-card1').height(heightDivLogin);
  $('#arrow-card2').height(heightDivLogin);
  $('#divAdmin').height(heightDivLogin);
});

traduire();

//exemple court
$(function() {
  console.log( "ready!" );
});

// Animation index.html
$(".arrow-card" ).click(function() {
	$(this).fadeOut(100);
  $(this).fadeIn(100);
});
$(".petite-div" ).click(function() {
	$(this).fadeOut(100);
  $(this).fadeIn(100);
});