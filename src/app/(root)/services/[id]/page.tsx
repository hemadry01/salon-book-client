// import ServiceDetail from "@/components/ServiceDetail";
// import { IService } from "@/type/service";
// import React, { Suspense } from "react";

// interface IServicedetailProps {
//   params: Promise<{ id: string }>;
// }

// const ServiceContent = async ({ params }: IServicedetailProps) => {
//   const { id } = await params;

//   const res = await fetch(`http://localhost:8000/service/${id}`, {
//     next: { revalidate: 1 },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch service details");
//   }

//   const serviceDetail: IService = await res.json();

//   return <ServiceDetail serviceDetail={serviceDetail} />;
// };

// const Page = (props: IServicedetailProps) => {
//   return (
//     <Suspense fallback={<p>Loading service details...</p>}>
//       <ServiceContent params={props.params} />
//     </Suspense>
//   );
// };

// export default Page;


import ServiceDetail from "@/components/ServiceDetail";
import { IService } from "@/type/service";
import React, { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";

interface IServicedetailProps {
  params: Promise<{ id: string }>;
}

const ServiceContent = async ({ params }: IServicedetailProps) => {
  const { id } = await params;

  await connection();

  if (!id || id === "undefined") {
    notFound();
  }

  const res = await fetch(`http://localhost:8000/service/${id}`);

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch service details");
  }

  const result = await res.json();
  const serviceDetail: IService = result.data ?? result;

  return <ServiceDetail serviceDetail={serviceDetail} />;
};

const Page = (props: IServicedetailProps) => {
  return (
    <Suspense fallback={<p>Loading service details...</p>}>
      <ServiceContent params={props.params} />
    </Suspense>
  );
};

export default Page;

