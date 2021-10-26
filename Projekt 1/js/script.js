document.addEventListener('scroll', function(e) {
	
	$("#debug-scroll").html (window.scrollY);
	$("#debug-container").html (document.getElementById("paralaksa-intro").offsetTop);
	
	UstawParalakse();
	
});

function UstawParalakse () {
	
	for (let i = 0; i < $(".warstwa").length; i++) {
		$(".warstwa").eq(i).css ("transform", "translate(0, " + (window.scrollY * $(".warstwa").eq(i).data("parallax-speed") - $(".warstwa").eq(i).parent().offset().top) + "px)");
		// console.log ($(".warstwa").eq(i).data("parallax"));
	}
	
}

class Parallax {
	
	
	
	constructor(obiekt, offset, szybkosc) {
		this.obiekt = obiekt;
		this.offset = offset;
		this.szybkosc = szybkosc;
	}
	
	UstawPozycje () {
		
	}
	
}