let speed = 0
//Запоминаем последний тап на экране для высчитывания разницы
let valueTouch = 0

let timerId = setInterval(() => {
    //Невыполнять функцию нужно при маленькой скорости
    //Или при большой скорости, но ожидании подгрузки изображения
    if (Math.abs(speed) > 3 && !capture) {
        let newSpeed = Math.round(speed * 0.8)
        let newLeft = Number(stock.style.left.slice(0, -2)) + newSpeed * 5

        //Проверяем, что не выходим за рамки
        if (leftStop > Math.abs(newLeft)) {
                speed = newSpeed
                stock.style.left = newLeft + "px"
        } else {
            //Если хотели подставить значение выше leftStop - ставим выше (0), иначе ниже
            stock.style.left = Math.sign(newLeft) > 0 ? leftStop + "px" : rightStop + "px"
            //И начинаем перевызов картинки соседней
            setNewNumberOfStation(-1 * Math.sign(speed))
            // speed = 0
        }
        setPointer()
    }

}, 30);

//Скорость - затухающее значение, показывающее на сколько в конкретный кадр должно произойти движение
function makeSpeed (e) {
    //capture true заявляет, что идёт процесс смены картинки
    if (!capture) {
        if (event.type === "wheel") {
            e.preventDefault();
            e.stopPropagation();
            speed = speed + (Math.sign(event.wheelDelta) * 40)
        } else if (event.type === "mousemove") {
            speed = speed + event.movementX
        } else if (event.type === "touchmove") {
            speed = -1.5 * (valueTouch - event.changedTouches[0].screenX) + speed
            valueTouch = Math.round(event.changedTouches[0].screenX)
        }
    }
}

carousel.addEventListener(
    "mousedown",
    (event) => {
        speed = 0
        if (window.event.stopPropagation) window.event.stopPropagation();
        window.event.cancelBubble = true;
        event.cancelBubble = true;

        window.addEventListener(
            "mousemove",
            makeSpeed
        )
    }
)
carousel.addEventListener('wheel', makeSpeed)


window.addEventListener("mouseup", (event) => {
    window.removeEventListener("mousemove", makeSpeed)
})

//Тач движения

window.addEventListener("touchstart", (event) => {
    valueTouch = event.changedTouches[0].screenX
}, false);
window.addEventListener("touchmove", makeSpeed, false);
window.addEventListener("touchend", (event) => {
    valueTouch = 0
}, false);

window.addEventListener("resize", () => {
    getStopWidth()
    createStations()
})

function setPointer () {
    let all =  document.querySelectorAll(".way *")
    let result = []
    for (let i = 0; 70 > i; i++) {
        let left = all[i].getBoundingClientRect().left
        if (left >= 61.27 && left <= 138.73) {
            result.push(all[i])
        } else {
            all[i].style.height = sizes[sizeOfStation].lh + "px"
        }
    }

    //На сколько сдвигать left указателя при изменении left stock
    let kstock = Math.round(Number(stock.style.width.slice(0, -2)) / 50) //Значение в px одной части стока
    let k = Math.round(sizes[sizeOfStation].width / 50) //Значение в px одной части станции

    let left = 0

    if(Math.sign(Number(stock.style.left.slice(0, -2))) == 1) {
        left = Math.abs(Math.floor(Number(stock.style.width.slice(0, -2)) / 2) - Number(stock.style.left.slice(0, -2)))
    } else {
        left = Math.floor(Math.abs(Number(stock.style.width.slice(0, -2))) / 2) - Number(stock.style.left.slice(0, -2))
    }

    //Делим значение left на части и узнаём на сколько частей отодвинуты
    let leftPoints = Math.floor(left / kstock)

    document.getElementById(nextSt).children[1].style.opacity = (50 - leftPoints) * 0.02
    // document.getElementById(postSt).children[1].style.opacity = leftPoints * 0.02

    //Сдвигаем на столько частей схему
    schemeScroll.style.left = Number(-1 * leftPoints * k ) + "px"


    result.forEach(e => {
        let x = e.getBoundingClientRect().left
        let y = Number((getHeight(x) - 20) * -1) + "px"
        e.style.height = y
    })
}