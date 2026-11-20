
/* ============================================================
   A DOLL'S HOUSE PICTURES
   SHARED SITE NAVIGATION
   navigation.js
============================================================ */

(() => {
  "use strict";

  const mount = document.getElementById("site-navigation");
  if (!mount) return;

  const configUrl = new URL("./data/navigation.json", document.baseURI);

  const escapeHTML = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  const currentPath =
    window.location.pathname.replace(/\/$/, "") || "/";

  const isCurrentPage = url => {
    try {
      const target = new URL(url, document.baseURI);
      return target.pathname.replace(/\/$/, "") === currentPath;
    } catch {
      return false;
    }
  };


  /* ==========================================================
     NAVIGATION LINK RENDERING
  ========================================================== */

  const renderActionButton = (link, mobile = false) => {
    if (link.action === "contact") {
      return mobile
        ? `
          <button class="site-nav-mobile-contact" type="button">
            ${escapeHTML(link.label)}
            <span>↗</span>
          </button>
        `
        : `
          <button class="site-nav-contact-trigger" type="button">
            ${escapeHTML(link.label)}
            <span class="site-nav-contact-arrow">↗</span>
          </button>
        `;
    }

    if (link.action === "about") {
      return mobile
        ? `
          <button class="site-nav-mobile-about" type="button">
            ${escapeHTML(link.label)}
            <span>↗</span>
          </button>
        `
        : `
          <button class="site-nav-about-trigger" type="button">
            ${escapeHTML(link.label)}
            <span class="site-nav-about-arrow">↗</span>
          </button>
        `;
    }

    return "";
  };


  const renderLink = link => {
    if (link.action) return renderActionButton(link);

    return `
      <a
        href="${escapeHTML(link.url)}"
        ${isCurrentPage(link.url) ? 'aria-current="page"' : ""}>
        ${escapeHTML(link.label)}
      </a>
    `;
  };


  /* ==========================================================
     EDITORIAL DESKTOP DROPDOWN
  ========================================================== */

  const renderDesktopLink = link => {
    if (link.children?.length) {
      const menuId = `site-nav-menu-${String(link.label)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`;

      return `
        <div class="site-nav-dropdown">

          <button
            class="site-nav-dropdown-trigger"
            type="button"
            aria-expanded="false"
            aria-controls="${menuId}">

            ${escapeHTML(link.label)}
            <span class="site-nav-caret">⌄</span>

          </button>

          <div
            class="site-nav-dropdown-menu"
            id="${menuId}"
            aria-hidden="true">

            <div class="site-nav-dropdown-inner">

              <div class="site-nav-dropdown-heading">
                <span>SELECTED WORK</span>
                <span>${String(link.children.length).padStart(2, "0")} PROJECTS</span>
              </div>

              <div class="site-nav-dropdown-links">

                ${link.children.map((child, index) => `
                  <a
                    href="${escapeHTML(child.url)}"
                    ${isCurrentPage(child.url) ? 'aria-current="page"' : ""}>

                    <span class="site-nav-dropdown-number">
                      ${String(index + 1).padStart(2, "0")}
                    </span>

                    <span class="site-nav-dropdown-title">
                      ${escapeHTML(child.label)}
                    </span>

                    <span class="site-nav-dropdown-arrow">↗</span>

                  </a>
                `).join("")}

              </div>

              <div class="site-nav-dropdown-footer">
                A DOLL'S HOUSE PICTURES
              </div>

            </div>

          </div>

        </div>
      `;
    }

    return renderLink(link);
  };


  /* ==========================================================
     MOBILE LINK RENDERING
  ========================================================== */

  const renderMobileLink = link => {
    if (link.children?.length) {
      return `
        <div class="site-nav-mobile-group">

          <span class="site-nav-mobile-label">
            ${escapeHTML(link.label)}
          </span>

          ${link.children.map(child => `
            <a
              href="${escapeHTML(child.url)}"
              ${isCurrentPage(child.url) ? 'aria-current="page"' : ""}>
              ${escapeHTML(child.label)}
              <span>↗</span>
            </a>
          `).join("")}

        </div>
      `;
    }

    if (link.action) return renderActionButton(link, true);

    return `
      <a
        href="${escapeHTML(link.url)}"
        ${isCurrentPage(link.url) ? 'aria-current="page"' : ""}>
        ${escapeHTML(link.label)}
        <span>↗</span>
      </a>
    `;
  };


  /* ==========================================================
     VIMEO URL
  ========================================================== */

  const createVideoUrl = video => {
    if (!video?.id) return "";

    const params = new URLSearchParams({
      ...(video.hash ? { h: video.hash } : {}),
      background: "1",
      autoplay: "1",
      loop: "1",
      muted: "1",
      autopause: "0",
      controls: "0",
      title: "0",
      byline: "0",
      portrait: "0",
      transparent: "0",
      playsinline: "1"
    });

    return `https://player.vimeo.com/video/${encodeURIComponent(video.id)}?${params}`;
  };


  /* ==========================================================
     ABOUT SECTION RENDERING
  ========================================================== */

  const renderAboutSection = (section, index) => {
    const number = section.number || String(index + 1).padStart(2, "0");

    return `
      <section class="site-about-section">

        <div class="site-about-section-heading">
          <span>${escapeHTML(number)}</span>
          <span>${escapeHTML(section.label || "")}</span>
        </div>

        <div class="site-about-section-copy">

          ${section.headline ? `
            <h3 class="site-about-section-title">
              ${escapeHTML(section.headline)}
            </h3>
          ` : ""}

          ${section.paragraph ? `
            <p>${escapeHTML(section.paragraph)}</p>
          ` : ""}

        </div>

      </section>
    `;
  };


  const renderAboutSections = about => {
    if (Array.isArray(about.sections) && about.sections.length) {
      return about.sections
        .map(renderAboutSection)
        .join("");
    }

    return `
      <section class="site-about-section">
        <div class="site-about-section-heading">
          <span>01</span>
          <span>WHO WE ARE</span>
        </div>
        <div class="site-about-section-copy">
          <p>
            A Doll’s House Pictures is an independent creative studio
            founded by Jeremy Jacob, working across film, motion,
            photography, and design. The studio creates image-driven
            work shaped by storytelling, atmosphere, and a considered
            visual language.
          </p>
        </div>
      </section>
    `;
  };


  /* ==========================================================
     NAVIGATION HTML
  ========================================================== */

  const render = config => {
    const brand = config.brand || {};
    const links = config.links || [];
    const footer = config.footer || {};
    const about = config.about || {};
    const contact = config.contact || {};

    const aboutVideoSrc = createVideoUrl(about.video);
    const contactVideoSrc = createVideoUrl(contact.video);

    const marqueeItems =
      about.marquee || ["FILM", "PHOTOGRAPHY", "MOTION", "DESIGN"];

    mount.innerHTML = `
      <header class="site-nav-header">

        <a
          class="site-nav-wordmark"
          href="/"
          aria-label="${escapeHTML(brand.name || "Home")} home">

          <span class="site-nav-wordmark-main">
            ${escapeHTML(brand.name)}
          </span>

          <span class="site-nav-wordmark-sub">
            ${escapeHTML(brand.subname)}
          </span>

        </a>

        <div class="site-nav-center">
          ${escapeHTML(brand.description)}
          <span>·</span>
          ${escapeHTML(brand.location)}
        </div>

        <nav class="site-nav-desktop" aria-label="Main navigation">
          ${links.map(renderDesktopLink).join("")}
        </nav>

        <button
          class="site-nav-menu-button"
          type="button"
          aria-label="Open menu"
          aria-expanded="false">

          <span></span>
          <span></span>
          <span></span>

        </button>

      </header>

      <div class="site-nav-backdrop"></div>

      <aside class="site-nav-drawer" aria-hidden="true">

        <div class="site-nav-drawer-head">
          <span>Explore</span>

          <button
            type="button"
            class="site-nav-close"
            aria-label="Close menu">×</button>
        </div>

        <nav class="site-nav-mobile" aria-label="Mobile navigation">
          ${links.map(renderMobileLink).join("")}
        </nav>

        <div class="site-nav-drawer-footer">
          <span>${escapeHTML(footer.description || brand.description)}</span>
          <span>${escapeHTML(footer.location || brand.location)}</span>
        </div>

      </aside>

      <!-- ABOUT LIGHTBOX -->

      <div class="site-about-lightbox" aria-hidden="true">

        <section
          class="site-about-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="site-about-title"
          tabindex="-1">

          <button
            class="site-about-close"
            type="button"
            aria-label="Close About window">×</button>

          <div class="site-about-content">

            <div class="site-about-category">
              ${escapeHTML(about.category || "THE STUDIO")}
            </div>

            <div class="site-about-hero">

              <div class="site-about-media">
                ${aboutVideoSrc ? `
                  <iframe
                    src="${escapeHTML(aboutVideoSrc)}"
                    allow="autoplay; fullscreen; picture-in-picture"
                    title="${escapeHTML(about.video.title || "A Doll's House Pictures — Studio")}"
                    loading="eager">
                  </iframe>
                ` : ""}
              </div>

              <div class="site-about-headline">

                <h2 id="site-about-title" class="site-about-title">
                  ${escapeHTML(about.headline || "We develop ideas. Shape identities. Craft stories.")}
                </h2>

              </div>

            </div>

            <div
              class="site-about-marquee"
              aria-label="Film, Photography, Motion, Design">

              ${marqueeItems.map(item => `
                <span>${escapeHTML(item)}</span>
              `).join("")}

            </div>

            <div class="site-about-copy">

              <div class="site-about-sections">
                ${renderAboutSections(about)}
              </div>

              <div class="site-about-links">

                <a
                  href="${escapeHTML(about.instagramUrl || "https://www.instagram.com/adollshousepictures/")}"
                  target="_blank"
                  rel="noopener noreferrer">
                  ${escapeHTML(about.instagram || "@adollshousepictures")}
                  <span>↗</span>
                </a>

                <a
                  href="${escapeHTML(about.emailUrl || "mailto:adollshousepictures@gmail.com")}">
                  ${escapeHTML(about.email || "adollshousepictures@gmail.com")}
                  <span>↗</span>
                </a>

              </div>

            </div>

          </div>

          <div class="site-about-footer">
            <span>${escapeHTML(about.footerLeft || "A Doll's House Pictures")}</span>
            <span>${escapeHTML(about.footerRight || "New York / Hudson Valley")}</span>
          </div>

        </section>

      </div>

      <!-- CONTACT LIGHTBOX -->

      <div class="site-contact-lightbox" aria-hidden="true">

        <div
          class="site-contact-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="site-contact-title"
          tabindex="-1">

          <button
            class="site-contact-close"
            type="button"
            aria-label="Close contact window">×</button>

          <div class="site-contact-content">

            <div class="site-contact-media">
              ${contactVideoSrc ? `
                <iframe
                  src="${escapeHTML(contactVideoSrc)}"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="${escapeHTML(contact.video.title || "A Doll's House Pictures — Studio")}"
                  loading="eager">
                </iframe>
              ` : ""}
            </div>

            <div class="site-contact-copy">

              <div class="site-contact-category">
                ${escapeHTML(contact.category || "CONTACT")}
              </div>

              <h2 id="site-contact-title" class="site-contact-title">
                ${escapeHTML(contact.headline || "Let's talk.").replace(/\.$/, "")}<span>.</span>
              </h2>

              <div class="site-contact-description">
                ${escapeHTML(contact.description || "Have a project in mind, or simply want to start a conversation? We'd like to hear from you.")}
              </div>

              <div class="site-contact-links">

                <a
                  class="site-contact-email"
                  href="${escapeHTML(contact.emailUrl || "mailto:adollshousepictures@gmail.com")}">
                  ${escapeHTML(contact.email || "adollshousepictures@gmail.com")}
                  <span>↗</span>
                </a>

                <a
                  class="site-contact-instagram"
                  href="${escapeHTML(contact.instagramUrl || "https://www.instagram.com/adollshousepictures/")}"
                  target="_blank"
                  rel="noopener noreferrer">
                  ${escapeHTML(contact.instagram || "@adollshousepictures")}
                  <span>↗</span>
                </a>

              </div>

              <div class="site-contact-details">
                ${(contact.details || [
                  { label: "BASED IN", value: "Hudson Valley, New York" },
                  { label: "WORKING ACROSS", value: "Film, Photography, Motion & Design" }
                ]).map(item => `
                  <div>
                    <span>${escapeHTML(item.label)}</span>
                    <strong>${escapeHTML(item.value)}</strong>
                  </div>
                `).join("")}
              </div>

            </div>

          </div>

          <div class="site-contact-footer">
            <span>${escapeHTML(contact.footerLeft || "A Doll's House Pictures")}</span>
            <span>${escapeHTML(contact.footerRight || "New York / Hudson Valley")}</span>
          </div>

        </div>

      </div>
    `;

    initialize();
    requestAnimationFrame(syncLightboxNavigation);
  };


  /* ==========================================================
     INTERACTIONS
  ========================================================== */

  const initialize = () => {
    const header = mount.querySelector(".site-nav-header");
    const menuButton = mount.querySelector(".site-nav-menu-button");
    const drawer = mount.querySelector(".site-nav-drawer");
    const backdrop = mount.querySelector(".site-nav-backdrop");
    const drawerClose = mount.querySelector(".site-nav-close");

    const aboutLightbox = mount.querySelector(".site-about-lightbox");
    const aboutPanel = mount.querySelector(".site-about-panel");
    const aboutClose = mount.querySelector(".site-about-close");

    const contactLightbox = mount.querySelector(".site-contact-lightbox");
    const contactPanel = mount.querySelector(".site-contact-panel");
    const contactClose = mount.querySelector(".site-contact-close");

    let previousFocus = null;


    /* ==========================================================
       HIDE NAVIGATION ON SCROLL DOWN / REVEAL ON SCROLL UP
    ========================================================== */

    const scrollPositions = new WeakMap();

    const getScrollPosition = target => {
      if (target === window || target === document) {
        return (
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0
        );
      }

      if (target && typeof target.scrollTop === "number") {
        return target.scrollTop;
      }

      return window.scrollY || 0;
    };

    const handleNavigationScroll = event => {
      const target =
        event.currentTarget === window
          ? window
          : (
              event.target?.nodeType === 1
                ? event.target
                : document
            );

      const currentY = getScrollPosition(target);
      const previousY = scrollPositions.has(target)
        ? scrollPositions.get(target)
        : currentY;

      const difference = currentY - previousY;

      if (currentY < 80 || difference < -2) {
        header.classList.remove("nav-hidden");
      } else if (difference > 3) {
        header.classList.add("nav-hidden");
      }

      scrollPositions.set(target, currentY);
    };

    window.addEventListener(
      "scroll",
      handleNavigationScroll,
      { passive: true }
    );

    document.addEventListener(
      "scroll",
      handleNavigationScroll,
      { passive: true, capture: true }
    );


    /* ==========================================================
       DROPDOWNS
    ========================================================== */

    let dropdownCloseTimer = null;

    const closeDropdowns = () => {
      clearTimeout(dropdownCloseTimer);

      mount.querySelectorAll(".site-nav-dropdown").forEach(dropdown => {
        dropdown.classList.remove("is-open");

        dropdown.querySelector(".site-nav-dropdown-trigger")
          ?.setAttribute("aria-expanded", "false");

        dropdown.querySelector(".site-nav-dropdown-menu")
          ?.setAttribute("aria-hidden", "true");
      });
    };

    const openDropdown = dropdown => {
      clearTimeout(dropdownCloseTimer);

      closeDropdowns();

      const button = dropdown.querySelector(".site-nav-dropdown-trigger");
      const menu = dropdown.querySelector(".site-nav-dropdown-menu");

      if (!button || !menu) return;

      dropdown.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");
    };

    const scheduleDropdownClose = () => {
      clearTimeout(dropdownCloseTimer);

      dropdownCloseTimer = setTimeout(() => {
        closeDropdowns();
      }, 180);
    };


    /* ==========================================================
       MOBILE DRAWER
    ========================================================== */

    const openDrawer = () => {
      closeDropdowns();

      drawer.classList.add("is-open");
      backdrop.classList.add("is-open");

      drawer.setAttribute("aria-hidden", "false");
      menuButton.setAttribute("aria-expanded", "true");

      document.body.classList.add("site-nav-open");
    };

    const closeDrawer = () => {
      drawer.classList.remove("is-open");
      backdrop.classList.remove("is-open");

      drawer.setAttribute("aria-hidden", "true");
      menuButton.setAttribute("aria-expanded", "false");

      document.body.classList.remove("site-nav-open");
    };


    /* ==========================================================
       SHARED LIGHTBOX HELPERS
    ========================================================== */

    const rememberFocus = () => {
      previousFocus = document.activeElement;
    };

    const restoreFocus = () => {
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }

      previousFocus = null;
    };

    const trapFocus = (event, panel) => {
      if (event.key !== "Tab") return;

      const focusable = panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable.length) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };


    /* ==========================================================
       ABOUT LIGHTBOX
    ========================================================== */

    const closeAbout = (shouldRestoreFocus = true) => {
      if (!aboutLightbox.classList.contains("is-open")) return;

      aboutLightbox.classList.remove("is-open");
      aboutLightbox.setAttribute("aria-hidden", "true");

      document.body.classList.remove("site-about-open");

      if (shouldRestoreFocus) restoreFocus();
    };

    const openAbout = () => {
      rememberFocus();

      closeDrawer();
      closeDropdowns();
      closeContact(false);

      aboutLightbox.classList.add("is-open");
      aboutLightbox.setAttribute("aria-hidden", "false");

      document.body.classList.add("site-about-open");

      requestAnimationFrame(() => aboutClose.focus());
    };


    /* ==========================================================
       CONTACT LIGHTBOX
    ========================================================== */

    const closeContact = (shouldRestoreFocus = true) => {
      if (!contactLightbox.classList.contains("is-open")) return;

      contactLightbox.classList.remove("is-open");
      contactLightbox.setAttribute("aria-hidden", "true");

      document.body.classList.remove("site-contact-open");

      if (shouldRestoreFocus) restoreFocus();
    };

    const openContact = () => {
      rememberFocus();

      closeDrawer();
      closeDropdowns();
      closeAbout(false);

      contactLightbox.classList.add("is-open");
      contactLightbox.setAttribute("aria-hidden", "false");

      document.body.classList.add("site-contact-open");

      requestAnimationFrame(() => contactClose.focus());
    };


    /* ==========================================================
       DROPDOWN BUTTONS — HOVER / CLICK / KEYBOARD
    ========================================================== */

    mount.querySelectorAll(".site-nav-dropdown").forEach(dropdown => {
      const button = dropdown.querySelector(".site-nav-dropdown-trigger");
      const menu = dropdown.querySelector(".site-nav-dropdown-menu");

      if (!button || !menu) return;

      dropdown.addEventListener("mouseenter", () => {
        openDropdown(dropdown);
      });

      dropdown.addEventListener("mouseleave", scheduleDropdownClose);

      menu.addEventListener("mouseenter", () => {
        clearTimeout(dropdownCloseTimer);
      });

      menu.addEventListener("mouseleave", scheduleDropdownClose);

      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        if (dropdown.classList.contains("is-open")) {
          closeDropdowns();
        } else {
          openDropdown(dropdown);
        }
      });

      button.addEventListener("keydown", event => {
        if (event.key === "ArrowDown") {
          event.preventDefault();

          openDropdown(dropdown);

          requestAnimationFrame(() => {
            menu.querySelector("a")?.focus();
          });
        }
      });
    });


    /* ==========================================================
       CONTACT BUTTONS
    ========================================================== */

    mount.querySelectorAll(
      ".site-nav-contact-trigger, .site-nav-mobile-contact"
    ).forEach(button => {
      button.addEventListener("click", openContact);
    });


    /* ==========================================================
       ABOUT BUTTONS
    ========================================================== */

    mount.querySelectorAll(
      ".site-nav-about-trigger, .site-nav-mobile-about"
    ).forEach(button => {
      button.addEventListener("click", openAbout);
    });

    document
      .getElementById("studioAboutButton")
      ?.addEventListener("click", openAbout);


    /* ==========================================================
       GENERAL BUTTONS
    ========================================================== */

    menuButton.addEventListener("click", openDrawer);
    drawerClose.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);

    aboutClose.addEventListener("click", () => closeAbout());
    contactClose.addEventListener("click", () => closeContact());


    /* ==========================================================
       LIGHTBOX BACKDROPS
    ========================================================== */

    aboutLightbox.addEventListener("click", event => {
      if (event.target === aboutLightbox) {
        closeAbout();
      }
    });

    contactLightbox.addEventListener("click", event => {
      if (event.target === contactLightbox) {
        closeContact();
      }
    });


    /* ==========================================================
       CLOSE DRAWER WHEN FOLLOWING A LINK
    ========================================================== */

    drawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeDrawer);
    });


    /* ==========================================================
       CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
    ========================================================== */

    document.addEventListener("click", event => {
      if (!header.contains(event.target)) {
        closeDropdowns();
      }
    });


    /* ==========================================================
       KEYBOARD ACCESSIBILITY
    ========================================================== */

    document.addEventListener("keydown", event => {

      if (aboutLightbox.classList.contains("is-open")) {
        if (event.key === "Escape") {
          closeAbout();
          return;
        }

        trapFocus(event, aboutPanel);
        return;
      }

      if (contactLightbox.classList.contains("is-open")) {
        if (event.key === "Escape") {
          closeContact();
          return;
        }

        trapFocus(event, contactPanel);
        return;
      }

      if (event.key === "Escape") {
        closeDropdowns();
        closeDrawer();
      }

    });

  };


  /* ==========================================================
     LIGHTBOX NAVIGATION HEIGHT SYNCHRONIZATION
  ========================================================== */

  function syncLightboxNavigation() {
    const siteNavigation = document.querySelector("#site-navigation");
    const header = siteNavigation?.querySelector(".site-nav-header");

    if (!header) return;

    const height = header.getBoundingClientRect().height;

    document.documentElement.style.setProperty(
      "--actual-site-nav-height",
      `${height}px`
    );
  }


  /* ==========================================================
     LOAD NAVIGATION CONFIGURATION
  ========================================================== */

  fetch(configUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Navigation configuration unavailable");
      }

      return response.json();
    })
    .then(render)
    .catch(error => {
      console.error("Navigation could not be loaded:", error);

      mount.innerHTML = `
        <div class="site-nav-error">
          Navigation unavailable
        </div>
      `;
    });


  /* ==========================================================
     RESIZE / LOAD / DOM OBSERVER
  ========================================================== */

  window.addEventListener("resize", syncLightboxNavigation);
  window.addEventListener("load", syncLightboxNavigation);

  const navigationObserver = new MutationObserver(() => {
    requestAnimationFrame(syncLightboxNavigation);
  });

  navigationObserver.observe(mount, {
    childList: true,
    subtree: true
  });

  requestAnimationFrame(syncLightboxNavigation);

})();
