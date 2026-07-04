document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_LAYERS = 30;

    const world = document.querySelector(".world");
    const sigilsContainer = document.querySelector(".sigils");
    const liftAllBtn = document.getElementById("liftAll");

    const layers = [];

    const sigilSet = [
        "find me","gun","the horse","chicken","e",
        "game","my house","◉","⟡","✦",
        "floor plan","library","+","cut","⬣",
        "⌒","king","oh i","▢","□","■",
        "▨","▣","▤","▦","26","27","28"
    ];

    const imagePaths = Array.from({ length: TOTAL_LAYERS }, (_, i) =>
        `images/layer${i + 1}.webp`
    );

    // -----------------------------
    // BUILD LAYERS
    // -----------------------------
    for (let i = 0; i < TOTAL_LAYERS; i++) {

        const layer = document.createElement("div");
        layer.className = "layer";
        layer.id = `layer${i + 1}`;

        world.appendChild(layer);
        layers.push(layer);

        const sigil = document.createElement("div");
        sigil.dataset.index = i;
        sigil.textContent = sigilSet[i] || "◻";

        sigilsContainer.appendChild(sigil);
    }

    // -----------------------------
    // IMAGE CREATION (LAZY)
    // -----------------------------
    function createImage(layer, src) {
        const img = document.createElement("img");
        img.className = "room-image";
        img.dataset.src = src;
        layer.appendChild(img);
        return img;
    }

    function loadLayerImages(layer, index) {
        const src = imagePaths[index];
        const imgs = layer.querySelectorAll("img");

        if (imgs.length === 0) {
            createImage(layer, src);
        }

        layer.querySelectorAll("img").forEach(img => {
            if (!img.src && img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }

    // -----------------------------
    // SIGILS
    // -----------------------------
    sigilsContainer.querySelectorAll("div").forEach(sigil => {
        sigil.addEventListener("click", () => {

            const index = Number(sigil.dataset.index);
            const layer = layers[index];

            if (!layer) return;

            const isLifting = !layer.classList.contains("lift-up");

            layer.classList.toggle("lift-up");

            if (isLifting) {
                loadLayerImages(layer, index);
            }
        });
    });

    // -----------------------------
    // LIFT ALL
    // -----------------------------
    function liftAll() {

        layers.forEach((layer, i) => {

            const delay = (layers.length - i) * 80;

            setTimeout(() => {
                layer.classList.add("lift-up");
                loadLayerImages(layer, i);
            }, delay);

        });
    }

    if (liftAllBtn) {
        liftAllBtn.addEventListener("click", liftAll);
    }

});
