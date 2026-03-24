/* ===( Build By : CODE AASHU )=== */
function pageOne() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1",
      scroller: "body",
      start: "top 0%",
      end: "top -220%",   // FIXED: was -400%, trimmed so page2 follows immediately
      scrub: 5,
      pin: true
    }
  });

  tl
    // Phase 1: text slides left
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
    // Phase 2: video rises up and fully expands
    .to("#video-container", {
      top: "0%",
      delay: -1.4,
      duration: 2
    })
    .to("#video-container video", {
      transform: "scale(1)",
      duration: 3    // slightly shorter than before to tighten
    })
    // Phase 3: brief hold — then cuts straight to page2
    .to({}, { duration: 3 });  // FIXED: was 3, now just 1 beat of breathing room
}
pageOne();

function pageTwo() {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#page2",
            scroller: "body",
            start: "top 0%",   // FIXED: was -5%, now snaps flush after page1 pin releases
            end: "top -200%",
            scrub: 8,
            pin: true
        }
    })
    tl2
        .from("#center #left", {
            y: "100%",
            opacity: 0,
            duration: 3,
            ease: "power1.out",
        })
        .from("#center #right", {
            y: "150%",
            opacity: 0,
            duration: 3,
            ease: "power1.out",
        }, "-=1.5")
        .to({}, { duration: 3 })
}
pageTwo()

function pg3() {
  var tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      pin: true,
      scroller: "body",
      scrub: 4,
      end: "+=900%",   // EXTENDED: more scroll room for open → hold → scroll per image
    }
  });

  // Each image sequence: EXPAND to full frame → HOLD → SCROLL OUT as next enters
  // Using labeled waypoints per panel

  // --- Panel 1 ---
  tl3
    // p1 enters: slides up to center stage, big
    .to("#p1", { top: "5%", duration: 3, ease: "power2.out" })
    // p1 holds open (feels like it's breathing)
    .to({}, { duration: 2 })
    // p1 exits up while p2 enters from below
    .to("#p1", { top: "-60%", duration: 3, ease: "power2.in" }, "slide1")
    .to("#p2", { top: "5%",   duration: 3, ease: "power2.out" }, "slide1")

    // p2 holds
    .to({}, { duration: 2 })
    // p2 exits, p3 enters
    .to("#p2", { top: "-60%", duration: 3, ease: "power2.in" }, "slide2")
    .to("#p3", { top: "5%",   duration: 3, ease: "power2.out" }, "slide2")

    // p3 holds
    .to({}, { duration: 2 })
    // p3 exits, p4 enters
    .to("#p3", { top: "-60%", duration: 3, ease: "power2.in" }, "slide3")
    .to("#p4", { top: "5%",   duration: 3, ease: "power2.out" }, "slide3")

    // p4 holds
    .to({}, { duration: 2 })
    // p4 exits, p5 enters
    .to("#p4", { top: "-60%", duration: 3, ease: "power2.in" }, "slide4")
    .to("#p5", { top: "5%",   duration: 3, ease: "power2.out" }, "slide4")

    // p5 holds then exits
    .to({}, { duration: 3 })
    .to("#p5", { top: "-60%", duration: 3, ease: "power2.in" });
}

pg3();

gsap.to("#main",{
    backgroundColor: "black",
    scrollTrigger: {
        trigger: "#page3",
        scroller: "body",
        scrub: 1,
        start:"bottom 50%",
    }
})

var tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page4",
        scroller: "body",
        scrub: 2,
        start:"top -50%",
        end: "top -400%",
        pin:true
    }
});

tl4
.from("#page4 #video-container2",{
    y:"100vh",
    delay:1,
    duration:1
})
.to("#page4 #video-container2 video",{
    delay:1,
    duration:2,
    transform: "scale(1)"
})


var tl5 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page5",
        scroller: "body",
        scrub: 1,
        start:"top -90%",
        end:"top -100%",
    }
});
tl5.to("#page5",{
    backgroundColor: "black",
},"h")

.to("#page5 .more h1,#page5 .more i",{
   color: "white",
},"h")


function initPage3HoverCursor() {
  const cursor = document.createElement("div");
  cursor.id = "shop-cursor";
  cursor.innerHTML = `<span>SHOP NOW</span>`;
  document.body.appendChild(cursor);

  const style = document.createElement("style");
  style.textContent = `
    #shop-cursor {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100px;
      height: 100px;
      border-radius: 50%;

      background: #fff;
      mix-blend-mode: difference;

      opacity: 0;
      transform: translate(-50%, -50%) scale(0.3);
      transition:
        opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1),
        transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);

      will-change: transform, opacity;
    }

    #shop-cursor.visible {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    #shop-cursor span {
      font-family: HeadingNow, sans-serif;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #000;
      mix-blend-mode: normal;
      user-select: none;
    }

    #page3 .p img {
      cursor: none;
    }
  `;
  document.head.appendChild(style);

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

  document.querySelectorAll("#page3 .p").forEach((panel) => {
    const img = panel.querySelector("img");
    if (!img) return;
    img.addEventListener("mouseenter", () => cursor.classList.add("visible"));
    img.addEventListener("mouseleave", () => cursor.classList.remove("visible"));
  });
}

initPage3HoverCursor();

// Force autoplay on iOS Safari
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("video").forEach(video => {
        video.muted = true;
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        
        const tryPlay = () => {
            video.play().catch(() => {});
        };

        tryPlay();

        document.addEventListener("touchstart", tryPlay, { once: true });
        document.addEventListener("click", tryPlay, { once: true });
    });
});