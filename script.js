console.log("SCRIPT CARGADO");
// ===============================
// ELEMENTOS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

constpages = document.querySelectorAll(".page");
conststeps = document.querySelectorAll(".step");
constcanams = document.querySelectorAll(".canam");
constgifts = document.querySelectorAll(".gift");

constmusic = document.getElementById("music");
constrestartBtn = document.getElementById("restart");
constparticles = document.getElementById("particles");
constfinalText = document.querySelector(".final p");
constgiftImage = document.querySelector(".gift-image");

    let current = 0;
    let musicStarted = false;

    // ===============================
    // MOSTRAR PÁGINA
    // ===============================

    function showPage(index) {

        pages.forEach(p => {
            p.classList.remove("active");
        });

        steps.forEach(s => {
            s.classList.remove("active");
        });

        pages[index].classList.add("active");
        steps[index].classList.add("active");

        current = index;
    }

    // ===============================
    // MÚSICA
    // ===============================

    function startMusic() {

        if (musicStarted) return;

        musicStarted = true;

        music.volume = 0;

        music.play().catch(() => {});

        let v = 0;

        const fade = setInterval(() => {

            v += 0.03;
            music.volume = v;

            if (v >= 1) clearInterval(fade);

        }, 100);
    }

    // ===============================
    // CAN-AM CLICK
    // ===============================

    console.log("Buscando Can-Am...");

document.addEventListener("click", () => {
    console.log("CLICK GENERAL FUNCIONA");
});

        canam.addEventListener("click", () => {

            startMusic();

            canam.style.transform = "translateX(400px) rotate(8deg)";

            setTimeout(() => {

                canam.style.transform = "";
                showPage(current + 1);

            }, 450);

        });

    });

    // ===============================
    // CAJAS CLICK
    // ===============================

    gifts.forEach(gift => {

        gift.addEventListener("click", () => {

            gift.animate([

                { transform: "scale(1)" },
                { transform: "scale(0.92)" },
                { transform: "scale(1.08)" },
                { transform: "scale(1)" }

            ], {

                duration: 400

            });

            if (navigator.vibrate) navigator.vibrate(50);

            setTimeout(() => {

                if (current < pages.length - 1) {

                    showPage(current + 1);

                }

                // si llega al final
                if (current === pages.length - 1) {

                    revealFinal();

                }

            }, 300);

        });

    });

    // ===============================
    // FINAL (REGALO)
    // ===============================

    function revealFinal() {

        // flash blanco
        const flash = document.createElement("div");

        flash.style.position = "fixed";
        flash.style.top = 0;
        flash.style.left = 0;
        flash.style.width = "100vw";
        flash.style.height = "100vh";
        flash.style.background = "white";
        flash.style.zIndex = 9999;
        flash.style.opacity = 0;
        flash.style.transition = "0.4s";

        document.body.appendChild(flash);

        setTimeout(() => flash.style.opacity = 1, 50);

        setTimeout(() => flash.style.opacity = 0, 400);

        setTimeout(() => flash.remove(), 800);

        // confeti (si tienes librería cargada)
        if (typeof confetti === "function") {

            confetti({
                particleCount: 250,
                spread: 120,
                origin: { y: 0.6 }
            });

        }

        // mostrar imagen regalo
        if (giftImage) {

            giftImage.style.opacity = 0;
            giftImage.style.transform = "scale(0.7)";
            giftImage.style.transition = "1.2s";

            setTimeout(() => {

                giftImage.style.opacity = 1;
                giftImage.style.transform = "scale(1)";

            }, 200);

        }

        // texto final
        if (finalText) {

            const text = finalText.innerHTML;
            finalText.innerHTML = "";

            let i = 0;

            const typing = setInterval(() => {

                finalText.innerHTML += text.charAt(i);
                i++;

                if (i >= text.length) clearInterval(typing);

            }, 25);

        }
    }

    // ===============================
    // CORAZONES
    // ===============================

    function createHeart() {

        if (!particles) return;

        const heart = document.createElement("div");

        heart.className = "heart";
        heart.innerHTML = "❤";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (5 + Math.random() * 5) + "s";
        heart.style.fontSize = (12 + Math.random() * 20) + "px";

        particles.appendChild(heart);

        setTimeout(() => heart.remove(), 10000);

    }

    setInterval(createHeart, 600);

    // ===============================
    // REINICIAR
    // ===============================

    restartBtn?.addEventListener("click", () => {

        current = 0;
        showPage(0);

        music.pause();
        music.currentTime = 0;
        musicStarted = false;

    });

});
