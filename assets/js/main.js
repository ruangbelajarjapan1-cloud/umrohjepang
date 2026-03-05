document.addEventListener("DOMContentLoaded", () => {

    // 1. STICKY NAVBAR EFFECT
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-primary/95', 'backdrop-blur-md', 'shadow-lg', 'py-4');
            navbar.classList.remove('bg-transparent', 'py-5');
        } else {
            navbar.classList.add('bg-transparent', 'py-5');
            navbar.classList.remove('bg-primary/95', 'backdrop-blur-md', 'shadow-lg', 'py-4');
        }
    });

    // 2. DARK MODE TOGGLE
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if(themeToggleIcon) themeToggleIcon.className = 'fas fa-sun text-champagne text-lg';
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            themeToggleIcon.className = isDark ? 'fas fa-sun text-champagne text-lg' : 'fas fa-moon text-lg';
        });
    }

    // 3. SCROLL ANIMATION (FADE-IN)
    const fadeElements = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        });
    }, appearOptions);

    fadeElements.forEach(el => appearOnScroll.observe(el));

    // 4. SCROLL TO TOP
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.remove('scale-0');
            scrollTopBtn.classList.add('scale-100');
        } else {
            scrollTopBtn.classList.remove('scale-100');
            scrollTopBtn.classList.add('scale-0');
        }
    });

    if(scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. INTEGRASI BACKEND GOOGLE SHEETS
    const GAS_URL = "https://script.google.com/macros/s/AKfycbxABK7a7u8qE5QsPCgUuSMkTAoPvCT_zC3YExkLKZ-tcwOZe-kWNhqA1U1j7KRc0IWTlA/exec"; 

    const formPendaftaran = document.getElementById('formPendaftaran');
    if (formPendaftaran) {
        formPendaftaran.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btnSubmit = formPendaftaran.querySelector('button[type="submit"]');
            const originalText = btnSubmit.innerHTML;
            
            btnSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Mengirim...';
            btnSubmit.disabled = true;

            const formData = new FormData(formPendaftaran);
            const data = new URLSearchParams(formData);

            try {
                await fetch(GAS_URL, { method: 'POST', body: data, mode: 'no-cors' });
                formPendaftaran.innerHTML = `
                    <div class="text-center py-10 fade-in visible">
                        <i class="fas fa-check-circle text-6xl text-champagne mb-6"></i>
                        <h4 class="text-3xl font-serif text-primary dark:text-champagne font-bold mb-4">Pesan Diterima</h4>
                        <p class="text-gray-500">Tim Haramain Private akan segera merespon melalui WhatsApp Anda.</p>
                    </div>
                `;
            } catch (error) {
                alert('Terdapat kendala. Silakan hubungi kami via WhatsApp.');
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
            }
        });
    }
});

// 6. MODAL LOGIC (ANIMASI TIMBUL / ZOOM-IN EFEK)
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalDesc = document.getElementById('modalDesc');

function openModal(imgSrc, descText) {
    if(!modal) return;
    modalImg.src = imgSrc;
    modalDesc.innerText = descText;
    
    // Tampilkan modal (background)
    modal.classList.remove('hidden');
    
    // Animasi munculnya modal dan gambar yang membesar (Timbul)
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalImg.classList.remove('scale-90');
        modalImg.classList.add('scale-100'); // Efek gambar membesar ke depan
    }, 10);
    
    document.body.style.overflow = 'hidden'; // Kunci scroll
}

function closeModal() {
    if(!modal) return;
    
    // Animasi gambar mengecil kembali
    modalImg.classList.remove('scale-100');
    modalImg.classList.add('scale-90');
    modal.classList.add('opacity-0');
    
    setTimeout(() => { 
        modal.classList.add('hidden'); 
        modalImg.src = ""; 
    }, 300); // Tunggu animasi selesai sebelum di-hide
    
    document.body.style.overflow = 'auto'; // Buka scroll
}

if(modal) {
    modal.addEventListener('click', (e) => {
        // Hanya tutup jika klik di area luar gambar
        if (e.target === modal) closeModal();
    });
}
