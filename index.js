console.time();
const getColorBtn = document.getElementById("color-btn");
const colorShowArea = document.getElementById("color-showarea");
const colorPicker = document.getElementById("color-picker");
const colorSelector = document.getElementById("color-selector");
let colorArray = [];

// function schemeHtmlRender() {
//     let html = "";
//     for (let color of colorArray) {
//         html += `
//         <div style="width:20%" id=${color} onclick="copyToClipBoard()"><div style="background-color: ${color.hex.value}; height: 90%"></div>
//         <p class="color-value" style="font-size:1.3rem; text-align: center">${color.hex.value}</p></div>`;
//     }
//     colorShowArea.innerHTML = html;
//     console.debug(html);
// }

//Render HTML for scheme
function schemeHtmlRender() {
    let html = "";
    for (let color in colorArray) {
        html += `
        <div style="width:20%" id="${color}" onclick="copyToClipBoard(${color})"><div class="color-box" style="background-color: ${colorArray[color].hex.value}; height: 90%;"></div>
        <p style="font-size:1.3rem; text-align: center">${colorArray[color].hex.value}</p></div>`;
    }
    colorShowArea.innerHTML = html;
    console.log(html);
}

// Get color scheme values from API
function getColorScheme() {
    const colorValue = colorPicker.value.replace("#", "");
    const colorSelect = colorSelector.value.toLowerCase();
    fetch(
        `https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${colorSelect}&count=6 `
    )
        .then((res) => res.json())
        .then((data) => {
            colorArray = data.colors;
            schemeHtmlRender();
        });
}

// Copy HEX values to clipboard
function copyToClipBoard(colorId) {
    navigator.clipboard.writeText(colorArray[colorId].hex.value);
}

colorPicker.addEventListener("input", getColorScheme);
colorSelector.addEventListener("change", getColorScheme);
getColorScheme();
console.timeEnd();
