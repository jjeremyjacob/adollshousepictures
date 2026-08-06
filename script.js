/* =====================================================
RESET
===================================================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

html {
scroll-behavior: smooth;
}

body {
background: #e9e5dc;
color: #171513;
font-family: Arial, Helvetica, sans-serif;
overflow-x: hidden;
}

img,
video {
display: block;
width: 100%;
}

button,
a {
font: inherit;
}

button {
border: 0;
}

a {
color: inherit;
text-decoration: none;
}

/* =====================================================
HEADER
===================================================== */

.site-header {
position: fixed;
z-index: 1000;

```
top: 0;
left: 0;

width: 100%;

display: flex;
justify-content: space-between;
align-items: flex-start;

padding: 22px 28px;

mix-blend-mode: difference;
color: white;
```

}

.site-logo {
font-size: 15px;
line-height: .92;
font-weight: 700;
letter-spacing: -.04em;
}

.site-nav {
display: flex;
gap: 22px;

```
font-size: 12px;
text-transform: uppercase;
letter-spacing: .04em;
```

}

.site-nav a {
transition: opacity .25s ease;
}

.site-nav a:hover {
opacity: .5;
}

.menu-toggle {
display: none;

```
width: 34px;
height: 34px;

background: none;
```

}

.menu-toggle span {
display: block;

```
width: 100%;
height: 2px;

margin: 7px 0;

background: currentColor;
```

}

/* =====================================================
HERO
===================================================== */

.hero {
position: relative;

```
width: 100%;
height: 100svh;

min-height: 650px;

overflow: hidden;

background: #111;
```

}

.hero-image {
position: absolute;
inset: 0;
}

.hero-image::after {
content: "";

```
position: absolute;
inset: 0;

background:
    linear-gradient(
        to bottom,
        rgba(0,0,0,.08),
        rgba(0,0,0,.2)
    );
```

}

.hero-image img {
width: 100%;
height: 100%;

```
object-fit: cover;
```

}

.hero-title {
position: absolute;

```
left: 28px;
bottom: 32px;

color: white;

z-index: 2;
```

}

.hero-title h1 {
font-size: clamp(60px, 11vw, 190px);
line-height: .78;

```
letter-spacing: -.075em;
font-weight: 700;

max-width: 1100px;
```

}

.hero-title p {
margin-top: 30px;

```
font-size: 13px;
text-transform: uppercase;
letter-spacing: .06em;
```

}

/* =====================================================
GENERAL SECTIONS
===================================================== */

.project-section,
.information-section,
.clients-section,
.intro {
padding: 130px 28px;
}

.section-heading {
display: grid;
grid-template-columns: 50px 1fr;

```
margin-bottom: 65px;

border-top: 1px solid currentColor;

padding-top: 12px;
```

}

.section-heading span {
font-size: 12px;
}

.section-heading h2 {
font-size: clamp(40px, 7vw, 100px);
line-height: .85;

```
letter-spacing: -.065em;
font-weight: 700;
```

}

/* =====================================================
INTRO
===================================================== */

.intro {
display: grid;
grid-template-columns: 50px 1fr;

```
min-height: 90vh;

align-items: center;
```

}

.intro-copy {
max-width: 1100px;
}

.intro-copy .large-copy {
font-size: clamp(38px, 5.6vw, 90px);
line-height: .95;

```
letter-spacing: -.055em;

margin-bottom: 65px;
```

}

.intro-copy p:not(.large-copy) {
max-width: 650px;

```
font-size: 19px;
line-height: 1.25;

margin-bottom: 20px;
```

}

/* =====================================================
LATEST
===================================================== */

.latest-grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 20px;
}

.feature-card {
cursor: pointer;
}

.media {
position: relative;

```
overflow: hidden;

background: #c9c3b8;
```

}

.feature-card .media {
aspect-ratio: 4 / 3;
}

.media img,
.media video {
width: 100%;
height: 100%;

```
object-fit: cover;

transition:
    transform .8s cubic-bezier(.2,.7,.2,1);
```

}

.feature-card:hover img,
.project-card:hover video {
transform: scale(1.035);
}

