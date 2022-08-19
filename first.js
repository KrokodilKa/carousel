let current = 0

//Подгружает нужную картинку и ставит в нужный тег
function createImage (id, number) {
    capture = true
    var img = new Image();
    img.onload = function() {
        img.setAttribute(
            'style',
            `
                background-image:url(${img.src});
                height: 100%
            `,
        );
        img.onmousedown = e => e.preventDefault()
        img.ontouchstart = e => e.preventDefault()
        document.getElementById(id).src = img.src
        setStockWidth ()
        getStopWidth ()
        capture = false
    }
    img.src = stationslist[0].img;
}

createImage("current")

btn.onclick = () => {
    stock.style.left = rightStop + "px"
}
