/* ===( Build By : CODE AASHU | Features By : MUGDHA )=== */

/* ============================================================
   FEATURE 1: Show SHOP NOW button when video starts/loads
   ============================================================ */
(function initVideoShopBtn() {
    const video = document.querySelector("#video-container video");
    const btn   = document.getElementById("shop-btn");
    if (!video || !btn) return;

    function showBtn() {
        gsap.to(btn, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            pointerEvents: "auto"
        });
    }

    video.addEventListener("canplay", showBtn, { once: true });
    if (video.readyState >= 3) showBtn();
    setTimeout(showBtn, 2000);
})();


/* ============================================================
   FEATURE 2: Persistent Shop Tag — appears after page1
   ============================================================ */
ScrollTrigger.create({
    trigger: "#page1",
    scroller: "body",
    start: "top -200%",
    onEnter: () => {
        document.getElementById("persistent-shop-tag")?.classList.add("visible");
    },
    onLeaveBack: () => {
        document.getElementById("persistent-shop-tag")?.classList.remove("visible");
    }
});


/* ============================================================
   FEATURE 3: Featured Products entrance animation
   ============================================================ */
function initFeaturedAnimations() {
    const cards = gsap.utils.toArray(".feat-card");
    if (!cards.length) return;

    gsap.from("#featured-header", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#featured",
            scroller: "body",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(cards, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#featured-grid",
            scroller: "body",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    gsap.from("#featured-footer", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#featured-footer",
            scroller: "body",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });
}


/* ============================================================
   PAGE 1 — VIDEO HERO
   ============================================================ */
function pageOne() {
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
        .to("#page1 h1", {
            transform: "translateX(-50%)",
            fontWeight: 100,
            duration: 2
        })
        .to("#page1 h1", {
            transform: "translateX(-130%)",
            fontWeight: 900,
            duration: 2
        })
        .to("#video-container", {
            top: "0%",
            delay: -1.4,
            duration: 2
        })
        .to("#video-container video", {
            transform: "scale(1)",
            duration: 3
        })
        .to({}, { duration: 3 });
}
pageOne();

ScrollTrigger.create({
    trigger: "#page1",
    scroller: "body",
    start: "top -180%",
    end: "top -220%",
    scrub: 2,
    onEnter: () => {
        gsap.to("#shop-btn", {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            pointerEvents: "auto"
        });
    },
    onLeaveBack: () => {
        gsap.to("#shop-btn", {
            opacity: 0,
            duration: 0.3,
            pointerEvents: "none"
        });
    }
});


/* ============================================================
   PAGE 2 — SPLIT QUOTE PANEL
   Pure GSAP — no CSS initial hidden state needed.
   Text is always visible; GSAP animates it in on scroll.
   ============================================================ */
function pageTwo() {
    // Set initial hidden state via GSAP (not CSS) so text is
    // still in DOM and accessible, just invisible before trigger
    gsap.set(["#ql1","#ql2","#ql3","#ql4","#ql5","#ql6"], { yPercent: 110 });
    gsap.set(".split-sub", { opacity: 0 });

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

    // Quote lines shoot up from below
    tl2
        .to("#ql1", { yPercent: 0, duration: 1.5, ease: "power3.out" })
        .to("#ql2", { yPercent: 0, duration: 1.5, ease: "power3.out" }, "-=1.2")
        .to("#ql3", { yPercent: 0, duration: 1.5, ease: "power3.out" }, "-=1.2")
        .to("#ql4", { yPercent: 0, duration: 1.5, ease: "power3.out" }, "<0.1")
        .to("#ql5", { yPercent: 0, duration: 1.5, ease: "power3.out" }, "-=1.2")
        .to("#ql6", { yPercent: 0, duration: 1.5, ease: "power3.out" }, "-=1.2")
        .to(".split-sub", { opacity: 1, duration: 1.5, stagger: 0.1, ease: "power2.out" }, "-=1.0")
        // Hold — let the viewer read
        .to({}, { duration: 3 })
        // BREAK: left flies left, right flies right
        .to("#splitLeft",    { x: "-110%", duration: 2.5, ease: "power2.inOut" }, "break")
        .to("#splitRight",   { x: "110%",  duration: 2.5, ease: "power2.inOut" }, "break")
        .to(".split-divider",{ scaleY: 0, opacity: 0, duration: 1, ease: "power2.inOut" }, "break");
}
pageTwo();


/* ============================================================
   MANIFESTO — entrance
   ============================================================ */
gsap.from("#manifesto-ghost", {
    x: "-8%",
    opacity: 0,
    duration: 1.6,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#manifesto",
        scroller: "body",
        start: "top 75%",
        toggleActions: "play none none none"
    }
});

gsap.from("#manifesto-content", {
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#manifesto",
        scroller: "body",
        start: "top 70%",
        toggleActions: "play none none none"
    }
});


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
    }, { threshold: 0.2 });

    items.forEach(el => io.observe(el));
}
initContextAnimations();


/* ============================================================
   PAGE 3 — IMAGE SLIDESHOW
   ============================================================ */
function pg3() {
    var tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: "#page3",
            pin: true,
            scroller: "body",
            scrub: 4,
            end: "+=900%",
        }
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
   BACKGROUND COLOUR SWITCH (white → black at page3 bottom)
   ============================================================ */
gsap.to("#main", {
    backgroundColor: "black",
    scrollTrigger: {
        trigger: "#page3",
        scroller: "body",
        scrub: 1,
        start: "bottom 50%",
    }
});


/* ============================================================
   PAGE 4
   ============================================================ */
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
    .from("#page4 #video-container2", {
        y: "100vh",
        delay: 1,
        duration: 1
    })
    .to("#page4 #video-container2 video", {
        delay: 1,
        duration: 2,
        transform: "scale(1)"
    });


/* ============================================================
   PAGE 3 HOVER CURSOR
   ============================================================ */
function initPage3HoverCursor() {
    const cursor = document.createElement("div");
    cursor.id = "shop-cursor";
    cursor.innerHTML = `<span>SHOP NOW</span>`;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    function lerp(a, b, t) { return a + (b - a) * t; }

    (function tick() {
        currentX = lerp(currentX, mouseX, 0.08);
        currentY = lerp(currentY, mouseY, 0.08);
        cursor.style.left = currentX + "px";
        cursor.style.top  = currentY + "px";
        requestAnimationFrame(tick);
    })();

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
    }, { passive: true });

    document.querySelectorAll("#page3 .p").forEach((panel) => {
        const img = panel.querySelector("img");
        if (!img) return;
        img.addEventListener("mouseenter", () => cursor.classList.add("visible"));
        img.addEventListener("mouseleave", () => cursor.classList.remove("visible"));
        img.addEventListener("touchstart", () => cursor.classList.add("visible"), { passive: true });
        img.addEventListener("touchend",   () => cursor.classList.remove("visible"));
        img.addEventListener("touchcancel",() => cursor.classList.remove("visible"));
    });
}
initPage3HoverCursor();


/* ============================================================
   VIDEO AUTOPLAY — iOS Safari
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("video").forEach(video => {
        video.muted = true;
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");

        const tryPlay = () => { video.play().catch(() => {}); };
        tryPlay();
        document.addEventListener("touchstart", tryPlay, { once: true });
        document.addEventListener("click",      tryPlay, { once: true });
    });
});


/* ============================================================
   INIT ON READY
   ============================================================ */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFeaturedAnimations);
} else {
    initFeaturedAnimations();
}