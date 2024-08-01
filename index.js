"use strict";
// component(1) add btn with input
function createInsertAction(cb, withClose = false) {
    const atcContainer = document.createElement("div");
    atcContainer.classList.add("atn-container", "input-setter");
    const addAtcBtn = document.createElement("button");
    addAtcBtn.innerText = "➕";
    addAtcBtn.addEventListener("click", cb);
    const closeAtnBtn = document.createElement('button');
    closeAtnBtn.innerText = "✖️";
    closeAtnBtn.addEventListener('click', (e) => { var _a; return (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.remove(); });
    const nameInput = document.createElement("input");
    nameInput.placeholder = "name...";
    atcContainer.appendChild(addAtcBtn);
    atcContainer.appendChild(nameInput);
    if (withClose)
        atcContainer.appendChild(closeAtnBtn);
    return atcContainer;
}
// component(2) label with action btn to add folder and file. Used for folder directory
function createDirWithAction(name, folderCb, fileCb, idx) {
    const container = document.createElement("div");
    container.classList.add("container");
    const atnContainer = document.createElement("div");
    atnContainer.classList.add("atn-container");
    const nameLable = document.createElement("label");
    nameLable.innerText = name;
    const addFolderAtcBtn = document.createElement("button");
    addFolderAtcBtn.innerText = "➕ Folder";
    addFolderAtcBtn.addEventListener("click", folderCb);
    const addFileAtcBtn = document.createElement("button");
    addFileAtcBtn.innerText = "➕ File";
    addFileAtcBtn.addEventListener("click", fileCb);
    atnContainer.appendChild(nameLable);
    atnContainer.appendChild(addFolderAtcBtn);
    atnContainer.appendChild(addFileAtcBtn);
    container.setAttribute("data-idx", `${idx + 1}`);
    container.append(atnContainer);
    nameLable.addEventListener("click", accordianEffectHandler);
    return container;
}
//component(3) with only label. Used for file 
function createFile(name, idx) {
    const container = document.createElement("div");
    container.classList.add("container");
    const atnContainer = document.createElement("div");
    atnContainer.classList.add("atn-container");
    const nameLabel = document.createElement("label");
    nameLabel.innerText = name;
    atnContainer.appendChild(nameLabel);
    container.setAttribute("data-idx", `${idx + 1}`);
    container.append(atnContainer);
    return container;
}
// adds accordian effect to the parent container. Hides/Shows the children 
function accordianEffectHandler(e) {
    var _a, _b, _c, _d;
    e.stopPropagation();
    const childrenContainers = (_b = (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.getElementsByClassName("container");
    const parentIdx = (_d = (_c = e.target.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.getAttribute('data-idx');
    if (childrenContainers === undefined || childrenContainers.length === 0 || (parentIdx && Number(parentIdx) < 1))
        return;
    for (let element of childrenContainers) {
        const elementStyle = window.getComputedStyle(element).getPropertyValue('display');
        if (elementStyle === 'none')
            element.style.display = 'flex';
        else
            element.style.display = 'none';
    }
}
// handler for component(1) add action button
function handleInsertActionForDirCallback(e, type) {
    e.stopPropagation();
    const actionContainer = e.target.parentElement;
    const parentEl = actionContainer.parentElement;
    const inputEl = actionContainer.getElementsByTagName("input")[0];
    const idx = parentEl.getAttribute("data-idx");
    let dirContainer;
    if (type === "root" || type === "folder")
        dirContainer = createDirWithAction(inputEl.value, (e) => handleDirActionCallback(e, "folder"), (e) => handleDirActionCallback(e, "file"), Number(idx));
    else
        dirContainer = createFile(inputEl.value, Number(idx));
    dirContainer.style.marginLeft = `12px`;
    parentEl.appendChild(dirContainer);
    actionContainer.remove();
}
// handler for component(2) action button [add folder / add file]
function handleDirActionCallback(e, type) {
    e.stopPropagation();
    const parentElement = e.target.parentElement.parentElement;
    const insertAction = createInsertAction((e) => handleInsertActionForDirCallback(e, type), true);
    const isInserActionExist = parentElement.getElementsByClassName('input-setter').length > 0;
    if (!isInserActionExist)
        parentElement.appendChild(insertAction);
    return parentElement;
}
// starter function
function intiateUI() {
    const mainContainer = document.getElementById("tree");
    mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.setAttribute("data-idx", "0");
    const insertAction = createInsertAction((e) => handleInsertActionForDirCallback(e, "root"));
    mainContainer === null || mainContainer === void 0 ? void 0 : mainContainer.appendChild(insertAction);
}
// start the app
intiateUI();
