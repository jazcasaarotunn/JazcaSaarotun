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


    /* --- 5. EVENT LISTENER UNTUK TOMBOL KALKULATOR BUKTI BELAJAR --- */

    // Tombol Level 1 (Modulo)
    const btnCalcModulo = document.getElementById('btnCalcModulo');
    if (btnCalcModulo) {
        btnCalcModulo.addEventListener('click', hitungModulo);
    }

    // Tombol Level 2 (Pengecek Kongruensi)
    const btnCheckCongruence = document.getElementById('btnCheckCongruence');
    if (btnCheckCongruence) {
        btnCheckCongruence.addEventListener('click', hitungKongruensi);
    }

    // Tombol Level 5 (Sistem Bilangan)
    const btnConvertNum = document.getElementById('btnConvertNum');
    if (btnConvertNum) {
        btnConvertNum.addEventListener('click', konversiSistemBilangan);
    }

    // Tombol Level 6 (Kombinatorika)
    const btnCalcCombinatorics = document.getElementById('btnCalcCombinatorics');
    if (btnCalcCombinatorics) {
        btnCalcCombinatorics.addEventListener('click', hitungKombinatorika);
    }

});


/* =====================================================
   FUNGSI KALKULATOR (BUKTI BELAJAR) - BERSIH & AKURAT
   ===================================================== */

// 1. Level 1: Kalkulator Modulo
function hitungModulo() {
    const a = parseInt(document.getElementById('modA').value);
    const m = parseInt(document.getElementById('modM').value);
    const hasilEl = document.getElementById('resModulo');

    if (isNaN(a) || isNaN(m)) {
        hasilEl.innerHTML = `<span class="result-tag tag-danger">Salah / Error</span><br>Harap masukkan angka bilangan bulat dan modulus dengan benar!`;
        return;
    }

    if (m <= 0) {
        hasilEl.innerHTML = `<span class="result-tag tag-danger">Salah / Error</span><br>Modulus m harus bernilai lebih besar dari 0!`;
        return;
    }

    const sisaBagi = ((a % m) + m) % m;
    const hasilBagi = Math.floor(a / m);

    hasilEl.innerHTML = `
        <span class="result-tag tag-success">Benar & Valid</span><br>
        Sisa Bagi a mod m: <strong style="color: var(--sage-deep); font-size: 14px;">${sisaBagi}</strong><br>
        <small style="color: var(--brown-light);">Penjelasan: ${a} = (${hasilBagi} x ${m}) + ${sisaBagi}</small>
    `;
}

// 2. Level 2: Pengecek Kongruensi
function hitungKongruensi() {
    const a = parseInt(document.getElementById('congA').value);
    const b = parseInt(document.getElementById('congB').value);
    const m = parseInt(document.getElementById('congM').value);
    const hasilEl = document.getElementById('resCongruence');

    if (isNaN(a) || isNaN(b) || isNaN(m)) {
        hasilEl.innerHTML = `<span class="result-tag tag-danger">Salah / Error</span><br>Harap isi semua kolom a, b, dan m dengan angka yang valid!`;
        return;
    }

    if (m <= 0) {
        hasilEl.innerHTML = `<span class="result-tag tag-danger">Salah / Error</span><br>Modulus m harus lebih besar dari 0!`;
        return;
    }

    const selisih = a - b;
    const isKongruen = (selisih % m === 0);

    if (isKongruen) {
        hasilEl.innerHTML = `
            <span class="result-tag tag-success">Benar (Kongruen)</span><br>
            Pernyataan ${a} kongruen dengan ${b} (mod ${m}) adalah <strong>BENAR</strong>.<br>
            <small style="color: var(--brown-light);">Alasan: Selisih (${a} - ${b} = ${selisih}) habis dibagi oleh ${m} (${selisih / m} x ${m}).</small>
        `;
    } else {
        hasilEl.innerHTML = `
            <span class="result-tag tag-danger">Tidak Kongruen</span><br>
            Pernyataan ${a} kongruen dengan ${b} (mod ${m}) adalah <strong>SALAH</strong>.<br>
            <small style="color: var(--brown-light);">Alasan: Selisih ${selisih} tidak habis dibagi oleh ${m}.</small>
        `;
    }
}

// 3. Level 5: Kalkulator Sistem Bilangan
function konversiSistemBilangan() {
    const inputVal = document.getElementById('numInput').value.trim();
    const base = parseInt(document.getElementById('numBase').value);
    
    const binValEl = document.getElementById('binVal');
    const decValEl = document.getElementById('decVal');
    const octValEl = document.getElementById('octVal');
    const hexValEl = document.getElementById('hexVal');

    if (!inputVal) {
        alert('Harap masukkan angka bilangan yang ingin dikonversi!');
        return;
    }

    let decimalValue;
    try {
        decimalValue = parseInt(inputVal, base);
        if (isNaN(decimalValue)) {
            throw new Error("Format tidak valid");
        }
    } catch (e) {
        alert('Format angka tidak sesuai dengan basis asal yang dipilih!');
        return;
    }

    if (binValEl) binValEl.textContent = decimalValue.toString(2);
    if (decValEl) decValEl.textContent = decimalValue.toString(10);
    if (octValEl) octValEl.textContent = decimalValue.toString(8);
    if (hexValEl) hexValEl.textContent = decimalValue.toString(16).toUpperCase();
}

// 4. Level 6: Kalkulator Kombinatorika
function hitungKombinatorika() {
    const n = parseInt(document.getElementById('combN').value);
    const r = parseInt(document.getElementById('combR').value);
    const hasilEl = document.getElementById('resCombinatorics');

    if (isNaN(n) || isNaN(r) || n < 0 || r < 0) {
        hasilEl.innerHTML = `<span class="result-tag tag-danger">Salah / Error</span><br>Masukkan nilai n dan r berupa bilangan bulat non-negatif (>= 0).`;
        return;
    }

    if (r > n) {
        hasilEl.innerHTML = `<span class="result-tag tag-danger">Salah / Error</span><br>Nilai pilihan r tidak boleh lebih besar dari jumlah objek n!`;
        return;
    }

    function hitungFaktorial(num) {
        if (num === 0 || num === 1) return 1;
        let hasil = 1;
        for (let i = 2; i <= num; i++) {
            hasil *= i;
        }
        return hasil;
    }

    const factN = hitungFaktorial(n);
    const factNR = hitungFaktorial(n - r);
    const factR = hitungFaktorial(r);

    const permutasi = factN / factNR;
    const kombinasi = factN / (factR * factNR);

    hasilEl.innerHTML = `
        <span class="result-tag tag-success">Berhasil Dihitung (Benar)</span><br>
        <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;">
            <div>🧮 <strong>Permutasi P(${n},${r}):</strong> <span style="color: var(--sage-deep); font-weight: 700;">${permutasi.toLocaleString('id-ID')}</span></div>
            <div>📊 <strong>Kombinasi C(${n},${r}):</strong> <span style="color: var(--sage-deep); font-weight: 700;">${kombinasi.toLocaleString('id-ID')}</span></div>
        </div>
    `;
}
