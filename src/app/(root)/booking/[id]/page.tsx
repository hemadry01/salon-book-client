import { Suspense } from "react";
import { IService } from "@/type/service";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingForm from "@/components/BookingForm";
import { authClient } from "@/lib/auth-client";

interface BookingPageProps {
  params: Promise<{ id: string }>;
}

const BookingContent = async ({ params }: BookingPageProps) => {
   //await connection();

   const { id } = await params;

   if (!id || id === "undefined") {
     notFound();
   }

   // Get logged-in user
   const reqHeaders = await headers();

   const session = await auth.api.getSession({
     headers: reqHeaders,
   });

   if (!session?.user) {
     redirect("/sign-in");
   }

   // JWT for the Express backend
  //  const { token } = await auth.api.getToken({
  //    headers: reqHeaders,
  //  });
  //  const {data:session}=authClient.useSession()
 

  const res = await fetch(`http://localhost:8000/service/${id}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    console.log("data not found")
  }

  const result = await res.json();
  const service: IService = result.data;


   const user = {
     id: session.user.id,
     name: session.user.name,
     email: session.user.email,
   };

  return <BookingForm service={service} user={user}/>;
};

const BookingPage = (props: BookingPageProps) => {
  return (
    <Suspense fallback={<p>Loading booking page...</p>}>
      <BookingContent params={props.params} />
    </Suspense>
  );
};

export default BookingPage;
