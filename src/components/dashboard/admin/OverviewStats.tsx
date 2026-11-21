import React from 'react';

const OverviewStats = async() => {

  const res = await fetch("http://localhost:8000/users/counts");
  const user = await res.json();
  const totalUser = user.count;
  

  const response = await fetch("http://localhost:8000/services/count");
  const activeservice = await response.json();
  const totalService = activeservice.activecount;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Total Customer</p>
        <h2 className="mt-2 text-3xl font-bold">{totalUser}</h2>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Active Services</p>
        <h2 className="mt-2 text-3xl font-bold text-green-600">
          {totalService}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Appointment Requests</p>
        <h2 className="mt-2 text-3xl font-bold text-red-500">0</h2>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Pending Appointments</p>
        <h2 className="mt-2 text-3xl font-bold text-orange-500">0</h2>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Confirmed Appointments</p>
        <h2 className="mt-2 text-3xl font-bold text-blue-600">0</h2>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Successful Payments</p>
        <h2 className="mt-2 text-3xl font-bold text-purple-600">0</h2>
      </div>
    </div>
  );
};

export default OverviewStats;
