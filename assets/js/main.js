document.addEventListener("DOMContentLoaded", () => {

    // 1. STICKY NAVBAR & EFEK PARALLAX
    const navbar = document.getElementById('navbar');
    const topBanner = document.getElementById('top-banner');
    const parallaxBg = document.getElementById('parallax-bg');

    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY;

        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrollPos * 0.3}px) scale(1.15)`;
        }

        if (scrollPos > 50) {
            navbar.classList.add('bg-white/95', 'shadow-md', 'py-4', 'border-gray-100');
            navbar.classList.remove('bg-transparent', 'py-5', 'border-transparent');
            if(topBanner) {
                topBanner.classList.add('h-0', 'py-0', 'opacity-0');
                topBanner.classList.remove('py-2', 'opacity-100');
            }
        } else {
            navbar.classList.add('bg-transparent', 'py-5', 'border-transparent');
            navbar.classList.remove('bg-white/95', 'shadow-md', 'py-4', 'border-gray-100');
            if(topBanner) {
                topBanner.classList.remove('h-0', 'py-0', 'opacity-0');
                topBanner.classList.add('py-2', 'opacity-100');
            }
        }
    });

    // 2. TOGGLE BAHASA (ID / EN) - SUDAH DIPERBAIKI
    const langBtn = document.getElementById('lang-toggle');
    const elementsId = document.querySelectorAll('.lang-id');
    const elementsEn = document.querySelectorAll('.lang-en'); // Menggunakan class .lang-en
    let currentLang = 'id';

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            if (currentLang === 'id') {
                elementsId.forEach(el => el.classList.add('hidden'));
                elementsEn.forEach(el => el.classList.remove('hidden'));
                currentLang = 'en';
            } else {
                elementsEn.forEach(el => el.classList.add('hidden'));
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

    // 4. INTEGRASI BACKEND GOOGLE SHEETS & DIRECT WHATSAPP
    const GAS_URL = "https://script.google.com/macros/s/AKfycbxABK7a7u8qE5QsPCgUuSMkTAoPvCT_zC3YExkLKZ-tcwOZe-kWNhqA1U1j7KRc0IWTlA/exec"; 
    const formPendaftaran = document.getElementById('formPendaftaran');
    
    if (formPendaftaran) {
        formPendaftaran.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btnSubmit = formPendaftaran.querySelector('button[type="submit"]');
            const originalText = btnSubmit.innerHTML;
            
            btnSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Memproses Data...';
            btnSubmit.disabled = true;

            const formData = new FormData(formPendaftaran);
            const data = new URLSearchParams(formData);

            const nama = formData.get('nama');
            let layananDipilih = [];
            
            if(formData.get('layanan_reguler')) layananDipilih.push("Paket Reguler (Grup Hemat)");
            if(formData.get('layanan_full')) layananDipilih.push("Paket Private (Keluarga)");
            if(formData.get('layanan_visa')) layananDipilih.push("Jasa Visa Saja");
            if(formData.get('layanan_transport')) layananDipilih.push("Sewa Mobil VIP");
            if(formData.get('layanan_muthawwif')) layananDipilih.push("Jasa Muthawwif");
            
            const catatan = formData.get('catatan') ? formData.get('catatan') : "-";
            
            // Note: Pesan WhatsApp dibiarkan berbahasa Indonesia karena tujuannya ke Admin Anda
            let textWA = `Bismillah. Assalamu'alaikum.\n\nAdmin Haramain, saya *${nama}* ingin konsultasi.\n\nSaya tertarik dengan layanan:\n- ${layananDipilih.length > 0 ? layananDipilih.join('\n- ') : 'Konsultasi Umum'}\n\nCatatan Tambahan: ${catatan}\n\nMohon informasi langkah selanjutnya. Jazakumullah khairan.`;
            
            const encodedTextWA = encodeURIComponent(textWA);
            const waNumber = "818088452258"; 
            const waLink = `https://wa.me/${waNumber}?text=${encodedTextWA}`;

            try {
                await fetch(GAS_URL, { method: 'POST', body: data, mode: 'no-cors' });
                
                formPendaftaran.innerHTML = `
                    <div class="text-center py-10 animate-fade">
                        <i class="fas fa-check-circle text-6xl text-brand-cyan mb-4"></i>
                        <h4 class="text-2xl font-bold text-brand-dark mb-2">Permintaan Terkirim!</h4>
                        <p class="text-gray-500 mb-6">Mengarahkan otomatis ke WhatsApp Admin / Redirecting to WhatsApp...</p>
                        <a href="${waLink}" target="_blank" class="inline-block bg-[#25D366] text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition">Lanjutkan ke WhatsApp</a>
                    </div>
                `;

                setTimeout(() => {
                    window.open(waLink, '_blank');
                }, 2000);

            } catch (error) {
                alert('Terdapat kendala jaringan. Silakan hubungi kami langsung melalui tombol WhatsApp.');
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
            }
        });
    }

    // 7. WIDGET LIVE HARAMAIN (WAKTU & CUACA)
    function initHaramainWidget() {
        const timeMakkah = document.getElementById('time-makkah');
        const timeMadinah = document.getElementById('time-madinah');
        const tempMakkah = document.getElementById('temp-makkah');
        const tempMadinah = document.getElementById('temp-madinah');

        setInterval(() => {
            const options = { timeZone: 'Asia/Riyadh', hour: '2-digit', minute:'2-digit', hour12: false };
            const timeString = new Intl.DateTimeFormat('en-US', options).format(new Date());
            if(timeMakkah) timeMakkah.innerText = timeString;
            if(timeMadinah) timeMadinah.innerText = timeString;
        }, 1000);

        async function fetchWeather() {
            try {
                const resMakkah = await fetch('https://api.open-meteo.com/v1/forecast?latitude=21.4225&longitude=39.8262&current_weather=true');
                const dataMakkah = await resMakkah.json();
                if(tempMakkah) tempMakkah.innerText = `${Math.round(dataMakkah.current_weather.temperature)}°C`;
                
                const resMadinah = await fetch('https://api.open-meteo.com/v1/forecast?latitude=24.4686&longitude=39.6142&current_weather=true');
                const dataMadinah = await resMadinah.json();
                if(tempMadinah) tempMadinah.innerText = `${Math.round(dataMadinah.current_weather.temperature)}°C`;
            } catch (e) {
                console.log("Tidak dapat memuat cuaca", e);
            }
        }
        fetchWeather();
    }
    initHaramainWidget();

});

// 5. EDUKASI RUKUN UMROH (TIMELINE TAB LOGIC)
function showRukun(rukunId) {
    const contents = document.querySelectorAll('.rukun-content');
    contents.forEach(content => content.classList.add('hidden'));

    const buttons = document.querySelectorAll('.rukun-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-brand-cyan', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-gray-500');
    });

    document.getElementById(`content-${rukunId}`).classList.remove('hidden');

    const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(rukunId));
    if(activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-gray-500');
        activeBtn.classList.add('bg-brand-cyan', 'text-white', 'shadow-md');
    }
}

// 6. MODAL LOGIC (ANIMASI TIMBUL)
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');

function openModal(imgSrc) {
    if(!modal) return;
    modalImg.src = imgSrc;
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalImg.classList.remove('scale-95');
        modalImg.classList.add('scale-100'); 
    }, 10);
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    if(!modal) return;
    modalImg.classList.remove('scale-100');
    modalImg.classList.add('scale-95');
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
