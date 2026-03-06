document.addEventListener("DOMContentLoaded", () => {

    // 1. STICKY NAVBAR EFFECT
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

    // 4. SCROLL TO TOP BUTTON 
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if(scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.remove('scale-0');
                scrollTopBtn.classList.add('scale-100');
            } else {
                scrollTopBtn.classList.remove('scale-100');
                scrollTopBtn.classList.add('scale-0');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. INTEGRASI BACKEND & OTOMATISASI WHATSAPP
    // URL Google Apps Script Mas Wahyu
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

            // === LOGIKA MENYUSUN PESAN WHATSAPP ===
            const nama = formData.get('nama');
            let layananDipilih = [];
            
            // Cek kotak mana saja yang dicentang
            if(formData.get('layanan_full')) layananDipilih.push("Paket Lengkap (Full Service)");
            if(formData.get('layanan_visa')) layananDipilih.push("Jasa Visa Saja");
            if(formData.get('layanan_transport')) layananDipilih.push("Sewa Mobil VIP");
            if(formData.get('layanan_muthawwif')) layananDipilih.push("Jasa Muthawwif");
            
            const catatan = formData.get('catatan') ? formData.get('catatan') : "-";
            
            // Susun template teks WA
            let textWA = `Bismillah. Assalamu'alaikum.\n\nAdmin Haramain Private, saya *${nama}* ingin konsultasi.\n\nSaya tertarik dengan layanan:\n- ${layananDipilih.length > 0 ? layananDipilih.join('\n- ') : 'Konsultasi Umum'}\n\nCatatan Tambahan: ${catatan}\n\nMohon informasi langkah selanjutnya. Jazakumullah khairan.`;
            
            // Encode URL dan masukkan nomor WA Anda
            const encodedTextWA = encodeURIComponent(textWA);
            const waNumber = "818088452258"; // Nomor Mas Wahyu
            const waLink = `https://wa.me/${waNumber}?text=${encodedTextWA}`;

            try {
                // 1. Eksekusi penyimpanan data ke Google Sheets (Mode silent)
                await fetch(GAS_URL, { method: 'POST', body: data, mode: 'no-cors' });
                
                // 2. Ganti Form menjadi pesan Sukses
                formPendaftaran.innerHTML = `
                    <div class="text-center py-10 animate-fade">
                        <i class="fas fa-check-circle text-6xl text-brand-cyan mb-4"></i>
                        <h4 class="text-2xl font-bold text-brand-dark mb-2">Permintaan Terkirim!</h4>
                        <p class="text-gray-500 mb-6">Mengarahkan Anda otomatis ke WhatsApp Admin...</p>
                        <a href="${waLink}" target="_blank" class="inline-block bg-[#25D366] text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition">Lanjutkan ke WhatsApp</a>
                    </div>
                `;

                // 3. Trigger otomatis buka tab WhatsApp setelah 2 detik
                setTimeout(() => {
                    window.open(waLink, '_blank');
                }, 2000);

            } catch (error) {
                alert('Terdapat kendala jaringan. Silakan hubungi kami langsung melalui tombol Chat Admin.');
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
            }
        });
    }
});

// 6. EDUKASI RUKUN UMROH (TIMELINE TAB LOGIC)
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

// 7. MODAL LOGIC (ANIMASI TIMBUL / ZOOM-IN)
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');

function openModal(imgSrc, descText) {
    if(!modal) return;
    modalImg.src = imgSrc;
    
    // Tampilkan modal (background)
    modal.classList.remove('hidden');
    
    // Animasi munculnya modal dan gambar yang membesar
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalImg.classList.remove('scale-95');
        modalImg.classList.add('scale-100'); 
    }, 10);
    
    document.body.style.overflow = 'hidden'; // Kunci scroll
}

function closeModal() {
    if(!modal) return;
    
    // Animasi gambar mengecil kembali
    modalImg.classList.remove('scale-100');
    modalImg.classList.add('scale-95');
    modal.classList.add('opacity-0');
    
    setTimeout(() => { 
        modal.classList.add('hidden'); 
        modalImg.src = ""; 
    }, 300); // Tunggu durasi transisi CSS
    
    document.body.style.overflow = 'auto'; // Buka scroll
}

if(modal) {
    modal.addEventListener('click', (e) => {
        // Hanya tutup jika klik di area luar gambar
        if (e.target === modal) closeModal();
    });
}
