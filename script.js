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

        if (sigilsContainer) {
            sigilsContainer.appendChild(sigil);
        }
    }

    // -----------------------------
    // LAZY LOAD SETUP (PREVENT ALL INITIAL IMAGE LOADING)
    // -----------------------------
    function initLazyLoading() {
        layers.forEach(layer => {
            const imgs = layer.querySelectorAll("img");

            imgs.forEach(img => {
                if (img.getAttribute("src")) {
                    img.dataset.src = img.getAttribute("src");
                    img.removeAttribute("src"); // prevents browser preload
                }
            });
        });
    }

    // -----------------------------
    // LOAD IMAGES FOR A LAYER
    // -----------------------------
    function loadLayerImages(layer) {
        if (!layer) return;

        const imgs = layer.querySelectorAll("img");

        imgs.forEach(img => {
            if (img.dataset.src && !img.src) {
                img.src = img.dataset.src;
            }
        });
    }

    // -----------------------------
    // SIGIL CLICK → TOGGLE LAYER
    // -----------------------------
    if (sigilsContainer) {

        sigilsContainer.querySelectorAll("div").forEach((sigil) => {

            sigil.addEventListener("click", () => {

                const index = Number(sigil.dataset.index);
                const layer = layers[index];

                if (!layer) return;

                const isLifting = !layer.classList.contains("lift-up");

                layer.classList.toggle("lift-up");

                // ONLY load images when layer lifts
                if (isLifting) {
                    loadLayerImages(layer);
                }
            });

        });
    }

    // -----------------------------
    // LIFT ALL (STAGGERED + LAZY SAFE)
    // -----------------------------
    function liftAllLayers() {

        const baseDelay = 80;

        layers.forEach((layer, i) => {

            const reversed = layers.length - 1 - i;

            setTimeout(() => {

                layer.classList.add("lift-up");

                loadLayerImages(layer);

            }, reversed * baseDelay);
        });
    }

    // -----------------------------
    // BUTTON
    // -----------------------------
    if (liftAllBtn) {
        liftAllBtn.addEventListener("click", liftAllLayers);
    }

    // -----------------------------
    // INIT
    // -----------------------------
    initLazyLoading();

});
