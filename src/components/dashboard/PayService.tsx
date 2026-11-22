import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IBooking } from "@/type/booking";

interface IBookingProps {
  appointment:IBooking
}

const AppointmentDetails = ({ appointment }:IBookingProps) => {


  const handlePayment = () => {
    console.log("Proceed to payment", appointment);
    // Navigate to payment page
    // Example: navigate("/payment");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline">View Details</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-3xl p-0 gap-0">
        {/* Header */}
        <AlertDialogHeader className="px-5 pt-5 pb-4">
          <AlertDialogTitle className="text-lg font-semibold text-slate-900">
            Appointment Information
          </AlertDialogTitle>
        </AlertDialogHeader>

        {/* Information Table */}
        <div className="px-5">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3 font-semibold w-1/2">Field</th>
                <th className="py-3 font-semibold">Information</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">Appointment Date</td>
                <td className="py-3">{appointment.date}</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Appointment Time</td>
                <td className="py-3">{appointment.time}</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Appointment Status</td>
                <td className="py-3">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 rounded-full">
                    {appointment.status}
                  </Badge>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Payment Status</td>
                <td className="py-3">
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0 rounded-full">
                    {appointment.paymentStatus}
                  </Badge>
                </td>
              </tr>

              {/* <tr className="border-b">
                <td className="py-3">Request Date</td>
                <td className="py-3">{appointment.requestDate}</td>
              </tr> */}

              <tr className="border-b">
                <td className="py-3">Service Price</td>
                <td className="py-3 font-medium">
                  ৳{appointment.price}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <AlertDialogFooter className="flex-row justify-between items-center gap-3 px-5 py-5 mt-0">
          <AlertDialogCancel className="mt-0 rounded-full px-5">
            Close
          </AlertDialogCancel>

          {appointment.paymentStatus === "unpaid" && (
            <AlertDialogAction
              onClick={handlePayment}
              className="rounded-full bg-green-600 hover:bg-green-700 text-white px-6"
            >
              Pay Now
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppointmentDetails;
