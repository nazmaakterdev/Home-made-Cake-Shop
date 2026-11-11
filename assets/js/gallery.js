
// ===================================
// ROSY GALLERY CAROUSEL
// ===================================

const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".carousel-dot");

const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");

let currentSlide = 0;
let carouselTimer;


// CHECK CAROUSEL ELEMENTS

if (slides.length > 0 && prevBtn && nextBtn && dots.length === slides.length) {

    // SHOW SLIDE

    function showSlide(index) {

        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }


    // NEXT BUTTON

    nextBtn.addEventListener("click", function () {

        showSlide(currentSlide + 1);

        restartCarousel();

    });


    // PREVIOUS BUTTON

    prevBtn.addEventListener("click", function () {

        showSlide(currentSlide - 1);

        restartCarousel();

    });


    // DOT BUTTONS

    dots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showSlide(index);

            restartCarousel();

        });

    });


    // AUTO PLAY

    function startCarousel() {

        carouselTimer = setInterval(function () {

            showSlide(currentSlide + 1);

        }, 4000);

    }


    // RESTART CAROUSEL

    function restartCarousel() {

        clearInterval(carouselTimer);

        startCarousel();

    }

    startCarousel();

}
