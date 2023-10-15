// function getTableData() {
//     let table = document.querySelector('.GridClass'); // select the first table
//     let tableData = [];
//
//     for (let row of table.rows) {
//         let rowData = [];
//         for (let cell of row.cells) {
//             rowData.push(cell.innerText);
//         }
//         tableData.push(rowData);
//     }
//     return tableData;
// }

// const getClassInfo = ()=>{
//     return document.querySelector('#ctl00_PlaceHolderMain_lblCourseNameWithPeriodName')
//   }// End of getClassInfo

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTableData") {
        sendResponse(getTableData());
    }

    // if(request.action === "getClassInfo"){
    //     sendResponse(getClassInfo())
    // } // End IF
});
