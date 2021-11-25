const container = document.querySelector('.container')
const addTicket = document.querySelector('.add-ticket')
const body = document.querySelector('.body')
const tickets = []
let getLocalStorage = []

verifyStorage()

function openTicketForm() {
    container.classList.add('hide')
    addTicket.classList.remove('hide')
}

function addNewTicket() {

    getNewTicketValue()
    renderTIckets()
    returnMainPage()
    amountSum()
}

function renderTIckets() {
    body.innerHTML = ''

    for (let i = 0; i < getLocalStorage.length; i++) {
        body.innerHTML += `
        <div class="tickets">
            <ion-icon class="delete" onclick="deleteTicket('${getLocalStorage[i].newName}')" name="trash-outline"></ion-icon>
            <ion-icon class="paid" onclick="doneTicket('${getLocalStorage[i].newName}')" name="checkmark-done-outline"></ion-icon>
            <div class="ticket">${getLocalStorage[i].newName}</div>
            <div class="value">${getLocalStorage[i].newValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            <div class="due-date">${getLocalStorage[i].newDate}</div>
        </div>
        `
    }
}

renderTIckets()

function returnMainPage() {
    addTicket.classList.add('hide')
    container.classList.remove('hide')
}

function getNewTicketValue() {
    const newTickets = {
        newName: '',
        newValue: '',
        newDate: '',
        done: false,
    }

    newTickets.newName = document.querySelector('section input:nth-child(2)').value
    newTickets.newValue = parseFloat(document.querySelector('section input:nth-child(4)').value)
    newTickets.newDate = dayjs(document.querySelector('section input:nth-child(6)').value).format('DD-MM-YYYY')

    tickets.push(newTickets)
    localStorage.clear()
    localStorage.setItem('boletos', JSON.stringify(tickets))
    getLocalStorage = JSON.parse(localStorage.getItem('boletos'))
}

function verifyStorage() {
    const storage = localStorage.getItem('boletos')

    if (storage !== null) {
        getLocalStorage = JSON.parse(localStorage.getItem('boletos'))
        for (let i = 0; i < getLocalStorage.length; i++) {
            tickets.push(getLocalStorage[i])
        }
    }
}

function amountSum() {
    const showAmount = document.querySelector('.amount-sum')
    let sum = 0

    getLocalStorage.forEach(function (newValue, i) {
        getLocalStorage[i].done === false ? sum += getLocalStorage[i].newValue : false
    })

    showAmount.innerHTML = sum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

amountSum()

function deleteTicket(name) {
    getLocalStorage.forEach(function (newValue, i) {
        name === getLocalStorage[i].newName ? getLocalStorage.splice(i, 1) && tickets.splice(i, 1) : false
    })

    localStorage.clear()
    localStorage.setItem('boletos', JSON.stringify(tickets))
    getLocalStorage = JSON.parse(localStorage.getItem('boletos'))

    renderTIckets()
    amountSum()
}

function doneTicket(name) {
    getLocalStorage.forEach(function (newValue, i) {
        if (name === getLocalStorage[i].newName && getLocalStorage[i].done === false) {
            tickets[i].done = true
        } else if (name === getLocalStorage[i].newName && getLocalStorage[i].done !== false) {
            tickets[i].done = false
        }
    })

    localStorage.clear()
    localStorage.setItem('boletos', JSON.stringify(tickets))
    getLocalStorage = JSON.parse(localStorage.getItem('boletos'))
    amountSum()
}
