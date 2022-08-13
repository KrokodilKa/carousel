// let a = 'https://downloader.disk.yandex.ru/preview/b1abc0ac13bc86d90b80e66af30c1731fc6c85507efe39b13f369c3e1196d8a2/62f708a2/NsmdZX0Vj8OKn1pnTUPwLhcUeFIn1eUfTidaKy23H8pEzdVupiPdHAZVXzc_Sp-1Z2N51n5jRAi0NIOU4GLK9w%3D%3D?uid=0&filename=FotoBKL_VERNAD.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1600x744'

let current = 0

const carousel = document.getElementById("carousel")
const stock = document.getElementById("stock")
const btn = document.getElementById("btn")

function createBlackBlind () {
    const node = document.createElement("div");
    node.className = "blackBlind";
    return (node)
}
function createImage () {
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
        draw(img)
    }
    img.src = "./a.webp";

}

function draw (img) {
    stock.append(createBlackBlind())
    stock.append(img)
    stock.append(createBlackBlind())
}
createImage()
carousel.style.cursor = "pointer"

//Вешаем слушатели мышедвижений

let speed = 0
let timerId

//Скорость - затухающее значение, показывающее на сколько в конкретный кадр должно произойти движение
function makeSpeed (value) {
    speed = speed + value

}

function calcMouseMove (event) {
    speed = event.movementX
    // console.log("speed")
    // console.log(Math.abs(speed))
    stock.style.left = Number(stock.style.left.slice(0, -2)) + event.movementX + "px"
}
function inertia () {
    console.log("inertia start")
    timerId = setInterval(() => {
        if (Math.abs(speed) > 3) {
            // console.log(speed)
            speed = Math.round(speed * 0.8)
            stock.style.left = Number(stock.style.left.slice(0, -2)) + speed * 10 + "px"
        } else {
            // console.log("speed stop")
            clearInterval(timerId)
            speed = 0
        }
    }, 30);


    // stock.style.left = Number(stock.style.left.slice(0, -2)) + event.movementX + "px"
}

carousel.addEventListener(
    "mousedown",
    (event) => {
        speed = 0
        window.addEventListener(
            "mousemove",
            calcMouseMove
        )
    }
)
carousel.addEventListener('wheel', (event) => {
    stock.style.left = Number(stock.style.left.slice(0, -2)) + (Math.sign(event.wheelDelta) * 40) + "px"
});

window.addEventListener("mouseup", (event) => {
    window.removeEventListener("mousemove", calcMouseMove)
    if (Math.abs(speed) > 0) {
        inertia()
    }
})
btn.onclick = () => console.log(speed)