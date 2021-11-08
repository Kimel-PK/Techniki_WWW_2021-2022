let paralaksy = new Array();

// pobierz DOM dopiero kiedy cały dokument został pobrany
$(document).ready(function() {
	
	// po załadowaniu się strony znajdź wszystkie kontenery paralaksy
	for (let i = 0; i < $(".paralaksa-kontener").length; i++) {
		paralaksy[i] = new Parallax ($(".paralaksa-kontener").eq(i));
	}
	
	for (let i = 0; i < paralaksy.length; i++) {
		paralaksy[i].ObliczInterpolacje();
	}
	
	// dodaj event uruchamiany zawsze kiedy przewijamy
	$(document).scroll(function() {
		for (let i = 0; i < paralaksy.length; i++) {
			paralaksy[i].ObliczInterpolacje();
		}
	});
	
});

// kontener paralaksy
class Parallax {
	
	constructor (obiekt) {
		this.obiekt = obiekt;
		this.warstwy = new Array();
		this.interpolacja = 0;
		
		// odszukaj wśród swoich dzieci wszystkie klasy "warstwa"
		for (let i = 0; i < this.obiekt.children(".warstwa").length; i++) {
			let temp = this.obiekt.children(".warstwa").eq(i);
			this.warstwy[i] = new ParallaxLayer (this, temp, new Punkt (parseInt(temp.data("parallax-x")),parseInt(temp.data("parallax-y"))), temp.data("parallax-unit"), temp.data("parallax-mode"));
		}
		
	}
	
	// liczy w jaki sposób kontener paralaksy jest widoczny na ekranie (-1 oznacza że kontener jest idealnie pod ekranem, 1 oznacza że idealnie ponad ekranem)
	ObliczInterpolacje () {
		this.interpolacja = -((this.obiekt.offset().top - $(window).scrollTop() - $(window).height()) / this.obiekt.height() + 1);
		if (this.interpolacja >= -1 || this.interpolacja <= 1) { // ograniczamy wyświetlanie niewidocznych paralaks
			this.UstawParalakse ();
		}
	}
	
	// ustawia wszystkie pozycje warstw
	UstawParalakse () {
		for (let i = 0; i < this.warstwy.length; i++) {
			this.warstwy[i].UstawPozycje();
		}
	}
	
}

// warstwa paralaksy
class ParallaxLayer {
	
	constructor(paralaksa, obiekt, punkt, jednostka = "px", tryb) {
		this.paralaksa = paralaksa
		this.obiekt = obiekt;
		this.punkt = punkt;
		this.jednostka = jednostka;
		this.tryb = tryb;
	}
	
	UstawPozycje () {
		// ustaw przesunięcie korzystając z interpolacji liniowej
		if (this.tryb == "1") {  // warstwa rusza się dopóki nie dotrzemy do połowy kontenera
			let tempInterpolacja;
			if (this.paralaksa.interpolacja + 1 > 1) {
				tempInterpolacja = 0;
			} else {
				tempInterpolacja = -this.paralaksa.interpolacja;
			}
			this.obiekt.css ("transform", "translate(" + (this.punkt.x * tempInterpolacja) + this.jednostka + ", " + (this.punkt.y * tempInterpolacja) + this.jednostka + ")");
		} else { // domyślny tryb, warstwa rusza się na całej długości przewijania
			this.obiekt.css ("transform", "translate(" + (this.punkt.x * this.paralaksa.interpolacja) + this.jednostka + ", " + (this.punkt.y * this.paralaksa.interpolacja) + this.jednostka + ")");
		}
	}
	
}

// reprezentuje dowolny punkt w przestrzeni
class Punkt {
	
	x = 0;
	y = 0;
	
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}
	
}