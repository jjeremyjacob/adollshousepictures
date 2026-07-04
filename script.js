document.addEventListener("DOMContentLoaded", () => {
  const layers = Array.from(document.querySelectorAll(".layer"));
  let currentIndex = 0;

  function hideAllLayers() {
    layers.forEach((layer, i) => {
      layer.style.display = "none";
    });
  }

  function activateLayer(index) {
    hideAllLayers();

    const layer = layers[index];
    layer.style.display = "block";

    // ONLY NOW load images in this layer (lazy init)
    const imgs = layer.querySelectorAll("img");

    imgs.forEach(img => {
      if (img.dataset.src && !img.src) {
        img.src = img.dataset.src;
      }
    });
  }

  function init() {
    // move ALL images to data-src so they don't preload
    layers.forEach(layer => {
      const imgs = layer.querySelectorAll("img");
      imgs.forEach(img => {
        if (!img.dataset.src) {
          img.dataset.src = img.src;
          img.removeAttribute("src"); // prevents browser loading
        }
      });
    });

    activateLayer(0);
  }

  // navigation example hooks
  window.goUp = function () {
    if (currentIndex > 0) {
      currentIndex--;
      activateLayer(currentIndex);
    }
  };

  window.goDown = function () {
    if (currentIndex < layers.length - 1) {
      currentIndex++;
      activateLayer(currentIndex);
    }
  };

  init();
});
