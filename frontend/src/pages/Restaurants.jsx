import Seo from "../components/Seo";
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
      <Seo path="/restaurants" title="Social Media Marketing for Restaurants | The Social 99" description="Bring in more diners with done-for-you social media management, mouth-watering content, and short-form video for restaurants from $99/month." />
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