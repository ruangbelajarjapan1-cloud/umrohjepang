// Konfigurasi Carousel / Slideshow
document.addEventListener("DOMContentLoaded", function() {
    const swiper = new Swiper(".mySwiper", {
        effect: "slide",
        speed: 800,
        spaceBetween: 30,
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        
        // Auto slide
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, 
        },
        
        // Titik navigasi
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        
        // Responsif
        breakpoints: {
            320: { slidesPerView: 1.1, spaceBetween: 20 },
            768: { slidesPerView: 1.5, spaceBetween: 30 },
            1024: { slidesPerView: 2, spaceBetween: 40 },
        }
    });
});
