const main = document.getElementById('main')
const addUser = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = [] 

// getRandomUser()
// getRandomUser()
// getRandomUser()

// Double Money
function doubleMoney() {
  data = data.map(person => {
    return {...person, money: person.money * 2}
})
  updateDOM()
}

// Sort users by Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money)

  updateDOM()
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter(person => person.money > 1000000)

  updateDOM()
}

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()

  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser)
   
}

//  Add new obj to data arr

function addData(obj) {
  data.push(obj)

  updateDOM()
}

// Update DOM

function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

  providedData.forEach(person => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`
    main.appendChild(element)
  })
}

// Format number as money
function formatMoney(money) {
  return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// Event Listeners
addUser.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)