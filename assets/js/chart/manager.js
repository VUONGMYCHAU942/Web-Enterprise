
function pieChart() {
    // Chart labels
    const labels = ['January', 'February', 'March', 'April', 'May'];
    
    // Chart data
    const data = {
        labels: labels,
        datasets: [
            {
                data: [10, 20, 30, 23, 12],
                backgroundColor: [
                    primaryColor,
                    dangerColor,
                    successColor,
                    warningColor,
                    infoColor
                ],
                hoverOffset: 4
            }
        ]
    };

    // Chart config
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                }
            },
            responsive: true,
        },
        defaults:{
            global: {
                defaultFont: fontFamily
            }
        }
    };

    return config
}


function barChart() {
    // Chart labels
    const labels = ['January', 'February', 'March', 'April', 'May'];

    // Chart data
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Idea Submitted',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    primaryColor,
                    dangerColor,
                    successColor,
                    warningColor,
                    infoColor
                ],
            }
        ]
    };

    // Chart config
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: false,
                }
            },
            responsive: true,
        },
        defaults:{
            global: {
                defaultFont: fontFamily
            }
        }
    };
    return config
}


const ctxPie = document.getElementById('pie-chart-manager')
new Chart(ctxPie, pieChart());

const ctxBar  = document.getElementById('bar-chart-manager')
new Chart(ctxBar, barChart());

