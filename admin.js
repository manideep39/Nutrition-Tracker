
var studentInfo = JSON.parse(localStorage.getItem("studentInfo") || [])
var activePage = 1

window.addEventListener("load", function(params) {
    var addBtn = document.querySelector("button")
    addBtn.addEventListener("click", addStudent)
    renderDOM()

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

    // for (var x in inputs) {
    //     inputs[x].value = ""
    // }
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
    var end = activePage * 10
    var start = end - 10
    var list = studentInfo.slice(start, end)
    dispProd(list)
}

function addPage(params) {

    if (studentInfo.length > 5) {
        console.log("more than 5")
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
    for (var i = 1; i <= Math.ceil(studentInfo.length / 10); i++) {
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
