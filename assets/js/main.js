// URL Web App dari Google Apps Script yang sudah di-deploy
const GAS_URL = "https://script.google.com/macros/s/AKfycbxABK7a7u8qE5QsPCgUuSMkTAoPvCT_zC3YExkLKZ-tcwOZe-kWNhqA1U1j7KRc0IWTlA/exec";

const form = document.getElementById('formPendaftaran');
const btnSubmit = document.getElementById('btnSubmit');
const pesanSukses = document.getElementById('pesanSukses');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Ubah status tombol
    btnSubmit.innerText = "Mengirim...";
    btnSubmit.disabled = true;

    // Ambil data dari form
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    try {
        const response = await fetch(GAS_URL, {
            method: 'POST',
            body: data,
            // Mode no-cors terkadang dibutuhkan untuk menghindar error CORS pada GAS
            mode: 'no-cors' 
        });

        // Tampilkan pesan sukses
        form.reset();
        form.classList.add('hidden');
        pesanSukses.classList.remove('hidden');

    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Silakan coba lagi atau hubungi via WhatsApp.');
    } finally {
        btnSubmit.innerText = "Kirim Pendaftaran";
        btnSubmit.disabled = false;
    }
});
