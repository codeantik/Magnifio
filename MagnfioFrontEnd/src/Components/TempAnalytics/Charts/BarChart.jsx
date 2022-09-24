import React from 'react';

import ReactApexChart from 'react-apexcharts';

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: [21, 22, 10, 28, 16, 21, 13, 30],
        },
      ],

      options: {
        chart: {
          height: 350,
          type: 'bar',
        },

        chart: {
          toolbar: {
            show: false,
          },
        },
        colors: ['#007090', '#008FFB', '#2E93fA', '#66DA26', '#546E7A'],
        plotOptions: {
          bar: {
            columnWidth: '60%',
            distributed: true,
          },
        },

        legend: {
          show: false,
        },

        dataLabels: {
          enabled: false,
        },

        yaxis: {
          show: false,
          labels: {
            show: false,
          },
        },

        /*yaxis: [{
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
      
        }]*/

        xaxis: {
          categories: [
            ['Team', '1'],
            ['Team', '2'],
            ['Team', '3 '],
            ['Team', '4'],
            ['Team', '5'],
            ['Team', '6 '],
            ['Team', 'magifio'],
          ],
          /*categories: [
            ['John', 'Doe'],
            ['Joe', 'Smith'],
            ['Jake', 'Williams'],
            'Amber',
            ['Peter', 'Brown'],
            ['Mary', 'Evans'],
            ['David', 'Wilson'],
            ['Lily', 'Roberts'], 
          ]*/ labels: {
            style: {
              //colors: ['red','black','green'],
              colors: ['#007090', '#008FFB', '#2E93fA', '#66DA26', '#546E7A'],

              fontSize: '12px',
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width={400}
          height={270}
        />
      </div>
    );
  }
}

export default BarChart;
