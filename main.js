function clearEntries() {
    let entries = []
    localStorage.setItem('entries', JSON.stringify(entries))
}

function initialization() {
    if (localStorage.getItem('entries') === null) {
        clearEntries();
    }
}

function getEntries() {
    return JSON.parse(localStorage.getItem('entries'));
}

function addEntry(value, date) {
    let entry = {
        "x" : date,
        "y" : value
    }
    let entries = JSON.parse(localStorage.getItem('entries'));
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}

function clickExport(dom) {
    download(localStorage.getItem('entries'), "entries.json", "text/plain");
}

function clickImport() {
    var input = document.createElement('input');
    input.type = 'file';
    
    input.onchange = e => { 
        var file = e.target.files[0]; 

        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');

        reader.onload = readerEvent => {
            localStorage.setItem('entries', readerEvent.target.result);
            drawChart(getEntries());
        }
    }
    
    input.click();
}

function clickAdd() {
    addEntry(document.getElementById('value').value, new Date());
    drawChart(getEntries());
};

function clickClear() {
    clearEntries();
    drawChart(getEntries());
}

function drawChart(data) {
    var ctx = document.getElementById('myChart').getContext('2d');

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, 'rgba(5, 214, 217, 0.8)');
    gradientStroke.addColorStop(1, 'rgba(249, 7, 252, 0.8)');

    var gradientFill = ctx.createLinearGradient(800, 0, 100, 0);
    gradientFill.addColorStop(0, "rgba(5, 214, 217, 0.5)");
    gradientFill.addColorStop(1, "rgba(249, 7, 252, 0.5)");

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            datasets: [{
                label: 'Weight',
                borderColor: gradientStroke,
                backgroundColor: gradientFill,
                data: data
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(189, 195, 199, 0.5)"
                    },
                    type: 'time',
                    time: {
                        displayFormats: {
                        'millisecond': 'll',
                        'second': 'll',
                        'minute': 'll',
                        'hour': 'll',
                        'day': 'll',
                        'week': 'll',
                        'month': 'll',
                        'quarter': 'll',
                        'year': 'll',
                        },
                        unit: 'day'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(189, 195, 199, 0.8)"
                    },
                    ticks: {
                        min: 70
                    }
                }]
            }
        }
    });
}

initialization();

drawChart(getEntries());