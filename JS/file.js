/* Changement contenu*/
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
	
	/*
	var div5 = document.getElementById("div5");
	div5.style.marginTop = "-30%";
	
	
	var div6 = document.getElementById("div6");
	div6.style.marginTop = "-30%";
	*/
	
	document.getElementById("contenu").innerHTML += "<h3>Results</h3>";
	
}




var mydata = JSON.parse(data);
alert(mydata[0].name);
alert(mydata[0].age);
alert(mydata[1].name);
alert(mydata[1].age);



const json = '{"result":true, "count":42}';
const obj = JSON.parse(json);

document.write(obj.count);


