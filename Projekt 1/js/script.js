let paralaksy = new Array();

window.onload = function() {
    
	for (let i = 0; i < $(".paralaksa-kontener").length; i++) {
		paralaksy[i] = new Parallax ($(".paralaksa-kontener").eq(i));
	}
	
}

document.addEventListener('scroll', function(e) {
	Debuguj ();
	for (let i = 0; i < paralaksy.length; i++) {
		paralaksy[i].ObliczInterpolacje();
	}
});

function Debuguj () {
	$("#debug-scroll").html (window.scrollY);
	$("#debug-window-y").html ($(window).height());
	$("#debug-container-top").html ($("#paralaksa-stonks").offset().top);
	$("#debug-container-bottom").html ($("#paralaksa-stonks").offset().top + $("#paralaksa-stonks").height());
	$("#debug-position-percent").html (-(($("#paralaksa-stonks").offset().top - window.scrollY - $(window).height()) / $("#paralaksa-stonks").height() + 1));
}

function UstawParalakse () {
	
	if ($(".warstwa") != undefined) {
		for (let i = 0; i < $(".warstwa").length; i++) {
			if ($(".warstwa").eq(i).data("parallax-speed") > 0) {
				$(".warstwa").eq(i).css ("transform", "translate(0, " + (window.scrollY * $(".warstwa").eq(i).data("parallax-speed") - $(".warstwa").eq(i).parent().offset().top) + "px)");
			}
		}
	}
	
}

class Parallax {
	
	constructor (obiekt) {
		this.obiekt = obiekt;
		this.warstwy = new Array();
		this.interpolacja = 0;
		
		// odszukaj wśród swoich dzieci wszystkie klasy "warstwa"
		
		for (let i = 0; i < this.obiekt.children(".warstwa").length; i++) {
			let temp = this.obiekt.children(".warstwa").eq(i);
			this.warstwy[i] = new ParallaxLayer (this, temp, new Punkt (parseInt(temp.data("parallax-x")),parseInt(temp.data("parallax-y"))), temp.data("parallax-mode"));
		}
		
	}
	
	ObliczInterpolacje () {
		this.interpolacja = -((this.obiekt.offset().top - $(window).scrollTop() - $(window).height()) / this.obiekt.height() + 1);
		if (this.interpolacja >= -1 || this.interpolacja <= 1) { // ograniczamy wyświetlanie niewidocznych paralaks
			this.UstawParalakse ();
		}
	}
	
	UstawParalakse () {
		for (let i = 0; i < this.warstwy.length; i++) {
			this.warstwy[i].UstawPozycje();
		}
	}
	
}

class ParallaxLayer {
	
	constructor(paralaksa, obiekt, punkt, tryb) {
		this.paralaksa = paralaksa
		this.obiekt = obiekt;
		this.punkt = punkt;
		this.tryb = tryb;
	}
	
	UstawPozycje () {
		// ustaw przesunięcie korzystając z interpolacji liniowej
		if (this.tryb == "1") {  // warstwa rusza się dopóki nie dotrzemy do połowy kontenera
			
		} else { // domyślny tryb, warstwa rusza się na całej długości przewijania
			this.obiekt.css ("transform", "translate(" + this.punkt.x * this.paralaksa.interpolacja + "px, " + this.punkt.y * this.paralaksa.interpolacja + "px)");
		}
	}
	
}

class Punkt {
	
	x = 0;
	y = 0;
	
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}
	
}