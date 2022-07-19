let closeBtn = document.getElementById('close')
let newCardBlank = document.getElementById('set-card')
let addNewCard = document.getElementById('add')
let currentCardsNumber = document.getElementById('current')
let nextBtn = document.getElementById('next')
let prevBtn = document.getElementById('prev')



let submitAdd = document.getElementById('submit')
let questionInput = document.getElementById('question')
let answerInput = document.getElementById('answer')

let cardsContainer = document.getElementById('cards-container') 
let cardArray = document.querySelectorAll('.card')
let clearBtn = document.getElementById('clear')

let currentCardNumber = 0

const cardsEl = []

function updateCurrentCounter () {
    currentCardsNumber.innerText = `${currentCardNumber + 1}/${cardsEl.length}`
}

const cardsData = getCardsData()


function createCards () {
    cardsData.forEach((data, index) => createCard(data, index))
}

function createCard (data, index) {
    const card = document.createElement('div')
    card.classList.add('card')

    if (index === 0 ) {
        card.classList.add('active')
    }

    card.innerHTML = 
    `<i class="fa-solid fa-repeat"> Flip</i>
            <div class="card-inner">
                <div class="card-inner-front">${data.question}</div>
                <div class="card-inner-back">${data.answer}</div>
            </div>`

    cardsEl.push(card)

    card.addEventListener('click', () => {
        card.classList.toggle('show-answer')
    })

    cardsContainer.appendChild(card)

    updateCurrentCounter()
}

function setCardsData (cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
    window.location.reload()
}

function getCardsData () {
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards
}

createCards()

nextBtn.addEventListener('click', () => {
    cardsEl[currentCardNumber].className = 'card left'

    currentCardNumber = currentCardNumber + 1

    if (cardsEl.length - 1 < currentCardNumber) {
        currentCardNumber = cardsEl.length - 1
    }   

    cardsEl[currentCardNumber].className = 'card active'

    updateCurrentCounter()
}) 

prevBtn.addEventListener('click', () => {
    cardsEl[currentCardNumber].className = 'card right'

    currentCardNumber = currentCardNumber - 1

    if (0 > currentCardNumber) {
        currentCardNumber = 0
    }   

    cardsEl[currentCardNumber].className = 'card active'

    updateCurrentCounter()
})

addNewCard.addEventListener('click', () => {

    newCardBlank.classList.remove('closed')
})

closeBtn.addEventListener('click', () => {newCardBlank.classList.add('closed')})

submitAdd.addEventListener('click', () => {
    const question = questionInput.value
    const answer = answerInput.value

    if (question.trim() && answer.trim()) {
        newCardBlank.classList.add('closed')

        const newCard = {question , answer}
        createCard(newCard)

        questionInput.value = ''
        answerInput.value = ''

        cardsData.push(newCard);
        setCardsData(cardsData);
    }


})

clearBtn.addEventListener('click', () => {
    localStorage.clear()
    cardsContainer.innerHTML = ``
    window.location.reload()
})