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
       GLOBAL VIMEO BACKGROUND VIDEO
    ================================================= */

    const baseVideo =
        document.querySelector(
            ".base-video"
        );

    const baseIframe =
        baseVideo
            ? baseVideo.querySelector("iframe")
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
       INITIALIZE BACKGROUND VIMEO
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


        /* =================================================
           RESET FADE
        ================================================= */

        baseIframe.classList.remove(
            "video-loaded"
        );


        /* =================================================
           DESTROY PREVIOUS PLAYER
        ================================================= */

        if (activePlayer) {

            try {

                activePlayer.destroy();

            } catch (error) {

                console.log(
                    "Vimeo cleanup:",
                    error
                );

            }

            activePlayer =
                null;

        }


        /* =================================================
           CREATE PLAYER
        ================================================= */

        activePlayer =
            new Vimeo.Player(
                baseIframe
            );


        /* =================================================
           VIMEO READY
        ================================================= */

        activePlayer.ready().then(
            async () => {

                console.log(
                    "Background Vimeo ready."
                );


                /* =================================================
                   KEEP VIDEO MUTED
                ================================================= */

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


                /* =================================================
                   WAIT FOR ACTUAL PLAY
                ================================================= */

                activePlayer.on(
                    "play",
                    () => {

                        console.log(
                            "Background Vimeo playing."
                        );

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


                /* =================================================
                   AUDIO TOGGLE
                ================================================= */

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


    /* =================================================
       INITIALIZE
    ================================================= */

    initializeVimeo();


    /* =================================================
       RESPONSIVE BREAKPOINT
    ================================================= */

    const mobileQuery =
        window.matchMedia(
            "(max-width: 700px)"
        );


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

        /* =================================================
           STATE
        ================================================= */

        let activeTitle =
            null;

        let letters =
            [];

        let lastTime =
            performance.now();

        let startTime =
            performance.now();


        /* =================================================
           ANIMATION TIMING
        ================================================= */

        const settleTime =
            1000;

        const releaseDuration =
            12000;

        const floatDuration =
            9000;

        const returnDuration =
            15000;


        /* =================================================
           GET ACTIVE TITLE
        ================================================= */

        function getActiveTitle() {

            return mobileQuery.matches
                ? mobileTitle
                : desktopTitle;

        }


        /* =================================================
           PREPARE TITLE
        ================================================= */

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


            /* =================================================
               RESTORE ORIGINAL TEXT
            ================================================= */

            const originalText =
                activeTitle.dataset.originalText ||
                activeTitle.innerText;

            activeTitle.dataset.originalText =
                originalText;


            /* =================================================
               CLEAR TITLE
            ================================================= */

            activeTitle.innerHTML =
                "";

            letters =
                [];


            /* =================================================
               CREATE INDIVIDUAL LETTERS
            ================================================= */

            [
                ...originalText
            ].forEach(
                char => {

                    /* =================================================
                       PRESERVE LINE BREAKS
                    ================================================= */

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


                    /* =================================================
                       PRESERVE SPACES
                    ================================================= */

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


                    /* =================================================
                       CREATE LETTER
                    ================================================= */

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
                            0

                    });

                }
            );


            /* =================================================
               MEASURE BEFORE ANIMATION
            ================================================= */

            measureLetters();


            /* =================================================
               INITIAL VELOCITIES
            ================================================= */

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

                }
            );

        }


        /* =================================================
           MEASURE ORIGINAL POSITIONS
        ================================================= */

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


        /* =================================================
           COLLISION SYSTEM
        ================================================= */

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


            /* =================================================
               HORIZONTAL COLLISION
            ================================================= */

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


            /* =================================================
               VERTICAL COLLISION
            ================================================= */

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


        /* =================================================
           BOUNDARIES
        ================================================= */

        function keepInside(
            letter
        ) {

            const introWidth =
                intro.clientWidth;

            const floatHeight =
                window.innerHeight *
                2;


            /* =================================================
               LEFT
            ================================================= */

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


            /* =================================================
               RIGHT
            ================================================= */

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


            /* =================================================
               TOP
            ================================================= */

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


            /* =================================================
               BOTTOM
            ================================================= */

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


        /* =================================================
           INITIALIZE TITLE
        ================================================= */

        prepareTitle();


        /* =================================================
           ANIMATION
        ================================================= */

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


            /* =================================================
               PHASE 1 — HOLD
            ================================================= */

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

                    }
                );

            }


            /* =================================================
               PHASE 2 — FLOAT
            ================================================= */

            else if (
                elapsed <
                returnStart
            ) {

                const releaseElapsed =
                    elapsed -
                    settleTime;

                const release =
                    Math.min(
                        releaseElapsed /
                        releaseDuration,
                        1
                    );

                const easedRelease =
                    release *
                    release *
                    (
                        3 -
                        2 *
                        release
                    );

                letters.forEach(
                    letter => {

                        letter.x +=
                            letter.vx *
                            delta *
                            easedRelease;

                        letter.y +=
                            letter.vy *
                            delta *
                            easedRelease;

                    }
                );


                /* =================================================
                   COLLISIONS
                ================================================= */

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

            }


            /* =================================================
               PHASE 3 — RETURN
            ================================================= */

            else {

                const returnElapsed =
                    elapsed -
                    returnStart;

                const progress =
                    Math.min(
                        returnElapsed /
                        returnDuration,
                        1
                    );

                const ease =
                    progress *
                    progress *
                    (
                        3 -
                        2 *
                        progress
                    );

                letters.forEach(
                    letter => {

                        letter.x =
                            letter.x +
                            (
                                letter.baseX -
                                letter.x
                            ) *
                            (
                                0.015 +
                                ease *
                                0.12
                            );

                        letter.y =
                            letter.y +
                            (
                                letter.baseY -
                                letter.y
                            ) *
                            (
                                0.015 +
                                ease *
                                0.12
                            );

                        letter.vx =
                            0;

                        letter.vy =
                            0;

                    }
                );


                /* =================================================
                   SNAP BACK + NEW CYCLE
                ================================================= */

                if (
                    progress >=
                    1
                ) {

                    letters.forEach(
                        letter => {

                            letter.x =
                                letter.baseX;

                            letter.y =
                                letter.baseY;

                            letter.vx =
                                0;

                            letter.vy =
                                0;

                        }
                    );

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

                        }
                    );

                    startTime =
                        now;

                }

            }


            /* =================================================
               BOUNDARIES
            ================================================= */

            if (
                elapsed <
                returnStart
            ) {

                letters.forEach(
                    letter => {

                        keepInside(
                            letter
                        );

                    }
                );

            }


            /* =================================================
               APPLY TRANSFORMS
            ================================================= */

            letters.forEach(
                letter => {

                    letter.element.style.transform =
                        `translate3d(
                            ${letter.x - letter.baseX}px,
                            ${letter.y - letter.baseY}px,
                            0
                        )`;

                }
            );

            requestAnimationFrame(
                animate
            );

        }


        requestAnimationFrame(
            animate
        );


        /* =================================================
           RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            () => {

                const newActiveTitle =
                    getActiveTitle();

                if (
                    newActiveTitle !==
                    activeTitle
                ) {

                    prepareTitle();

                    startTime =
                        performance.now();

                    lastTime =
                        performance.now();

                    return;

                }

                measureLetters();

            }
        );

    }


    /* =================================================
       CLIENT TICKER
    ================================================= */

    const clientLines = [
        document.querySelector(
            ".client-track-one .client-line"
        ),
        document.querySelector(
            ".client-track-two .client-line"
        ),
        document.querySelector(
            ".client-track-three .client-line"
        ),
        document.querySelector(
            ".client-track-four .client-line"
        )
    ];

    const clients = [

        "Bard College",
        "Fisher Center at Bard",
        "Storm King Art Center",
        "American Ballet Theatre",
        "Romber Works",
        "Kaatsbaan",
        "Stissing House",
        "Pam Tanowitz Dance",
        "Archestratus Books + Foods",
        "Van Cleef & Arpels",
        "Dance & Stuff",
        "Talbott & Arding",
        "Madewell",
        "Dance Reflections",
        "Trisha Brown Dance Company",
        "James Veloria"

    ];

    const clientGroups = [
        [
            "Bard College",
            "Fisher Center at Bard",
            "Storm King Art Center"
        ],
        [
            "American Ballet Theatre",
            "Romber Works",
            "Stissing House"
        ],
        [
            "Archestratus Books + Foods",
            "Van Cleef & Arpels",
            "Talbott & Arding"
        ],
        [
            "Madewell",
            "James Veloria",
            "Bard College"
        ]
    ];


    clientLines.forEach(
        (line, index) => {

            if (!line) return;

            const group =
                clientGroups[index] ||
                clients;

            const content =
                group
                    .map(
                        client =>
                            `<span class="client-name">${client}</span>`
                    )
                    .join(
                        `<span class="client-separator">·</span>`
                    );

            line.innerHTML =
                content +
                `<span class="client-separator">·</span>` +
                content;

        }
    );


    /* =================================================
       COPYRIGHT
    ================================================= */

    const copyrightYear =
        document.getElementById(
            "copyrightYear"
        );

    if (copyrightYear) {

        copyrightYear.textContent =
            new Date().getFullYear();

    }

