document.addEventListener("DOMContentLoaded", function() {
    const swiper = new Swiper(".mySwiper", {
        effect: "slide",
        speed: 1000, 
        spaceBetween: 30,
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, 
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 1.1, spaceBetween: 30 }
        }
    });
});
