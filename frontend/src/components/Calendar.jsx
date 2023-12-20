import React, { useState, useRef } from 'react';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";


const Calendar = ({ selectedMonth,onSelectMonth }) => {
  const currentYear = new Date().getFullYear();
  const currentMonths = new Date().getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const calendarRef = useRef(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = months[currentMonths];
  const generateCalendar = (year) => {
    return months.map((month, index) => (
      <div
        key={index}
        className={` ${selectedMonth.month === month ? "bg-gradient-to-r from-purple-200 via-purple-300 to-purple-300" : "hover:bg-purple-100"} flex group  hover:shadow-lg hover-light-shadow rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16 relative`}
        onClick={() => onSelectMonth({ year: selectedYear, month })}
        
      >
          {selectedMonth.month === month && (
          <span className="flex h-3 w-3 absolute -top-1 -right-1">
              <span className="animate-ping absolute group-hover:opacity-75 opacity-0 inline-flex h-full w-full rounded-full bg-purple-400 "></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          )}
     
        <div className='flex items-center px-4 py-4'>
          <div className='text-center'>
            <p className='text-gray-900 group-hover:text-purple-900 text-sm transition-all duration-300'>{month}</p>
            <div className='w-12 h-6 rounded-full bg-red-50'>
              <p className='text-gray-900 group-hover:text-purple-900 mt-3 group-hover:font-bold transition-all duration-300'>{year}</p>
            </div>
          </div> 
        </div>
      </div>
    ));
  };
  

  const handleYearChange = (direction) => {
    setSelectedYear((prevYear) => prevYear + direction);
    calendarRef.current.scrollTo({
      left: calendarRef.current.scrollLeft + direction * 200, 
      behavior: 'smooth',
    });
  };

  return (
   
    <div>
      <div className='flex justify-center rounded-lg mx-auto py-4 px-2 md:mx-12'>
        <button className='p-4 rounded-full bg-white opacity-[0.6]  hover:bg-gray-100 mr-2' onClick={() => handleYearChange(-1)}><GrPrevious /></button>
        <div
          className='flex bg-white shadow-md justify-start md:justify-center rounded-lg '
          ref={calendarRef}
        >
          {generateCalendar(selectedYear)}
        </div>
        <button className='p-4 rounded-full bg-white opacity-[0.6] hover:bg-gray-100 ml-2' onClick={() => handleYearChange(1)}><GrNext /></button>
      </div>
    </div>
   
  );
};

export default Calendar;
