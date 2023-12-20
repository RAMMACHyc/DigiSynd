import React, { useEffect, useState } from 'react';
import Apartment from './ApartmentComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getApartments } from '../../redux/actions/apartmentActions';
import { CiCalendarDate } from "react-icons/ci";
import Calendar from '../../components/Calendar';





const Apartments = () => {

  const [selectedMonth, setSelectedMonth] = useState({ year: new Date().getFullYear(), month: 'Dec' });
  const apartments = useSelector((state) => state.apartments.apartments);
  const dispatch = useDispatch();  

  useEffect(() => {
    dispatch(getApartments( selectedMonth.year, selectedMonth.month));
  }, [dispatch, selectedMonth.year, selectedMonth.month]);
 
  return (
    <>
    
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="w-12 h-12 rounded-full  flex justify-center items-center shadow-md  gap-1">
          <CiCalendarDate className="w-6 h-6 text-black " />
        </button>
      </div>
      <Calendar  selectedMonth = {selectedMonth} onSelectMonth={setSelectedMonth} />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Number
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Etage
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Resident
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Tel
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Statut
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {apartments?.map((apartment, index) => (
                      <Apartment key={index} apartment={apartment} selectedMonth={selectedMonth}/>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Apartments;