.card-info {
padding-top: 13px;

```
display: flex;
justify-content: space-between;
gap: 20px;

font-size: 12px;
```

}

.card-info h3 {
font-weight: 500;
}

.card-info p {
opacity: .6;
}

/* =====================================================
DARK SECTIONS
===================================================== */

.dark-section {
background: #171513;
color: #e9e5dc;
}

/* =====================================================
MOTION
===================================================== */

.project-grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 20px;
}

.project-card .media {
aspect-ratio: 16 / 10;
}

.play-button {
position: absolute;

```
left: 50%;
top: 50%;

transform: translate(-50%, -50%);

padding: 12px 18px;

background: white;
color: black;

border-radius: 100px;

opacity: 0;

transition: opacity .3s ease;
```

}

.project-card:hover .play-button {
opacity: 1;
}

/* =====================================================
DESIGN
===================================================== */

.design-grid {
display: grid;

```
grid-template-columns: repeat(2, 1fr);

gap: 55px 20px;
```

}

.design-card.wide {
grid-column: 1 / -1;
}

.design-card img {
aspect-ratio: 4 / 3;

```
object-fit: cover;

margin-bottom: 13px;
```

}

.design-card.wide img {
aspect-ratio: 16 / 8;
}

.design-card h3 {
font-size: 16px;
font-weight: 500;
}

.design-card p {
font-size: 12px;
opacity: .55;

```
margin-top: 5px;
```

}

/* =====================================================
INFORMATION
===================================================== */

.information-layout {
display: grid;

```
grid-template-columns: 1fr 1fr;

gap: 80px;
```

}

.information-image img {
aspect-ratio: 4 / 5;

```
object-fit: cover;
```

}

.information-copy {
max-width: 650px;
}

.information-copy h3 {
font-size: 40px;
line-height: .9;

```
letter-spacing: -.05em;

margin-bottom: 45px;
```

}

.information-copy > p,
.bio p {
font-size: 20px;
line-height: 1.25;

```
margin-bottom: 25px;
```

}

.bio {
border-top: 1px solid currentColor;

```
margin-top: 80px;
padding-top: 15px;
```

}

.bio h4 {
font-size: 12px;
text-transform: uppercase;

```
margin-bottom: 25px;
```

}

/* =====================================================
SCREENING ROOM
===================================================== */

.screening-intro {
margin-bottom: 60px;

```
font-size: 20px;
```

}

.screening-grid {
display: grid;

```
grid-template-columns:
    repeat(3, 1fr);

gap: 20px;
```

}

.screening-item {
position: relative;

```
display: block;

padding: 0;

cursor: pointer;

background: none;

overflow: hidden;
```

}

.screening-item img {
aspect-ratio: 16 / 10;

```
object-fit: cover;

transition:
    transform .8s cubic-bezier(.2,.7,.2,1);
```

}

.screening-item:hover img {
transform: scale(1.04);
}

.screening-item span {
position: absolute;

```
left: 50%;
top: 50%;

transform:
    translate(-50%, -50%);

padding: 12px 18px;

background: white;
color: black;

border-radius: 100px;

opacity: 0;

transition: opacity .3s ease;
```

}

.screening-item:hover span {
opacity: 1;
}

/* =====================================================
CLIENTS
===================================================== */

.client-list {
display: flex;
flex-wrap: wrap;

```
gap: 0;

border-top: 1px solid currentColor;
```

}

.client-list span {
width: 50%;

```
padding: 18px 0;

border-bottom: 1px solid currentColor;

font-size: clamp(22px, 3vw, 45px);

letter-spacing: -.04em;
```

}

/* =====================================================
CONTACT
===================================================== */

.contact-section {
min-height: 75vh;

```
padding: 100px 28px;

background: #b85a3b;
color: #f5eee5;

display: flex;

flex-direction: column;
justify-content: space-between;
```

}

.contact-large {
font-size: clamp(70px, 13vw, 210px);

```
line-height: .75;

letter-spacing: -.075em;
```

}

.contact-links {
display: flex;
gap: 25px;

```
font-size: 15px;
text-transform: uppercase;
```

}

