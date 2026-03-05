// Konfigurasi Carousel Premium
document.addEventListener("DOMContentLoaded", function() {
    const swiper = new Swiper(".mySwiper", {
        // Efek transisi
        effect: "slide",
        speed: 800,
        spaceBetween: 30,
        grabCursor: true,
        centeredSlides: true,
        loop: true, // Looping terus menerus
        
        // Auto slide setiap 4 detik
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Berhenti saat di-hover
        },
        
        // Titik-titik navigasi di bawah gambar
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        
        // Responsif untuk berbagai ukuran layar
        breakpoints: {
            320: { slidesPerView: 1.1, spaceBetween: 20 },
            768: { slidesPerView: 1.5, spaceBetween: 30 },
            1024: { slidesPerView: 2, spaceBetween: 40 },
        }
    });
});
