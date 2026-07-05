document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_LAYERS = 12;
    const DURATION = 6000;

    const world = document.querySelector(".world");
    const sigilsContainer = document.querySelector(".sigils");

    const sigilSet = [
        "❂","⟴","⇶","⊙",
        "e","✦","◉","⟡",
        "▢","■","✶","✷"
    ];

    const layers = [];
    const sigils = [];
    const layerState = new Array(TOTAL_LAYERS).fill(false);

    /* =========================
       GIF / WEBP RESOLVER
    ========================= */

    function resolveImage(i) {

        const base = `images/layer${i + 1}`;

        const webp = `${base}.webp`;
        const gif = `${base}.gif`;

        return new Promise((resolve) => {

            const img = new Image();

            img.onload = () => resolve(webp);

            img.onerror = () => {

                const img2 = new Image();

                img2.onload = () => resolve(gif);

                img2.onerror = () => resolve(null);

                img2.src = gif;
            };

            img.src = webp;
        });
    }

    /* =========================
       BUILD LAYERS
    ========================= */

    for (let i = 0; i < TOTAL_LAYERS; i++) {

        const layer = document.createElement("div");

        layer.className = "layer";
        layer.id = `layer${i + 1}`;

        layer.style.transform = "translateY(-140%)";
        layer.style.transition =
            `transform ${DURATION}ms cubic-bezier(.22,1,.36,1)`;

        world.appendChild(layer);
        layers.push(layer);

        resolveImage(i).then((src) => {
            if (src) {
                layer.style.backgroundImage = `url("${src}")`;
            }
        });
    }

    /* =========================
       BUILD SIGILS
    ========================= */

    sigilSet.forEach((label, index) => {

        const sigil = document.createElement("div");

        sigil.textContent = label;

        sigil.addEventListener("click", () => {
            toggleLayer(index);
        });

        sigilsContainer.appendChild(sigil);
        sigils.push(sigil);
    });

    /* =========================
       LIFT ALL (CENTERED)
    ========================= */

    const liftAll = document.createElement("div");
    liftAll.textContent = "⌂";
    liftAll.classList.add("lift-all");

    liftAll.addEventListener("click", () => {

        for (let i = 0; i < TOTAL_LAYERS; i++) {

            layerState[i] = false;

            layers[i].style.transform = "translateY(-140%)";

            if (sigils[i]) {
                sigils[i].classList.remove("active");
            }
        }
    });

    sigilsContainer.appendChild(liftAll);

    /* =========================
       TOGGLE SINGLE LAYER
    ========================= */

    function toggleLayer(index) {

        layerState[index] = !layerState[index];

        layers[index].style.transform = layerState[index]
            ? "translateY(0)"
            : "translateY(-140%)";

        sigils[index].classList.toggle(
            "active",
            layerState[index]
        );
    }

    /* =========================
       INITIAL STATE
    ========================= */

    setTimeout(() => {
        toggleLayer(0);
    }, 300);

});
