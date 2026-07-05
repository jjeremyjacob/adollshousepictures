document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_LAYERS = 30;

    const world = document.querySelector(".world");
    const sigilsContainer = document.querySelector(".sigils");

    if (!world || !sigilsContainer) {
        console.error("Missing .world or .sigils in DOM");
        return;
    }

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
    // BUILD LAYERS (SAFE LOADING)
    // =========================
    for (let i = 0; i < TOTAL_LAYERS; i++) {

        const layer = document.createElement("div");
        layer.className = "layer";
        layer.id = `layer${i + 1}`;

        const imgPath = `images/layer${i + 1}.webp`;

        // SAFE IMAGE LOADING (prevents silent blank stage)
        const img = new Image();
        img.src = imgPath;

        img.onload = () => {
            layer.style.backgroundImage = `url("${imgPath}")`;
        };

        img.onerror = () => {
            console.warn("Missing image:", imgPath);
            layer.style.background = "#1a1a1a"; // visible fallback
        };

        layer.dataset.state = "down";

        world.appendChild(layer);
        layers.push(layer);
    }

    // =========================
    // LAYER CONTROL (NO GROUPING)
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

    function resetAll() {
        layers.forEach(layer => drop(layer));
    }

    // =========================
    // BUILD SIGILS
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
    // ARCH (RESET CONTROL)
    // =========================
    const arch = document.createElement("div");
    arch.textContent = "⌂";
    arch.classList.add("arch-lift");

    arch.addEventListener("click", resetAll);

    sigilsContainer.appendChild(arch);

});
