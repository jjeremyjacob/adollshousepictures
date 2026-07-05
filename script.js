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
        "⌒","king","oh i", "▢","□","■",
        "▨","▣","▤","▦","26","27","28",
    ];

    const layers = [];

    // -----------------------------
    // BUILD SYSTEM
    // -----------------------------
    for (let i = 0; i < TOTAL_LAYERS; i++) {

        const layer = document.createElement("div");
        layer.className = "layer";
        layer.id = `layer${i + 1}`;

        world.appendChild(layer);
        layers.push(layer);

        const sigil = document.createElement("div");
        sigil.dataset.layer = i;
        sigil.textContent = sigilSet[i] || "◻";

        sigilsContainer.appendChild(sigil);
    }

    // -----------------------------
    // INIT STATE
    // -----------------------------
    layers.forEach((layer, i) => {

        layer.style.transition = "none";

        if (i === 0) {
            layer.style.transform = "translateY(0)";
            layer.dataset.state = "down";
        } else {
            layer.style.transform = "translateY(-140%)";
            layer.dataset.state = "up";
        }
    });

    // -----------------------------
    // MOVE FUNCTIONS
    // -----------------------------
    function moveUp(layer) {
        layer.style.transition =
            `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

        layer.style.transform = "translateY(-140%)";
        layer.dataset.state = "up";
    }

    function moveDown(layer) {
        layer.style.transition =
            `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

        layer.style.transform = "translateY(0)";
        layer.dataset.state = "down";
    }

    // -----------------------------
    // LIFT ALL
    // -----------------------------
    function liftAllLayers() {
        layers.forEach(layer => {
            layer.style.transition =
                `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

            layer.style.transform = "translateY(-140%)";
            layer.dataset.state = "up";
        });
    }

    // -----------------------------
    // RESET ALL
    // -----------------------------
    function resetLayers() {
        layers.forEach(layer => {
            layer.style.transition =
                `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

            layer.style.transform = "translateY(0)";
            layer.dataset.state = "down";
        });
    }

    // -----------------------------
    // SIGIL INTERACTION
    // -----------------------------
    sigilsContainer.querySelectorAll("div").forEach(sigil => {

        sigil.addEventListener("click", () => {

            const index = Number(sigil.dataset.layer);
            const layer = layers[index];

            if (!layer) return;

            if (layer.dataset.state === "down") {
                moveUp(layer);
            } else {
                moveDown(layer);
            }
        });
    });

    // -----------------------------
    // BUTTON CONTROL
    // -----------------------------
    if (liftAllBtn) {
        liftAllBtn.addEventListener("click", liftAllLayers);
    }

});
