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
    // CORE SPATIAL STATE
    // -----------------------------
    let currentLayer = 0;

    function goToLayer(index) {

        currentLayer = index;

        layers.forEach((layer, i) => {

            layer.style.transition =
                `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

            if (i <= currentLayer) {
                layer.style.transform = "translateY(0)";
                layer.dataset.state = "down";
            } else {
                layer.style.transform = "translateY(-140%)";
                layer.dataset.state = "up";
            }
        });

        updateSigilState();
    }

    // -----------------------------
    // SIGIL GRID BUILD (3 × 10)
    // -----------------------------
    const sigils = [];

    for (let i = 0; i < TOTAL_LAYERS; i++) {

        const sigil = document.createElement("div");
        sigil.textContent = sigilSet[i] || "◻";
        sigil.dataset.index = i;

        sigilsContainer.appendChild(sigil);
        sigils.push(sigil);
    }

    // -----------------------------
    // ACTIVE SIGIL HIGHLIGHT
    // -----------------------------
    function updateSigilState() {

        sigils.forEach((sigil, i) => {
            if (i === currentLayer) {
                sigil.classList.add("active");
            } else {
                sigil.classList.remove("active");
            }
        });
    }

    updateSigilState();

    // -----------------------------
    // SIGIL INTERACTION (SPATIAL JUMP)
    // -----------------------------
    sigils.forEach(sigil => {

        sigil.addEventListener("click", () => {
            const index = Number(sigil.dataset.index);
            goToLayer(index);
        });

    });

    // -----------------------------
    // ARCH LIFT (FULL COLLAPSE)
    // -----------------------------
    function liftAllLayers() {
        goToLayer(TOTAL_LAYERS - 1);
    }

    if (liftAllBtn) {
        liftAllBtn.addEventListener("click", liftAllLayers);
    }

});
