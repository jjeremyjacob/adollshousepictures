document.addEventListener("DOMContentLoaded", () => {

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    const layers = document.querySelectorAll(".layer");

    let index = 0;
    let isAnimating = false;

    const DROP_DURATION = 5500;
    const LIFT_DURATION = 7000;

    // -----------------------------
    // INITIAL OPENING CURTAIN
    // -----------------------------
    layers.forEach((layer, i) => {

        if (i === 0) {
            // start above stage
            layer.style.transform = "translateY(-140%)";
            layer.style.transition = "none";

            layer.offsetHeight; // force reflow

            // drop first layer in
            layer.style.transition =
                "transform 6s cubic-bezier(0.22, 1, 0.36, 1)";
            layer.style.transform = "translateY(0)";
        } else {
            layer.style.transform = "translateY(-100%)";
        }
    });

    // -----------------------------
    // FORWARD (curtain drop)
    // -----------------------------
    function goNext() {
        if (isAnimating) return;
        if (index >= layers.length - 1) return;

        isAnimating = true;

        const next = index + 1;
        const nextLayer = layers[next];

        // prepare incoming layer above stage
        nextLayer.style.transition = "none";
        nextLayer.style.transform = "translateY(-140%)";

        nextLayer.offsetHeight; // reflow

        // drop it down
        nextLayer.style.transition =
            "transform 6s cubic-bezier(0.22, 1, 0.36, 1)";
        nextLayer.style.transform = "translateY(0)";

        setTimeout(() => {
            index = next;
            isAnimating = false;
        }, DROP_DURATION);
    }

    // -----------------------------
    // BACK (curtain lift)
    // -----------------------------
    function goPrev() {
        if (isAnimating) return;
        if (index <= 0) return;

        isAnimating = true;

        const currentLayer = layers[index];

        // lift current layer off stage
        currentLayer.style.transition =
            "transform 6s cubic-bezier(0.22, 1, 0.36, 1)";
        currentLayer.style.transform = "translateY(-140%)";

        setTimeout(() => {
            index--;
            isAnimating = false;
        }, LIFT_DURATION);
    }

    // -----------------------------
    // CONTROLS
    // -----------------------------
    nextBtn.addEventListener("click", goNext);
    prevBtn.addEventListener("click", goPrev);

});
