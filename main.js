$(document).ready(function() {
  // Código do menu mobile
  $(".sub-btn").click(function() {
    $(this).next(".sub-menu").slideToggle();
  });

  $(".more-btn").click(function() {
    $(this).next(".more-menu").slideToggle();
  });

  var menu = document.querySelector(".menu");
  var menuBtn = document.querySelector(".menu-btn");
  var closeBtn = document.querySelector(".close-btn");

  menuBtn.addEventListener("click", function() {
    menu.classList.add("active");
    pauseSlides();
    addSlideOverlapClass();
    slideshowButtons.classList.add('hide-buttons'); // Adicione essa linha para ocultar os botões quando o menu está ativo
  });

  closeBtn.addEventListener("click", function() {
    menu.classList.remove("active");
    resumeSlides();
    removeSlideOverlapClass();
    slideshowButtons.classList.remove('hide-buttons'); // Adicione essa linha para mostrar os botões quando o menu é fechado
  });

  window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });
});

var menu = document.querySelector('.menu');
var slideshowButtons = document.querySelector('.slideshow-buttons');

menu.addEventListener('mouseenter', function() {
  slideshowButtons.classList.add('hide-buttons');
});

menu.addEventListener('mouseleave', function() {
  slideshowButtons.classList.remove('hide-buttons');
});


// Código dos slides
var slideshow = document.querySelector('.slideshow');
var isMenuOpen = false; // Variável para controlar o estado do menu
var interval;

slideshow.addEventListener('mouseover', function() {
  if (!isMenuOpen) {
    pauseSlides();
  }
});

slideshow.addEventListener('mouseout', function() {
  if (!isMenuOpen) {
    resumeSlides();
  }
});

const changeSlideButtons = document.querySelectorAll("[data-change-slide-button]");

changeSlideButtons.forEach(button => {
  button.addEventListener("click", () => {
    const slides = document.querySelector(".slides");
    const activeSlide = slides.querySelector("[data-active]");
    let indexActiveSlide = Array.from(slides.children).indexOf(activeSlide);

    indexActiveSlide = button.dataset.changeSlideButton === "next"
    ?  indexActiveSlide + 1
    :  indexActiveSlide - 1;

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
  interval = setInterval(changeSlideAutomatically, 3000);
}

function addSlideOverlapClass() {
  const slides = document.querySelector('.slides');
  slides.classList.add('overlap-menu');
}

function removeSlideOverlapClass() {
  const slides = document.querySelector('.slides');
  slides.classList.remove('overlap-menu');
}

function changeSlideAutomatically() {
  const slides = document.querySelector('.slides');
  const activeSlide = slides.querySelector('[data-active]');
  let indexActiveSlide = Array.from(slides.children).indexOf(activeSlide);

  indexActiveSlide = indexActiveSlide + 1;

  if (indexActiveSlide >= slides.children.length) {
    indexActiveSlide = 0;
  }

  activeSlide.removeAttribute('data-active');
  slides.children[indexActiveSlide].setAttribute('data-active', true);
}

var menu = document.querySelector('.navigation');

menu.addEventListener('mouseenter', function() {
  isMenuOpen = true;
  pauseSlides();
});

menu.addEventListener('mouseleave', function() {
  isMenuOpen = false;
  resumeSlides();
});

// Iniciar os slides
interval = setInterval(changeSlideAutomatically, 3000);

