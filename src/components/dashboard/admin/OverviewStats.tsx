import React from 'react';

const OverviewStats = async() => {

  const res = await fetch("http://localhost:8000/users/counts", {
    cache: "no-store",
  });
  const user = await res.json();
  const totalUser = user.count;
  

  const response = await fetch("http://localhost:8000/services/count");
  const activeservice = await response.json();
  const totalService = activeservice.activecount;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-xl border p-5">
        <p>Total User</p>
        <h2 className="text-3xl font-bold">{totalUser}</h2>
      </div>

      <div className="rounded-xl border p-5">
        <p>Active Services</p>
        <h2 className="text-3xl font-bold text-green-600">{totalService}</h2>
      </div>

      <div className="rounded-xl border p-5">
        <p>Inactive Services</p>
        <h2 className="text-3xl font-bold text-red-500">
          {/* {data.inactiveServices} */}
        </h2>
      </div>
    </div>
  );
};

export default OverviewStats;
