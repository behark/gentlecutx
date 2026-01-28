import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import Gallery from '../components/Gallery';
import ServicesPreview from '../components/ServicesPreview';
import SpecialOffers from '../components/SpecialOffers';
import TeamSection from '../components/TeamSection';
import ReviewsSection from '../components/ReviewsSection';

export default function HomePage() {
    return (
        <main>
            <Hero />
            <StatsSection />
            <Gallery />
            <ServicesPreview />
            <SpecialOffers />
            <TeamSection />
            <ReviewsSection />
        </main>
    );
}
