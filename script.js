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

if (!contactDrawer || !contactTab) return;

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

if (!contactDrawer || !contactTab) return;

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
VIMEO VIDEO CONTROL
================================================= */

const desktopWrapper =
document.querySelector(
".vimeo-desktop"
);

const mobileWrapper =
document.querySelector(
".vimeo-mobile"
);

const audioToggle =
document.querySelector(
".vimeo-audio-toggle"
);

let activePlayer = null;
let audioOn = false;

/* =================================================
DETERMINE ACTIVE VIDEO
================================================= */

const isMobile =
window.matchMedia(
"(max-width: 700px)"
).matches;

const activeWrapper =
isMobile
? mobileWrapper
: desktopWrapper;

/* =================================================
CREATE ACTIVE VIMEO PLAYER
================================================= */

if (
activeWrapper &&
typeof Vimeo !== "undefined"
) {

const iframe =
activeWrapper.querySelector(
"iframe"
);

if (iframe) {

activePlayer =
    new Vimeo.Player(
        iframe
    );

activePlayer.ready().then(
    () => {

        if (!audioToggle) return;

        audioToggle.addEventListener(
            "click",
            async () => {

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

            }
        );

    }
);

}

}

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
ACTIVE TITLE
================================================= */

let activeTitle = null;

let letters = [];

let lastTime =
performance.now();

let startTime =
performance.now();

/* =================================================
ANIMATION TIMING
================================================= */

const settleTime =
2000;

const releaseDuration =
12000;

const floatDuration =
6000;

const returnDuration =
15000;

/* =================================================
GET ACTIVE TITLE
================================================= */

function getActiveTitle() {

const mobile =
    window.matchMedia(
        "(max-width: 700px)"
    ).matches;

return mobile
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
    newActiveTitle === activeTitle &&
    letters.length
) {

    return;

}

activeTitle =
    newActiveTitle;


/*
Restore the original
text before rebuilding it.
*/

const originalText =
    activeTitle.dataset.originalText ||
    activeTitle.innerText;


activeTitle.dataset.originalText =
    originalText;


activeTitle.innerHTML =
    "";


/*
Convert the title into
individual floating letters.
*/

letters = [];


[...originalText].forEach(
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
                0

        });

    }
);


measureLetters();


/*
Give each letter its own
slightly different direction.
*/

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

/* =================================================
BOUNDARIES
================================================= */

function keepInside(letter) {

const introWidth =
    intro.clientWidth;

const introHeight =
    intro.clientHeight;


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
    introHeight
) {

    letter.y =
        introHeight -
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
INITIALIZE
================================================= */

prepareTitle();

/* =================================================
ANIMATION
================================================= */

function animate(now) {

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


    /*
    Collisions happen ONLY
    while letters are floating.
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


    /*
    Smooth cinematic easing.
    */

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

            /*
            Direct interpolation toward
            the original position.

            No collision system here.
            This guarantees the letters
            cannot overlap while rebuilding.
            */

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


    /*
    At the end, snap perfectly
    back into the typography.
    */

    if (
        progress >= 1
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


        /*
        Start a fresh cycle.
        */

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


    /*
    If switching between desktop
    and mobile, rebuild the letters
    using the new line arrangement.
    */

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


    /*
    Otherwise just recalculate
    the original positions.
    */

    measureLetters();

}

);

}

}
);