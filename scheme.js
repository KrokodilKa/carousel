const sizes = {
    "320-480": {
        lh: "",
        lw: "",
        count: 0,
        leftPadding: 0,
        mejdy: 0
    },
    "480-640": {

    },
    "640-980": {

    },
    "980-1200": {

    },
    "1200-1600": {

    },
    "1600+": {

    }
}

for (let i = 0; i < stationslist.length; i++) {
    const station = stationslist[i];
    let stationDOM = `
            <div class="stationContainer ${i === 0 ? "focus" : ""}">
                <div class="way">
                <div class="pointer" style="left: 62px"></div>
                </div>
                <h6>${station.name}</h6>
            </div>
    `
    console.log(scheme)
    scheme.insertAdjacentHTML("beforeend", stationDOM)
    let curr = scheme.children[i]
    console.log(curr)
    let a = curr.children[0]
    for (let it = 0; it < 25; it ++) {
        a.insertAdjacentHTML("beforeend", `<div style=\" width: 1px; height: 12px; background-color: white; margin: 0 2px \"></div>`)
    }
}

pointer = document.querySelectorAll(".focus .pointer")[0]
console.log(pointer)