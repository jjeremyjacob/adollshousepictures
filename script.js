document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_LAYERS = 30;

    const world = document.querySelector(".world");
    const sigilsContainer = document.querySelector(".sigils");

    const DURATION = 6000;

    const sigilSet = [
        "❂","⟴","⇶","⊙","e",
        "⧉","mh","◉","⟡","✦",
        "fp","bk","+","ct","⬣",
        "⌒","kg","oi","f▢","f□","f■",
        "f▨","f▣","f▤","f▦","fl","fl2","28"
    ];

    const layers = [];
    let currentLayer = 0;

    /* =========================
       BUILD LAYERS
    ========================= */
    for (let i = 0; i < TOTAL_LAYERS; i++) {

        const layer = document.createElement("div");
        layer.className = "layer";
        layer.id = `layer${i + 1}`;

        layer.style.backgroundImage =
            `url("images/layer${i + 1}.webp")`;

        world.appendChild(layer);
        layers.push(layer);
    }

    /* INIT */
    layers.forEach((layer, i) => {
        layer.style.transition = "none";
        layer.style.transform =
            i === 0 ? "translateY(0)" : "translateY(-140%)";
    });

    function goToLayer(index) {

        currentLayer = index;

        layers.forEach((layer, i) => {
            layer.style.transition =
                `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

            layer.style.transform =
                i <= currentLayer ? "translateY(0)" : "translateY(-140%)";
        });

        updateSigils();
    }

    /* =========================
       SIGILS
    ========================= */
    const sigils = [];

    sigilSet.forEach((label, i) => {

        const sigil = document.createElement("div");

        sigil.textContent = label;
        sigil.dataset.index = i;

        sigilsContainer.appendChild(sigil);
        sigils.push(sigil);
    });

    /* ARCH LIFT (LAST ITEM) */
    const archLift = document.createElement("div");
    archLift.textContent = "⌂";
    archLift.classList.add("arch-lift");

    sigilsContainer.appendChild(archLift);

    /* SIGIL NAV */
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

    /* ARCH ACTION */
    archLift.addEventListener("click", () => {
        currentLayer = 0;

        layers.forEach(layer => {
            layer.style.transform = "translateY(-140%)";
        });

        updateSigils();
    });

    function updateSigils() {
        sigils.forEach((sigil, i) => {
            sigil.classList.toggle("active", i === currentLayer);
        });
    }

    updateSigils();

});
