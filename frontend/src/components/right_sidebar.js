import React from "react";
import ReactApexChart from "react-apexcharts";
import "../include/css/main.css"; 

const RightSidebar = () => {
    const chartOptions = {
        chart: {
            type: 'pie',
        },
        labels: ['Published', 'Under Review', 'Rejected', 'Draft'],
        colors: ['#4CAF50', '#2196F3', '#F44336', '#FFC107'],
        legend: {
            position: 'bottom'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const series = [45, 25, 15, 15]; // Example data

    return (
        <div className="p-3 text-center">
        <div className="card mb-3">
        <div className="card-header">
          Search Article
        </div>
        <div className="card-body">
          <input type="text" className="form-control" placeholder="Search Article" />
          <button className="btn btn-primary mt-2">Search</button>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Most viewed articles
        </div>
        <div className="card-body fix">
        <a href="/" target="_blank"> Indexed In </a> <hr/>
              <a href="/" target="_blank"> Advertisement </a> <hr/>
              <a href="/" target="_blank"> Conference </a> 
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Most downloaded articles
        </div>
        <div className="card-body fix">
        <a href="/" target="_blank"> Indexed In </a> <hr/>
              <a href="/" target="_blank"> Advertisement </a> <hr/>
              <a href="/" target="_blank"> Conference </a> 
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Articles Statistics
        </div>
        <div className="card-body graph">
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="pie"
            height={235}
          />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Publication Statistics
        </div>
        <div className="card-body graph">
        <ReactApexChart
            options={chartOptions}
            series={series}
            type="pie"
            height={235}
          />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Manuscript Statistics
        </div>
        <div className="card-body graph">
        <ReactApexChart
            options={chartOptions}
            series={series}
            type="pie"
            height={235}
          />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-header">
        Total Published Articles
        </div>
        <div className="card-body">
          10
        </div>
      </div>
      </div>
    );
  };
  export default RightSidebar;
