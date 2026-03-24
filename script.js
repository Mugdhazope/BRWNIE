/* ===( Build By : CODE AASHU | Features By : MUGDHA )=== */

const isMobile = window.innerWidth <= 768;

/* ============================================================
   FEATURE 1: Show SHOP NOW button when video starts/loads
   ============================================================ */
(function initVideoShopBtn() {
    const video = document.querySelector("#video-container video");
    const btn   = document.getElementById("shop-btn");
    if (!video || !btn) return;

    function showBtn() {
        gsap.to(btn, { opacity: 1, duration: 0.8, ease: "power2.out", pointerEvents: "auto" });
    }

    video.addEventListener("canplay", showBtn, { once: true });
    if (video.readyState >= 3) showBtn();
    setTimeout(showBtn, 2000);
})();


/* ============================================================
   FEATURE 2: Persistent Shop Tag
   ============================================================ */
ScrollTrigger.create({
    trigger: "#page1",
    scroller: "body",
    start: "top -200%",
    onEnter: () => document.getElementById("persistent-shop-tag")?.classList.add("visible"),
    onLeaveBack: () => document.getElementById("persistent-shop-tag")?.classList.remove("visible")
});


/* ============================================================
   FEATURE 3: Featured Products entrance
   ============================================================ */
function initFeaturedAnimations() {
    const cards = gsap.utils.toArray(".feat-card");
    if (!cards.length) return;

    gsap.from("#featured-header", {
        y: 40, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
            trigger: "#featured",
            scroller: "body",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: isMobile ? 0.1 : 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#featured-grid",
            scroller: "body",
            start: "top 92%",
            toggleActions: "play none none none"
        }
    });

    gsap.from("#featured-footer", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#featured-footer",
            scroller: "body",
            start: "top 95%",
            toggleActions: "play none none none"
        }
    });
}


/* ============================================================
   PAGE 1 — VIDEO HERO
   ============================================================ */
function pageOne() {
    if (isMobile) {
        /* Mobile: animate the h1 title off to the left as user scrolls,
           then reveal the video. No pinning — scroll-triggered scrub. */
        gsap.to("#page1 h1", {
            x: "-60%",
            opacity: 0,
            ease: "power2.in",
            scrollTrigger: {
                trigger: "#page1",
                scroller: "body",
                start: "top top",
                end: "bottom 60%",
                scrub: 2
            }
        });

        gsap.to("#video-container", {
            top: "0%",
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#page1",
                scroller: "body",
                start: "top top",
                end: "bottom 80%",
                scrub: 3
            }
        });

        gsap.to("#video-container video", {
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#page1",
                scroller: "body",
                start: "top top",
                end: "bottom 40%",
                scrub: 3
            }
        });
        return;
    }

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page1",
            scroller: "body",
            start: "top 0%",
            end: "top -220%",
            scrub: 5,
            pin: true
        }
    });

    tl
        .to("#page1 h1", { transform: "translateX(-50%)", fontWeight: 100, duration: 2 })
        .to("#page1 h1", { transform: "translateX(-130%)", fontWeight: 900, duration: 2 })
        .to("#video-container", { top: "0%", delay: -1.4, duration: 2 })
        .to("#video-container video", { transform: "scale(1)", duration: 3 })
        .to({}, { duration: 3 });
}
pageOne();

if (!isMobile) {
    ScrollTrigger.create({
        trigger: "#page1",
        scroller: "body",
        start: "top -180%",
        end: "top -220%",
        scrub: 2,
        onEnter: () => gsap.to("#shop-btn", { opacity: 1, duration: 0.6, ease: "power2.out", pointerEvents: "auto" }),
        onLeaveBack: () => gsap.to("#shop-btn", { opacity: 0, duration: 0.3, pointerEvents: "none" })
    });
}


/* ============================================================
   PAGE 2 — SPLIT QUOTE PANEL
   Mobile: full animated scrub reveal with text flying in.
   Desktop: full scrub pin with split-break exit.
   ============================================================ */
