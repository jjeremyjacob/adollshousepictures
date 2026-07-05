document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_LAYERS = 30;
    const world = document.querySelector(".world");
    const sigilsContainer = document.querySelector(".sigils");
    const liftAllBtn = document.getElementById("liftAll");

    const DURATION = 6000;

    const sigilSet = [
        "find me","gun","the horse","chicken","e",
        "game","my house","◉","⟡","✦",
        "floor plan","library","+","cut","⬣",
        "⌒","king","oh i","▢","□",
        "■","▨","▣","▤","▦",
        "26","27","28","29","30"
    ];

    const layers = [];

    // BUILD
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

    // MOVE HELPERS
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

    // INIT (all down)
    dropAll();

    // SIGIL CLICK CONTROL
    sigilsContainer.querySelectorAll("div").forEach(sigil => {
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

    // BUTTON
    if (liftAllBtn) {
        liftAllBtn.addEventListener("click", liftAll);

        liftAllBtn.addEventListener("touchstart", (e) => {
            e.preventDefault();
            liftAll();
        }, { passive: false });
    }

});
