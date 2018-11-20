const url = "https://api.coindesk.com/v1/bpi/currentprice.json"
const priceTag = document.querySelector("h1")
const spanTag = document.querySelector("span")
let currency = "USD"

// let's make a function to grab data from coindesk
const checkPrice = function () {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            priceTag.innerHTML = data.bpi[currency].rate_float.toFixed(1)
        })
}

// run on page load
checkPrice()

// loop over every nav link and add a click event

const navLinks = document.querySelectorAll("nav a")
navLinks.forEach(link => {
    link.addEventListener("click", function() {
        currency = this.getAttribute("data-currency")
        checkPrice()

        // remove all previous selected states
        navLinks.forEach(link => link.classList.remove("selected"))

        // then add the selected class on the clicked link
        this.classList.add("selected")

        // update the span tag accordingly
        spanTag.innerHTML = currency

    })
})

// check the price every 60 seconds
setInterval(function() {
    checkPrice()
}, 60000)
