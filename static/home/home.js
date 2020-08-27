const body = document.body;

window.onload = () => {

    const mainDiv = document.createElement("div");
    mainDiv.id = "main";

    const defaultHead = document.createElement("h1");
    defaultHead.innerText = "Welcome to my Test Site";

    const alertBtn = document.createElement("button");
    alertBtn.innerText = "Click Me";
    alertBtn.onclick = () => {
        const bgColor = body.style.backgroundColor;
        body.style.backgroundColor = bgColor === "lightblue" ? "lightgreen" : "lightblue";

        alert("Thanks for visiting!");
    };

    mainDiv.appendChild(defaultHead);
    mainDiv.appendChild(alertBtn);
    body.appendChild(mainDiv);
    body.style.backgroundColor = "lightblue";

}