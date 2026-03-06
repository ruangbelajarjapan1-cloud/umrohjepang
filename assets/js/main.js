document.addEventListener("DOMContentLoaded", () => {

    // 1. STICKY NAVBAR
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/95', 'shadow-md', 'py-4');
            navbar.classList.remove('bg-transparent', 'py-5');
        } else {
            navbar.classList.add('bg-transparent', 'py-5');
            navbar.classList.remove('bg-white/95', 'shadow-md', 'py-4');
        }
    });

    // 2. TOGGLE BAHASA (ID/JP)
    const langBtn = document.getElementById('lang-toggle');
    const elementsId = document.querySelectorAll('.lang-id');
    const elementsJp = document.querySelectorAll('.lang-jp');
    let currentLang = 'id';

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            if (currentLang === 'id') {
                elementsId.forEach(el => el.classList.add('hidden'));
                elementsJp.forEach(el => el.classList.remove('hidden'));
                currentLang = 'jp';
            } else {
                elementsJp.forEach(el => el.classList.add('hidden'));
                elementsId.forEach(el => el.classList.remove('hidden'));
                currentLang = 'id';
            }
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

    // 4. INTEGRASI BACKEND
    const GAS_URL = "https://script.google.com/macros/s/AKfycbxABK7a7u8qE5QsPCgUuSMkTAoPvCT_zC3YExkLKZ-tcwOZe-kWNhqA1U1j7KRc0IWTlA/exec"; 
    const formPendaftaran = document.getElementById('formPendaftaran');
    
    if (formPendaftaran) {
        formPendaftaran.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btnSubmit = formPendaftaran.querySelector('button[type="submit"]');
            const originalText = btnSubmit.innerHTML;
            
            btnSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Memproses...';
            btnSubmit.disabled = true;

            const formData = new FormData(formPendaftaran);
            const data = new URLSearchParams(formData);

            try {
                await fetch(GAS_URL, { method: 'POST', body: data, mode: 'no-cors' });
                formPendaftaran.innerHTML = `
                    <div class="text-center py-10 animate-fade">
                        <i class="fas fa-check-circle text-6xl text-brand-cyan mb-4"></i>
                        <h4 class="text-2xl font-bold text-brand-dark mb-2">Permintaan Terkirim!</h4>
                        <p class="text-gray-500">Admin Haramain Private akan segera menghubungi WhatsApp Anda untuk memberikan kuotasi harga.</p>
                    </div>
                `;
            } catch (error) {
                alert('Kendala jaringan. Silakan hubungi via WhatsApp.');
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
            }
        });
    }
});

// 5. EDUKASI RUKUN UMROH (TIMELINE TAB LOGIC)
// Fungsi ini ditaruh di luar DOMContentLoaded agar bisa dipanggil onclick dari HTML
function showRukun(rukunId) {
    // Sembunyikan semua konten
    const contents = document.querySelectorAll('.rukun-content');
    contents.forEach(content => content.classList.add('hidden'));

    // Reset style semua tombol
    const buttons = document.querySelectorAll('.rukun-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-brand-cyan', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-gray-500');
    });

    // Tampilkan konten yang dipilih
    document.getElementById(`content-${rukunId}`).classList.remove('hidden');

    // Aktifkan style tombol yang di-klik
    const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(rukunId));
    if(activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-gray-500');
        activeBtn.classList.add('bg-brand-cyan', 'text-white', 'shadow-md');
    }
}
