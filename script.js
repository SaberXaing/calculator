function createBubble() {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    const size = Math.random() * 30 + 10; // 隨機大小
    const left = Math.random() * 100 + "vw"; // 隨機水平位置
    const duration = Math.random() * 6 + 5 + "s"; // 隨機升起速度
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = left;
    bubble.style.animationDuration = duration;
    document.querySelector(".bubble-container").appendChild(bubble);

    bubble.addEventListener("animationiteration", () => {
        // 在動畫迭代時刪除泡泡，以避免內存洩漏
        bubble.remove();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // 每隔一段時間生成一個泡泡
    setInterval(createBubble, 1000);
});
