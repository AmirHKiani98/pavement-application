import * as methodHandler from "./methodsHandler.js";

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
    // const dataId = event.target.dataset.id
    // const allDropDowns = document.getElementsByClassName("drop_down_list");
    // for (let index = 0; index < allDropDowns.length; index++) {
    //     var element = allDropDowns[index];
    //     const dropDownDataId = element.dataset.id;
    //     if (dropDownDataId == dataId) break;
    // }
    // var height = element.style.height
    // switch (height) {
    //     case "0px":
    //     case "":
    //         element.style.height = "80px";
    //         break;
    //     case "80px":
    //         element.style.height = "0px";
    //     default:
    //         // console.log("hi");
    //         break;
    // }
    var element = event.target.nextSibling.nextSibling;
    if (element !== null) {
        var height = element.style.height
        switch (height) {
            case "0px":
            case "":
                element.style.height = "100%";
                break;
            case "100%":
                element.style.height = "0px";
            default:
                // console.log("hi");
                break;
        }
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
        case "Maximum Interior Curling":
            methodHandler.maxInteriorCurling();
            break;
        case "Maximum Edge Curling":
            methodHandler.maxEdgeCurling();
            break;
        case "Westergard corner stress":
            methodHandler.westergardCornerStress();
            break;
        case "Ioannides corner stress":
            methodHandler.ioannidesCornerStress();
            break;
        case "Westergard corner deflection":
            methodHandler.westergardCornerDeflection();
            break;
        case "Ioannides corner deflection":
            methodHandler.ioannidesCornerDeflection();
            break;
        case "Westergard interior stress":
            methodHandler.westergardInteriorStress();
            break;
        case "Westergard interior deflection":
            methodHandler.westergardInteriorDeflection();
            break;
        case "Westergard edge stress - circle":
            methodHandler.westergardEdgeStressCircle();
            break;
        case "Westergard edge deflection - circle":
            methodHandler.westergardEdgeDeflectionCircle();
            break;
        case "Westergard edge deflection - semicircle":
            methodHandler.westergardEdgeDeflectionSemiCircle();
            break;
        case "Westergard edge stress - semicircle":
            methodHandler.westergardEdgeStressSemiCircle();
            break;

        default:
            break;
    }
}