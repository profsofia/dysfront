import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Ruler,
  Layers,
  Calculator,
  CheckCircle,
  Award,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const tools = [
  {
    title: "Calculadora de Área",
    description:
      "Calcula fácilmente el área de diferentes formas para planificar tus proyectos.",
    icon: <Ruler className="h-10 w-10 text-primary" />,
    path: "/herramientas/area",
  },
  {
    title: "Calculadora de Volumen",
    description:
      "Determina el volumen necesario para excavaciones, rellenos y más.",
    icon: <Calculator className="h-10 w-10 text-primary" />,
    path: "/herramientas/volumen",
  },
  {
    title: "Calculadora de Materiales",
    description:
      "Estima la cantidad de materiales necesarios para tu proyecto de construcción.",
    icon: <Layers className="h-10 w-10 text-primary" />,
    path: "/herramientas/materiales",
  },
];

const benefits = [
  {
    title: "Precisión Garantizada",
    description:
      "Nuestras herramientas ofrecen cálculos precisos para evitar desperdicios y sobrecostos.",
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
  },
  {
    title: "Calidad Superior",
    description:
      "Utilizamos los mejores materiales y técnicas en todos nuestros proyectos de construcción.",
    icon: <Award className="h-8 w-8 text-primary" />,
  },
  {
    title: "Entrega Puntual",
    description:
      "Nos comprometemos a entregar todos los proyectos dentro del plazo acordado.",
    icon: <Clock className="h-8 w-8 text-primary" />,
  },
];

const HeroSection = () => (
  <section className="relative hero-gradient py-20 md:py-32">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-orange-600/90"></div>
    </div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Soluciones de Construcción Profesionales
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Ofrecemos servicios de construcción de calidad y herramientas
              útiles para profesionales del sector.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                asChild // <--- ¡Importante! Asegúrate de que esto esté aquí
              >
                <Link to="/galeria">
                  {" "}
                  {/* <--- Asegúrate de que es un Link y apunta a /galeria */}
                  Nuestros Proyectos{" "}
                  {/* Puedes ajustar este texto */}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-primary hover:bg-white/10"
              >
                <a
                  href="https://wa.me/5491166830995"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contactar
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="md:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                className="w-full h-auto"
                alt="Proyecto de construccion dys constructora casa terminada"
                src="https://res.cloudinary.com/sofiaschenone/image/upload/v1748216967/dysconstructora/ga9ht4qxrcofj84hlsss.png"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const ToolsSection = () => (
  <section className="py-20 pattern-bg">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Herramientas de Construcción
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Utiliza nuestras calculadoras especializadas para planificar y
          ejecutar tus proyectos de construcción con precisión.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="tool-card bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <div className="mb-6">{tool.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
              <p className="text-gray-600 mb-6">{tool.description}</p>
              <Link to={tool.path}>
                <Button className="w-full group">
                  Usar Herramienta
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const AboutSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-lg"></div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                className="w-full h-auto"
                alt="Equipo de construcción profesional"
                src="https://res.cloudinary.com/sofiaschenone/image/upload/v1748217658/dysconstructora/fwg0dzd5rxhcbfykvatz.png"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-lg"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sobre Nuestra Empresa
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Somos una empresa constructora con años de experiencia en el sector,
            comprometida con la excelencia y la innovación. Nuestro equipo de
            profesionales está altamente capacitado para llevar a cabo proyectos
            de cualquier envergadura.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Además de nuestros servicios de construcción, ofrecemos herramientas
            digitales gratuitas para ayudar a profesionales y aficionados a
            planificar sus proyectos con precisión.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Proyectos Residenciales",
                desc: "Construcción y remodelación de viviendas",
              },
              {
                title: "Proyectos Comerciales",
                desc: "Edificios y espacios para negocios",
              },
              {
                title: "Infraestructura",
                desc: "Obras civiles y proyectos públicos",
              },
              {
                title: "Consultoría",
                desc: "Asesoramiento técnico especializado",
              },
            ].map((service) => (
              <div key={service.title} className="flex items-start">
                <div className="mr-4 mt-1 text-primary">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{service.title}</h4>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Por Qué Elegirnos
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Nos destacamos por ofrecer servicios de alta calidad y soluciones
          innovadoras para cada proyecto.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <div className="mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-20 bg-primary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          ¿Listo para comenzar tu proyecto?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Contáctanos hoy mismo para obtener una consulta gratuita y descubrir
          cómo podemos ayudarte a hacer realidad tu visión.
        </p>
        <Button size="lg" className="bg-white text-primary hover:bg-white/90">
          Solicitar Presupuesto
        </Button>
      </motion.div>
    </div>
  </section>
);

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ToolsSection />
      <AboutSection />
      <BenefitsSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