.contact-links a {
border-bottom: 1px solid currentColor;

```
padding-bottom: 4px;
```

}

/* =====================================================
VIDEO MODAL
===================================================== */

.video-modal {
position: fixed;

```
z-index: 2000;

inset: 0;

display: flex;

justify-content: center;
align-items: center;

padding: 50px;

background: rgba(0,0,0,.92);

opacity: 0;
visibility: hidden;

transition:
    opacity .3s ease,
    visibility .3s ease;
```

}

.video-modal.active {
opacity: 1;
visibility: visible;
}

.modal-video {
max-width: 1200px;
max-height: 85vh;

```
object-fit: contain;
```

}

.modal-close {
position: absolute;

```
top: 20px;
right: 28px;

background: none;

color: white;

font-size: 50px;
line-height: 1;

cursor: pointer;
```

}

/* =====================================================
SCROLL REVEAL
===================================================== */

.reveal {
opacity: 0;
transform: translateY(35px);

```
transition:
    opacity .8s ease,
    transform .8s cubic-bezier(.2,.7,.2,1);
```

}

.reveal.visible {
opacity: 1;
transform: translateY(0);
}

/* =====================================================
FOOTER
===================================================== */

footer {
display: grid;

```
grid-template-columns: 1fr 1fr 1fr;

padding: 20px 28px;

background: #171513;
color: #e9e5dc;

font-size: 10px;
text-transform: uppercase;
letter-spacing: .04em;
```

}

footer div:nth-child(2) {
text-align: center;
}

footer div:nth-child(3) {
text-align: right;
}

/* =====================================================
MOBILE
===================================================== */

@media (max-width: 700px) {

```
.site-header {
    padding: 18px 18px;
}


.site-logo {
    font-size: 13px;
}


.site-nav {
    position: fixed;

    top: 0;
    right: 0;

    width: 100%;
    height: 100svh;

    padding: 100px 25px 40px;

    display: flex;

    flex-direction: column;

    justify-content: center;

    gap: 15px;

    background: #171513;
    color: #e9e5dc;

    transform: translateX(100%);

    transition:
        transform .45s
        cubic-bezier(.2,.8,.2,1);
}


.site-nav.active {
    transform: translateX(0);
}


.site-nav a {
    font-size: 35px;
    line-height: .9;

    letter-spacing: -.04em;
}


.menu-toggle {
    position: relative;

    z-index: 2;

    display: block;

    color: inherit;

    cursor: pointer;
}


.hero {
    min-height: 650px;
}


.hero-title {
    left: 18px;
    bottom: 25px;
}


.hero-title h1 {
    font-size: 18vw;
}


.hero-title p {
    font-size: 10px;

    margin-top: 22px;
}


.project-section,
.information-section,
.clients-section,
.intro {
    padding: 85px 18px;
}


.intro {
    display: block;

    min-height: auto;
}


.intro .section-number {
    margin-bottom: 60px;
}


.intro-copy .large-copy {
    font-size: 12vw;

    margin-bottom: 50px;
}


.intro-copy p:not(.large-copy) {
    font-size: 17px;
}


.section-heading {
    grid-template-columns: 35px 1fr;

    margin-bottom: 40px;
}


.section-heading h2 {
    font-size: 17vw;
}


.latest-grid,
.project-grid,
.design-grid,
.information-layout,
.screening-grid {
    grid-template-columns: 1fr;
}


.design-card.wide {
    grid-column: auto;
}


.information-layout {
    gap: 45px;
}


.information-copy h3 {
    font-size: 34px;
}


.information-copy > p,
.bio p {
    font-size: 17px;
}


.client-list span {
    width: 100%;

    font-size: 27px;
}


.contact-section {
    min-height: 70vh;

    padding: 80px 18px;
}


.contact-large {
    font-size: 19vw;
}


.contact-links {
    flex-direction: column;

    gap: 15px;

    font-size: 13px;
}


footer {
    grid-template-columns: 1fr;

    gap: 10px;

    padding: 18px;
}


footer div:nth-child(2),
footer div:nth-child(3) {
    text-align: left;
}


.video-modal {
    padding: 20px;
}
```

}
