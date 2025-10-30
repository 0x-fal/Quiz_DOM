// Variabel body dideklarasikan secara global agar bisa diakses oleh changecolor()
let body;

// Fungsi ini harus global agar bisa dipanggil oleh onclick="changecolor()" di HTML
function changecolor() {
    // Memastikan body sudah diinisialisasi
    if (body) {
        let color = document.getElementById('colorpicker').value;
        body.style.backgroundColor = color;
    }
}

// Menjalankan skrip setelah seluruh halaman HTML selesai dimuat
window.onload = function() {

    // --- Mendapatkan Referensi Elemen ---
    // Menginisialisasi variabel body global
    body = document.getElementById('bd'); 
    
    const textParagraph = document.getElementById('text1');
    const textParagraph2 = document.getElementById('text2'); // Referensi baru ke judul
    const basket = document.getElementById('basket');
    const basketStatus = document.getElementById('basketstat');

    const flower1 = document.getElementById('img1');
    const flower2 = document.getElementById('img2');
    const flower3 = document.getElementById('img3');

    const changeTextColorButton = document.getElementById('chtext');
    const changeBgColorButton = document.getElementById('bccol');
    // Tombol untuk color picker tidak perlu listener di sini karena menggunakan onclick

    // --- Fungsi Bantuan ---

    /**
     * Memperbarui teks status keranjang berdasarkan jumlah gambar di dalamnya.
     */
    function updateBasketCount() {
        // Menghitung jumlah elemen <img> di dalam keranjang
        const flowerCount = basket.getElementsByTagName('img').length;
        // Memperbarui teks paragraf status
        basketStatus.textContent = `The flower basket currently contains ${flowerCount} flowers.`;
    }

    /**
     * Membuat salinan gambar bunga dan menambahkannya ke keranjang.
     * @param {Event} event - Event klik dari gambar asli.
     */
    function addFlowerToBasket(event) {
        // 'event.target' adalah gambar yang diklik (img1, img2, atau img3)
        const originalFlower = event.target;
        
        // Membuat salinan (clone) dari gambar yang diklik
        const flowerCopy = originalFlower.cloneNode(true);
        
        // Menghapus ID agar tidak duplikat
        flowerCopy.id = ''; 

        // Menambahkan event listener ke SALINAN gambar
        // Saat salinan ini diklik, ia akan dihapus dari keranjang
        flowerCopy.addEventListener('click', removeFlowerFromBasket);
        
        // Menambahkan salinan gambar ke dalam elemen keranjang
        basket.appendChild(flowerCopy);
        
        // Memperbarui hitungan keranjang
        updateBasketCount();
    }

    /**
     * Menghapus gambar bunga dari keranjang saat gambar di dalam keranjang diklik.
     * @param {Event} event - Event klik dari gambar di dalam keranjang.
     */
    function removeFlowerFromBasket(event) {
        // 'event.target' adalah salinan gambar di dalam keranjang yang diklik
        const flowerToRemove = event.target;
        
        // Menghapus gambar tersebut dari elemen induknya (keranjang)
        basket.removeChild(flowerToRemove);
        
        // Memperbarui hitungan keranjang
        updateBasketCount();
    }

    /**
     * Meminta pengguna memasukkan warna dan mengubah warna teks (paragraf dan judul).
     */
    function changeTextColor() {
        // Menampilkan kotak dialog prompt
        const newColor = prompt("Masukkan warna teks (mis: red, #FF0000):");
        if (newColor) { // Memeriksa apakah pengguna memasukkan sesuatu (tidak membatalkan)
            textParagraph.style.color = newColor;
            textParagraph2.style.color = newColor; // Menerapkan juga ke judul
        }
    }

    /**
     * Meminta pengguna memasukkan warna dan mengubah warna latar belakang body (via prompt).
     */
    function changeBackgroundColor() {
        // Menampilkan kotak dialog prompt
        const newColor = prompt("Masukkan warna latar belakang (mis: yellow, #FFFF00):");
        if (newColor) { // Memeriksa apakah pengguna memasukkan sesuatu (tidak membatalkan)
            body.style.backgroundColor = newColor;
        }
    }

    // --- Menambahkan Event Listeners ---

    // 1. Listener untuk menambah bunga ke keranjang
    flower1.addEventListener('click', addFlowerToBasket);
    flower2.addEventListener('click', addFlowerToBasket);
    flower3.addEventListener('click', addFlowerToBasket);

    // 2. Listener untuk tombol ganti warna (via prompt)
    changeTextColorButton.addEventListener('click', changeTextColor);
    changeBgColorButton.addEventListener('click', changeBackgroundColor);
    
    // 3. Memastikan hitungan awal sudah benar (0)
    updateBasketCount(); 
};

