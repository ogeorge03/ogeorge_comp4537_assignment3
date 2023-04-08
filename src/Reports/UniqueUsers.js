import React, { useEffect } from 'react'
import axios from 'axios'
import Chart from 'chart.js/auto'


function formatHour(hour) {
  if (hour < 10) {
    return `0${hour}`
  }
  return hour
}

function UniqueUsers({accessToken, refreshToken}) {

  const [uniqueUsers, setUniqueUsers] = React.useState([])

  useEffect(() => {
    try {
      document.getElementById('errorUniqueUsers').innerHTML = ''
      const result = async () => {
        const response = await axios.get('http://localhost:6001/api/v1/uniqueUsers', {
          headers: {
            'auth-token-access': accessToken,
            'auth-token-refresh': refreshToken
          }
        })
        setUniqueUsers(response.data)
      }
      result()
    } catch (err) {
      document.getElementById('errorUniqueUsers').innerHTML = err.response.data
    }

  }, [accessToken, refreshToken])

  const hours = [...Array(24).keys()]

  // Create table in format of:
  // Hour | Count
  // 00 | 10
  // 01 | 20

  // convert table format below to a line graph
  // https://www.chartjs.org/docs/latest/charts/line.html


  const date = new Date()


  const data = {
    labels: hours.map(hour => formatHour(hour)),
    datasets: [
      {
        label: 'Unique Users ' + date.toLocaleDateString(),
        data: hours.map(hour => uniqueUsers[hour] ? uniqueUsers[hour] : 0),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  // label y axis as unique users
  // label x axis as hours
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Unique Users'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Hours (24 hour format)'
        }
      }
    }
  };


 useEffect(() => {
    const myChart = new Chart(document.getElementById('uniqueChart'), {
      type: 'line',
      data: data,
      options: options
    });
    return () => {
      myChart.destroy()
    }
  }, [data, options])




  return (
    <div>
      <div>
        <canvas id="uniqueChart"></canvas>
      </div>
      <div id="errorUniqueUsers"></div>
    </div>
  )

}

export default UniqueUsers
