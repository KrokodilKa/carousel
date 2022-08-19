
for (let i = 0; i < stationslist.length; i++) {
    const station = stationslist[i];
    let stationDOM = `
            <div class="stationContainer ${i === 0 ? "focus" : ""}">
                <div class="way" style="display: inline-flex ">
<!--                    <div class="wayLine"</div>-->
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

    // $station.on('click', (e) => {
    //     if ( bgIsAnimate() ) { //Запрещено переключать станции пока анимации не закончатся
    //         if ($(e.currentTarget).attr('data-index') != currentIndex) {
    //             const oldIndex = currentIndex
    //             currentIndex = $(e.currentTarget).attr('data-index')
    //             changeVisual(oldIndex)
    //         }
    //     }
    // });
}