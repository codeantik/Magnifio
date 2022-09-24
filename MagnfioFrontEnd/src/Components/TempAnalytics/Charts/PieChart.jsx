import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PieChart(){

  const [charTData, setCharTData] = useState([]);
  let extractData = [];

  const fetchChartData = async () => {
    const response = await axios.get(`http://54.174.147.70:8080/api/v1/file/views`);
    console.log(response.data);
    setCharTData(response.data.data);
  }

  useEffect(() => {
    fetchChartData();
  }, []);

  const drawChart = () => {
    extractData = charTData.map(obj => {
      return [obj.type, obj.views];
    });
    extractData.unshift(['Type', 'Views']);
    let data = google.visualization.arrayToDataTable(extractData);

    let options = {
      legend:'none',
      colors:['#00caca','#1ca2f8','#4a7d99', '#00acb0', '#000ace', '#ddd0a8'],
      backgroundColor:'none',
      pieSliceTextStyle: {
        color: 'none',
      },
    };

    let chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  return <div id="piechart" style={{width:'100%',height:'100%'}}></div>
}