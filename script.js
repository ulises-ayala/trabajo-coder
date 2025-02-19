document.addEventListener("DOMContentLoaded", function () {
    const carrusel = document.querySelector(".carrusel-items");
    const prevBtn = document.querySelector(".carrusel-prev");
    const nextBtn = document.querySelector(".carrusel-next");

    let index = 0;
    const items = document.querySelectorAll(".carrusel-item");
    const totalItems = items.length;
    const itemsVisible = 3; // Cantidad de imágenes visibles
    const itemWidth = items[0].offsetWidth; // Obtiene el ancho de una imagen
    let isTransitioning = false; // Evita clics rápidos mientras está en transición

    // 🔹 Clonar los primeros elementos y agregarlos al final para efecto infinito
    for (let i = 0; i < itemsVisible; i++) {
        let clone = items[i].cloneNode(true);
        carrusel.appendChild(clone);
    }

    function actualizarCarrusel() {
        if (isTransitioning) return; // Si está en transición, no hacer nada
        isTransitioning = true;

        carrusel.style.transition = "transform 0.5s ease-in-out";
        carrusel.style.transform = `translateX(${-index * itemWidth}px)`;

        setTimeout(() => {
            if (index >= totalItems) {
                carrusel.style.transition = "none"; // Elimina la animación para el reinicio
                index = 0;
                carrusel.style.transform = `translateX(0)`;
            }
            isTransitioning = false;
        }, 500);
    }

    nextBtn.addEventListener("click", function () {
        if (index < totalItems) {
            index++;
        }
        actualizarCarrusel();
    });

    prevBtn.addEventListener("click", function () {
        if (index > 0) {
            index--;
        } else {
            index = totalItems - 1; // Ir al último real
            carrusel.style.transition = "none"; // Evita animación instantánea
            carrusel.style.transform = `translateX(${-index * itemWidth}px)`;
        }
        actualizarCarrusel();
    });
});
