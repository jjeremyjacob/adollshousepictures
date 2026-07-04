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
    // SIGIL CLICK → TOGGLE LAYER
    // -----------------------------
    if (sigilsContainer) {

        sigilsContainer.querySelectorAll("div").forEach((sigil) => {

            sigil.addEventListener("click", () => {

                const index = Number(sigil.dataset.index);
                const layer = layers[index];

                if (!layer) return;

                layer.classList.toggle("lift-up");
            });

        });
    }

    // -----------------------------
    // LIFT ALL (CLEAN + STAGGERED)
    // -----------------------------
    function liftAllLayers() {

        const baseDelay = 80;

        layers.forEach((layer, i) => {

            const reversed = layers.length - 1 - i;

            setTimeout(() => {
                layer.classList.add("lift-up");
            }, reversed * baseDelay);
        });
    }

    // -----------------------------
    // BUTTON
    // -----------------------------
    if (liftAllBtn) {
        liftAllBtn.addEventListener("click", liftAllLayers);
    }

});
