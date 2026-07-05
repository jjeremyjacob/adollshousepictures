document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_LAYERS = 30;

    const world = document.querySelector(".world");
    const sigilsContainer = document.querySelector(".sigils");

    const DURATION = 6000;

    const sigilSet = [
        "❂","⟴","⇶","⊙","e",
        "⧉","mh","◉","⟡","✦",
        "fp","bk","+","ct","⬣",
        "⌒","kg","oi","▢","□","■",
        "▨","▣","▤","▦","fl","fl2","28"
    ];

    const layers = [];

    // =========================
    // BUILD LAYERS
    // =========================
    for (let i = 0; i < TOTAL_LAYERS; i++) {

        const layer = document.createElement("div");
        layer.className = "layer";
        layer.id = `layer${i + 1}`;

        layer.style.backgroundImage =
            `url("images/layer${i + 1}.webp")`;

        layer.dataset.state = "down";

        world.appendChild(layer);
        layers.push(layer);
    }

    // =========================
    // INDIVIDUAL LAYER CONTROL
    // =========================
    function lift(layer) {
        layer.style.transition =
            `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

        layer.style.transform = "translateY(-140%)";
        layer.dataset.state = "up";
    }

    function drop(layer) {
        layer.style.transition =
            `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

        layer.style.transform = "translateY(0)";
        layer.dataset.state = "down";
    }

    function toggleLayer(index) {
        const layer = layers[index];
        if (!layer) return;

        if (layer.dataset.state === "down") {
            lift(layer);
        } else {
            drop(layer);
        }
    }

    // =========================
    // SIGILS
    // =========================
    sigilSet.forEach((label, i) => {

        const sigil = document.createElement("div");
        sigil.textContent = label;
        sigil.dataset.index = i;

        sigil.addEventListener("click", () => {
            toggleLayer(i);
        });

        sigilsContainer.appendChild(sigil);
    });

    // =========================
    // ARCH (RESET ONLY)
    // =========================
    const archLift = document.createElement("div");
    archLift.textContent = "⌂";
    archLift.classList.add("arch-lift");

    archLift.addEventListener("click", () => {
        layers.forEach(layer => drop(layer));
    });

    sigilsContainer.appendChild(archLift);
});
