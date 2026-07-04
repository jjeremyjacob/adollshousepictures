document.addEventListener("DOMContentLoaded", () => {

    console.log("SCRIPT LOADED");

    const TOTAL_LAYERS = 30;

    const world = document.querySelector(".world");
    const sigilsContainer = document.querySelector(".sigils");
    const liftAllBtn = document.getElementById("liftAll");

    const DURATION = 6000;

    // -----------------------------
    // SIGIL SET
    // -----------------------------
    const sigilSet = [
        "find me","gun","the horse","chicken","e",
        "game","my house","◉","⟡","✦",
        "floor plan","library","+","cut","⬣",
        "⌒","king","oh i", "▢","□","■",
        "▨","▣","▤","▦","26","27","28",
    ];

    // -----------------------------
    // BUILD SYSTEM
    // -----------------------------
    const layers = [];

    for (let i = 0; i < TOTAL_LAYERS; i++) {

        // create layer
        const layer = document.createElement("div");
        layer.className = "layer";
        layer.id = `layer${i + 1}`;

        world.appendChild(layer);
        layers.push(layer);

        // create sigil
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
    // LIFT ALL LAYERS (SYSTEM CONTROL)
    // -----------------------------
    function liftAllLayers() {

        layers.forEach((layer) => {

            layer.style.transition =
                `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;

            layer.style.transform = "translateY(-140%)";
            layer.dataset.state = "up";
        });
    }

    // -----------------------------
    // SIGIL INTERACTION (per-layer control)
    // -----------------------------
    sigilsContainer.querySelectorAll("div").forEach((sigil) => {

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
    // LEFT NAV CONTROL (lift all)
    // -----------------------------
    if (liftAllBtn) {
        liftAllBtn.addEventListener("click", liftAllLayers);
    }

});

const layers = document.querySelectorAll(".layer");

function liftAllLayers() {
  const total = layers.length;

  // STEP 1: instantly make ALL layers visible
  layers.forEach(layer => {
    layer.classList.add("visible");
  });

  // STEP 2: stagger only the lift motion
  const baseDelay = 500; // dramatic spacing

  layers.forEach((layer, index) => {
    const reversedIndex = total - 1 - index;

    // strong theatrical curve
    const delay = Math.pow(reversedIndex, 1.8) * baseDelay;

    setTimeout(() => {
      layer.classList.add("lift-up");
    }, delay);
  });
}

function resetLayers() {
  layers.forEach(layer => {
    layer.classList.remove("lift-up");
    layer.classList.remove("visible");
  });
}
