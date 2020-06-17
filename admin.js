
var studentInfo = JSON.parse(localStorage.getItem("studentInfo"))
var stock = JSON.parse(localStorage.getItem("stock"))
var activePage = 1

window.addEventListener("load", function(params) {
    var addBtn = document.querySelectorAll("button")
    addBtn[0].addEventListener("click", addStudent)
    addBtn[1].addEventListener("click", addPacket)
    renderDOM()
    showStock()
})

function addStudent(params) {
    event.preventDefault()
    var studentID = document.getElementById("studentID").value
    var schoolID = document.getElementById("schoolID").value
    var grade = document.getElementById("grade").value
    var height = document.getElementById("height").value
    var weight = document.getElementById("weight").value
    var age = document.getElementById("age").value
    var gender = document.getElementById("gender").value
    var bmi = calBMI(height, weight)
    studentInfo.push({studentID: studentID, schoolID: schoolID, grade: grade, height: height, weight: weight, age: age, gender: gender, bmi: bmi})
    localStorage.setItem("studentInfo", JSON.stringify(studentInfo))
    var inputs = document.querySelectorAll("#addStudent input")
    document.getElementById("addStudent").reset()
    renderDOM()
} 

function calBMI(height, weight) {
    var bmi = ( weight / ( height * height) ) * 10000

    if (bmi < 19) {
        return "Underweight"
    } else if (bmi >= 19 && bmi < 25) {
        return "Healthy weight"
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight"
    } else if (bmi >= 30) {
        return "Obese"
    } else {
        return "Undefined"
    }
}

function renderDOM(params) {
    addPage()
    chooseItems()
}

function chooseItems(params) {
    var end = activePage * 8
    var start = end - 8
    var list = studentInfo.slice(start, end)
    dispProd(list)
}

function addPage(params) {

    if (studentInfo.length > 8) {
        var nav = document.querySelector("nav")
        nav.removeAttribute("class")
        createPage()
    }
}
// {studentID: studentID, schoolID: schoolID, grade: grade, height: height, weight: weight, age: age, gender: gender, bmi: bmi})

function dispProd(list) {
    var tbody = document.querySelector("#probDis")
    tbody.innerHTML = ""

    for (var i = 0; i < list.length; i++) {
        var tr = document.createElement("tr")
        var studentID = document.createElement("td")
        var schoolID = document.createElement("td")
        var grade = document.createElement("td")
        var age = document.createElement("td")
        var gender = document.createElement("td")
        var bmi = document.createElement("td")
        studentID.textContent = list[i].studentID
        schoolID.textContent = list[i].schoolID
        grade.textContent = list[i].grade
        age.textContent = list[i].age
        gender.textContent = list[i].gender
        bmi.textContent = list[i].bmi
        tr.append(studentID, schoolID, grade, gender, age, bmi)
        tbody.append(tr)
    }

    var table = document.querySelector("table")
    table.append(tbody)
}

function createPage(params) {
    var ul = document.querySelector("nav > ul")
    ul.innerHTML = ""

    for (var i = 1; i <= Math.ceil(studentInfo.length / 8); i++) {
        var li = document.createElement("li")
        var btn = document.createElement("button")
        li.setAttribute("class", "page-item")
        btn.setAttribute("class", "page-link")
        btn.addEventListener("click", function(params) {
            activePage = Number(event.target.textContent)
            chooseItems()
        })
        btn.textContent = i
        li.append(btn)
        ul.append(li)
    }
}

function addPacket(params) {
    event.preventDefault()
    var packet = document.getElementById("packet").value
    var quantity = document.getElementById("quantity").value
    stock[packet] ? stock[packet] += Number(quantity) : stock[packet] = Number(quantity)
    localStorage.setItem("stock", JSON.stringify(stock))
    var inputs = document.querySelectorAll("#addPacket input")

    document.getElementById("addPacket").reset();
    showStock()
} 

function showStock() {
    var protein = document.getElementById("protein")
    var fat = document.getElementById("fat")
    var carbs = document.getElementById("carbs")
    protein.textContent = stock.Protein
    fat.textContent = stock.Fat
    carbs.textContent = stock.Carbohydrate
}