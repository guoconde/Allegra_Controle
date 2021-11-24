const container = document.querySelector('.container')
const addTicket = document.querySelector('.add-ticket')
const tickets = []
let getLocalStorage


function openTicketForm() {
    container.classList.add('hide')
    addTicket.classList.remove('hide')
}

function addNewTicket() {
    const tbody = document.querySelector('.tbody')

    getNewTicketValue()

    tbody.innerHTML = ''

    for (let i = 0; i < getLocalStorage.length; i++) {
        tbody.innerHTML += `
        <tr>
            <td><ion-icon name="trash-outline"></ion-icon></td>
            <td><ion-icon name="checkmark-done-outline"></ion-icon></td>
            <td class="ticket">${getLocalStorage[i].newName}</td>
            <td class="value">${getLocalStorage[i].newValue}</td>
            <td class="due-date">${getLocalStorage[i].newDate}</td>
        </tr>
        `
    }

    returnMainPage()
}

function returnMainPage() {
    container.classList.remove('hide')
    addTicket.classList.add('hide')
}

function getNewTicketValue() {
    const newTickets = {
        newName: '',
        newValue: '',
        newDate: '',
    }

    newTickets.newName = document.querySelector('section input:nth-child(2)').value
    newTickets.newValue = parseFloat(document.querySelector('section input:nth-child(4)').value)
    newTickets.newDate = document.querySelector('section input:nth-child(6)').value

    tickets.push(newTickets)
    localStorage.clear()
    localStorage.setItem('boletos', JSON.stringify(tickets))
    getLocalStorage = localStorage.getItem('boletos')
}

function verifyStorage() {
    const storage = localStorage.getItem('boletos')

    if (storage !== null) {
        getLocalStorage = localStorage.getItem('boletos')
    }
}

verifyStorage()