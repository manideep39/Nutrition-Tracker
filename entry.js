
window.addEventListener("load", function(params) {

    var adminCred = [{"username":"admin","password":"admin"}]
    localStorage.setItem('adminCred', JSON.stringify(adminCred))
    var careTakerCred = [{"username":"user","password":"user"}]
    localStorage.setItem("careTakerCred", JSON.stringify(careTakerCred))

    var loginBtn = document.querySelector("button")
    loginBtn.addEventListener("click", login)
})

var adminCred = JSON.parse(localStorage.getItem("adminCred"))
var careTakerCred = JSON.parse(localStorage.getItem("careTakerCred"))
// {"username":"manideep39","password":"awesomedesign"},{"username":"deep39","password":"design"}

function login(params) {
    event.preventDefault()
    var inputs = document.querySelectorAll("input")
    var username = inputs[0].value
    var password = inputs[1].value
    
    for (var x in adminCred) {
        console.log(x)
        console.log(adminCred[x])
        if (adminCred[x].username == username && adminCred[x].password == password) {
            location.href = "https://manideep39.github.io/Nutrition-Tracker/admin.html"
            return
        } 
    }

    for (var y in careTakerCred) {

        if (careTakerCred[y].username == username && careTakerCred[y].password == password) {
            location.href = "https://manideep39.github.io/Nutrition-Tracker/careTaker.html"
        }
    }
}