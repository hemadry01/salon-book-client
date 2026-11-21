import Banner from "@/components/Banner";
import ServiceCategories from "@/components/dashboard/shared/ServiceCategories";
import WhyChooseUs from "@/components/dashboard/shared/WhyChooseUs";
import ServiceDesplay from "@/components/ServiceDesplay";

export default function Home() {
  return (
    <div>
      <Banner/>
      <ServiceDesplay/>
      <ServiceCategories/>
      <WhyChooseUs/>
    </div>
  );
}
