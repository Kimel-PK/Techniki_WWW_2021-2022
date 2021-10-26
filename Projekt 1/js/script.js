document.addEventListener('scroll', function(e) {
	
	$("#debug-scroll").html (window.scrollY);
	$("#debug-container").html (document.getElementById("paralaksa-intro").offsetTop);
	
	UstawParalakse();
	
});

function UstawParalakse () {
	
	for (let i = 0; i < $(".warstwa").length; i++) {
		$(".warstwa").eq(i).css ("transform", "translate(0, " + window.scrollY * $(".warstwa").eq(i).data("parallax-speed") + "px)");
		// console.log ($(".warstwa").eq(i).data("parallax"));
	}
	
}