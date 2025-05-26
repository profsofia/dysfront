import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, HelpCircle, Calculator as CalcIcon, Paintbrush, ToyBrick as Brick, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import CalculatorForm from '@/pages/tools/components/CalculatorForm';
import MaterialResultsDisplay from '@/pages/tools/components/MaterialResultsDisplay';
import { calculateConcrete, calculateBricks, calculatePaint } from '@/pages/tools/utils/materialCalculations';

const MaterialCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('concreto');
  const [units, setUnits] = useState('m');
  const [results, setResults] = useState(null);

  const [concreteLength, setConcreteLength] = useState('');
  const [concreteWidth, setConcreteWidth] = useState('');
  const [concreteThickness, setConcreteThickness] = useState('');
  const [concreteType, setConcreteType] = useState('standard');
  const [wallLength, setWallLength] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [brickType, setBrickType] = useState('standard');
  const [mortar, setMortar] = useState('10');
  const [wallArea, setWallArea] = useState('');
  const [coats, setCoats] = useState('2');
  const [paintType, setPaintType] = useState('latex');

  const handleCalculate = () => {
    let calculationResult;
    switch (activeTab) {
      case 'concreto':
        calculationResult = calculateConcrete(concreteLength, concreteWidth, concreteThickness, concreteType, units, toast);
        break;
      case 'ladrillos':
        calculationResult = calculateBricks(wallLength, wallHeight, brickType, mortar, units, toast);
        break;
      case 'pintura':
        calculationResult = calculatePaint(wallArea, coats, paintType, units, toast);
        break;
      default:
        return;
    }
    if (calculationResult) {
      setResults(calculationResult);
    }
  };

  const resetForm = () => {
    setConcreteLength(''); setConcreteWidth(''); setConcreteThickness(''); setConcreteType('standard');
    setWallLength(''); setWallHeight(''); setBrickType('standard'); setMortar('10');
    setWallArea(''); setCoats('2'); setPaintType('latex');
    setResults(null);
    toast({ title: "Formulario reiniciado", description: "Todos los campos han sido limpiados." });
  };

  const formFields = {
    concreto: [
      { id: 'concrete-length', label: 'Largo', value: concreteLength, setter: setConcreteLength, unit: units },
      { id: 'concrete-width', label: 'Ancho', value: concreteWidth, setter: setConcreteWidth, unit: units },
      { id: 'concrete-thickness', label: 'Espesor', value: concreteThickness, setter: setConcreteThickness, unit: units },
      { 
        id: 'concrete-type', label: 'Tipo de concreto', value: concreteType, setter: setConcreteType, type: 'select',
        options: [
          { value: 'standard', label: "Estándar (f'c = 210 kg/cm²)" }, { value: 'highStrength', label: "Alta resistencia (f'c = 280 kg/cm²)" },
          { value: 'lightweight', label: 'Ligero' }, { value: 'foundation', label: 'Para cimentación' },
        ]
      },
    ],
    ladrillos: [
      { id: 'wall-length', label: 'Largo del muro', value: wallLength, setter: setWallLength, unit: units },
      { id: 'wall-height', label: 'Altura del muro', value: wallHeight, setter: setWallHeight, unit: units },
      { 
        id: 'brick-type', label: 'Tipo de ladrillo/bloque', value: brickType, setter: setBrickType, type: 'select',
        options: [
          { value: 'standard', label: 'Ladrillo estándar (24×11.5×7 cm)' }, { value: 'block', label: 'Bloque de concreto (40×20×20 cm)' },
          { value: 'thin', label: 'Ladrillo delgado (24×11.5×5 cm)' },
        ]
      },
      { 
        id: 'mortar-percentage', label: 'Porcentaje de mortero (%)', value: mortar, setter: setMortar, type: 'select',
        options: [
          { value: '5', label: '5%' }, { value: '10', label: '10%' }, { value: '15', label: '15%' }, { value: '20', label: '20%' },
        ]
      },
    ],
    pintura: [
      { id: 'wall-area', label: 'Área a pintar', value: wallArea, setter: setWallArea, unit: `${units}²` },
      { 
        id: 'paint-coats', label: 'Número de manos', value: coats, setter: setCoats, type: 'select',
        options: [
          { value: '1', label: '1 mano' }, { value: '2', label: '2 manos' }, { value: '3', label: '3 manos' },
        ]
      },
      { 
        id: 'paint-type', label: 'Tipo de pintura', value: paintType, setter: setPaintType, type: 'select',
        options: [
          { value: 'latex', label: 'Látex' }, { value: 'acrylic', label: 'Acrílica' },
          { value: 'oil', label: 'Al óleo' }, { value: 'primer', label: 'Imprimación' },
        ]
      },
    ],
  };

  const tabsConfig = [
    { value: 'concreto', label: 'Concreto', icon: Droplet },
    { value: 'ladrillos', label: 'Ladrillos/Bloques', icon: Brick },
    { value: 'pintura', label: 'Pintura', icon: Paintbrush },
  ];

  const getRecommendations = () => {
    switch (activeTab) {
      case 'concreto': return ["• Añade 5-10% extra para compensar pérdidas.", "• Utiliza vibradores para eliminar burbujas de aire.", "• Cura el concreto durante al menos 7 días."];
      case 'ladrillos': return ["• Añade 5% extra de ladrillos para roturas.", "• Verifica la verticalidad con plomada cada 5 hiladas.", "• Humedece los ladrillos antes de colocarlos."];
      case 'pintura': return ["• Limpia y prepara bien la superficie antes de pintar.", "• Aplica imprimación para mejor adherencia.", "• Espera el tiempo de secado recomendado entre manos."];
      default: return [];
    }
  };
  
  const getMainResultLabel = () => {
    switch (activeTab) {
      case 'concreto': return 'Volumen de concreto';
      case 'ladrillos': return 'Ladrillos necesarios';
      case 'pintura': return 'Pintura necesaria';
      default: return '';
    }
  };

  const getMainResultUnit = () => {
    switch (activeTab) {
      case 'concreto': return 'm³';
      case 'ladrillos': return 'unidades';
      case 'pintura': return 'litros';
      default: return '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Calculadora de Materiales</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calcula fácilmente la cantidad de materiales necesarios para diferentes tipos de proyectos de construcción.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalcIcon className="mr-2 h-6 w-6 text-primary" />
                Calculadora
              </CardTitle>
              <CardDescription>
                Selecciona un tipo de material y completa las dimensiones para calcular las cantidades necesarias.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="units">Unidades de medida</Label>
                <Select value={units} onValueChange={setUnits}>
                  <SelectTrigger id="units" className="w-full sm:w-40">
                    <SelectValue placeholder="Seleccionar unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Metros (m)</SelectItem>
                    <SelectItem value="cm">Centímetros (cm)</SelectItem>
                    <SelectItem value="ft">Pies (ft)</SelectItem>
                    <SelectItem value="in">Pulgadas (in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-1 md:grid-cols-3">
                  {tabsConfig.map(tab => (
                    <TabsTrigger key={tab.value} value={tab.value} className="flex items-center">
                      <tab.icon className="mr-2 h-4 w-4" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {tabsConfig.map(tab => (
                  <TabsContent key={tab.value} value={tab.value} className="mt-6">
                    <CalculatorForm type={tab.value} fields={formFields[tab.value]} units={units} />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm}>
                Reiniciar
              </Button>
              <Button onClick={handleCalculate}>
                Calcular
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MaterialResultsDisplay 
            results={results}
            mainResultLabel={getMainResultLabel()}
            mainResultUnit={getMainResultUnit()}
            recommendations={getRecommendations()}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MaterialCalculator;