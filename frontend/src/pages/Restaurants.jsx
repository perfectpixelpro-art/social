import RestaurantHero from "../components/RestaurantHero";
import WhyRestaurantsStayBusy from "../components/WhyRestaurantsStayBusy";
import RestaurantContentSection from "../components/RestaurantContentSection";
import WorkExampleSecRes from "../components/WorkExampleSecRes";
import ContentProcessSection from "../components/ContentProcessSection";
import SalonPricingSection from "../components/SalonPricingSection";
import SalonFaqSection from "../components/SalonFaqSection";
import RestaurantCTA from "../components/RestaurantCTA";

export default function Restaurants() {
  return (
    <>
     <RestaurantHero />
     <WhyRestaurantsStayBusy />
     <RestaurantContentSection />
     <WorkExampleSecRes/>
      <ContentProcessSection />
      <SalonPricingSection />
          <SalonFaqSection />
          <RestaurantCTA />
    
    </>
    
  );    ``
}