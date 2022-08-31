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
    createStations()
    // stock.style.left = Number(Math.floor(Number(stock.style.width.slice(0, -2)) / 2) - widthWindow - 2000)  + "px"
}
img.src = stationslist[0].img;