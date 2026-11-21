import BookingForm from "@/components/BookingForm";
import { IService } from "@/type/service";
import { notFound } from "next/navigation";

interface BookingPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BookingPage = async ({ params }: BookingPageProps) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/service/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const result = await res.json();
  const service: IService = result.data;

  return (
    <div>
      <BookingForm service={service} />
    </div>
  );
};

export default BookingPage;
