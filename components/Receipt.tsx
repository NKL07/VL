import React, { useEffect } from 'react';
import { Booking } from '../types';
import { ArrowLeft, Printer, CheckCircle, Download } from 'lucide-react';

interface ReceiptProps {
  booking: Booking;
  onBack: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ booking, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up">
      {/* Header handled by Global Navigation in App.tsx */}

      {/* Local Print Actions */}
      <div className="container mx-auto px-6 pt-6 flex justify-end print:hidden">
         <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-vl-surface border border-vl-subtle rounded-lg text-white hover:bg-vl-subtle transition-colors text-sm">
            <Printer size={16} />
            Print Receipt
         </button>
      </div>

      <div className="container mx-auto px-6 py-6 pb-12 flex justify-center">
        <div className="bg-white text-black w-full max-w-2xl p-8 md:p-12 rounded-lg shadow-2xl printable-content">
          
          {/* Receipt Header */}
          <div className="flex justify-between items-start border-b-2 border-black pb-8 mb-8">
            <div>
              <div className="text-3xl font-bold font-mono tracking-tighter mb-2">VL RENT A CAR</div>
              <p className="text-sm text-gray-600">
                No.4/5/B/1, Mulanawaththa<br/>
                Makdandura, Matara<br/>
                +94 76 612 6754
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle size={14} /> Paid
              </div>
              <p className="text-sm font-bold text-gray-500">RECEIPT #</p>
              <p className="text-xl font-mono">{booking.id}</p>
            </div>
          </div>

          {/* Receipt Details */}
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b pb-2">Booking Details</h2>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-gray-600">Vehicle</div>
                <div className="font-bold text-right">{booking.carName}</div>
                
                <div className="text-gray-600">Dates</div>
                <div className="font-bold text-right">{booking.dates}</div>

                <div className="text-gray-600">Pickup Location</div>
                <div className="font-bold text-right">{booking.location}</div>

                <div className="text-gray-600">Mileage Plan</div>
                <div className="font-bold text-right">{booking.mileageLimit}</div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b pb-2">Payment Summary</h2>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle Rental Charge</span>
                    <span className="font-bold">{booking.price}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-bold">LKR 0.00</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-gray-600">Insurance (Inclusive)</span>
                    <span className="font-bold">LKR 0.00</span>
                </div>
            </div>
            <div className="border-t-2 border-black mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">TOTAL PAID</span>
                <span className="font-bold text-2xl">{booking.price}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 pt-8 border-t border-gray-200">
            <p className="mb-2">Thank you for choosing VL Rent a Car.</p>
            <p>For support, contact support@vlrentacar.com</p>
          </div>

        </div>
      </div>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-content, .printable-content * {
            visibility: visible;
          }
          .printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            box-shadow: none;
            border: none;
          }
          .bg-vl-dark {
            background-color: white !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Receipt;