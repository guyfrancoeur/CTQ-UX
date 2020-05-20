/* ********* Languages ********* */

$(function() {
	$('.translate').click(function() {
    var lang = $(this).attr('id');
    console.log(lang);
    $.ajax({
	    //url: "./data/" + lang + ".json",
	    url: "./data/fr.json",
	    dataType: "json",
	    success:function(data){
	    	console.log('success');
	    	
				$.each(data, function(index, x) {
					console.log("objet :" + x.obj + " value : " + x.value);
					(x.obj).text(x.value);
				});

	    },
	    error:function(xhr, ajaxOptions, thrownError){
	  	  console.log('error');
	      console.log(thrownError);
	    }
	  })
	})
});


/*
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
	  	  $("#getquote").text(data[0].search);
	  	  $("#logintitle").text(data[0].logintitle);
	  	  $("#refrigerated").text(data[0].refrigerated);
	  	  $("#cmev").text(data[0].cmev);
	  	  $("#cTextA").text(data[0].cTextA);
	  	  $("#cTextB").text(data[0].cTextB);
	  	  $("#cTextC").text(data[0].cTextC);
	  	  $("#cCout").text(data[0].cCout);
	  	  $("#cterms").text(data[0].cCout);

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
	  	  $("duree").attr('placeholder', data[0].duree);
	  	  $("#montant").attr('placeholder', data[0].montant);
	  	  $("duree2").attr('placeholder', data[0].duree2);
	    },
	    error:function(xhr, ajaxOptions, thrownError){
	  	  console.log('error');
	      console.log(thrownError);
	    }
	  })
	})
});
*/




