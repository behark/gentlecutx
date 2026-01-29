import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import Gallery from '../components/Gallery';
import ServicesPreview from '../components/ServicesPreview';
import WhyChooseUs from '../components/WhyChooseUs';
import SpecialOffers from '../components/SpecialOffers';
import TeamSection from '../components/TeamSection';
import ReviewsSection from '../components/ReviewsSection';
import SectionDivider from '../components/SectionDivider';

export default function HomePage() {
    return (
        <main>
            <Hero />
            <StatsSection />
            <SectionDivider variant="wave" className="bg-primary -mt-px" />
            <Gallery />
            <SectionDivider variant="curve" className="bg-white -mt-px" flip />
            <ServicesPreview />
            <WhyChooseUs />
            <SectionDivider variant="wave-dark" className="bg-gray-50 -mt-px" />
            <SpecialOffers />
            <SectionDivider variant="wave" className="bg-primary -mt-px" />
            <TeamSection />
            <SectionDivider variant="curve" className="bg-white -mt-px" flip />
            <ReviewsSection />
        </main>
    );
}
