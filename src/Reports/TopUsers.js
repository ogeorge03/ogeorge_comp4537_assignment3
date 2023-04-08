import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Chart from 'chart.js/auto'


function TopUsers({accessToken, refreshToken}) {

  const [topUsers, setTopUsers] = React.useState([])

  useEffect(() => {
    try {
      document.getElementById('errorTopUsers').innerHTML = ''
      const result = async () => {
        const res = await axios.get('http://localhost:6001/api/v1/recentErrors',{
          headers: {
            'auth-token-access': accessToken,
            'auth-token-refresh': refreshToken
        }})
        // Find which user has the most reports
        // and get all those reports
        // sort by date
        const topUsers = res.data.reduce((acc, error) => {
          const key = `${error.username}`
          if (acc[key]) {
            acc[key]++
          } else {
            acc[key] = 1
          }
          return acc
        }, {})
        const topUsersArray = Object.keys(topUsers).map(key => {
          const [username] = key.split(' ')
          return {username, count: topUsers[key]}
        }
        )
        topUsersArray.sort((a, b) => b.count - a.count)
        setTopUsers(topUsersArray)
      }
      result()
    } catch (err) {
      document.getElementById('errorTopUsers').innerHTML = err.response.data
    }
  }, [accessToken, refreshToken])

  const data = {
    labels: topUsers.map(user => user.username),
    datasets: [
      {
        label: 'Top Users',
        data: topUsers.map(user => user.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Count'
        },
        x: {
          title: {
            display: true,
            text: 'User'
          }
      }
    }
  }
}
}

  useEffect(() => {
    const myChart = new Chart(
      document.getElementById('myTopUsersChart'), {
        type: 'bar',
        data: data,
        options: config
      }
    )
    return () => myChart.destroy()
  }, [data, config])




  return (
    <div className='canvas'>
      <div>
        <canvas id='myTopUsersChart'></canvas>
      </div>
      <div id='errorTopUsers'></div>
    </div>

  )
}

export default TopUsers
