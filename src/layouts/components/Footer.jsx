import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Calculadora de Área', path: '/herramientas/area' },
    { name: 'Calculadora de Volumen', path: '/herramientas/volumen' },
    { name: 'Calculadora de Materiales', path: '/herramientas/materiales' },
  ];

  const contactInfo = [
    { icon: <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5" />, text: 'Calle Bermudez s/n, Ezeiza' },
    { icon: <Phone className="w-5 h-5 text-primary mr-3" />, text: '+54 9  11 6683 0995' },
    { icon: <Mail className="w-5 h-5 text-primary mr-3" />, text: 'info@dysconstructora.com' },
  ];

  const socialLinks = [
    { name: 'TikTok', href: 'https://www.tiktok.com/@dysconstructora', icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.414,3h-14.828l-1.586,1.586v14.828l1.586,1.586h14.828l1.586,-1.586v-14.828zM17,12c-1.209,0 -2.215,-0.417 -3,-1.046v3.046c0,1.654 -1.346,3 -3,3c-1.654,0 -3,-1.346 -3,-3c0,-1.475 1.055,-2.72 2.509,-2.96l0.326,1.974c-0.484,0.079 -0.835,0.494 -0.835,0.986c0,0.551 0.449,1 1,1c0.551,0 1,-0.449 1,-1v-7h2c0,1.047 1.03,3 3,3z" clipRule="evenodd" /></svg> },
    
    { name: 'Instagram', href: 'https://www.instagram.com/dysconstructora/', icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg> },
    { name: 'WhatsApp', href: 'https://wa.me/5491166830995', icon: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.077,4.928c-2.082,-2.083 -4.922,-3.134 -7.904,-2.894c-4.009,0.322 -7.523,3.11 -8.699,6.956c-0.84,2.748 -0.487,5.617 0.881,7.987l-1.296,4.303c-0.124,0.413 0.253,0.802 0.67,0.691l4.504,-1.207c1.459,0.796 3.101,1.215 4.773,1.216h0.004c4.195,0 8.071,-2.566 9.412,-6.541c1.306,-3.876 0.34,-7.823 -2.345,-10.511zM16.898,15.554c-0.208,0.583 -1.227,1.145 -1.685,1.186c-0.458,0.042 -0.887,0.207 -2.995,-0.624c-2.537,-1 -4.139,-3.601 -4.263,-3.767c-0.125,-0.167 -1.019,-1.353 -1.019,-2.581c0,-1.228 0.645,-1.832 0.874,-2.081c0.229,-0.25 0.499,-0.312 0.666,-0.312c0.166,0 0.333,0 0.478,0.006c0.178,0.007 0.375,0.016 0.562,0.431c0.222,0.494 0.707,1.728 0.769,1.853c0.062,0.125 0.104,0.271 0.021,0.437c-0.083,0.166 -0.125,0.27 -0.249,0.416c-0.125,0.146 -0.262,0.325 -0.374,0.437c-0.125,0.124 -0.255,0.26 -0.11,0.509c0.146,0.25 0.646,1.067 1.388,1.728c0.954,0.85 1.757,1.113 2.007,1.239c0.25,0.125 0.395,0.104 0.541,-0.063c0.146,-0.166 0.624,-0.728 0.79,-0.978c0.166,-0.25 0.333,-0.208 0.562,-0.125c0.229,0.083 1.456,0.687 1.705,0.812c0.25,0.125 0.416,0.187 0.478,0.291c0.062,0.103 0.062,0.603 -0.146,1.186z" /></svg> },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-xl font-bold text-primary mb-4 block">D&S Constructora</span>
            <p className="text-gray-300 mb-4">
              Ofrecemos servicios de construcción de alta calidad y herramientas útiles para profesionales del sector.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(link => (
                <a key={link.name} href={link.href} className="text-gray-300 hover:text-primary">
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <span className="text-lg font-semibold text-white mb-4 block">Enlaces Rápidos</span>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-300 hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <span className="text-lg font-semibold text-white mb-4 block">Contacto</span>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className={`flex ${index === 0 ? 'items-start' : 'items-center'}`}>
                  {info.icon}
                  <span className="text-gray-300">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">© {new Date().getFullYear()} D&S Constructora. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;