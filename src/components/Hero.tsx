import React from 'react';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom'; // IMPORTAÇÃO ADICIONADA

const Hero = () => {
  // Links definidos para fácil manutenção
  const whatsappLink = "https://api.whatsapp.com/send/?phone=554435321521"; // Link do WhatsApp conforme solicitado
  const catalogsSectionLink = "/catalogo"; // ALTERADO AQUI: Link para a página de Catálogos

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden"> {/* Adicionado id="hero" para o link da navbar */}
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start">
        <div className="max-w-xl pl-0 md:pl-8 animate-fade-in"> {/* Supondo que animate-fade-in está definido no seu tailwind.config.ts */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-4"> {/* Aplicada font-display (Playfair Display) */}
            Transforme Sua Casa Com <span className="text-furniture-yellow">Móveis de Qualidade</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Conforto e elegância para transformar qualquer espaço.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* BOTÃO VER COLEÇÃO MODIFICADO */}
            <Button 
              asChild // Permite que o Button se comporte como o RouterLink interno
              className="text-lg py-6 px-8 bg-furniture-green hover:bg-furniture-green/90 text-white w-full sm:w-auto"
            >
              <RouterLink to={catalogsSectionLink}>
                Ver Coleção
              </RouterLink>
            </Button>
            
            {/* BOTÃO FALE CONOSCO MODIFICADO */}
            <Button 
              variant="outline" 
              className="text-lg py-6 px-8 bg-transparent border-2 border-white text-white hover:bg-white/20 w-full sm:w-auto"
              asChild // Permite que o Button se comporte como o <a> interno
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Fale Conosco
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator - adjusted position */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <p className="text-white mb-2">Role para descobrir</p>
        <div className="w-1 h-8 bg-white/50 rounded-full flex justify-center">
          <div className="w-1/2 h-3 bg-white rounded-full animate-bounce mt-1"></div> {/* Supondo que animate-bounce está definido */}
        </div>
      </div>
    </section>
  );
};

export default Hero;