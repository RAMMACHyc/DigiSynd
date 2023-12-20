import { FaBuildingCircleCheck } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import { deleteApartment, selectApartment } from '../../redux/actions/apartmentActions';
import { createPayment, deletePayment } from '../../redux/actions/paymentActions';
import { useDispatch } from 'react-redux';
import Facture from "../../components/FactureModal";


export default function ApartmentComponent({ apartment, selectedMonth }) {
  const dispatch = useDispatch();

  const deleteApartmentHandler = () => {
    dispatch(deleteApartment(apartment._id));
  };

  const selectedAparHandler = () => {
    dispatch(selectApartment(apartment));
    return { selectedAparHandler };
  };

  const PaymentPartHandler = () => {
    if (selectedMonth.year && selectedMonth.month && apartment.paymentStatus === 'Not Paid') {
      dispatch(createPayment({ apartmentId: apartment._id, month: selectedMonth.month, year: selectedMonth.year }));
    } else if (apartment.paymentStatus === 'Paid') {
      dispatch(deletePayment(apartment.paymentId));
    }
  };

 

  const buttonStyle = apartment.paymentStatus === 'Paid'
    ? 'bg-green-400 hover:bg-green-500'
    : 'bg-red-400 hover:bg-red-500';

  return (
    <>
      <tr key={apartment._id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{apartment.number}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{apartment.etage}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{apartment.resident}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{apartment.tel}</td>
        <td className="whitespace-nowrap ">
          <button onClick={PaymentPartHandler} className={`w-28 h-6 rounded-md  flex justify-center items-center hover:shadow-md  gap-1 ${buttonStyle}`}>
            <span><FaBuildingCircleCheck className="w-4 h-4 text-white " /></span>
            <span className={`text-white text-sm ${apartment.paymentStatus === "Paid" ? 'text-sm' : ''}`}>{apartment.paymentStatus === "Paid" ? "Paid" : 'Not Paid'}</span>
          </button>
        </td>
        <td className="whitespace-nowrap "><Facture apartment={apartment} /></td>
        <td className="whitespace-nowrap ">
          <button onClick={selectedAparHandler} className="w-10 h-8 rounded-md bg-blue-400 flex justify-center items-center hover:shadow-md hover:bg-blue-500 gap-1">
            <HiOutlinePencilSquare className="w-6 h-6 text-white " />
          </button>
        </td>
        <td className="whitespace-nowrap ">
          <button onClick={deleteApartmentHandler} className="w-10 h-8 rounded-md bg-red-400 flex justify-center items-center hover:shadow-md hover:bg-red-500 gap-1">
            <MdDeleteOutline className="w-6 h-6 text-white " />
          </button>
        </td>
      </tr>
    </>
  );
}