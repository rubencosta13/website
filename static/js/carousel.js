document.querySelectorAll(".carousel").forEach(carousel => {

    const track = carousel.querySelector(".carousel-track");
    const slides = [...carousel.querySelectorAll(".carousel-slide")];

    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    let index = 0;

    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "carousel-dot";
        dot.onclick = () => {
            index = i;
            update();
        };
        dotsContainer.appendChild(dot);
    });

    const dots = [...dotsContainer.children];

    function update() {
        track.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach((d, i) =>
            d.classList.toggle("active", i === index)
        );
    }

    prev.onclick = () => {
        index = (index - 1 + slides.length) % slides.length;
        update();
    };

    next.onclick = () => {
        index = (index + 1) % slides.length;
        update();
    };

    let startX = 0;

    track.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", e => {

        const diff = startX - e.changedTouches[0].clientX;

        if (Math.abs(diff) < 40) return;

        if (diff > 0)
            next.click();
        else
            prev.click();

    });

    document.addEventListener("keydown", e => {

        if (!carousel.matches(":hover")) return;

        if (e.key === "ArrowLeft")
            prev.click();

        if (e.key === "ArrowRight")
            next.click();

    });

    let timer = setInterval(() => next.click(), 5000);

    carousel.addEventListener("mouseenter", () => clearInterval(timer));

    carousel.addEventListener("mouseleave", () => {
        timer = setInterval(() => next.click(), 5000);
    });

    update();

});