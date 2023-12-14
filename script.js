window.onload=function(){
  const responsiveMenuButton = document.getElementById("togglebtn"
  );

  const navBarLinks = document.querySelector(".navbar_link");

  responsiveMenuButton.addEventListener("click", () => {
    navBarLinks.classList.toggle("open");
    responsiveMenuButton.classList.toggle('open');
  });

  const flashcard = document.getElementById("logo");
  
  flashcard.addEventListener("click", function() {
    window.open("Flashcards.html", "_self");
  });

  const test = document.getElementById("testcontainer");

  test.addEventListener("click", function() {
    window.open("Tests.html", "_self")
  });

}

