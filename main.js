document.addEventListener("DOMContentLoaded", function() {
  var menu = document.querySelector(".menu");
  var slideshowButtons = document.querySelector(".slideshow-buttons");
  var slideshow = document.querySelector(".slideshow");
  var isMenuOpen = false; // Variável para controlar o estado do menu
  var interval;

  // Código do menu mobile
  document.querySelectorAll(".sub-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var submenu = this.nextElementSibling;
      submenu.style.display = submenu.style.display === "block" ? "none" : "block";
    });
  });

  document.querySelectorAll(".more-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var moremenu = this.nextElementSibling;
      moremenu.style.display = moremenu.style.display === "block" ? "none" : "block";
    });
  });

  document.querySelector(".menu-btn").addEventListener("click", function() {
    menu.classList.add("active");
    pauseSlides();
    addSlideOverlapClass();
    slideshowButtons.classList.add("hide-buttons"); // Oculta os botões quando o menu está ativo
    isMenuOpen = true; // Define o estado do menu como aberto
  });

  document.querySelector(".close-btn").addEventListener("click", function() {
    menu.classList.remove("active");
    resumeSlides();
    removeSlideOverlapClass();
    slideshowButtons.classList.remove("hide-buttons"); // Mostra os botões quando o menu é fechado
    isMenuOpen = false; // Define o estado do menu como fechado
  });

  window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  // Código dos slides
  slideshow.addEventListener("mouseover", function() {
    if (!isMenuOpen) {
      pauseSlides();
    }
  });

  slideshow.addEventListener("mouseout", function() {
    if (!isMenuOpen) {
      resumeSlides();
    }
  });

  var changeSlideButtons = document.querySelectorAll("[data-change-slide-button]");

  changeSlideButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      var slides = document.querySelector(".slides");
      var activeSlide = slides.querySelector("[data-active]");
      var indexActiveSlide = Array.from(slides.children).indexOf(activeSlide);

      indexActiveSlide = button.dataset.changeSlideButton === "next" ? indexActiveSlide + 1 : indexActiveSlide - 1;

      if (indexActiveSlide >= slides.children.length) {
        indexActiveSlide = 0;
      }

      if (indexActiveSlide < 0) {
        indexActiveSlide = slides.children.length - 1;
      }

      activeSlide.removeAttribute("data-active");
      slides.children[indexActiveSlide].dataset.active = true;
    });
  });

  function pauseSlides() {
    clearInterval(interval);
  }

  function resumeSlides() {
    if (!isMenuOpen) {
      interval = setInterval(changeSlideAutomatically, 3000);
    }
  }

  function addSlideOverlapClass() {
    var slides = document.querySelector(".slides");
    slides.classList.add("overlap-menu");
  }

  function removeSlideOverlapClass() {
    var slides = document.querySelector(".slides");
    slides.classList.remove("overlap-menu");
  }

  function changeSlideAutomatically() {
    var slides = document.querySelector(".slides");
    var activeSlide = slides.querySelector("[data-active]");
    var indexActiveSlide = Array.from(slides.children).indexOf(activeSlide);

    indexActiveSlide = indexActiveSlide + 1;

    if (indexActiveSlide >= slides.children.length) {
      indexActiveSlide = 0;
    }

    activeSlide.removeAttribute("data-active");
    slides.children[indexActiveSlide].setAttribute("data-active", true);
  }

  menu.addEventListener("mouseenter", function() {
    isMenuOpen = true;
    pauseSlides();
    slideshowButtons.classList.add("hide-buttons");
  });

  menu.addEventListener("mouseleave", function() {
    isMenuOpen = false;
    resumeSlides();
    slideshowButtons.classList.remove("hide-buttons");
  });

  // Iniciar os slides
  interval = setInterval(changeSlideAutomatically, 3000);
});
