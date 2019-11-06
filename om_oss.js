//Finner alle kolonnelementer, og hoyden til elementene
var kolonner = document.getElementsByClassName("kolonne");
var kolHeight = kolonner[1].offsetHeight;

//Sjekker om elementet er i vinduet til enheten
function inViewport(element) {
   var pos = element.getBoundingClientRect();
   var vinduhoyde = window.innerHeight;

   var minGap = vinduhoyde - kolHeight - (vinduhoyde/20);
   // Returnerer true hvis hele kolonneelementet f√•r plass i viewport
   return (pos.top < minGap && pos.top > 0);
}

document.addEventListener('scroll', function sjekkElement(event) {
   for (var i = 0; i < kolonner.length; i++) {
      if (inViewport(kolonner[i]) && !kolonner[i].classList.contains("desktop_only")) {
	 if (!(kolonner[i].classList.contains("visTekst"))) {
	    kolonner[i].classList.add("visTekst");
	 }
      } else {
	 kolonner[i].classList.remove("visTekst");
      }
   }
});

