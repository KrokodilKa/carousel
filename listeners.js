let speed = 0
//Запоминаем последний тап на экране для высчитывания разницы
let valueTouch = 0

let timerId = setInterval(() => {
    //Невыполнять функцию нужно при маленькой скорости
    //Или при большой скорости, но ожидании подгрузки изображения
    if (Math.abs(speed) > 3 && !capture) {
        let newSpeed = Math.round(speed * 0.8)
        let newLeft = Number(stock.style.left.slice(0, -2)) + newSpeed * 5 + "px"
        //Проверяем, что не выходим за рамки
        console.log("newLeft")
        console.log(newLeft)
        console.log("newLeft")
        console.log(newLeft)
        if (leftStop > Math.abs(newLeft)) {
            console.log("моня")
                speed = newSpeed
                stock.style.left = newLeft + "px"
        } else {
            console.log("низя")
            //Если хотели подставить значение выше leftStop - ставим выше (0), иначе ниже
            stock.style.left = Math.sign(newLeft) > 0 ? leftStop + "px" : rightStop + "px"
        }
    }

}, 30);

//Скорость - затухающее значение, показывающее на сколько в конкретный кадр должно произойти движение
function makeSpeed (value) {
    if (!capture) {
        if (event.type === "wheel") {
            speed = speed + (Math.sign(event.wheelDelta) * 40)
        } else if (event.type === "mousemove") {
            speed = speed + event.movementX
        } else if (event.type === "touchmove") {
            speed = -1.5 * (valueTouch - event.changedTouches[0].screenX) + speed
            valueTouch = Math.round(event.changedTouches[0].screenX)
        }
    }
}

function canIShiftStock (value) {
    return Math.abs(Number(document.getElementById("stock").style.left.slice(0, -2)) + value) > getStopWidth()
}

carousel.addEventListener(
    "mousedown",
    (event) => {
        console.log(stock.style.left)
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


// btn.onclick = () => console.log(speed)
btn.onclick = () => console.log(document.getElementById("oa").offsetWidth)
btn.onclick = () => {stock.style.left = Number(stock.style.left.slice(0, -2)) + speed * 70 + "px"}

//Тач движения

window.addEventListener("touchstart", (event) => {
    valueTouch = event.changedTouches[0].screenX
    console.log("Сейчас мы на координате " + valueTouch)
}, false);
window.addEventListener("touchmove", makeSpeed, false);
window.addEventListener("touchend", (event) => {
    valueTouch = 0
}, false);

carousel.addEventListener("resizeend", getStopWidth)

function setArrow () {
    let elements = document.querySelectorAll('ul > li:last-child');
}