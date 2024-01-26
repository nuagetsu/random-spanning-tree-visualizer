export {changeScreen};

function changeScreen(from, fromContainer, to, toContainer) {
    from.classList.remove("active");
    fromContainer.classList.remove("active");
    to.classList.add("active");
    toContainer.classList.add("active")
    currentActive = to;
    currentActiveContainer = toContainer;
}