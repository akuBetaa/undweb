// Fungsi untuk mengambil nilai parameter dari URL
function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  // Ambil nama tamu dari URL
  const namaTamu = getQueryParameter('tamu');
  
  // Tampilkan nama tamu pada bagian cover, jika ada
  if (namaTamu) {
    document.getElementById('nama-tamu').textContent = `${namaTamu}`;
  }