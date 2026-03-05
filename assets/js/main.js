document.addEventListener("DOMContentLoaded", () => {

    // 1. STICKY NAVBAR EFFECT (Light Theme Version)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md', 'py-4', 'bg-white/95');
            navbar.classList.remove('bg-white/80', 'py-4', 'shadow-sm');
        } else {
            navbar.classList.add('bg-white/80', 'shadow-sm');
            navbar.classList.remove('shadow-md', 'bg-white/95');
        }
    });

    // 2. DARK MODE TOGGLE
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    
    // Default adalah LIGHT mode (karena permintaan cerah adem)
    if (localStorage.theme === 'dark') {
        document.documentElement.classList.add('dark');
        if(themeToggleIcon) themeToggleIcon.className = 'fas fa-sun text-accent text-lg';
    } else {
        document.documentElement.classList.remove('dark');
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            themeToggleIcon.className = isDark ? 'fas fa-sun text-accent text-lg' : 'fas fa-moon text-lg';
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

    // 5. INTEGRASI BACKEND GOOGLE SHEETS (Link Milik Mas Wahyu)
    const GAS_URL = "https://script.google.com/macros/s/AKfycbxABK7a7u8qE5QsPCgUuSMkTAoPvCT_zC3YExkLKZ-tcwOZe-kWNhqA1U1j7KRc0IWTlA/exec"; 

    const formPendaftaran = document.getElementById('formPendaftaran');
    if (formPendaftaran) {
        formPendaftaran.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btnSubmit = formPendaftaran.querySelector('button[type="submit"]');
            const originalText = btnSubmit.innerHTML;
            
            btnSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Mengirim Data...';
            btnSubmit.disabled = true;

            const formData = new FormData(formPendaftaran);
            const data = new URLSearchParams(formData);

            try {
                await fetch(GAS_URL, { method: 'POST', body: data, mode: 'no-cors' });
                formPendaftaran.innerHTML = `
                    <div class="text-center py-10 fade-in visible">
                        <i class="fas fa-check-circle text-6xl text-accent mb-6 drop-shadow-md"></i>
                        <h4 class="text-3xl font-serif text-primary dark:text-white font-bold mb-4">Pesan Diterima</h4>
                        <p class="text-gray-500">Alhamdulillah, tim Haramain Private akan segera merespon melalui WhatsApp Anda.</p>
                    </div>
                `;
            } catch (error) {
                alert('Terdapat kendala jaringan. Silakan hubungi kami langsung via WhatsApp.');
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
            }
        });
    }
});

// 6. MODAL LOGIC (ANIMASI TIMBUL / ZOOM-IN EFEK YAKNI SCALE-100)
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalDesc = document.getElementById('modalDesc');

function openModal(imgSrc, descText) {
    if(!modal) return;
    modalImg.src = imgSrc;
    modalDesc.innerText = descText;
    
    // Tampilkan modal (background hitam/biru transparan)
    modal.classList.remove('hidden');
    
    // Animasi munculnya modal dan gambar yang membesar (Timbul/Pop-up)
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalImg.classList.remove('scale-90');
        modalImg.classList.add('scale-100'); 
    }, 10);
    
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    if(!modal) return;
    
    // Animasi gambar mengecil kembali (kembali ke scale-90)
    modalImg.classList.remove('scale-100');
    modalImg.classList.add('scale-90');
    modal.classList.add('opacity-0');
    
    setTimeout(() => { 
        modal.classList.add('hidden'); 
        modalImg.src = ""; 
    }, 300); 
    
    document.body.style.overflow = 'auto'; 
}

if(modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}
