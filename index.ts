type TreeType = "root" | "file" | "folder";

// component(1) add btn with input
function createInsertAction(cb: (e: Event) => void, withClose: boolean = false) {
    const atcContainer = document.createElement("div");
    atcContainer.classList.add("atn-container", "input-setter");

    const addAtcBtn = document.createElement("button");

    addAtcBtn.innerText = "➕";
    addAtcBtn.addEventListener("click", cb);

    const closeAtnBtn = document.createElement('button')
    closeAtnBtn.innerText = "✖️"
    closeAtnBtn.addEventListener('click', (e) => (e.target as HTMLElement).parentElement?.remove())

    const nameInput = document.createElement("input");
    nameInput.placeholder = "name...";

    atcContainer.appendChild(addAtcBtn);
    atcContainer.appendChild(nameInput);
    if (withClose) atcContainer.appendChild(closeAtnBtn);

    return atcContainer;
}

// component(2) label with action btn to add folder and file. Used for folder directory
function createDirWithAction(
    name: string,
    folderCb: (e: Event, ...args: any[]) => any,
    fileCb: (e: Event, ...args: any[]) => any,
    idx: number
) {
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
function createFile(name: string, idx: number) {
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
function accordianEffectHandler(e: Event) {
    e.stopPropagation();
    const childrenContainers = (
        e.target as HTMLElement
    ).parentElement?.parentElement?.getElementsByClassName("container");
    const parentIdx = (
        e.target as HTMLElement
    ).parentElement?.parentElement?.getAttribute('data-idx')

    if (childrenContainers === undefined || childrenContainers.length === 0 || (parentIdx && Number(parentIdx) < 1)) return;
    for (let element of childrenContainers!) {
        const elementStyle = window.getComputedStyle((element as HTMLElement)).getPropertyValue('display')
        if (elementStyle === 'none')
            (element as HTMLElement).style.display = 'flex'
        else
            (element as HTMLElement).style.display = 'none'
    }
}

// handler for component(1) add action button
function handleInsertActionForDirCallback(e: Event, type: TreeType) {
    e.stopPropagation();
    const actionContainer = (e.target as HTMLElement).parentElement!
    const parentEl = actionContainer.parentElement!;
    const inputEl = actionContainer.getElementsByTagName(
        "input"
    )[0];
    const idx = parentEl.getAttribute("data-idx");
    let dirContainer: HTMLElement;
    if (type === "root" || type === "folder")
        dirContainer = createDirWithAction(
            inputEl.value,
            (e) => handleDirActionCallback(e, "folder"),
            (e) => handleDirActionCallback(e, "file"),
            Number(idx)
        );
    else dirContainer = createFile(inputEl.value, Number(idx));
    dirContainer.style.marginLeft = `12px`;
    parentEl.appendChild(dirContainer);
    actionContainer.remove()
}

// handler for component(2) action button [add folder / add file]
function handleDirActionCallback(e: Event, type: TreeType) {
    e.stopPropagation();
    const parentElement = (e.target as HTMLElement).parentElement!.parentElement!;
    const insertAction = createInsertAction((e) =>
        handleInsertActionForDirCallback(e, type),
        true
    );
    const isInserActionExist = parentElement.getElementsByClassName('input-setter').length > 0
    if (!isInserActionExist)
        parentElement.appendChild(insertAction);
    return parentElement;
}

// starter function
function intiateUI() {
    const mainContainer = document.getElementById("tree");
    mainContainer?.setAttribute("data-idx", "0");

    const insertAction = createInsertAction((e) =>
        handleInsertActionForDirCallback(e, "root")
    );
    mainContainer?.appendChild(insertAction);
}

// start the app
intiateUI()