/* =================================================
VIDEO DEPTH FIELD — VERTICAL PARALLAX
================================================= */

const videoDepthSection =
document.querySelector(
".video-depth-section"
);

const depthVideos =
document.querySelectorAll(
".depth-video"
);

if (
videoDepthSection &&
depthVideos.length
) {


let depthTicking =
    false;


/*
 * Each video has its own vertical travel.
 *
 * Smaller number = foreground
 * Larger number = background
 */

const depthSettings = [

    {
        travel: 120
    },

    {
        travel: 240
    },

    {
        travel: 380
    },

    {
        travel: 540
    },

    {
        travel: 720
    },

    {
        travel: 930
    },

    {
        travel: 1180
    }

];


function updateVideoDepth() {

    const sectionRect =
        videoDepthSection.getBoundingClientRect();

    const viewportHeight =
        window.innerHeight;


    /*
     * Calculate progress through
     * the entire section.
     */

    let progress =
        (
            viewportHeight -
            sectionRect.top
        ) /
        (
            viewportHeight +
            sectionRect.height
        );


    progress =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );


    /*
     * Center the movement.
     *
     * At the middle of the section,
     * every video is at its original position.
     */

    const centered =
        progress -
        0.5;


    depthVideos.forEach(
        (video, index) => {

            const settings =
                depthSettings[index] ||
                {
                    travel: 500
                };


            /*
             * Vertical-only movement.
             *
             * Nothing changes horizontally.
             */

            const movement =
                centered *
                settings.travel;


            video.style.transform =
                `translate3d(
                    0,
                    ${movement}px,
                    0
                )`;

        }
    );


    depthTicking =
        false;

}


function requestVideoDepthUpdate() {

    if (
        !depthTicking
    ) {

        window.requestAnimationFrame(
            updateVideoDepth
        );

        depthTicking =
            true;

    }

}


window.addEventListener(
    "scroll",
    requestVideoDepthUpdate,
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    requestVideoDepthUpdate
);


requestVideoDepthUpdate();


}




    /* =================================================
       END
    ================================================= */

}


);
