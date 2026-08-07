document.addEventListener("DOMContentLoaded", () => {

    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    /* =================================================
       CONTACT DRAWER
    ================================================= */

    const contactTab =
        document.querySelector(".contact-tab");

    const contactDrawer =
        document.querySelector(".contact-drawer");

    const drawerClose =
        document.querySelector(".drawer-close");

    const openDrawer = () => {

        if (!contactDrawer || !contactTab) return;

        contactDrawer.classList.add("active");

        contactDrawer.setAttribute(
            "aria-hidden",
            "false"
        );

        contactTab.setAttribute(
            "aria-expanded",
            "true"
        );

    };

    const closeDrawer = () => {

        if (!contactDrawer || !contactTab) return;

        contactDrawer.classList.remove("active");

        contactDrawer.setAttribute(
            "aria-hidden",
            "true"
        );

        contactTab.setAttribute(
            "aria-expanded",
            "false"
        );

    };

    if (contactTab && contactDrawer) {

        contactTab.addEventListener(
            "click",
            () => {

                if (
                    contactDrawer.classList.contains("active")
                ) {

                    closeDrawer();

                } else {

                    openDrawer();

                }

            }
        );

        if (drawerClose) {

            drawerClose.addEventListener(
                "click",
                closeDrawer
            );

        }

        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {

                    closeDrawer();

                }

            }
        );

    }


    /* =================================================
       EMAIL / INSTAGRAM HOVER
    ================================================= */

    const setupHoverSwap = (
        selector,
        defaultSelector,
        hoverSelector
    ) => {

        document
            .querySelectorAll(selector)
            .forEach(link => {

                const defaultText =
                    link.querySelector(defaultSelector);

                const hoverText =
                    link.querySelector(hoverSelector);

                if (!defaultText || !hoverText) return;

                link.addEventListener(
                    "mouseenter",
                    () => {

                        defaultText.style.display =
                            "none";

                        hoverText.style.display =
                            "inline";

                    }
                );

                link.addEventListener(
                    "mouseleave",
                    () => {

                        defaultText.style.display =
                            "inline";

                        hoverText.style.display =
                            "none";

                    }
                );

            });

    };

    setupHoverSwap(
        ".email-link",
        ".email-default",
        ".email-hover"
    );

    setupHoverSwap(
        ".instagram-link",
        ".instagram-default",
        ".instagram-hover"
    );


    /* =================================================
       RESPONSIVE STATE
    ================================================= */

    const mobileQuery =
        window.matchMedia(
            "(max-width: 700px)"
        );

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =================================================
       GLOBAL VIMEO BACKGROUND
    ================================================= */

    const baseVideo =
        document.querySelector(".base-video");

    const baseIframe =
        baseVideo
            ? baseVideo.querySelector("iframe")
            : null;

    const audioToggle =
        document.querySelector(
            ".vimeo-audio-toggle"
        );

    let activePlayer = null;
    let audioOn = false;


    function initializeVimeo() {

        if (
            !baseIframe ||
            typeof Vimeo === "undefined"
        ) {

            console.log(
                "Vimeo API or background iframe not found."
            );

            return;

        }

        baseIframe.classList.remove(
            "video-loaded"
        );


        try {

            activePlayer =
                new Vimeo.Player(
                    baseIframe
                );

        } catch (error) {

            console.log(
                "Vimeo initialization error:",
                error
            );

            return;

        }


activePlayer.on(
    "playing",
    () => {

        baseIframe.classList.add(
            "video-loaded"
        );

    }
);


        activePlayer.ready().then(
            async () => {

                console.log(
                    "Background Vimeo ready."
                );


                try {

                    await activePlayer.setVolume(
                        0
                    );

                } catch (error) {

                    console.log(
                        "Vimeo volume error:",
                        error
                    );

                }


                try {

                    await activePlayer.play();

                } catch (error) {

                    console.log(
                        "Vimeo autoplay:",
                        error
                    );

                }

            }
        ).catch(
            error => {

                console.log(
                    "Vimeo ready error:",
                    error
                );

            }
        );


        if (!audioToggle) return;


        audioToggle.addEventListener(
            "click",
            async () => {

                if (!activePlayer) return;


                try {

                    audioOn =
                        !audioOn;


                    await activePlayer.setVolume(
                        audioOn
                            ? 1
                            : 0
                    );


                    const label =
                        audioToggle.querySelector(
                            "span"
                        );


                    if (label) {

                        label.textContent =
                            audioOn
                                ? "SOUND ON"
                                : "SOUND OFF";

                    }


                    audioToggle.setAttribute(
                        "aria-label",
                        audioOn
                            ? "Turn video audio off"
                            : "Turn video audio on"
                    );


                    audioToggle.setAttribute(
                        "aria-pressed",
                        audioOn
                            ? "true"
                            : "false"
                    );


                } catch (error) {

                    console.log(
                        "Vimeo audio error:",
                        error
                    );

                }

            }
        );

    }

    initializeVimeo();


    /* =================================================
       INTRO — FLOATING LETTERS
    ================================================= */

    const intro =
        document.querySelector(".intro");

    const introTitle =
        document.querySelector(".intro h1");

    const desktopTitle =
        document.querySelector(".desktop-title");

    const mobileTitle =
        document.querySelector(".mobile-title");


    if (
        intro &&
        introTitle &&
        desktopTitle &&
        mobileTitle &&
        !reducedMotion
    ) {

        let activeTitle = null;
        let letters = [];

        let lastTime =
            performance.now();

        let startTime =
            performance.now();

        const settleTime = 1000;
        const releaseDuration = 12000;


        function getActiveTitle() {

            return mobileQuery.matches
                ? mobileTitle
                : desktopTitle;

        }


        function prepareTitle() {

            const newActiveTitle =
                getActiveTitle();


            if (
                newActiveTitle === activeTitle &&
                letters.length
            ) {

                return;

            }


            activeTitle =
                newActiveTitle;


            const originalText =
                activeTitle.dataset.originalText ||
                activeTitle.textContent;


            activeTitle.dataset.originalText =
                originalText;


            activeTitle.innerHTML = "";

            letters = [];


            [...originalText].forEach(
                char => {

                    if (char === "\n") {

                        activeTitle.appendChild(
                            document.createElement("br")
                        );

                        return;

                    }


                    if (char === " ") {

                        activeTitle.appendChild(
                            document.createTextNode(" ")
                        );

                        return;

                    }


                    const span =
                        document.createElement("span");


                    span.className =
                        "floating-letter";


                    /*
                     * Do not allow the CSS
                     * floating-letter fade animation
                     * to interfere with the movement.
                     */

span.style.animation = "floatingLetterFade 5s ease forwards";

                    span.style.opacity =
                        "1";

                    span.style.color =
                        "#ffffff";

                    span.style.webkitTextStroke =
                        "5px #ffffff";


                    span.style.position =
                        "static";


                    span.textContent =
                        char;


                    activeTitle.appendChild(
                        span
                    );


                    letters.push({

                        element: span,

                        baseX: 0,
                        baseY: 0,

                        x: 0,
                        y: 0,

                        vx: 0,
                        vy: 0,

                        width: 0,
                        height: 0,

                        rotation: 0,
                        rotationVelocity: 0

                    });

                }
            );


            measureLetters();


            /*
             * Convert every letter to fixed positioning
             * after its original location has been measured.
             */

            letters.forEach(
                letter => {

                    letter.element.style.position =
                        "fixed";

                    letter.element.style.left =
                        `${letter.baseX}px`;

                    letter.element.style.top =
                        `${letter.baseY}px`;

                    letter.element.style.transform =
                        "translate3d(0,0,0)";


                    /*
                     * Small random starting velocity.
                     */

                    const angle =
                        Math.random() *
                        Math.PI *
                        2;


                    const speed =
                        0.055 +
                        Math.random() *
                        0.045;


                    letter.vx =
                        Math.cos(angle) *
                        speed;


                    letter.vy =
                        Math.sin(angle) *
                        speed;


                    letter.rotation =
                        (
                            Math.random() -
                            0.5
                        ) * 5;


                    letter.rotationVelocity =
                        (
                            Math.random() -
                            0.5
                        ) * 0.01;

                }
            );

        }


        function measureLetters() {

            if (!activeTitle) return;


            letters.forEach(
                letter => {

                    /*
                     * Return to normal document flow
                     * while measuring.
                     */

                    letter.element.style.position =
                        "static";

                    letter.element.style.transform =
                        "none";


                    const rect =
                        letter.element.getBoundingClientRect();


                    letter.baseX =
                        rect.left;

                    letter.baseY =
                        rect.top;

                    letter.width =
                        rect.width;

                    letter.height =
                        rect.height;

                    letter.x =
                        rect.left;

                    letter.y =
                        rect.top;

                }
            );

        }


        function collide(a, b) {

            const overlapX =
                Math.min(
                    a.x + a.width,
                    b.x + b.width
                ) -
                Math.max(
                    a.x,
                    b.x
                );


            const overlapY =
                Math.min(
                    a.y + a.height,
                    b.y + b.height
                ) -
                Math.max(
                    a.y,
                    b.y
                );


            if (
                overlapX <= 0 ||
                overlapY <= 0
            ) {

                return;

            }


            if (
                overlapX < overlapY
            ) {

                const centerA =
                    a.x +
                    a.width / 2;


                const centerB =
                    b.x +
                    b.width / 2;


                const direction =
                    centerA < centerB
                        ? -1
                        : 1;


                const push =
                    overlapX / 2 +
                    1;


                a.x +=
                    direction *
                    push;


                b.x -=
                    direction *
                    push;


                const velocity =
                    a.vx;


                a.vx =
                    b.vx;

                b.vx =
                    velocity;

            } else {

                const centerA =
                    a.y +
                    a.height / 2;


                const centerB =
                    b.y +
                    b.height / 2;


                const direction =
                    centerA < centerB
                        ? -1
                        : 1;


                const push =
                    overlapY / 2 +
                    1;


                a.y +=
                    direction *
                    push;


                b.y -=
                    direction *
                    push;


                const velocity =
                    a.vy;


                a.vy =
                    b.vy;

                b.vy =
                    velocity;

            }

        }


        function keepInsidePage(letter) {

            const pageWidth =
                window.innerWidth;

            const pageHeight =
                window.innerHeight;


            if (letter.x <= 0) {

                letter.x = 0;

                if (letter.vx < 0) {

                    letter.vx *= -1;

                }

            }


            if (
                letter.x +
                letter.width >=
                pageWidth
            ) {

                letter.x =
                    pageWidth -
                    letter.width;


                if (letter.vx > 0) {

                    letter.vx *= -1;

                }

            }


            if (letter.y <= 0) {

                letter.y = 0;

                if (letter.vy < 0) {

                    letter.vy *= -1;

                }

            }


            if (
                letter.y +
                letter.height >=
                pageHeight
            ) {

                letter.y =
                    pageHeight -
                    letter.height;


                if (letter.vy > 0) {

                    letter.vy *= -1;

                }

            }

        }


        prepareTitle();


        function animateIntro(now) {

            const delta =
                Math.min(
                    now - lastTime,
                    32
                );


            lastTime =
                now;


            const elapsed =
                now - startTime;


            /*
             * First second:
             * letters remain exactly where
             * the title originally placed them.
             */

            if (
                elapsed <
                settleTime
            ) {

                letters.forEach(
                    letter => {

                        letter.x =
                            letter.baseX;

                        letter.y =
                            letter.baseY;


                        letter.element.style.left =
                            `${letter.baseX}px`;


                        letter.element.style.top =
                            `${letter.baseY}px`;


                        letter.element.style.transform =
                            "translate3d(0,0,0)";


                        /*
                         * Absolutely no fading.
                         */

                        letter.element.style.opacity =
                            "1";

                        letter.element.style.color =
                            "#ffffff";

                        letter.element.style.webkitTextStroke =
                            "5px #ffffff";

                    }
                );

            } else {

                const releaseProgress =
                    Math.min(
                        (
                            elapsed -
                            settleTime
                        ) /
                        releaseDuration,
                        1
                    );


                const force =
                    Math.min(
                        releaseProgress *
                        1.5,
                        1
                    );


                letters.forEach(
                    letter => {

                        letter.x +=
                            letter.vx *
                            delta *
                            force;


                        letter.y +=
                            letter.vy *
                            delta *
                            force;


                        letter.rotation +=
                            letter.rotationVelocity *
                            delta *
                            2;


                        keepInsidePage(
                            letter
                        );

                    }
                );


                /*
                 * Letter collision detection.
                 */

                for (
                    let i = 0;
                    i < letters.length;
                    i++
                ) {

                    for (
                        let j = i + 1;
                        j < letters.length;
                        j++
                    ) {

                        collide(
                            letters[i],
                            letters[j]
                        );

                    }

                }


                /*
                 * Render letters.
                 */

                letters.forEach(
                    letter => {

                        const offsetX =
                            letter.x -
                            letter.baseX;


                        const offsetY =
                            letter.y -
                            letter.baseY;


                        letter.element.style.left =
                            `${letter.baseX}px`;


                        letter.element.style.top =
                            `${letter.baseY}px`;


                        letter.element.style.transform =
                            `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${letter.rotation}deg)`;


                        /*
                         * Keep face + outline permanently visible.
                         */

                        letter.element.style.opacity =
                            "1";

                        letter.element.style.color =
                            "#ffffff";

                        letter.element.style.webkitTextStroke =
                            "5px #ffffff";

                    }
                );

            }


            requestAnimationFrame(
                animateIntro
            );

        }


        requestAnimationFrame(
            animateIntro
        );


        /*
         * Responsive recalculation.
         */

        let resizeTimeout = null;


        window.addEventListener(
            "resize",
            () => {

                clearTimeout(
                    resizeTimeout
                );


                resizeTimeout =
                    setTimeout(
                        () => {

                            prepareTitle();


                            if (
                                letters.length
                            ) {

                                letters.forEach(
                                    letter => {

                                        letter.element.style.position =
                                            "static";

                                    }
                                );


                                measureLetters();


                                letters.forEach(
                                    letter => {

                                        letter.element.style.position =
                                            "fixed";


                                        letter.element.style.left =
                                            `${letter.baseX}px`;


                                        letter.element.style.top =
                                            `${letter.baseY}px`;


                                        letter.element.style.transform =
                                            "translate3d(0,0,0)";

                                    }
                                );

                            }

                        },
                        150
                    );

            }
        );


        /*
         * Detect mobile / desktop breakpoint changes.
         */

        let previousMobileState =
            mobileQuery.matches;


        const checkBreakpoint =
            () => {

                const currentMobileState =
                    mobileQuery.matches;


                if (
                    currentMobileState !==
                    previousMobileState
                ) {

                    previousMobileState =
                        currentMobileState;


                    prepareTitle();


                    startTime =
                        performance.now();


                    lastTime =
                        performance.now();

                }

            };


        if (
            mobileQuery.addEventListener
        ) {

            mobileQuery.addEventListener(
                "change",
                checkBreakpoint
            );

        }

    }


    /* =================================================
       POINTER FIELD
    ================================================= */

    let pointerX = 0;
    let pointerY = 0;

    let targetPointerX = 0;
    let targetPointerY = 0;


    function updatePointer(x, y) {

        targetPointerX =
            (x / window.innerWidth) *
            2 -
            1;


        targetPointerY =
            (y / window.innerHeight) *
            2 -
            1;

    }


    window.addEventListener(
        "pointermove",
        event => {

            updatePointer(
                event.clientX,
                event.clientY
            );

        },
        {
            passive: true
        }
    );


    /* =================================================
       VIDEO DEPTH FIELD
    ================================================= */

    const depthVideos =
        [
            ...document.querySelectorAll(
                ".depth-video"
            )
        ];


    if (
        depthVideos.length &&
        !reducedMotion
    ) {

        let currentX = 0;
        let currentY = 0;


        function animateDepth() {

            currentX +=
                (
                    targetPointerX -
                    currentX
                ) *
                0.035;


            currentY +=
                (
                    targetPointerY -
                    currentY
                ) *
                0.035;


            depthVideos.forEach(
                (video, index) => {

                    const depth =
                        (
                            index + 1
                        ) /
                        depthVideos.length;


                    const movement =
                        7 +
                        depth * 20;


                    const x =
                        currentX *
                        movement;


                    const y =
                        currentY *
                        movement *
                        0.6;


                    const rotation =
                        currentX *
                        (
                            0.25 +
                            depth * 0.4
                        );


                    const scale =
                        1 +
                        currentY *
                        0.002;


                    video.style.transform =
                        `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;

                }
            );


            requestAnimationFrame(
                animateDepth
            );

        }


        requestAnimationFrame(
            animateDepth
        );

    }


    /* =================================================
       CLIENT TICKER
    ================================================= */

    const clientSection =
        document.querySelector(
            ".client-section"
        );


    if (
        clientSection &&
        "IntersectionObserver" in window
    ) {

        const tickerObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            clientSection.classList.toggle(
                                "ticker-paused",
                                !entry.isIntersecting
                            );

                        }
                    );

                },
                {
                    threshold: 0
                }
            );


        tickerObserver.observe(
            clientSection
        );

    }


    /* =================================================
       ABOUT IMAGE PARALLAX
    ================================================= */

    const aboutImage =
        document.querySelector(
            ".about-image img"
        );


    if (
        aboutImage &&
        !reducedMotion
    ) {

        let aboutTarget = 0;
        let aboutCurrent = 0;


        const updateAbout =
            () => {

                const rect =
                    aboutImage.getBoundingClientRect();


                const imageCenter =
                    rect.top +
                    rect.height / 2;


                const difference =
                    (
                        imageCenter -
                        window.innerHeight / 2
                    ) /
                    window.innerHeight;


                aboutTarget =
                    Math.max(
                        -1,
                        Math.min(
                            1,
                            difference
                        )
                    );

            };


        const animateAbout =
            () => {

                aboutCurrent +=
                    (
                        aboutTarget -
                        aboutCurrent
                    ) *
                    0.045;


                aboutImage.style.transform =
                    `translate3d(0, ${aboutCurrent * -18}px, 0)`;


                requestAnimationFrame(
                    animateAbout
                );

            };


        window.addEventListener(
            "scroll",
            updateAbout,
            {
                passive: true
            }
        );


        updateAbout();

        animateAbout();

    }

/* =================================================
INTRO VIDEO FADE
================================================= */

const introVideo =
document.querySelector(
".scroll-media iframe"
);

if (introVideo) {


const introMediaSection =
    introVideo.closest(
        ".scroll-media"
    );

if (introMediaSection) {

    introMediaSection.classList.remove(
        "video-loaded"
    );


    introVideo.addEventListener(
        "load",
        () => {

            introMediaSection.classList.add(
                "video-loaded"
            );

        },
        {
            once: true
        }
    );

}


}


/* =================================================
SCROLL MEDIA PARALLAX
================================================= */

const scrollMedia =
document.querySelectorAll(
".scroll-media"
);

if (
scrollMedia.length &&
!reducedMotion
) {

const mediaTargets = [];
const mediaCurrent = [];


scrollMedia.forEach(
    () => {

        mediaTargets.push(0);
        mediaCurrent.push(0);

    }
);


const updateMediaTargets =
    () => {

        scrollMedia.forEach(
            (
                section,
                index
            ) => {

                const rect =
                    section.getBoundingClientRect();


                const center =
                    rect.top +
                    rect.height / 2;


                const distance =
                    (
                        center -
                        window.innerHeight / 2
                    ) /
                    window.innerHeight;


                mediaTargets[index] =
                    Math.max(
                        -1,
                        Math.min(
                            1,
                            distance
                        )
                    );

            }
        );

    };


const animateMedia =
    () => {

        scrollMedia.forEach(
            (
                section,
                index
            ) => {

                const wrapper =
                    section.querySelector(
                        ".vimeo-wrapper"
                    );


                if (!wrapper) return;


                mediaCurrent[index] +=
                    (
                        mediaTargets[index] -
                        mediaCurrent[index]
                    ) *
                    0.04;


                wrapper.style.transform =
                    `translate3d(0, ${mediaCurrent[index] * -14}px, 0)`;

            }
        );


        requestAnimationFrame(
            animateMedia
        );

    };


window.addEventListener(
    "scroll",
    updateMediaTargets,
    {
        passive: true
    }
);


updateMediaTargets();

animateMedia();

}


    /* =================================================
       TOUCH POINTER
    ================================================= */

    window.addEventListener(
        "touchstart",
        event => {

            if (
                !event.touches.length
            ) return;


            updatePointer(
                event.touches[0].clientX,
                event.touches[0].clientY
            );

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchmove",
        event => {

            if (
                !event.touches.length
            ) return;


            updatePointer(
                event.touches[0].clientX,
                event.touches[0].clientY
            );

        },
        {
            passive: true
        }
    );


    /* =================================================
       EXTERNAL LINKS
    ================================================= */

    document
        .querySelectorAll(
            'a[href^="http"]'
        )
        .forEach(
            link => {

                try {

                    const url =
                        new URL(
                            link.href
                        );


                    if (
                        url.hostname !==
                        window.location.hostname
                    ) {

                        link.target =
                            "_blank";

                        link.rel =
                            "noopener noreferrer";

                    }

                } catch (error) {

                    console.log(
                        "Invalid link:",
                        link.href
                    );

                }

            }
        );


    /* =================================================
       PREVENT IMAGE DRAGGING
    ================================================= */

    document
        .querySelectorAll("img")
        .forEach(
            image => {

                image.addEventListener(
                    "dragstart",
                    event => {

                        event.preventDefault();

                    }
                );

            }
        );


    /* =================================================
       CLEANUP
    ================================================= */

    window.addEventListener(
        "beforeunload",
        () => {

            if (!activePlayer) return;


            try {

                activePlayer.destroy();

            } catch (error) {

                console.log(
                    "Vimeo cleanup:",
                    error
                );

            }

        }
    );


    console.log(
        "A Doll's House Pictures — site initialized."
    );

});