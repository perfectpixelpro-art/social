import Seo from "../components/Seo";
import RestaurantHero from "../components/RestaurantHero";
import RestaurantProblemSection from "../components/RestaurantProblemSection";
import RestaurantTruthSection from "../components/RestaurantTruthSection";
import RestaurantWhatWeDoSection from "../components/RestaurantWhatWeDoSection";
import RestaurantTimelineSection from "../components/RestaurantTimelineSection";
import WorkExampleSecBar from "../components/WorkExampleSecBar";
import BarPricingSection from "../components/BarPricingSection";
import RestaurantFinalCTA from "../components/RestaurantFinalCTA";
import BarHero from "../components/BarHero";

export default function Bars() {
  return (
    <>
      <Seo path="/bars" title="Social Media Marketing for Bars | The Social 99" description="Pack your bar with done-for-you social media management, engaging content, and short-form video that drives foot traffic from $99/month." />
    <BarHero/>
   <RestaurantProblemSection />
   <RestaurantTruthSection />
   <RestaurantWhatWeDoSection />
   <RestaurantTimelineSection />
   <WorkExampleSecBar/>
   <BarPricingSection/>
   <RestaurantFinalCTA />
    
    </>
    
  );    ``
}