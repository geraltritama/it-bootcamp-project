document.addEventListener("DOMContentLoaded", function () {
    // --- ELEMEN FORM ---
    const form = document.getElementById("form-pendaftaran-lomba");
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzixPGe1q87iXZ_3bcX3AR52Edit14J5_u8QlOUmekTahBPtZ-NPJfpkhFFCnTzEgO7Gw/exec'; // URL Web App Anda
    const submitButton = form.querySelector('.submit');
    
    // --- ELEMEN UPLOAD UI ---
    const fileInput = document.getElementById('payment_proof');
    const uploadLabel = document.getElementById('upload-label');
    const uploadSuccess = document.getElementById('upload-success');
    const changeFileButton = document.getElementById('change-file-button');

    // --- ELEMEN UX BARU ---
    const loadingOverlay = document.getElementById('loading-overlay');
    const modal = document.getElementById('custom-modal');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseButton = document.getElementById('modal-close-button');

    // Event listener utama saat form disubmit
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        loadingOverlay.style.display = 'flex'; // Tampilkan animasi loading
        submitButton.disabled = true;
        submitButton.value = "Mengirim...";
        
        const formData = new FormData(form);
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                formData.delete('payment_proof'); 
                formData.append('payment_proof_base64', reader.result);
                formData.append('payment_proof_filename', file.name);
                sendData(formData); // Kirim data setelah file dibaca
            };
            reader.onerror = (error) => {
                loadingOverlay.style.display = 'none';
                showModal('❌', 'Gagal', 'Terjadi kesalahan saat membaca file. Silakan coba lagi.');
            };
        } else {
            sendData(formData); // Langsung kirim jika tidak ada file
        }
    });

    // Fungsi untuk mengirim data ke Google Apps Script
    function sendData(formData) {
        fetch(scriptURL, { method: "POST", body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    form.reset();
                    resetUploadUI();
                    showModal('✅', 'Berhasil Terkirim!', data.message);
                } else {
                    showModal('❌', 'Gagal!', data.message);
                }
            })
            .catch(error => {
                console.error("Error!", error.message);
                showModal('❌', 'Error Jaringan', 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda dan coba lagi.');
            })
            .finally(() => {
                loadingOverlay.style.display = 'none'; // Sembunyikan loading
                submitButton.disabled = false;
                submitButton.value = "Kirim";
            });
    }

    // --- FUNGSI UNTUK MODAL & UI ---
    function showModal(icon, title, message) {
        modalIcon.textContent = icon;
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10); // Memicu animasi fade-in
    }

    function hideModal() {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300); // Tunggu animasi selesai
    }

    // Event listener untuk menutup modal
    modalCloseButton.addEventListener('click', hideModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) { // Tutup jika klik di luar box
            hideModal();
        }
    });

    // Logika untuk UI upload file kustom
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            uploadLabel.style.display = 'none';
            uploadSuccess.style.display = 'inline';
            changeFileButton.style.display = 'inline-block';
        }
    });

    changeFileButton.addEventListener('click', function() {
        fileInput.click();
    });

    function resetUploadUI() {
        uploadLabel.style.display = 'flex';
        uploadSuccess.style.display = 'none';
        changeFileButton.style.display = 'none';
    }
});