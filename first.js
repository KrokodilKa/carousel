let img = new Image();
img.onload = function() {
    img.setAttribute(
        'style',
        `
                            background-image:url(${img.src});
                            height: 100%
                        `,
    );
    document.getElementById("img").src = img.src
    setStockWidth ()
    getStopWidth ()
    capture = false
}
img.src = stationslist[0].img;
btn.onclick = () => {
    stock.style.left = rightStop + "px"
}
