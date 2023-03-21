const reset = document.querySelector('.reset')
const cards = document.querySelectorAll('.card')
const highScoreCount = document.querySelector('.highScore')
const scoreCount = document.querySelector('.scoreCount')
const win = document.querySelector('.win')
const victory = document.querySelector('#victory')

let matched = 0
let cardOne, cardTwo
let disableDeck = false
let score = 0
let highScore = JSON.parse(localStorage.getItem('highscore')) || 50

scoreCount.textContent = score
highScoreCount.textContent = highScore

function flipCard({target: clickedCard})
{
    if(cardOne !== clickedCard && !disableDeck)
    {
        clickedCard.classList.add('flip')
        if(!cardOne)
        {
            cardOne = clickedCard
            return
        }
        cardTwo = clickedCard
        disableDeck = true
        let cardOneImg = cardOne.querySelector('.back-view img').src
        cardTwoImg = cardTwo.querySelector('.back-view img').src
        matchCards(cardOneImg, cardTwoImg)
    }
}

function matchCards(img1, img2)
{
    if(img1 === img2)
    {
        matched++
        if(matched == 8)
        {
            winGame()
            return
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ''
        disableDeck = false
        return
    }
    setTimeout(() =>
    {
        cardOne.classList.add('shake')
        cardTwo.classList.add('shake')
    }, 400)

    setTimeout(() =>
    {
        cardOne.classList.remove('shake','flip')
        cardTwo.classList.remove('shake','flip')
        cardOne = cardTwo = ''
        disableDeck = false
    }, 1000)

    score++
    scoreCount.textContent = score
}
function resetGame()
{
    victory.classList.add('hidden')
    victory.classList.remove('winGif')
    score = 0
    scoreCount.textContent = score
    matched = 0
    disableDeck = false
    cardOne = cardTwo = ''
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
    arr.sort(() => Math.random() > 0.5 ? 1 : -1)
    cards.forEach((card, i) =>
    {
        card.classList.remove('flip')
        let imgTag = card.querySelector('.back-view img')
        imgTag.src = `images/img${arr[i]}.jpg`
        card.addEventListener('click', flipCard)
    })
}

reset.addEventListener('click', function(){
    resetGame()
})

resetGame()

function instantWin() {
    matched = 8
    cards.forEach((card) =>
    {
        card.classList.add('flip')
        card.removeEventListener('click', flipCard)
    })
    winGame()
}

reset.addEventListener('click', function(){
    resetGame()
})


win.addEventListener('click', function(){
    score = 0
    scoreCount.textContent = score
    instantWin()
})

function winGame()
{
    victory.classList.add('winGif')
    victory.classList.remove('hidden')

    if (score < highScore)
    {
        localStorage.setItem('highscore', JSON.stringify(score))
        highScore = score
        highScoreCount.textContent = highScore
    }
}
