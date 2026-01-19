import Ubication from '../../components/Ubication';
import PlanesDePrecios from '../../components/PlanesDePrecios';
import SeccionTestimonios from '../../components/SeccionTestimonios';
import HeroSection from '../../components/HeroSection';
import FeaturesSection from '../../components/FeaturesSection';
import EntranamientosAdaptan from '../../components/EntranamientosAdaptan';
import Banner from '../../components/Banner';
import ServiciosSection from '../../components/ServiciosSection';

const whatsappUrl = 'https://wa.me/5493517612425';
const Home = () => {
  return (
    <div className="bg-gray-900 text-white">
      <HeroSection />
      <Banner whatsappUrl={whatsappUrl} />
      <ServiciosSection whatsappUrl={whatsappUrl} />

      {/* <EntranamientosAdaptan />
      <FeaturesSection />
      <PlanesDePrecios />
      <SeccionTestimonios />
      <Ubication /> */}
    </div>
  );
};

export default Home;
