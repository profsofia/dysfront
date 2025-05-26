import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Calculator,
  Ruler,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTools = () => setIsToolsOpen(!isToolsOpen);

  const menuItems = [
    { name: "Inicio", path: "/", icon: <Home className="w-5 h-5 mr-2" /> },
    {
      name: "Herramientas",
      path: "#",
      icon: <Calculator className="w-5 h-5 mr-2" />,
      submenu: [
        {
          name: "Calculadora de Área",
          path: "/herramientas/area",
          icon: <Ruler className="w-4 h-4 mr-2" />,
        },
        {
          name: "Calculadora de Volumen",
          path: "/herramientas/volumen",
          icon: <Ruler className="w-4 h-4 mr-2" />,
        },
        {
          name: "Calculadora de Materiales",
          path: "/herramientas/materiales",
          icon: <Layers className="w-4 h-4 mr-2" />,
        },
      ],
    },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    if (path === "#") {
      return (
        menuItems
          .find((item) => item.name === "Herramientas")
          ?.submenu?.some((subItem) =>
            location.pathname.startsWith(subItem.path)
          ) || false
      );
    }
    return location.pathname.startsWith(path);
  };

  const DesktopNav = () => (
    <nav className="hidden md:flex items-center space-x-8">
      {menuItems.map((item) =>
        item.submenu ? (
          <div key={item.name} className="relative group">
            <button
              onClick={toggleTools}
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive(item.path) ? "text-primary" : "hover:text-primary"
              }`}
            >
              {item.icon}
              {item.name}
              <ChevronDown
                className={`ml-1 w-4 h-4 transition-transform ${
                  isToolsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isToolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-60 bg-white rounded-md shadow-lg py-2 z-20"
                >
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className={`flex items-center px-4 py-2 text-sm ${
                        isActive(subItem.path)
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setIsToolsOpen(false)}
                    >
                      {subItem.icon}
                      {subItem.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              isActive(item.path) ? "text-primary" : "hover:text-primary"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        )
      )}
    </nav>
  );

  const MobileNav = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t"
        >
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) =>
                item.submenu ? (
                  <div key={item.name} className="flex flex-col">
                    <button
                      onClick={toggleTools}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        isActive(item.path)
                          ? "text-primary"
                          : "hover:text-primary"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                      <ChevronDown
                        className={`ml-1 w-4 h-4 transition-transform ${
                          isToolsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isToolsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-6 mt-1 space-y-1"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className={`flex items-center px-3 py-2 text-sm rounded-md ${
                                isActive(subItem.path)
                                  ? "bg-primary/10 text-primary"
                                  : "hover:bg-gray-100"
                              }`}
                              onClick={() => {
                                setIsToolsOpen(false);
                                setIsMenuOpen(false);
                              }}
                            >
                              {subItem.icon}
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? "text-primary"
                        : "hover:text-primary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )
              )}
              <div className="pt-2">
                <Button asChild className="w-full">
                  <a
                    href="https://wa.me/5491166830995"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contactar
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              D&S Constructora
            </span>
          </Link>
          <DesktopNav />
          <div className="hidden md:block">
            <Button>
              <a
                href="https://wa.me/5491166830995"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar
              </a>
            </Button>
          </div>
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      <MobileNav />
    </header>
  );
};

export default Header;
