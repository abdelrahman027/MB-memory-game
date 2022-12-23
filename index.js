//array of matched 


// make start button click function
document.querySelector(".control-buttons span").onclick = () => {
    let userName = prompt("Enter your Name below");
    if (userName == null || userName == "")
    // if not write a name
    {
        document.querySelector(".name span").innerHTML = " UNNAMED PLAYER";
        //assign to span default
    } else
    {
        document.querySelector(".name span").innerHTML = userName;
        //assign entered name
    }
    document.querySelector(".control-buttons").remove()
    document.getElementById("welcome").play()
    setInterval(() => {
        setTimeout(() => {
            document.getElementById("back").play()

        }, 3000);
    }, 1000);


}


let duration = 1000;
let gameContainer = document.querySelector(".game-container");
let blocks = Array.from(gameContainer.children);
let orderRange = [...Array(blocks.length).keys()]
shuffle(orderRange)

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    //add click event
    block.addEventListener("click", function () {
        flipPic(block)
    })
})

//flip function
function flipPic(selectedBlock) {
    selectedBlock.classList.add("flip");
    let flippedPics = blocks.filter(flippedPic => flippedPic.classList.contains("flip"));
    if (flippedPics.length == 2)
    {
        preventCLick()
        matchSuccess(flippedPics[0], flippedPics[1])
    }
    let matchedPics = blocks.filter(matchedPic => matchedPic.classList.contains("matched"))
    if (matchedPics.length === 20)
    {
        document.getElementById("win").play()
        document.querySelector(".win-popup").style.display = "block"
    }
}

//prevent click func
function preventCLick() {
    gameContainer.classList.add("prevented");
    setTimeout(() => {
        gameContainer.classList.remove("prevented");

    }, duration);
}
//if match success

function matchSuccess(firstPic, secPic) {
    let triesSpan = document.querySelector(".tries span");

    if (firstPic.attributes['data-char'].value == secPic.attributes['data-char'].value)
    {
        firstPic.classList.remove("flip");
        secPic.classList.remove("flip");

        firstPic.classList.add("matched");
        secPic.classList.add("matched");
        document.getElementById("success").play()

    } else
    {
        triesSpan.innerHTML = parseInt(triesSpan.innerHTML) + 1;
        document.getElementById("fail").play()

        setTimeout(() => {
            firstPic.classList.remove("flip");
            secPic.classList.remove("flip");
        }, duration);

    }
}

function shuffle(array) {
    let current = array.length,
        temp,
        randomNumber;

    while (current > 0)
    {
        randomNumber = Math.floor(Math.random() * current);
        current--

        temp = array[current];
        array[current] = array[randomNumber];
        array[randomNumber] = temp;
    }
    return array
}

