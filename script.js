document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_LAYERS = 30;

    const world = document.querySelector(".world");
    const sigilsContainer = document.querySelector(".sigils");

    const DURATION = 6000;

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

    /* -----------------------------
       BUILD LAYERS
    ------------------------------ */
    for (let i = 0; i < TOTAL_LAYERS; i++) {

        const layer = document.createElement("div");
        layer.className = "layer";
        layer.id = `layer${i + 1}`;

        world.appendChild(layer);
        layers.push(layer);
    }

    /* INIT */
    layers.forEach((layer, i) => {

        layer.style.transition = "none";

        if (i === 0) {
            layer.style.transform = "translateY(0)";
        } else {
            layer.style.transform = "translateY(-140%)";
        }
    });

    /* -----------------------------
       NAV SYSTEM
    ------------------------------ */
    function goToLayer(index) {

        currentLayer = index;

        layers.forEach((layer, i) => {

            layer.style.transition =
                `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

            if (i <= currentLayer) {
                layer.style.transform = "translateY(0)";
            } else {
                layer.style.transform = "translateY(-140%)";
            }
        });

        updateSigils();
    }

    /* -----------------------------
       BUILD MOBILE 6-ROW SIGILS
    ------------------------------ */

    const archRow = document.createElement("div");
    archRow.className = "sigils-row arch-row";

    const gridRow = document.createElement("div");
    gridRow.className = "sigils-row grid-row";

    sigilsContainer.appendChild(archRow);
    sigilsContainer.appendChild(gridRow);

    const sigils = [];

    sigilSet.forEach((label, i) => {

        const sigil = document.createElement("div");
        sigil.textContent = label;
        sigil.dataset.index = i;

        if (i === 0) {
            sigil.classList.add("arch");
            archRow.appendChild(sigil);
        } else {
            gridRow.appendChild(sigil);
        }

        sigils.push(sigil);
    });

    /* -----------------------------
       ACTIVE STATE
    ------------------------------ */
    function updateSigils() {
        sigils.forEach((sigil, i) => {
            sigil.classList.toggle("active", i === currentLayer);
        });
    }

    updateSigils();

    /* -----------------------------
       CLICK INTERACTION
    ------------------------------ */
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
