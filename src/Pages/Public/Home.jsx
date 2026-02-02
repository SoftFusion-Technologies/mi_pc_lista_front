import HeroSection from '../../components/HeroSection';
import Banner from '../../components/Banner';
import ServiciosSection from '../../components/ServiciosSection';

const whatsappUrl = 'https://wa.me/5493517612425';
const Home = () => {
  return (
    <div className="bg-gray-900 text-white">
      <HeroSection />
      <ServiciosSection whatsappUrl={whatsappUrl} />
      <Banner whatsappUrl={whatsappUrl} />
      {/* <EntranamientosAdaptan />
      <PlanesDePrecios />
      <SeccionTestimonios />
      <Ubication /> */}
    </div>
  );
};

export default Home;
