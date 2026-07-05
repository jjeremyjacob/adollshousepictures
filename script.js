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
    // SIGIL LIST
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
    // LAYER CONTROL
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

    // INIT STATE
    dropAll();

    // -----------------------------
    // BUILD SIGILS
    // -----------------------------
    sigilSet.forEach((label, i) => {
        const sigil = document.createElement("div");
        sigil.textContent = label;
        sigil.dataset.index = i;

        sigilsContainer.appendChild(sigil);
    });

    // -----------------------------
    // ADD LIFT ALL SIGIL
    // -----------------------------
    const liftAllSigil = document.createElement("div");
    liftAllSigil.textContent = "lift all";
    liftAllSigil.classList.add("sigil-lift-all");

    sigilsContainer.appendChild(liftAllSigil);

    // -----------------------------
    // SIGIL CLICK HANDLING
    // -----------------------------
    sigilsContainer.querySelectorAll("div").forEach((sigil) => {

        if (sigil === liftAllSigil) return;

        sigil.addEventListener("click", () => {
            const index = Number(sigil.dataset.index);
            const layer = layers[index];
            if (!layer) return;

            if (layer.dataset.state === "up") {
                drop(layer);
            } else {
                lift(layer);
            }
        });
    });

    // -----------------------------
    // LIFT ALL
    // -----------------------------
    liftAllSigil.addEventListener("click", liftAll);

});
