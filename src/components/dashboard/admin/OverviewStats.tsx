import React from 'react';

const OverviewStats = async() => {

  const res = await fetch("http://localhost:8000/users/counts");
  const user = await res.json();
  const totalUser = user.count;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-xl border p-5">
        <p>Total User</p>
        <h2 className="text-3xl font-bold">{totalUser}</h2>
      </div>

      <div className="rounded-xl border p-5">
        <p>Active Services</p>
        <h2 className="text-3xl font-bold text-green-600">
          {/* {data.activeServices} */}
        </h2>
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
