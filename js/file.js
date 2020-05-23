/* ********* Languages ********* */

$(function() {
	$('.translate').click(function() {
    var lang = $(this).attr('id');
    $.ajax({
	    url: "./data/" + lang + ".json",
	    dataType: "json",
	    success:function(data){
	    	
				$.each(data, function(index, x) {
					$(x.obj).text(x.value);
					$(x.obj).attr('placeholder', x.value);
					console.log($(x.obj).attr('title'));
					//$(x.obj).attr('title', x.value);
					$(x.obj).prop('title', x.value);
					console.log($(x.obj).attr('title'));
				});
	    },
	    error:function(xhr, ajaxOptions, thrownError){
	  	  console.log('error');
	      console.log(thrownError);
	    }
	  })
	})
});



