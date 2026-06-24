import Seo from "../components/Seo";
import PetHero from "../components/PetHero";
import PetCompetitionSection from "../components/PetCompetitionSection";
import PetTrustSection from "../components/PetTrustSection";
import WorkExamplesSection from "../components/WorkExampleSecPet";
import WorkExamplesSecPet from "../components/WorkExampleSecPet";
import PetServicesSection from "../components/PetServicesSection";
import PetTimelineSection from "../components/PetTimelineSection";
import SalonPricingSection from "../components/SalonPricingSection";

export default function PetGrowthHero() {
  return (
    <>
      <Seo path="/pet-and-grooming" title="Social Media Marketing for Pet & Grooming Businesses | The Social 99" description="Grow your pet care or grooming business with done-for-you social media management, engaging content, and short-form video from $99/month." />
     <PetHero />
     <PetCompetitionSection />
     <PetTrustSection />
     <WorkExamplesSecPet/>
     <PetServicesSection />
     <SalonPricingSection />
     <PetTimelineSection />
     
    </>
    
  );    ``
}