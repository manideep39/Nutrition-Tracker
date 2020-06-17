
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
function findGrades(set, arr) {
    var schoolGrade = {}
    set.forEach(function(e) {
        var tempSet = new Set()

        for (var i = 0; i < arr.length; i++) {

            if (arr[i].schoolID == e) {
                tempSet.add(arr[i].grade)
            }
        }
        schoolGrade[e] = tempSet
    })
    return schoolGrade
}

function createSchoolCard(set) {
    set.forEach(function(e) {
        var schoolCard = document.getElementById("schoolCard")
        var divCol = document.createElement("div")
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

}
