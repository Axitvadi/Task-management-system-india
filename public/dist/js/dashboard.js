// -------------------------------------chart - js-  manually  ---------------------------------
async function chart() {
  try {
    const find = await axios.get('/detail/alluserdetailswithoutpagination');
    const detail = find.data.Result;
    const result = detail.map(x => {
      return x.developer;
    })
    let uniqueChars = [...new Set(result)];
    
    var task = [];
    uniqueChars.forEach(y => {
      const dataresult = detail.filter(x => {
        if (x.developer == y) {
          return x.developer
        }
      }).map(x => x.developer).length
      task.push(dataresult);
    })


    const data = {
      labels: uniqueChars,
      datasets: [{
        label: 'Project',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(64, 64, 64)',
        borderWidth: 2,
        data: task
      }]
    };
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Developer',
              color: '#911',
              font: {
                family: 'Times',
                size: 20,
                style: 'normal',
                lineHeight: 1.2,
              },
              padding: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }
            }
          },
          y: {
            beginAtZero: true,
            display: true,
            min: 0,
            max: 12,
            title: {
              display: true,
              text: 'Task',
              color: '#191',
              font: {
                family: 'Times',
                size: 20,
                style: 'normal',
                lineHeight: 1.2
              },
              padding: {
                top: 30,
                left: 0,
                right: 0,
                bottom: 0
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Task Management System',
            position: 'top',
            color: '#191',
            font: {
              size: 17
            },
            padding: {
              left: 5,
              top: 0
            }
          },
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 15
              }
            }
          }
        }
      }
    };
    const myChart = new Chart(
      document.getElementById('myChart').getContext('2d'),
      config
    );
  } catch (err) {
    console.log(err);
  }
}
chart()