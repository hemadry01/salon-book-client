import React from 'react';
import { IService } from '@/type/service';

import ServiceDesplayLimit from './ServiceDesplayLimit';

const ServiceDesplay = async() => {
  
 

    let serviceData: IService[] = [];
      try {
        const res = await fetch("http://localhost:8000/sevices/limit", {
          cache: "no-store",
        });
    
        const result = await res.json();
        serviceData = result.data;
    
        console.log("our service", serviceData);
      } catch (error) {
        console.log(error);
      }

      

    return (
      <div className="mt-5">
        <div className=" px-6 lg:px-10">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Salon Category list
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 px-6 lg:px-10">
          {/* {serviceData.map((service) => (
            
          ))} */}
          {serviceData.map((service:IService) => (
            <ServiceDesplayLimit key={service._id} service={service} />
          ))}
        </div>
      </div>
    );
};

export default ServiceDesplay;