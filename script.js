const photos = [
  {
    title: 'Trailhead Start',
    category: 'trail',
    image: 'photos/20261031_120816.jpg'
  },
  {
    title: 'Forest Switchbacks',
    category: 'trail',
    image: 'photos/20261031_121125.jpg'
  },
  {
    title: 'Ridge Views',
    category: 'summit',
    image: 'photos/20261031_122240.jpg'
  },
  {
    title: 'Summit Moment',
    category: 'summit',
    image: 'photos/20261031_123805.jpg'
  },
  {
    title: 'Golden Hour',
    category: 'sunset',
    image: 'photos/20261031_130707.jpg'
  },
  {
    title: 'Last Light',
    category: 'sunset',
    image: 'photos/20261031_143620.jpg'
  }
];

const photoGrid = document.getElementById('photoGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const filterButtons = document.querySelectorAll('.filter');

function renderPhotos(filter = 'all') {
  const filteredPhotos = filter === 'all' ? photos : photos.filter((photo) => photo.category === filter);

  photoGrid.innerHTML = filteredPhotos
    .map(
      (photo) => `
        <article class="photo-card" data-category="${photo.category}" tabindex="0" aria-label="Open photo: ${photo.title}">
          <img src="${photo.image}" alt="${photo.title}" />
          <div class="photo-meta">
            <div>
              <strong>${photo.title}</strong>
              <span>${photo.category}</span>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  photoGrid.querySelectorAll('.photo-card').forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.querySelector('strong')?.textContent || 'Photo';
      const image = card.querySelector('img')?.src || '';
      lightboxImage.src = image;
      lightboxImage.alt = title;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderPhotos(button.dataset.filter);
  });
});

document.querySelector('.lightbox-close').addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

renderPhotos();
