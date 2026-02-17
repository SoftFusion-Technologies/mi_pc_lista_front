import HeroSection from '../../components/HeroSection';
import Banner from '../../components/Banner';
import ServiciosSection from '../../components/ServiciosSection';

import TrustBar from '../../components/TrustBar';
import HowWeWorkSection from '../../components/HowWeWorkSection';
import FounderSection from '../../components/FounderSection';
import SocialProofSection from '../../components/SocialProofSection';
import FAQSection from '../../components/FAQSection';

import { WHATSAPP_URL } from '../../config/links';

const Home = () => {
  return (
    <div className="min-h-screen bg-[var(--pc-bg)] text-white">
      <HeroSection />

      {/* Confianza inmediata */}
      <TrustBar whatsappUrl={WHATSAPP_URL} />

      {/* Proceso = tranquilidad */}
      <HowWeWorkSection whatsappUrl={WHATSAPP_URL} />

      {/* Persona real detrás */}
      <FounderSection whatsappUrl={WHATSAPP_URL} />

      {/* Recién acá mostramos “opciones” */}
      <ServiciosSection whatsappUrl={WHATSAPP_URL} />

      {/* CTA final */}
      <Banner whatsappUrl={WHATSAPP_URL} />
    </div>
  );
};

export default Home;
