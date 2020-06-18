
var studentInfo = JSON.parse(localStorage.getItem("studentInfo"))
var activePage = 1
window.addEventListener("load", function(){
    var studentInfo = JSON.parse(localStorage.getItem("studentInfo"))
    var schoolSet = findSchools(studentInfo)
    createSchoolCard(schoolSet)
    // var schoolGrade = findGrades(schoolSet, studentInfo)
    // findStudents(schoolGrade)
})

// [{studentID: studentID, schoolID: schoolID, grade: grade, height: height, weight: weight, age: age, gender: gender, bmi: bmi}])

// find schools from array of objects, studentInfo
function findSchools(arr) {
    var schoolSet = new Set()
    for (var i = 0; i < arr.length; i++) {
        schoolSet.add(arr[i].schoolID)
    }
    return schoolSet
}

// find all grades in respective schools
function findGrades(schoolId, arr) {
    var gradeSet = new Set()
    for (var i = 0; i < arr.length; i++) {

        if (arr[i].schoolID == schoolId) {
            gradeSet.add(arr[i].grade)
        }
    }
    return gradeSet
}

function createGradeCard() {
    var grades = findGrades(event.currentTarget.id, studentInfo)
    grades.forEach(function(e) {
        var schoolCard = document.getElementById(event.currentTarget.id)
        var divRowOut = document.createElement("div")
        divRowOut.setAttribute("class", "row d-flex justify-content-center")
        var divCol = document.createElement("div")
        divCol.setAttribute("id", event.currentTarget.id + "g" + e)
        divCol.addEventListener("click", showStudentList)
        divCol.setAttribute("class", "col-9 offset-3 mt-3")
        var divRow = document.createElement("div")
        divRow.setAttribute("class", "row")
        var divColInner = document.createElement("div")
        divColInner.setAttribute("class", "col-sm-3 bg-success box card2-height d-flex align-items-center justify-content-center")
        var h1School = document.createElement("h1")
        h1School.setAttribute("class", "display-4 text-white font-weight-bold")
        h1School.textContent = e
        var divColInner2 = document.createElement("div")
        divColInner2.setAttribute("class", "col-sm-5 bg-white box card2-height shadow-lg justify-content-center align-items-center d-flex")
        var h1SchoolId = document.createElement("h1")
        h1SchoolId.textContent = "Grade"
        h1SchoolId.setAttribute("class", "font-weight-normal")
        divCol.append(divRow)
        divRow.append(divColInner, divColInner2)
        divColInner.append(h1School)
        divColInner2.append(h1SchoolId)
        divRowOut.append(divCol)
        schoolCard.append(divRowOut)
    })
}

function createSchoolCard(set) {
    set.forEach(function(e) {
        var schoolCard = document.getElementById("schoolCard")
        var divCol = document.createElement("div")
        divCol.setAttribute("id", e)
        divCol.addEventListener("click", createGradeCard)
        divCol.setAttribute("class", "col-sm-12 mb-5 btn")
        var divRow = document.createElement("div")
        divRow.setAttribute("class", "row ml-5")
        var divColInner = document.createElement("div")
        divColInner.setAttribute("class", "col-sm-6 bg-white box card-height shadow-lg align-items-center d-flex justify-content-center")
        var h1School = document.createElement("h1")
        h1School.setAttribute("class", "display-3 font")
        h1School.textContent = "School"
        var divColInner2 = document.createElement("div")
        divColInner2.setAttribute("class", "col-sm-4 bg-success box card-height d-flex align-items-center justify-content-center")
        var h1SchoolId = document.createElement("h1")
        h1SchoolId.textContent = e
        h1SchoolId.setAttribute("class", "display-4 text-white font-weight-bold")
        divCol.append(divRow)
        divRow.append(divColInner, divColInner2)
        divColInner.append(h1School)
        divColInner2.append(h1SchoolId)
        schoolCard.append(divCol)
    })
    var studentCont = document.getElementById("studentCont") 
    studentCont.setAttribute("class", "container mt-5 d-none")
}

function showStudentList(params) {
    var id = event.currentTarget.id
    var school = id.split("g")[0]
    var grade = id.split("g")[1]
    var students = findStudents(school, grade, studentInfo)
    var schoolCont = document.getElementById("schoolCont")
    schoolCont.setAttribute("class", "d-none")
    var studentCont = document.getElementById("studentCont") 
    studentCont.setAttribute("class", "container mt-5")
    renderDOM(students)

}

function findStudents(s, g, arr) {
    var students = []
    for (var i = 0; i < arr.length; i++) {

        if (arr[i].schoolID == s && arr[i].grade == g) {
            students.push(arr[i])
        }
    }
    return students
}

function renderDOM(arr) {
    addPage(arr)
    chooseItems(arr)
}

function chooseItems(arr) {
    var end = activePage * 8
    var start = end - 8
    var list = arr.slice(start, end)
    dispProd(list)
}

function addPage(arr) {

    if (arr.length > 8) {
        var nav = document.querySelector("nav")
        nav.removeAttribute("class")
        createPage(arr)
    }
}
// [{studentID: studentID, schoolID: schoolID, grade: grade, height: height, weight: weight, age: age, gender: gender, bmi: bmi}])

function dispProd(list) {
    var tbody = document.querySelector("#probDis")
    tbody.innerHTML = ""
    for (var i = 0; i < list.length; i++) {
        var tr = document.createElement("tr")
        tr.addEventListener("click", studentCard)
        tr.style.cursor = "pointer"
        var studentID = document.createElement("td")
        var schoolID = document.createElement("td")
        var grade = document.createElement("td")
        // var age = document.createElement("td")
        var gender = document.createElement("td")
        var bmi = document.createElement("td")
        studentID.textContent = list[i].studentID
        schoolID.textContent = list[i].schoolID
        grade.textContent = list[i].grade
        // age.textContent = list[i].age
        gender.textContent = list[i].gender
        bmi.textContent = list[i].bmi
        tr.append(schoolID, studentID, grade, gender, bmi)
        tbody.append(tr)

    }

    var table = document.querySelector("table")
    table.append(tbody)
}

function createPage(arr) {
    var ul = document.querySelector("nav > ul")
    ul.innerHTML = ""

    for (var i = 1; i <= Math.ceil(arr.length / 8); i++) {
        var li = document.createElement("li")
        var btn = document.createElement("button")
        li.setAttribute("class", "page-item")
        btn.setAttribute("class", "page-link text-success font-weight-bold")

        btn.addEventListener("click", function(params) {
            activePage = Number(event.target.textContent)
            chooseItems(arr)
        })
        btn.textContent = i
        li.append(btn)
        ul.append(li)
    }
}


function studentCard() {
    console.log(event.currentTarget.lastChild)


}