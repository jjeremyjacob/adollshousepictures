document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_LAYERS = 30;

    const world = document.querySelector(".world");
    const sigilsContainer = document.querySelector(".sigils");

    const sigilSet = [
        "⌒",
        "find me","gun","the horse","chicken","e",
        "game","my house","◉","⟡","✦",
        "floor plan","library","+","cut","⬣",
        "king","oh i","▢","□","■",
        "▨","▣","▤","▦","26","27","28"
    ];

    const layers = [];
    let currentLayer = 0;

    // BUILD LAYERS
    for (let i = 0; i < TOTAL_LAYERS; i++) {
        const layer = document.createElement("div");
        layer.className = "layer";
        layer.id = `layer${i + 1}`;
        world.appendChild(layer);
        layers.push(layer);
    }

    // INIT LAYERS
    layers.forEach((layer, i) => {
        layer.style.transform = i === 0 ? "translateY(0)" : "translateY(-140%)";
    });

    function goToLayer(index) {
        currentLayer = index;

        layers.forEach((layer, i) => {
            layer.style.transform =
                i <= currentLayer ? "translateY(0)" : "translateY(-140%)";
        });

        updateSigils();
    }

    // BUILD SIGILS (FLAT STRUCTURE ONLY)
    const sigils = [];

    sigilSet.forEach((label, i) => {
        const sigil = document.createElement("div");
        sigil.textContent = label;
        sigil.dataset.index = i;

        if (i === 0) sigil.classList.add("arch");

        sigilsContainer.appendChild(sigil);
        sigils.push(sigil);
    });

    function updateSigils() {
        sigils.forEach((sigil, i) => {
            sigil.classList.toggle("active", i === currentLayer);
        });
    }

    updateSigils();

    sigils.forEach(sigil => {
        sigil.addEventListener("click", () => {
            const index = Number(sigil.dataset.index);

            if (index === 0) {
                goToLayer(TOTAL_LAYERS - 1);
                return;
            }

            goToLayer(index);
        });
    });

});
