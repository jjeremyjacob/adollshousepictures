document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_LAYERS = 30;

    const world = document.querySelector(".world");
    const indexContainer = document.querySelector(".index");
    const liftAllBtn = document.getElementById("liftAll");

    const DURATION = 6000;

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
    // INITIAL STATE
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
    // CORE STATE
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
    }

    // -----------------------------
    // LIFT ALL / RESET
    // -----------------------------
    function liftAllLayers() {
        goToLayer(TOTAL_LAYERS - 1);
    }

    function resetLayers() {
        goToLayer(0);
    }

    // -----------------------------
    // INDEX NAVIGATION (6 GROUPS)
    // -----------------------------
    const indexGroups = [
        [0, 4],
        [5, 9],
        [10, 14],
        [15, 19],
        [20, 24],
        [25, 29]
    ];

    const indexLabels = [
        "01–05",
        "06–10",
        "11–15",
        "16–20",
        "21–25",
        "26–30"
    ];

    const groups = [];

    indexGroups.forEach((range, i) => {

        const el = document.createElement("div");
        el.textContent = indexLabels[i];

        el.dataset.start = range[0];
        el.dataset.end = range[1];

        indexContainer.appendChild(el);
        groups.push(el);
    });

    // -----------------------------
    // INDEX CLICK BEHAVIOR
    // cycles through each range
    // -----------------------------
    groups.forEach(group => {

        let current = Number(group.dataset.start);

        group.addEventListener("click", () => {

            const start = Number(group.dataset.start);
            const end = Number(group.dataset.end);

            if (current < start || current > end) {
                current = start;
            } else {
                current++;
                if (current > end) current = start;
            }

            goToLayer(current);
        });
    });

    // -----------------------------
    // BUTTON CONTROL
    // -----------------------------
    if (liftAllBtn) {
        liftAllBtn.addEventListener("click", liftAllLayers);
    }

    // Optional: long-press reset (mobile-friendly fallback)
    let pressTimer;

    liftAllBtn?.addEventListener("touchstart", () => {
        pressTimer = setTimeout(resetLayers, 700);
    });

    liftAllBtn?.addEventListener("touchend", () => {
        clearTimeout(pressTimer);
    });

});
