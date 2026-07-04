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

    const imagePaths = Array.from(
        { length: TOTAL_LAYERS },
        (_, i) => `images/layer${i + 1}.webp`
    );

    // -----------------------------
    // BUILD SIGILS ONLY
    // -----------------------------
    for (let i = 0; i < TOTAL_LAYERS; i++) {

        const sigil = document.createElement("div");
        sigil.dataset.index = i;
        sigil.textContent = sigilSet[i] || "◻";

        sigilsContainer.appendChild(sigil);
    }

    // -----------------------------
    // ENSURE LAYER EXISTS
    // -----------------------------
    function ensureLayer(index) {

        if (layers[index]) return layers[index];

        const layer = document.createElement("div");
        layer.className = "layer";
        layer.id = `layer${index + 1}`;

        world.appendChild(layer);
        layers[index] = layer;

        return layer;
    }

    // -----------------------------
    // LOAD IMAGE (LAZY, ONCE)
    // -----------------------------
    function loadImage(layer, index) {

        if (layer.dataset.loaded) return;

        const img = document.createElement("img");
        img.className = "room-image";
        img.src = imagePaths[index];

        layer.appendChild(img);

        layer.dataset.loaded = "true";
    }

    // -----------------------------
    // TOGGLE LAYER (MOBILE SAFE ANIMATION)
    // -----------------------------
    function toggleLayer(index) {

        const layer = ensureLayer(index);

        const opening = !layer.classList.contains("lift-up");

        loadImage(layer, index);

        // FORCE 2-FRAME PAINT (fixes mobile animation skipping)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {

                layer.classList.toggle("lift-up");

            });
        });
    }

    // -----------------------------
    // SIGILS (EVENT DELEGATION)
    // -----------------------------
    sigilsContainer.addEventListener("click", (e) => {

        const target = e.target;
        const index = Number(target.dataset.index);

        if (Number.isNaN(index)) return;

        toggleLayer(index);
    });

    // -----------------------------
    // LIFT ALL
    // -----------------------------
    function liftAll() {

        for (let i = 0; i < TOTAL_LAYERS; i++) {

            const delay = (TOTAL_LAYERS - i) * 80;

            setTimeout(() => {

                const layer = ensureLayer(i);

                loadImage(layer, i);

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        layer.classList.add("lift-up");
                    });
                });

            }, delay);
        }
    }

    if (liftAllBtn) {
        liftAllBtn.addEventListener("click", liftAll);
    }

});
