
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import WebsiteServicesSection from '../components/WebsiteServicesSection';
import OmnichannelSection from '../components/OmnichannelSection';
import WhyChooseSection from '../components/WhyChooseSection';
import TargetAudienceSection from '../components/TargetAudienceSection';
import ReliabilitySection from '../components/ReliabilitySection';
import GuaranteeSection from '../components/GuaranteeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FinalCTASection from '../components/FinalCTASection';

const Landing = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <WebsiteServicesSection />
      <OmnichannelSection />
      <WhyChooseSection />
      <TargetAudienceSection />
      <ReliabilitySection />
      <GuaranteeSection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
};

export default Landing;
