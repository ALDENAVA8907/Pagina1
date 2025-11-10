// Selección de elementos
const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.querySelector('.lightbox__close');
const prevBtn = document.querySelector('.lightbox__nav.prev');
const nextBtn = document.querySelector('.lightbox__nav.next');

let items = Array.from(document.querySelectorAll('.gallery .card img'));
let currentIndex = -1;

// Abrir lightbox al click
items.forEach((img, idx) => {
  img.addEventListener('click', () => openLightbox(idx));
  // tecla enter para accesibilidad
  img.tabIndex = 0;
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openLightbox(idx);
  });
});

function openLightbox(index){
  currentIndex = index;
  const img = items[index];
  const src = img.dataset.full || img.src;
  lightboxImg.src = src;
  lightboxImg.alt = img.alt || '';
  lightboxCaption.textContent = img.nextElementSibling ? img.nextElementSibling.textContent : '';
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  // foco a cerrar
  closeBtn.focus();
}

function closeLightbox(){
  lightbox.setAttribute('aria-hidden','true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

// Navegación
function showNext(n){
  currentIndex = (currentIndex + n + items.length) % items.length;
  const img = items[currentIndex];
  lightboxImg.src = img.dataset.full || img.src;
  lightboxImg.alt = img.alt || '';
  lightboxCaption.textContent = img.nextElementSibling ? img.nextElementSibling.textContent : '';
}

// Eventos
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => showNext(-1));
nextBtn.addEventListener('click', () => showNext(1));

// Cerrar con tecla ESC y navegar con flechas
document.addEventListener('keydown', (e) => {
  if (lightbox.getAttribute('aria-hidden') === 'false') {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  }
});

// Cerrar al hacer click fuera del contenido
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

