let lazyloaded = new Array();

window.onload = function() {
    
	// po załadowaniu się strony znajdź wszystkie obiekty do zanimowania
	for (let i = 0; i < $(".lazyload").length; i++) {
		lazyloaded[i] = new LazyLoad ($(".lazyload").eq(i));
	}
	
	for (let i = 0; i < lazyloaded.length; i++) {
		lazyloaded[i].Sprawdz();
	}
	
}

document.addEventListener('scroll', function(e) {
	for (let i = 0; i < lazyloaded.length; i++) {
		if (lazyloaded[i].ObliczInterpolacje()) {
			console.log ("odtworzono animację, usuwanie referencji");
			lazyloaded.remove(i);
		}
	}
});

class LazyLoad {
	
	constructor (obiekt) {
		this.obiekt = obiekt;
	}
	
	// sprawdź czy obiekt można zanimować
	Sprawdz() {
		
		return true;
	}
	
	// liczy w jaki sposób kontener paralaksy jest widoczny na ekranie (-1 oznacza że kontener jest idealnie pod ekranem, 1 oznacza że idealnie ponad ekranem)
	ObliczInterpolacje () {
		this.interpolacja = -((this.obiekt.offset().top - $(window).scrollTop() - $(window).height()) / this.obiekt.height() + 1);
		if (this.interpolacja >= -1 || this.interpolacja <= 1) { // ograniczamy wyświetlanie niewidocznych paralaks
			this.UstawParalakse ();
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