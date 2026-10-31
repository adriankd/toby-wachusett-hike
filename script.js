const photos = [
  {
    title: 'Trailhead Start',
    category: 'trail',
    image:
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Forest Switchbacks',
    category: 'trail',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Ridge Views',
    category: 'summit',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Summit Moment',
    category: 'summit',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Golden Hour',
    category: 'sunset',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Last Light',
    category: 'sunset',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
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
