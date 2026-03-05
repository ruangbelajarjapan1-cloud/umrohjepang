Panduan Menambahkan Foto Galeri
Pada file index.html yang baru, cari bagian ``. Anda akan menemukan kode seperti ini:

HTML
<div class="aspect-square ... " onclick="openModal('assets/img/galeri-1.jpg', '...')">
Untuk memasukkan gambar asli Anda:

Pastikan Anda menyimpan foto di folder assets/img/ di dalam folder website Anda.

Ganti blok `` dengan tag <img>. Contoh jadinya seperti ini:

HTML
<div class="aspect-square rounded-xl overflow-hidden shadow-sm bg-gray-200 relative group cursor-pointer" onclick="openModal('assets/img/foto-asli-saya.jpg', 'Keterangan Foto')">
    <img src="assets/img/foto-asli-saya.jpg" alt="Galeri" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
</div>
