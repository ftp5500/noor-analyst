var ctx = document.getElementById('myChart').getContext('2d');

document.getElementById('download').addEventListener('click', () => {
    downloadTableData();

});

async function downloadTableData() {
    try {

        const [activeTab] = await chrome.tabs.query({active: true, currentWindow: true});

        const [result] = await chrome.scripting.executeScript({
            target: {tabId: activeTab.id},
            function: getTableData
        });


        const tableData = result.result;
        if (tableData) {
            // Example analysis and visualization - adapt as needed.
            createChart(tableData);
            printPDF()
        } else {
            alert('Table not found!');
        }
    } catch (error) {
        console.error('Failed to download table data:', error);
    }
}


// The getTableData function remains the same as it will be stringified and executed in the tab's context.

// This function will be stringified and injected into the active tab.
function getTableData() {
    let table = document.querySelector('.GridClass');
    let tableData = [];
    if (table) {
        for (let row of table.rows) {
            let rowData = [];
            for (let cell of row.cells) {
                rowData.push(cell.innerText);
            }
            tableData.push(rowData);
        }
    }
    return tableData;
}

const getClassInfo = async () => {
    try {
        const info = await document.getElementById('ctl00_PlaceHolderMain_lblCourseNameWithPeriodName')
        await document.getElementById('ctl00_oHeader_tblLoggedUser');
        console.log(await info)
    } catch (error) {
        console.log(error)
    }

}// End of getClassInfo


async function createChart(tableData) {
    // Example: If your table has two columns, and you wish to represent them on a bar chart.

    // Extracting labels and data assuming first column is label and second is data.
    // const labels = tableData.map(row => row[1] !==  "اسم الطالب" ? row[1] : "");
    const labels = await tableData.map(row => row[1]);
    const data = await tableData.map(row => row[row.length - 1]);

    // Creating a chart.

    try {

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: getClassInfo(), // Customize this label as per the data.
                    data: data,
                    backgroundColor: colors,

                }]
            },
            options: {
                autoPadding: false,
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }

                }
            }
        })


    } catch (error) {
        console.log(error)
    }


}

const printPDF = () => {
    var opt = {
        margin: 1,
        filename: 'analyse.pdf',
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2},
        jsPDF: {unit: 'in', format: 'A4', orientation: 'portrait'}
    };

    html2pdf().set(opt).from(ctx).save()
}// End of print