function pageTwo() {
    gsap.set(["#ql1","#ql2","#ql3","#ql4","#ql5","#ql6"], { yPercent: 110 });
    gsap.set(".split-sub", { opacity: 0 });

    if (isMobile) {
        /* LEFT side — staggered fly-up */
        gsap.to(["#ql1","#ql2","#ql3"], {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
                trigger: "#splitLeft",
                scroller: "body",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        /* RIGHT side — slightly delayed */
        gsap.to(["#ql4","#ql5","#ql6"], {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.2,
            scrollTrigger: {
                trigger: "#splitRight",
                scroller: "body",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        /* Subtext fades in after titles */
        gsap.to(".split-sub", {
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#splitLeft",
                scroller: "body",
                start: "top 55%",
                toggleActions: "play none none none"
            }
        });

        /* Eyebrows slide in from left */
        gsap.from(".split-eyebrow", {
            x: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#page2",
                scroller: "body",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        return;
    }

    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#page2",
            scroller: "body",
            start: "top 0%",
            end: "top -200%",
            scrub: 8,
            pin: true
        }
    });

    tl2
        .to("#ql1", { yPercent: 0, duration: 1.5, ease: "power3.out" })
        .to("#ql2", { yPercent: 0, duration: 1.5, ease: "power3.out" }, "-=1.2")
        .to("#ql3", { yPercent: 0, duration: 1.5, ease: "power3.out" }, "-=1.2")
        .to("#ql4", { yPercent: 0, duration: 1.5, ease: "power3.out" }, "<0.1")
        .to("#ql5", { yPercent: 0, duration: 1.5, ease: "power3.out" }, "-=1.2")
        .to("#ql6", { yPercent: 0, duration: 1.5, ease: "power3.out" }, "-=1.2")
        .to(".split-sub", { opacity: 1, duration: 1.5, stagger: 0.1, ease: "power2.out" }, "-=1.0")
        .to({}, { duration: 3 })
        .to("#splitLeft",     { x: "-110%", duration: 2.5, ease: "power2.inOut" }, "break")
        .to("#splitRight",    { x: "110%",  duration: 2.5, ease: "power2.inOut" }, "break")
        .to(".split-divider", { scaleY: 0, opacity: 0, duration: 1, ease: "power2.inOut" }, "break");
}
pageTwo();


/* ============================================================
   MANIFESTO — entrance (both mobile & desktop)
   ============================================================ */
gsap.from("#manifesto-ghost", {
    x: isMobile ? "-8%" : "-5%",
    opacity: 0,
    duration: 1.4,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#manifesto",
        scroller: "body",
        start: "top 88%",
        toggleActions: "play none none none"
    }
});

gsap.from("#manifesto-content", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#manifesto",
        scroller: "body",
        start: "top 82%",
        toggleActions: "play none none none"
    }
});

/* Mobile: also animate manifesto text lines one by one */
if (isMobile) {
    gsap.from("#manifesto-cta", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
            trigger: "#manifesto-cta",
            scroller: "body",
            start: "top 92%",
            toggleActions: "play none none none"
        }
    });
}


/* ============================================================
   COLLECTION CONTEXT — staggered entrance
   ============================================================ */
function initContextAnimations() {
    const items = document.querySelectorAll(".ctx-item");
    if (!items.length) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add("in-view");
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
}
initContextAnimations();


/* ============================================================
   PAGE 3 — IMAGE SLIDESHOW
   Mobile: stacked cards with staggered fly-up reveals.
   Desktop: GSAP pin slideshow.
   ============================================================ */
function pg3() {
    if (isMobile) {
        /* Each card flies up from below as it enters viewport */
        document.querySelectorAll(".p").forEach((panel, i) => {
            gsap.from(panel, {
                y: 60,
                opacity: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: panel,
                    scroller: "body",
                    start: "top 94%",
                    toggleActions: "play none none none"
                }
            });

            /* Image inside each card does a subtle scale reveal */
            const img = panel.querySelector("img");
            if (img) {
                gsap.from(img, {
                    scale: 1.08,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: panel,
                        scroller: "body",
                        start: "top 94%",
                        toggleActions: "play none none none"
                    }
                });
            }

            /* Label slides in from left */
            const label = panel.querySelector(".p-label");
            if (label) {
                gsap.from(label, {
                    x: -20,
                    opacity: 0,
                    duration: 0.7,
                    delay: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: panel,
                        scroller: "body",
                        start: "top 94%",
                        toggleActions: "play none none none"
                    }
                });
            }

            /* Shop btn slides in from right */
            const btn = panel.querySelector(".p-shop-btn");
            if (btn) {
                gsap.from(btn, {
                    x: 20,
                    opacity: 0,
                    duration: 0.7,
                    delay: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: panel,
                        scroller: "body",
                        start: "top 94%",
                        toggleActions: "play none none none"
                    }
                });
            }
        });
        return;
    }

    var tl3 = gsap.timeline({
        scrollTrigger: { trigger: "#page3", pin: true, scroller: "body", scrub: 4, end: "+=900%" }
    });

    tl3
        .to("#p1", { top: "5%", duration: 3, ease: "power2.out" })
        .to({}, { duration: 2 })
        .to("#p1", { top: "-60%", duration: 3, ease: "power2.in" }, "slide1")
        .to("#p2", { top: "5%",   duration: 3, ease: "power2.out" }, "slide1")
        .to({}, { duration: 2 })
        .to("#p2", { top: "-60%", duration: 3, ease: "power2.in" }, "slide2")
        .to("#p3", { top: "5%",   duration: 3, ease: "power2.out" }, "slide2")
        .to({}, { duration: 2 })
        .to("#p3", { top: "-60%", duration: 3, ease: "power2.in" }, "slide3")
        .to("#p4", { top: "5%",   duration: 3, ease: "power2.out" }, "slide3")
        .to({}, { duration: 2 })
        .to("#p4", { top: "-60%", duration: 3, ease: "power2.in" }, "slide4")
        .to("#p5", { top: "5%",   duration: 3, ease: "power2.out" }, "slide4")
        .to({}, { duration: 3 })
        .to("#p5", { top: "-60%", duration: 3, ease: "power2.in" });
}
pg3();


