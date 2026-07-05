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
    // LAYER ACTIONS (NO GROUP LOGIC)
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

    // ARCH (RESET CONTROL)
    const arch = document.createElement("div");
    arch.textContent = "⌂";
    arch.classList.add("arch-lift");

    arch.addEventListener("click", resetAll);

    sigilsContainer.appendChild(arch);

});
