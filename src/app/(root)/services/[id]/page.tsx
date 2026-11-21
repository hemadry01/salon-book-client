import ServiceDetail from '@/components/ServiceDetail';
import { IService } from '@/type/service';
import React from 'react';

interface IServicedetailProps {
  params:Promise<{id:string}>
}

const page = async({params}:IServicedetailProps) => {
    const {id} = await params;

    const res = await fetch(`http://localhost:8000/service/${id}`);
    const result = await res.json();
    const serviceDetail:IService = result.data;
    console.log("serviceDetail",serviceDetail.image);
    return (
      <div>
        <ServiceDetail serviceDetail={serviceDetail} />
      </div>
    );
};

export default page;