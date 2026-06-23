import Seo from "../components/Seo";
import SalonHeroSection from "../components/SalonHeroSection";
import SalonServicesSection from "../components/SalonServicesSection";
import WorkExampleSalSec  from "../components/WorkExampleSalSec";
import SalonProcessSection from "../components/SalonProcessSection";
import SalonPricingSection from "../components/SalonPricingSection";
import SalonFaqSection from "../components/SalonFaqSection";
import SalonCTA from "../components/SalonCTA";

export default function SalonsAndBeauty() {
  return (
    <>
      <Seo path="/salons-and-beauty" title="Social Media Marketing for Salons & Beauty | The Social 99" description="Fill your chairs with done-for-you social media management and content for salons and beauty businesses. Plans from $99/month." />
    <SalonHeroSection />
    <SalonServicesSection />
    <WorkExampleSalSec/>
    <SalonProcessSection />
    <SalonPricingSection />
    <SalonFaqSection />
    <SalonCTA />
    
    </>
    
  );    ``
}