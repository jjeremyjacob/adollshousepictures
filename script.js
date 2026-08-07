document.addEventListener(
"DOMContentLoaded",
() => {


    /* =================================================
       CONTACT DRAWER
    ================================================= */

    const contactTab =
        document.querySelector(
            ".contact-tab"
        );

    const contactDrawer =
        document.querySelector(
            ".contact-drawer"
        );

    const drawerClose =
        document.querySelector(
            ".drawer-close"
        );


    const openDrawer = () => {

        if (
            !contactDrawer ||
            !contactTab
        ) return;

        contactDrawer.classList.add(
            "active"
        );

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

        if (
            !contactDrawer ||
            !contactTab
        ) return;

        contactDrawer.classList.remove(
            "active"
        );

        contactDrawer.setAttribute(
            "aria-hidden",
            "true"
        );

        contactTab.setAttribute(
            "aria-expanded",
            "false"
        );

    };


    if (
        contactTab &&
        contactDrawer
    ) {

        contactTab.addEventListener(
            "click",
            () => {

                if (
                    contactDrawer.classList.contains(
                        "active"
                    )
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

                if (
                    event.key === "Escape"
                ) {

                    closeDrawer();

                }

            }
        );

    }



    /* =================================================
       EMAIL / INSTAGRAM HOVER
    ================================================= */

    const emailLinks =
        document.querySelectorAll(
            ".email-link"
        );

    emailLinks.forEach(
        link => {

            const defaultText =
                link.querySelector(
                    ".email-default"
                );

            const hoverText =
                link.querySelector(
                    ".email-hover"
                );

            if (
                !defaultText ||
                !hoverText
            ) return;

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

        }
    );


    const instagramLinks =
        document.querySelectorAll(
            ".instagram-link"
        );

    instagramLinks.forEach(
        link => {

            const defaultText =
                link.querySelector(
                    ".instagram-default"
                );

            const hoverText =
                link.querySelector(
                    ".instagram-hover"
                );

            if (
                !defaultText ||
                !hoverText
            ) return;

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

        }
    );



    /* =================================================
       GLOBAL VIMEO BACKGROUND VIDEO
    ================================================= */

    const baseVideo =
        document.querySelector(
            ".base-video"
        );

    const baseIframe =
        baseVideo
            ? baseVideo.querySelector(
                "iframe"
            )
            : null;

    const audioToggle =
        document.querySelector(
            ".vimeo-audio-toggle"
        );

    let activePlayer =
        null;

    let audioOn =
        false;



    /* =================================================
       INITIALIZE GLOBAL VIMEO
    ================================================= */

    function initializeVimeo() {

        if (
            !baseIframe ||
            typeof Vimeo === "undefined"
        ) {

            console.log(
                "Background Vimeo iframe not found."
            );

            return;

        }


        baseIframe.classList.remove(
            "video-loaded"
        );


        if (activePlayer) {

            try {

                activePlayer.destroy();

            }
            catch (error) {

                console.log(
                    "Vimeo cleanup:",
                    error
                );

            }

            activePlayer =
                null;

        }


        try {

            activePlayer =
                new Vimeo.Player(
                    baseIframe
                );

        }
        catch (error) {

            console.log(
                "Vimeo initialization error:",
                error
            );

            return;

        }


        activePlayer.ready().then(
            async () => {

                console.log(
                    "Background Vimeo ready."
                );


                try {

                    await activePlayer.setVolume(
                        0
                    );

                }
                catch (error) {

                    console.log(
                        "Vimeo volume error:",
                        error
                    );

                }


                try {

                    await activePlayer.play();

                }
                catch (error) {

                    console.log(
                        "Vimeo autoplay:",
                        error
                    );

                }


                activePlayer.on(
                    "play",
                    () => {

                        setTimeout(
                            () => {

                                baseIframe.classList.add(
                                    "video-loaded"
                                );

                            },
                            150
                        );

                    }
                );


                if (!audioToggle) return;


                audioToggle.onclick =
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


                        }
                        catch (error) {

                            console.log(
                                "Vimeo audio error:",
                                error
                            );

                        }

                    };

            }
        )
        .catch(
            error => {

                console.log(
                    "Background Vimeo ready error:",
                    error
                );

            }
        );

    }


    initializeVimeo();



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
       INTRO — FLOATING LETTER SYSTEM
    ================================================= */

    const intro =
        document.querySelector(
            ".intro"
        );

    const introTitle =
        document.querySelector(
            ".intro h1"
        );

    const desktopTitle =
        document.querySelector(
            ".desktop-title"
        );

    const mobileTitle =
        document.querySelector(
            ".mobile-title"
        );


    if (
        intro &&
        introTitle &&
        desktopTitle &&
        mobileTitle
    ) {

        let activeTitle =
            null;

        let letters =
            [];

        let lastTime =
            performance.now();

        let startTime =
            performance.now();

        let animationFrame =
            null;


        const settleTime =
            1000;

        const releaseDuration =
            12000;

        const floatDuration =
            9000;

        const returnDuration =
            15000;


        function getActiveTitle() {

            return mobileQuery.matches
                ? mobileTitle
                : desktopTitle;

        }


        function prepareTitle() {

            const newActiveTitle =
                getActiveTitle();


            if (
                newActiveTitle ===
                activeTitle &&
                letters.length
            ) {

                return;

            }


            activeTitle =
                newActiveTitle;


            const originalText =
                activeTitle.dataset.originalText ||
                activeTitle.innerText;


            activeTitle.dataset.originalText =
                originalText;


            activeTitle.innerHTML =
                "";

            letters =
                [];


            [
                ...originalText
            ].forEach(
                char => {

                    if (
                        char === "\n"
                    ) {

                        activeTitle.appendChild(
                            document.createElement(
                                "br"
                            )
                        );

                        return;

                    }


                    if (
                        char === " "
                    ) {

                        activeTitle.appendChild(
                            document.createTextNode(
                                " "
                            )
                        );

                        return;

                    }


                    const span =
                        document.createElement(
                            "span"
                        );

                    span.className =
                        "floating-letter";

                    span.textContent =
                        char;

                    span.style.display =
                        "inline-block";

                    activeTitle.appendChild(
                        span
                    );


                    letters.push({

                        element:
                            span,

                        baseX:
                            0,

                        baseY:
                            0,

                        x:
                            0,

                        y:
                            0,

                        vx:
                            0,

                        vy:
                            0,

                        width:
                            0,

                        height:
                            0,

                        rotation:
                            0,

                        rotationVelocity:
                            0

                    });

                }
            );


            measureLetters();


            letters.forEach(
                letter => {

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
                        ) *
                        5;

                    letter.rotationVelocity =
                        (
                            Math.random() -
                            0.5
                        ) *
                        0.01;

                }
            );

        }


        function measureLetters() {

            if (!activeTitle) return;


            const introRect =
                intro.getBoundingClientRect();


            letters.forEach(
                letter => {

                    letter.element.style.transform =
                        "none";


                    const rect =
                        letter.element.getBoundingClientRect();


                    letter.baseX =
                        rect.left -
                        introRect.left;

                    letter.baseY =
                        rect.top -
                        introRect.top;

                    letter.width =
                        rect.width;

                    letter.height =
                        rect.height;


                    letter.x =
                        letter.baseX;

                    letter.y =
                        letter.baseY;

                }
            );

        }


        function collide(
            a,
            b
        ) {

            const aLeft =
                a.x;

            const aRight =
                a.x +
                a.width;

            const aTop =
                a.y;

            const aBottom =
                a.y +
                a.height;


            const bLeft =
                b.x;

            const bRight =
                b.x +
                b.width;

            const bTop =
                b.y;

            const bBottom =
                b.y +
                b.height;


            const overlapX =
                Math.min(
                    aRight,
                    bRight
                ) -
                Math.max(
                    aLeft,
                    bLeft
                );


            const overlapY =
                Math.min(
                    aBottom,
                    bBottom
                ) -
                Math.max(
                    aTop,
                    bTop
                );


            if (
                overlapX <= 0 ||
                overlapY <= 0
            ) {

                return;

            }


            if (
                overlapX <
                overlapY
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

            }
            else {

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


        function keepInside(
            letter
        ) {

            const introWidth =
                intro.clientWidth;

            const floatHeight =
                Math.max(
                    window.innerHeight,
                    intro.scrollHeight
                );


            if (
                letter.x <= 0
            ) {

                letter.x =
                    0;

                if (
                    letter.vx < 0
                ) {

                    letter.vx *=
                        -1;

                }

            }


            if (
                letter.x +
                letter.width >=
                introWidth
            ) {

                letter.x =
                    introWidth -
                    letter.width;


                if (
                    letter.vx > 0
                ) {

                    letter.vx *=
                        -1;

                }

            }


            if (
                letter.y <= 0
            ) {

                letter.y =
                    0;

                if (
                    letter.vy < 0
                ) {

                    letter.vy *=
                        -1;

                }

            }


            if (
                letter.y +
                letter.height >=
                floatHeight
            ) {

                letter.y =
                    floatHeight -
                    letter.height;


                if (
                    letter.vy > 0
                ) {

                    letter.vy *=
                        -1;

                }

            }

        }


        function setLettersToBase() {

            letters.forEach(
                letter => {

                    letter.x =
                        letter.baseX;

                    letter.y =
                        letter.baseY;

                    letter.rotation =
                        0;

                    letter.element.style.transform =
                        "translate3d(0,0,0) rotate(0deg)";

                }
            );

        }


        prepareTitle();


        function animate(
            now
        ) {

            const delta =
                Math.min(
                    now -
                    lastTime,
                    32
                );


            lastTime =
                now;


            const elapsed =
                now -
                startTime;


            const returnStart =
                settleTime +
                releaseDuration +
                floatDuration;


            if (
                reducedMotion
            ) {

                setLettersToBase();

                return;

            }


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

                        letter.element.style.transform =
                            "translate3d(0,0,0)";

                    }
                );

            }


            else if (
                elapsed <
                settleTime +
                releaseDuration
            ) {

                const progress =
                    (
                        elapsed -
                        settleTime
                    ) /
                    releaseDuration;


                const force =
                    Math.min(
                        progress *
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


                        keepInside(
                            letter
                        );

                    }
                );


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


                letters.forEach(
                    letter => {

                        letter.element.style.transform =
                            `translate3d(${letter.x - letter.baseX}px, ${letter.y - letter.baseY}px, 0) rotate(${letter.rotation}deg)`;

                    }
                );

            }


            else if (
                elapsed <
                returnStart
            ) {

                letters.forEach(
                    letter => {

                        letter.x +=
                            letter.vx *
                            delta;

                        letter.y +=
                            letter.vy *
                            delta;

                        letter.rotation +=
                            letter.rotationVelocity *
                            delta;


                        keepInside(
                            letter
                        );


                        letter.element.style.transform =
                            `translate3d(${letter.x - letter.baseX}px, ${letter.y - letter.baseY}px, 0) rotate(${letter.rotation}deg)`;

                    }
                );

            }


            else {

                const returnProgress =
                    Math.min(
                        (
                            elapsed -
                            returnStart
                        ) /
                        returnDuration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 -
                        returnProgress,
                        4
                    );


                letters.forEach(
                    letter => {

                        letter.x =
                            letter.x +
                            (
                                letter.baseX -
                                letter.x
                            ) *
                            eased *
                            0.035;

                        letter.y =
                            letter.y +
                            (
                                letter.baseY -
                                letter.y
                            ) *
                            eased *
                            0.035;

                        letter.rotation *=
                            0.96;


                        letter.element.style.transform =
                            `translate3d(${letter.x - letter.baseX}px, ${letter.y - letter.baseY}px, 0) rotate(${letter.rotation}deg)`;

                    }
                );


                if (
                    returnProgress >=
                    1
                ) {

                    letters.forEach(
                        letter => {

                            letter.x =
                                letter.baseX;

                            letter.y =
                                letter.baseY;

                            letter.rotation =
                                0;

                            letter.element.style.transform =
                                "translate3d(0,0,0) rotate(0deg)";

                        }
                    );

                }

            }


            animationFrame =
                requestAnimationFrame(
                    animate
                );

        }


        if (
            !reducedMotion
        ) {

            animationFrame =
                requestAnimationFrame(
                    animate
                );

        }


        let resizeTimeout =
            null;


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

                            measureLetters();

                        },
                        150
                    );

            }
        );



        /* =============================================
           RESTART INTRO ON TITLE BREAKPOINT CHANGE
        ============================================= */

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

                    measureLetters();

                    startTime =
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

    let pointerX =
        0;

    let pointerY =
        0;

    let targetPointerX =
        0;

    let targetPointerY =
        0;


    let pointerActive =
        false;


    function updatePointer(
        x,
        y
    ) {

        targetPointerX =
            (
                x /
                window.innerWidth
            ) *
            2 -
            1;


        targetPointerY =
            (
                y /
                window.innerHeight
            ) *
            2 -
            1;


        pointerActive =
            true;

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


    window.addEventListener(
        "pointerleave",
        () => {

            pointerActive =
                false;

            targetPointerX =
                0;

            targetPointerY =
                0;

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

        let depthCurrentX =
            0;

        let depthCurrentY =
            0;


        let depthFrame =
            null;


        function animateDepth() {

            pointerX +=
                (
                    targetPointerX -
                    pointerX
                ) *
                0.045;


            pointerY +=
                (
                    targetPointerY -
                    pointerY
                ) *
                0.045;


            depthCurrentX +=
                (
                    pointerX -
                    depthCurrentX
                ) *
                0.035;


            depthCurrentY +=
                (
                    pointerY -
                    depthCurrentY
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
                        8 +
                        depth *
                        22;


                    const x =
                        depthCurrentX *
                        movement;

                    const y =
                        depthCurrentY *
                        movement *
                        0.65;


                    const rotation =
                        depthCurrentX *
                        (
                            0.35 +
                            depth *
                            0.45
                        );


                    const scale =
                        1 +
                        (
                            depthCurrentY *
                            0.003
                        );


                    video.style.transform =
                        `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;

                }
            );


            depthFrame =
                requestAnimationFrame(
                    animateDepth
                );

        }


        depthFrame =
            requestAnimationFrame(
                animateDepth
            );

    }



    /* =================================================
       CLIENT TICKER — PAUSE WHEN OFFSCREEN
    ================================================= */

    const clientSection =
        document.querySelector(
            ".client-section"
        );


    if (
        clientSection
    ) {

        const tickerObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                clientSection.classList.remove(
                                    "ticker-paused"
                                );

                            }
                            else {

                                clientSection.classList.add(
                                    "ticker-paused"
                                );

                            }

                        }
                    );

                },
                {
                    threshold:
                        0
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

        let aboutTarget =
            0;

        let aboutCurrent =
            0;


        const updateAbout =
            () => {

                const rect =
                    aboutImage.getBoundingClientRect();


                const viewportCenter =
                    window.innerHeight /
                    2;


                const imageCenter =
                    rect.top +
                    rect.height /
                    2;


                const difference =
                    (
                        imageCenter -
                        viewportCenter
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
       SCROLL MEDIA — SUBTLE DEPTH
    ================================================= */

    const scrollMedia =
        document.querySelectorAll(
            ".scroll-media"
        );


    if (
        scrollMedia.length &&
        !reducedMotion
    ) {

        let mediaTargets =
            new Map();

        let mediaCurrent =
            new Map();


        scrollMedia.forEach(
            (
                section,
                index
            ) => {

                mediaTargets.set(
                    index,
                    0
                );

                mediaCurrent.set(
                    index,
                    0
                );

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
                            rect.height /
                            2;


                        const distance =
                            (
                                center -
                                window.innerHeight /
                                2
                            ) /
                            window.innerHeight;


                        mediaTargets.set(
                            index,
                            Math.max(
                                -1,
                                Math.min(
                                    1,
                                    distance
                                )
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


                        if (
                            !wrapper
                        ) return;


                        const target =
                            mediaTargets.get(
                                index
                            ) ||
                            0;


                        const current =
                            mediaCurrent.get(
                                index
                            ) ||
                            0;


                        const next =
                            current +
                            (
                                target -
                                current
                            ) *
                            0.04;


                        mediaCurrent.set(
                            index,
                            next
                        );


                        wrapper.style.transform =
                            `translate3d(0, ${next * -14}px, 0)`;

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
       TOUCH — SMALL POINTER RESPONSE
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

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http"]'
        );


    externalLinks.forEach(
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

            }
            catch (error) {

                // Ignore malformed URLs.

            }

        }
    );



    /* =================================================
       PREVENT DRAGGING IMAGES
    ================================================= */

    document
        .querySelectorAll(
            "img"
        )
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

            if (
                activePlayer
            ) {

                try {

                    activePlayer.destroy();

                }
                catch (error) {

                    console.log(
                        "Vimeo unload cleanup:",
                        error
                    );

                }

            }

        }
    );


    console.log(
        "A Doll's House Pictures — site initialized."
    );

}


);
