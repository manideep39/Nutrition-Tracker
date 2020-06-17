
var adminCred = JSON.parse(localStorage.getItem("adminCred"))
var careTakerCred = JSON.parse(localStorage.getItem("careTakerCred"))
// {"username":"manideep39","password":"awesomedesign"},{"username":"deep39","password":"design"}

window.addEventListener("load", function(params) {
    var loginBtn = document.querySelector("button")
    loginBtn.addEventListener("click", login)
})

function login(params) {
    event.preventDefault()
    var inputs = document.querySelectorAll("input")
    var username = inputs[0].value
    var password = inputs[1].value
    
    for (var x in adminCred) {
        console.log(adminCred[x])
        if (adminCred[x].username == username && adminCred[x].password == password) {
            location = "admin.html"
            return
        } 
    }

    for (var y in careTakerCred) {

        if (careTakerCred[y].username == username && careTakerCred[y].password == password) {
            location = "careTaker.html"
        }
    }
}