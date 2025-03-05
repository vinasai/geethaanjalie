import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import useReactApexChart from '../../hook/useReactApexChart';
import ReactApexChart from 'react-apexcharts';
import dahboardImage from "../../assets/bg1.png";

const RevenueStatisticsOne = () => {
  let { upDownBarChartSeries, upDownBarChartOptions } = useReactApexChart();

  return (
    <div 
      className="col-xxl-12 position-relative"
      style={{
        backgroundImage: `url(${dahboardImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        backgroundAttachment: 'fixed', // Ensures the background stays fixed while scrolling
        minHeight: '75vh', // Full viewport height
        width: '100%' // Ensures the div takes the full width
      }}
    >
      <div 
        className="d-flex justify-content-start h-100"
        style={{
          color: 'white',
          fontSize: '2.5rem', // Increased font size
          fontWeight: 'bold',
          textAlign: 'left', // Align text to the left
          textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)', // Optional: Adds shadow for better readability
          paddingLeft: '3rem', // Adds some space from the left edge
          paddingTop:'5rem'
        }}
      >
        <div>
          Feel the Rhythm,<br /> Live the Beat!  Find Your Rhythm, <br />Find Your Soul!
        </div>
      </div>
    </div>
  );
};

export default RevenueStatisticsOne;
