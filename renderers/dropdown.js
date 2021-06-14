var allRightList = document.getElementsByClassName("dropdown");
for (let index = 0; index < allRightList.length; index++) {
    const element = allRightList[index];
    element.addEventListener("click", dropDown)
        // element.addEventListener("mouseout", dropUp)
}
var uls = document.getElementsByClassName("drop_down_list");
for (let i = 0; i < uls.length; i++) {
    var lists = uls[i].getElementsByTagName("li");
    for (let j = 0; j < lists.length; j++) {
        lists[j].addEventListener("click", checkInput);
    }
}
// 

function dropDown(event) {
    const dataId = event.target.dataset.id
    const allDropDowns = document.getElementsByClassName("drop_down_list");
    for (let index = 0; index < allDropDowns.length; index++) {
        var element = allDropDowns[index];
        const dropDownDataId = element.dataset.id;
        if (dropDownDataId == dataId) break;
    }
    var height = element.style.height
    switch (height) {
        case "0px":
        case "":
            element.style.height = "80px";
            break;
        case "80px":
            element.style.height = "0px";
        default:
            // console.log("hi");
            break;
    }
}

function dropUp(event) {
    const dataId = event.target.dataset.id
    const allDropDowns = document.getElementsByClassName("drop_down_list");
    for (let index = 0; index < allDropDowns.length; index++) {
        var element = allDropDowns[index];
        const dropDownDataId = element.dataset.id;
        if (dropDownDataId == dataId) break;
    }
    element.style.height = "0px"
}

function checkInput(event) {
    var innerListInput = event.target.outerText;
    switch (innerListInput) {
        case "Maximum Curling":

            break;

        default:
            break;
    }
}