/* ============================================================
   BACKGROUND COLOUR SWITCH
   ============================================================ */
gsap.to("#main", {
    backgroundColor: "black",
    scrollTrigger: {
        trigger: "#page3",
        scroller: "body",
        scrub: 1,
        start: isMobile ? "top 40%" : "bottom 50%",
    }
});


/* ============================================================
   PAGE 4 — mobile gets scroll-triggered video entrance
   ============================================================ */
if (!isMobile) {
    var tl4 = gsap.timeline({
        scrollTrigger: {
            trigger: "#page4",
            scroller: "body",
            scrub: 2,
            start: "top -50%",
            end: "top -400%",
            pin: true
        }
    });
    tl4
        .from("#page4 #video-container2", { y: "100vh", delay: 1, duration: 1 })
        .to("#page4 #video-container2 video", { delay: 1, duration: 2, transform: "scale(1)" });
} else {
    /* Mobile: video slides up as you scroll into page4 */
    gsap.set("#page4 #video-container2", { y: 60, opacity: 0 });
    gsap.set("#page4 #video-container2 video", { transform: "scale(1)" });

    gsap.to("#page4 #video-container2", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#page4 #video-container2",
            scroller: "body",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    /* Page 4 headline big text flies in */
    gsap.from("#page4 > h1", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#page4 > h1",
            scroller: "body",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    /* Shop More link */
    gsap.from(".more h1", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".more",
            scroller: "body",
            start: "top 88%",
            toggleActions: "play none none none"
        }
    });

    /* Page 4 body text */
    gsap.from(["#page4 h5", "#page4 h6"], {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#page4 h5",
            scroller: "body",
            start: "top 88%",
            toggleActions: "play none none none"
        }
    });
}


/* ============================================================
   PAGE 6 — animated entrance on mobile
   ============================================================ */
if (isMobile) {
    gsap.from("#page6 h1", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#page6",
            scroller: "body",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(["#page6 h5", "#page6 h6"], {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#page6 h5",
            scroller: "body",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
}


/* ============================================================
   FOOTER — animated entrance on mobile
   ============================================================ */
if (isMobile) {
    gsap.from("#footer #left p", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#footer",
            scroller: "body",
            start: "top 88%",
            toggleActions: "play none none none"
        }
    });

    gsap.from("#footer #left #logo h1", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#footer #left #logo",
            scroller: "body",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(["#social h4", "#mail #home h4"], {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#footer #right",
            scroller: "body",
            start: "top 88%",
            toggleActions: "play none none none"
        }
    });
}


/* ============================================================
   PAGE 3 HOVER CURSOR — desktop only
   ============================================================ */
function initPage3HoverCursor() {
    if (isMobile) return;

    const cursor = document.createElement("div");
    cursor.id = "shop-cursor";
    cursor.innerHTML = `<span>SHOP NOW</span>`;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    function lerp(a, b, t) { return a + (b - a) * t; }

    (function tick() {
        currentX = lerp(currentX, mouseX, 0.08);
        currentY = lerp(currentY, mouseY, 0.08);
        cursor.style.left = currentX + "px";
        cursor.style.top  = currentY + "px";
        requestAnimationFrame(tick);
    })();

    document.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    document.querySelectorAll("#page3 .p").forEach((panel) => {
        const img = panel.querySelector("img");
        if (!img) return;
        img.addEventListener("mouseenter", () => cursor.classList.add("visible"));
        img.addEventListener("mouseleave", () => cursor.classList.remove("visible"));
    });
}
initPage3HoverCursor();


/* ============================================================
   VIDEO AUTOPLAY — iOS Safari + Android Chrome fix
   ============================================================ */
function forcePlayAllVideos() {
    document.querySelectorAll("video").forEach(video => {
        video.muted = true;
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        video.setAttribute("preload", "auto");

        const tryPlay = () => {
            video.play().catch(() => {});
        };

        // Try immediately
        tryPlay();

        // Also try on first user gesture (required by some browsers)
        document.addEventListener("touchstart", tryPlay, { once: true });
        document.addEventListener("touchend",   tryPlay, { once: true });
        document.addEventListener("click",      tryPlay, { once: true });

        // Retry if it gets paused (e.g. tab switching on iOS)
        video.addEventListener("pause", () => {
            if (video.loop) tryPlay();
        });

        // If video loads but doesn't autoplay, force it
        video.addEventListener("loadeddata", tryPlay);
        video.addEventListener("canplay",    tryPlay);
    });
}

document.addEventListener("DOMContentLoaded", forcePlayAllVideos);

// Also fire immediately in case DOM is already ready
if (document.readyState !== "loading") {
    forcePlayAllVideos();
}

/* ============================================================
   INIT ON READY
   ============================================================ */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFeaturedAnimations);
} else {
    initFeaturedAnimations();
}