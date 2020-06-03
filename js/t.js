// Edit location
function editable(x) {
  var text1 = x.prev();
  $(text1).prop('contenteditable',true);
}

$('.bset-location').click(function() {
	editable($(this));
  $(".cpostalcode").focus();
});

$(".cpostalcode").focusout(function() {
	$(this).prop('contenteditable',false);
});