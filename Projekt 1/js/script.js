document.addEventListener('scroll', function(e) {
	
	$("#debug-scroll").html (window.scrollY);
	$("#debug-container").html (document.getElementById("paralaksa-intro").offsetTop);
	
	document.getElementById("warstwa-intro-3").style.transform = "translate(0, " + window.scrollY * 0.25 + "px)";
	document.getElementById("warstwa-intro-2").style.transform = "translate(0, " + window.scrollY * 0.1 + "px)";
	document.getElementById("warstwa-intro-1").style.transform = "translate(0, " + window.scrollY * 0.05 + "px)";
	
});