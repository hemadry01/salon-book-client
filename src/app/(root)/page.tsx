import Banner from "@/components/Banner";
import ServiceCategories from "@/components/dashboard/shared/ServiceCategories";
import WhyChooseUs from "@/components/dashboard/shared/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Banner/>
      <ServiceCategories/>
      <WhyChooseUs/>
    </div>
  );
}
