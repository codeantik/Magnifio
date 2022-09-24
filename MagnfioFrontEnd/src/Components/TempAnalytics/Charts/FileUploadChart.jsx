import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function FileUploadChart(){

  const [charTData, setCharTData] = useState([]);
  let extractData = [];

  const fetchChartData = async () => {
    const response = await axios.get(`http://54.174.147.70:8080/api/v1/file/type`);
    console.log(response.data);
    setCharTData(response.data.data);
  }

  useEffect(() => {
    fetchChartData();
  }, []);
  
  const drawChart = () => {
    extractData = charTData.map(obj => {
      return [obj.file, obj.percent]
    })
    extractData.unshift(['Type', 'Percent']);
    let data = google.visualization.arrayToDataTable(extractData);

    let options = {
      legend: 'none',
      pieSliceText: 'label',
      colors:['#9ecbd7','#007090','#3c9295', '#00acb0', '#000ace', '#ddd0a8'],
      backgroundColor:'none',
      pieSliceTextStyle: {
        color: 'none',
      },
      
    };
      
    let chart = new google.visualization.PieChart(document.getElementById('file-upload-charts'));
    chart.draw(data, options);
  }
    
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);

  return <div id="file-upload-charts" style={{ height: "100%", width: "100%" }}></div>
}