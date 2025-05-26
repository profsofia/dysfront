import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Cylinder, Box as CubeIcon, HelpCircle, Calculator as CalcIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import CalculatorForm from '@/pages/tools/components/CalculatorForm';
import ResultsDisplay from '@/pages/tools/components/ResultsDisplay';
import { calculatePrismVolume, calculateCylinderVolume, calculateExcavationVolume } from '@/pages/tools/utils/volumeCalculations';

const VolumeCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('prisma');
  const [units, setUnits] = useState('m');
  const [results, setResults] = useState(null);

  const [prismWidth, setPrismWidth] = useState('');
  const [prismLength, setPrismLength] = useState('');
  const [prismHeight, setPrismHeight] = useState('');
  const [cylinderRadius, setCylinderRadius] = useState('');
  const [cylinderHeight, setCylinderHeight] = useState('');
  const [excavLength, setExcavLength] = useState('');
  const [excavWidth, setExcavWidth] = useState('');
  const [excavDepth, setExcavDepth] = useState('');
  const [excavSlope, setExcavSlope] = useState('0');

  const handleCalculate = () => {
    let calculationResult;
    switch (activeTab) {
      case 'prisma':
        calculationResult = calculatePrismVolume(prismWidth, prismLength, prismHeight, units, toast);
        break;
      case 'cilindro':
        calculationResult = calculateCylinderVolume(cylinderRadius, cylinderHeight, units, toast);
        break;
      case 'excavacion':
        calculationResult = calculateExcavationVolume(excavLength, excavWidth, excavDepth, excavSlope, units, toast);
        break;
      default:
        return;
    }
    if (calculationResult) {
      setResults(calculationResult);
    }
  };

  const resetForm = () => {
    setPrismWidth(''); setPrismLength(''); setPrismHeight('');
    setCylinderRadius(''); setCylinderHeight('');
    setExcavLength(''); setExcavWidth(''); setExcavDepth(''); setExcavSlope('0');
    setResults(null);
    toast({ title: "Formulario reiniciado", description: "Todos los campos han sido limpiados." });
  };

  const formFields = {
    prisma: [
      { id: 'prism-width', label: 'Ancho', value: prismWidth, setter: setPrismWidth, unit: units },
      { id: 'prism-length', label: 'Largo', value: prismLength, setter: setPrismLength, unit: units },
      { id: 'prism-height', label: 'Altura', value: prismHeight, setter: setPrismHeight, unit: units },
    ],
    cilindro: [
      { id: 'cylinder-radius', label: 'Radio', value: cylinderRadius, setter: setCylinderRadius, unit: units },
      { id: 'cylinder-height', label: 'Altura', value: cylinderHeight, setter: setCylinderHeight, unit: units },
    ],
    excavacion: [
      { id: 'excav-length', label: 'Largo', value: excavLength, setter: setExcavLength, unit: units },
      { id: 'excav-width', label: 'Ancho', value: excavWidth, setter: setExcavWidth, unit: units },
      { id: 'excav-depth', label: 'Profundidad', value: excavDepth, setter: setExcavDepth, unit: units },
      { 
        id: 'excav-slope', label: 'Pendiente (H:V)', value: excavSlope, setter: setExcavSlope, type: 'select',
        options: [
          { value: '0', label: 'Sin pendiente (0:1)' }, { value: '0.5', label: 'Pendiente 1:2 (0.5:1)' },
          { value: '1', label: 'Pendiente 1:1 (1:1)' }, { value: '1.5', label: 'Pendiente 3:2 (1.5:1)' },
          { value: '2', label: 'Pendiente 2:1 (2:1)' },
        ]
      },
    ],
  };

  const tabsConfig = [
    { value: 'prisma', label: 'Prisma Rectangular', icon: CubeIcon },
    { value: 'cilindro', label: 'Cilindro', icon: Cylinder },
    { value: 'excavacion', label: 'Excavación', icon: Box },
  ];
  
  const getEquivalencies = (volume) => {
    if (!volume || isNaN(parseFloat(volume))) return [];
    const vol = parseFloat(volume);
    const unitFactors = {
      m: { liters: 1000, earthKg: 1500, concreteKg: 2400 },
      cm: { liters: 0.001, earthKg: 0.0015, concreteKg: 0.0024 },
      ft: { liters: 28.32, earthKg: 42.5, concreteKg: 68 },
      in: { liters: 0.016, earthKg: 0.025, concreteKg: 0.04 },
    };
    const factors = unitFactors[units] || unitFactors.m;
    return [
      `• 1 ${units}³ = ${factors.liters} litros`,
      `• Peso aproximado (tierra): ${(vol * factors.earthKg).toFixed(2)} kg`,
      `• Peso aproximado (concreto): ${(vol * factors.concreteKg).toFixed(2)} kg`,
    ];
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Calculadora de Volumen</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calcula fácilmente el volumen de diferentes formas para excavaciones, rellenos y otros proyectos de construcción.
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
                Selecciona una forma y completa las dimensiones para calcular su volumen.
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
          <ResultsDisplay 
            results={results} 
            units={units} 
            areaUnitSuffix="³" 
            volumeUnitSuffix="²"
            tipsTitle="Equivalencias:"
            tips={results ? getEquivalencies(results.volume) : []}
            mainResultLabel="Volumen"
            secondaryResultLabel="Área de superficie"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default VolumeCalculator;