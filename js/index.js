//exemple long
$( document ).ready(function() {
  $('#m_template').load('./m.template.html');
  $('#m_broker').load('./m.broker.html');
  $('#m_trucker').load('./m.trucker.html');
  $('#m_c').load('./m.c.html');
  $('#m_t').load('./m.t.html');
  $('#m_e').load('./m.e.html');
  $('#m_admin').load('./m.admin.html');
});

function KeyPress(e) {
  var evtobj = window.event ? event : e
  if (evtobj.keyCode == 65 && evtobj.shiftKey) $('#m_admin').modal('show');
}
document.onkeydown = KeyPress;

//exemple court
$(function() {
  console.log( "ready!" );
});

// Animation index.html
$(".arrow-card" ).click(function() {
  $(this).fadeOut(100);
  $(this).fadeIn(100);
});