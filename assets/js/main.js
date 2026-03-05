// ==========================================
// 5. BACKEND INTEGRATION (GOOGLE APPS SCRIPT)
// ==========================================
// GANTI URL DI BAWAH INI DENGAN URL DEPLOYMENT GOOGLE APPS SCRIPT ANDA
const GAS_URL = "https://script.google.com/macros/s/AKfycbxABK7a7u8qE5QsPCgUuSMkTAoPvCT_zC3YExkLKZ-tcwOZe-kWNhqA1U1j7KRc0IWTlA/exec"; 

// A. Handler untuk Form Pendaftaran
const formPendaftaran = document.getElementById('formPendaftaran');
if (formPendaftaran) {
    formPendaftaran.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btnSubmit = formPendaftaran.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        
        // Ubah tampilan tombol saat loading
        btnSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Mengirim Data...';
        btnSubmit.disabled = true;
        btnSubmit.classList.add('opacity-70', 'cursor-not-allowed');

        const formData = new FormData(formPendaftaran);
        const data = new URLSearchParams(formData);

        try {
            await fetch(GAS_URL, {
                method: 'POST',
                body: data,
                mode: 'no-cors' // Mencegah error CORS dari Google
            });

            // Tampilkan pesan sukses elegan
            formPendaftaran.innerHTML = `
                <div class="text-center py-8 fade-in visible">
                    <i class="fas fa-check-circle text-5xl text-gold mb-4"></i>
                    <h4 class="text-2xl font-serif text-navy dark:text-white font-bold mb-2">Alhamdulillah</h4>
                    <p class="text-gray-600 dark:text-gray-300">Pendaftaran awal berhasil diterima. Tim kami akan segera menghubungi Anda melalui WhatsApp.</p>
                </div>
            `;
        } catch (error) {
            console.error('Error:', error);
            alert('Afwan, terjadi kendala jaringan. Silakan hubungi kami langsung via WhatsApp.');
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;
            btnSubmit.classList.remove('opacity-70', 'cursor-not-allowed');
        }
    });
}

// B. Handler untuk Form Tanya Jawab (Q&A)
const formQna = document.getElementById('formQna');
if (formQna) {
    formQna.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btnSubmit = formQna.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        
        btnSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Mengirim...';
        btnSubmit.disabled = true;

        const formData = new FormData(formQna);
        // Pastikan ada input hidden action=qna di form HTML nya
        const data = new URLSearchParams(formData);

        try {
            await fetch(GAS_URL, {
                method: 'POST',
                body: data,
                mode: 'no-cors'
            });

            formQna.reset();
            alert('Jazakumullah khairan. Pertanyaan Anda telah terkirim dan akan dijawab oleh Admin/Ustadz.');
            
        } catch (error) {
            console.error('Error:', error);
            alert('Afwan, gagal mengirim pertanyaan.');
        } finally {
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;
        }
    });
}
