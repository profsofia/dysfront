import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Square, Triangle, Circle, HelpCircle, Calculator as CalcIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import CalculatorForm from '@/pages/tools/components/CalculatorForm';
import ResultsDisplay from '@/pages/tools/components/ResultsDisplay';
import { calculateRectangleArea, calculateTriangleArea, calculateCircleArea, calculatePolygonArea } from '@/pages/tools/utils/areaCalculations';

const AreaCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('rectangulo');
  const [units, setUnits] = useState('m');
  const [results, setResults] = useState(null);

  const [rectWidth, setRectWidth] = useState('');
  const [rectLength, setRectLength] = useState('');
  const [triangleBase, setTriangleBase] = useState('');
  const [triangleHeight, setTriangleHeight] = useState('');
  const [circleRadius, setCircleRadius] = useState('');
  const [polygonPoints, setPolygonPoints] = useState([{ x: '', y: '' }, { x: '', y: '' }, { x: '', y: '' }]);

  const handleCalculate = () => {
    let calculationResult;
    switch (activeTab) {
      case 'rectangulo':
        calculationResult = calculateRectangleArea(rectWidth, rectLength, units, toast);
        break;
      case 'triangulo':
        calculationResult = calculateTriangleArea(triangleBase, triangleHeight, units, toast);
        break;
      case 'circulo':
        calculationResult = calculateCircleArea(circleRadius, units, toast);
        break;
      case 'poligono':
        calculationResult = calculatePolygonArea(polygonPoints, units, toast);
        break;
      default:
        return;
    }
    if (calculationResult) {
      setResults(calculationResult);
    }
  };

  const resetForm = () => {
    setRectWidth('');
    setRectLength('');
    setTriangleBase('');
    setTriangleHeight('');
    setCircleRadius('');
    setPolygonPoints([{ x: '', y: '' }, { x: '', y: '' }, { x: '', y: '' }]);
    setResults(null);
    toast({ title: "Formulario reiniciado", description: "Todos los campos han sido limpiados." });
  };

  const formFields = {
    rectangulo: [
      { id: 'rect-width', label: 'Ancho', value: rectWidth, setter: setRectWidth, unit: units },
      { id: 'rect-length', label: 'Largo', value: rectLength, setter: setRectLength, unit: units },
    ],
    triangulo: [
      { id: 'triangle-base', label: 'Base', value: triangleBase, setter: setTriangleBase, unit: units },
      { id: 'triangle-height', label: 'Altura', value: triangleHeight, setter: setTriangleHeight, unit: units },
    ],
    circulo: [
      { id: 'circle-radius', label: 'Radio', value: circleRadius, setter: setCircleRadius, unit: units },
    ],
    poligono: {
      points: polygonPoints,
      setPoints: setPolygonPoints,
      toast: toast,
    }
  };

  const tabsConfig = [
    { value: 'rectangulo', label: 'Rectángulo', icon: Square },
    { value: 'triangulo', label: 'Triángulo', icon: Triangle },
    { value: 'circulo', label: 'Círculo', icon: Circle },
    { value: 'poligono', label: 'Polígono', icon: HelpCircle },
  ];

  const resultsTips = [
    "• Para pisos: Añade 5-10% extra de material para cortes y desperdicios.",
    "• Para pintura: Un galón cubre aproximadamente 30-40 m² por capa.",
    "• Para techos: Considera una pendiente mínima de 2% para drenaje."
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Calculadora de Área</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calcula fácilmente el área y perímetro de diferentes formas geométricas para tus proyectos de construcción.
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
                Selecciona una forma y completa las dimensiones para calcular su área.
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
                <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
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
          <ResultsDisplay results={results} units={units} areaUnitSuffix="²" tips={resultsTips} />
        </motion.div>
      </div>
    </div>
  );
};

export default AreaCalculator;