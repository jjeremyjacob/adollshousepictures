document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_LAYERS = 30;
    const world = document.querySelector(".world");
    const sigilsContainer = document.querySelector(".sigils");

    const layers = [];

    // -----------------------------
    // BUILD LAYERS
    // -----------------------------
    for (let i = 0; i < TOTAL_LAYERS; i++) {

        const layer = document.createElement("div");
        layer.className = "layer";
        layer.id = `layer${i + 1}`;

        world.appendChild(layer);
        layers.push(layer);
    }

    // -----------------------------
    // SIGIL LABELS
    // -----------------------------
    const sigilSet = [
        "find me","gun","the horse","chicken","e",
        "game","my house","◉","⟡","✦",
        "floor plan","library","+","cut","⬣",
        "⌒","king","oh i","▢","□",
        "■","▨","▣","▤","▦",
        "26","27","28","29","30"
    ];

    // -----------------------------
    // LAYER STATE HELPERS
    // -----------------------------
    function lift(layer) {
        layer.style.transform = "translateY(0)";
        layer.dataset.state = "up";
    }

    function drop(layer) {
        layer.style.transform = "translateY(140%)";
        layer.dataset.state = "down";
    }

    function liftAll() {
        layers.forEach(lift);
    }

    function dropAll() {
        layers.forEach(drop);
    }

    // -----------------------------
    // INIT STATE (all hidden/down)
    // -----------------------------
    dropAll();

    // -----------------------------
    // BUILD SIGILS GRID
    // -----------------------------
    sigilSet.forEach((label, i) => {
        const sigil = document.createElement("div");
        sigil.textContent = label;
        sigil.dataset.index = i;

        sigilsContainer.appendChild(sigil);
    });

    // -----------------------------
    // ADD WHITE "LIFT ALL" COMMAND SIGIL
    // -----------------------------
    const liftAllSigil = document.createElement("div");
    liftAllSigil.textContent = "lift all";
    liftAllSigil.classList.add("sigil-lift-all");

    sigilsContainer.appendChild(liftAllSigil);

    // -----------------------------
    // INDIVIDUAL SIGIL CONTROL
    // -----------------------------
    sigilsContainer.querySelectorAll("div").forEach((sigil, index) => {

        // last element is liftAllSigil → skip layer mapping
        if (sigil === liftAllSigil) return;

        sigil.addEventListener("click", () => {
            const layerIndex = Number(sigil.dataset.index);
            const layer = layers[layerIndex];
            if (!layer) return;

            if (layer.dataset.state === "up") {
                drop(layer);
            } else {
                lift(layer);
            }
        });
    });

    // -----------------------------
    // LIFT ALL CONTROL (white sigil)
    // -----------------------------
    liftAllSigil.addEventListener("click", liftAll);

});
