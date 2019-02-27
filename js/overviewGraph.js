render = () =>{
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["ma", "di", "wo", "do", "vr"],
            datasets: [{
                label: 'Punten',
                data: [20, 30, 60, 80, 10, 20],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        suggestedMax: 100,
                    }
                }]
            },
            onClick: (event, elements) => onBarClick(elements)
        },
    })
}

test = () =>{
    console.log($('#categoryInput')[0].options[$('#categoryInput')[0].selectedIndex].value)
}

focusGraph = () =>{
    console.log('test')
    $('#chartInfo')[0].scrollIntoView({block:'end', behavior:'smooth'})
}

onBarClick = (elements) => {
    console.log(elements)
    if(elements.length > 0){
        $('#table')[0].scrollIntoView({block:'start', behavior:'smooth'})
    }
}