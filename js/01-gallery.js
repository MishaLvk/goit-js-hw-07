import { galleryItems } from "./gallery-items.js";

// Change code below this line
const gallery = document.querySelector(".gallery");
const galleryMarcup = createGallery(galleryItems);

gallery.insertAdjacentHTML("beforeend", galleryMarcup);
gallery.addEventListener("click", oneImageClick);
// document.addEventListener("keydown", closeEsc);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="large-image.jpg"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

function oneImageClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  const elementLink = evt.target.closest(".gallery__link");
  const linkImage = elementLink.href;

  openImage(linkImage);
}

function openImage(linkImage) {
  const instance = basicLightbox.create(
    `<img src="${linkImage}" width="800" height="600">`,
    {
      onClose: (instance) => {
        document.removeEventListener("keydown", closeEsc);
      },
    }
  );

  instance.show();

  document.addEventListener("keydown", closeEsc);

  function closeEsc(evt) {
    if (evt.key !== "Escape") {
      return;
    }
    instance.close();
  }
}
