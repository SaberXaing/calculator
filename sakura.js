
//櫻花掉落
document.addEventListener("DOMContentLoaded", function () {
    createSakura();
});

function createSakura() {
    const numberOfSakura = 50;
    const container = document.body;

    for (let i = 0; i < numberOfSakura; i++) {
        const sakura = document.createElement("div");
        sakura.className = "sakura";
        sakura.style.left = `${Math.random() * 100}vw`;
        sakura.style.animationDuration = `${Math.random() * 3 + 2}s`;
        sakura.style.animationDelay = `${Math.random()}s`;
        container.appendChild(sakura);

        sakura.addEventListener("animationiteration", () => {
            sakura.style.left = `${Math.random() * 100}vw`;
        });
    }
}
