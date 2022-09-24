import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TopicSearchChart() {

  const [charTData, setCharTData] = useState([]);
  let extractData = [];

  const fetchChartData = async () => {
    const response = await axios.get(`http://54.174.147.70:8080/api/v1/file/freq-searched`);
    console.log(response.data);
    setCharTData(response.data.data);
  }

  useEffect(() => {
    fetchChartData();
  }, []);
  
  const drawChart = () => {

    extractData = charTData.map(obj => {
      return [obj.topic, obj.searched];
    });

    extractData.unshift(['Topic', 'Searched']);

    let data = google.visualization.arrayToDataTable(extractData);

    let options = {
      legend: {alignment:'center',position:'bottom'},
      pieHole: 0.85,
      backgroundColor: 'none',
      colors: ['#9ecbd7','#1ca2f8','#4a7d99','#3c9295', '#00acb0', '#000ace', '#ddd0a8'],
      pieSliceTextStyle: {
        color: 'none',
      },
    };

    let chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  return <div id="donutchart" style={{ width: '100%', height: '90%' }}></div>
}
