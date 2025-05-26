import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { HelpCircle } from 'lucide-react';

const ResultsDisplay = ({ 
  results, 
  units, 
  areaUnitSuffix = "²", 
  volumeUnitSuffix = "", 
  tips = [], 
  tipsTitle = "Consejos de construcción:",
  mainResultLabel = "Área",
  secondaryResultLabel = "Perímetro"
}) => {
  const mainResultValue = results?.area || results?.volume;
  const secondaryResultValue = results?.perimeter || results?.surfaceArea;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados</CardTitle>
        <CardDescription>
          Los resultados de tu cálculo aparecerán aquí.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {results ? (
          <div className="space-y-6">
            <div className="text-center p-6 bg-primary/10 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">{mainResultLabel}</p>
              <p className="text-4xl font-bold text-primary">
                {mainResultValue} {units}{results.area ? areaUnitSuffix : volumeUnitSuffix}
              </p>
              {results.details && (
                <>
                  <p className="text-sm text-gray-500 mt-4">Fórmula aplicada</p>
                  <p className="text-sm">{results.details}</p>
                </>
              )}
            </div>
            
            {secondaryResultValue && (
              <>
                <Separator />
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">{secondaryResultLabel}</p>
                  <p className="text-2xl font-semibold">
                    {secondaryResultValue} {units}{results.perimeter ? '' : areaUnitSuffix}
                  </p>
                </div>
              </>
            )}
            
            {tips.length > 0 && (
              <>
                <Separator />
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">{tipsTitle}</h4>
                  <ul className="text-sm space-y-2">
                    {tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">
              Completa el formulario y haz clic en "Calcular" para ver los resultados.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;