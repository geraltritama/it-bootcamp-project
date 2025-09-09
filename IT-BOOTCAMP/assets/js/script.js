// DOKUMENTASI SECTION
document.querySelectorAll('.slider-track').forEach(track => {
  track.innerHTML += track.innerHTML; // Gandakan isi track
});

function openPopup(imageSrc) {
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popup-image");
  popupImage.src = imageSrc;
  popup.style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}