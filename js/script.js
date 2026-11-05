/* =====================================================
   MY LITTLE GARDEN - JAVASCRIPT UTAMA
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. DARK MODE TOGGLE --- */
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Cek preferensi tersimpan di localStorage
    const savedTheme = localStorage.getItem('garden_theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            
            themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('garden_theme', isDark ? 'dark' : 'light');
        });
    }


    /* --- 2. MOBILE SIDEBAR TOGGLE --- */
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (menuToggle && sidebar && sidebarOverlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('show');
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('show');
        });
    }


    /* --- 3. WIDGET TANGGAL & WAKTU REAL-TIME --- */
    const currentDateEl = document.getElementById('currentDate');
    const currentTimeEl = document.getElementById('currentTime');

    function updateDateTime() {
        const now = new Date();

        // Format Tanggal Indonesia
        if (currentDateEl) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            currentDateEl.innerHTML = `<strong style="color: var(--sage-deep);">${now.toLocaleDateString('id-ID', options)}</strong>`;
        }

        // Format Waktu Lokal
        if (currentTimeEl) {
            const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            currentTimeEl.innerHTML = `<strong style="color: var(--sage-deep);">${timeString} WIB</strong>`;
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);


    /* --- 4. DAILY QUOTES GENERATOR --- */
    const quotesList = [
        "\"Bloom at your own pace. 🌷\"",
        "\"Success is the sum of small efforts, repeated day in and day out. ✨\"",
        "\"Keep blooming, even when nobody is watching. 🌿\"",
        "\"Your mind is a garden, your thoughts are the seeds. Grow good things. ☁️\"",
        "\"Small progress each day adds up to big results. 🦋\"",
        "\"The secret of getting ahead is getting started. 🌸\""
    ];

    const dailyQuoteEl = document.getElementById('dailyQuote');
    const newQuoteBtn = document.getElementById('newQuote');

    if (newQuoteBtn && dailyQuoteEl) {
        newQuoteBtn.addEventListener('click', () => {
            dailyQuoteEl.style.opacity = '0';
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * quotesList.length);
                dailyQuoteEl.textContent = quotesList[randomIndex];
                dailyQuoteEl.style.opacity = '1';
            }, 200);
        });
    }

});


/* =====================================================
   FUNGSI KALKULATOR (BUKTI BELAJAR)
   ===================================================== */

// 1. Kalkulator Diskon
function hitungDiskon() {
    const harga = parseFloat(document.getElementById('hargaBarang').value);
    const diskon = parseFloat(document.getElementById('diskonBarang').value);
    const hasilEl = document.getElementById('hasilDiskon');

    if (isNaN(harga) || isNaN(diskon) || harga < 0 || diskon < 0 || diskon > 100) {
        hasilEl.innerHTML = `<span class="result-tag tag-danger">Error</span><br>Masukkan nominal harga dan diskon (0-100%) dengan benar!`;
        return;
    }

    const nilaiDiskon = (harga * diskon) / 100;
    const hargaAkhir = harga - nilaiDiskon;

    hasilEl.innerHTML = `
        <span class="result-tag tag-success">Berhasil Dihitung</span><br>
        Potongan: <strong>Rp ${nilaiDiskon.toLocaleString('id-ID')}</strong><br>
        Harga Akhir: <strong style="color: var(--sage-deep);">Rp ${hargaAkhir.toLocaleString('id-ID')}</strong>
    `;
}

// 2. Konversi Nilai Huruf
function konversiNilai() {
    const nilai = parseFloat(document.getElementById('nilaiAngka').value);
    const hasilEl = document.getElementById('hasilKonversi');

    if (isNaN(nilai) || nilai < 0 || nilai > 100) {
        hasilEl.innerHTML = `<span class="result-tag tag-danger">Error</span><br>Masukkan rentang angka antara 0 sampai 100!`;
        return;
    }

    let huruf = '';
    let predikat = '';

    if (nilai >= 85) { huruf = 'A'; predikat = 'Sangat Memuaskan (Cum laude) 🌟'; }
    else if (nilai >= 75) { huruf = 'B'; predikat = 'Memuaskan 🌸'; }
    else if (nilai >= 65) { huruf = 'C'; predikat = 'Cukup 🌱'; }
    else if (nilai >= 50) { huruf = 'D'; predikat = 'Kurang ⚠️'; }
    else { huruf = 'E'; predikat = 'Tidak Lulus ❌'; }

    hasilEl.innerHTML = `
        <span class="result-tag tag-info">Predikat Akademik</span><br>
        Nilai Huruf: <strong style="font-size: 14px; color: var(--sage-deep);">${huruf}</strong><br>
        Keterangan: <strong>${predikat}</strong>
    `;
}

// 3. Konversi Sistem Bilangan
function konversiBilangan() {
    const desimal = parseInt(document.getElementById('angkaDesimal').value);
    const hasilEl = document.getElementById('hasilBilangan');

    if (isNaN(desimal) || desimal < 0) {
        hasilEl.innerHTML = `<span class="result-tag tag-danger">Error</span><br>Masukkan bilangan desimal positif yang valid!`;
        return;
    }

    const biner = desimal.toString(2);
    const oktal = desimal.toString(8);
    const hex = desimal.toString(16).toUpperCase();

    hasilEl.innerHTML = `
        <div class="number-system-results">
            <div class="sys-res-box">
                <span>BINER (Base 2)</span>
                <strong>${biner}</strong>
            </div>
            <div class="sys-res-box">
                <span>OKTAL (Base 8)</span>
                <strong>${oktal}</strong>
            </div>
            <div class="sys-res-box">
                <span>HEX (Base 16)</span>
                <strong>${hex}</strong>
            </div>
            <div class="sys-res-box" style="grid-column: span 2;">
                <span>DESIMAL UTAMA</span>
                <strong style="color: var(--sage-deep);">${desimal}</strong>
            </div>
        </div>
    `;
}

// 4. Kalkulator Honor / Gaji
function hitungGaji() {
    const jam = parseFloat(document.getElementById('jamKerja').value);
    const tarif = parseFloat(document.getElementById('tarifJam').value);
    const hasilEl = document.getElementById('hasilGaji');

    if (isNaN(jam) || isNaN(tarif) || jam < 0 || tarif < 0) {
        hasilEl.innerHTML = `<span class="result-tag tag-danger">Error</span><br>Masukkan jam kerja dan tarif per jam dengan valid!`;
        return;
    }

    let totalGaji = 0;
    let lembur = 0;

    if (jam > 40) {
        const jamNormal = 40;
        const jamLembur = jam - 40;
        totalGaji = (jamNormal * tarif) + (jamLembur * tarif * 1.5);
        lembur = jamLembur;
    } else {
        totalGaji = jam * tarif;
    }

    hasilEl.innerHTML = `
        <span class="result-tag tag-success">Slip Gaji Digital</span><br>
        Jam Lembur: <strong>${lembur} jam</strong><br>
        Total Honor Bersih: <strong style="color: var(--sage-deep);">Rp ${totalGaji.toLocaleString('id-ID')}</strong>
    `;
}
