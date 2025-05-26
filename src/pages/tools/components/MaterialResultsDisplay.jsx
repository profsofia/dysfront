import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { HelpCircle } from 'lucide-react';

const MaterialResultsDisplay = ({ results, mainResultLabel, mainResultUnit, recommendations = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados</CardTitle>
        <CardDescription>
          Los materiales necesarios aparecerán aquí.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {results ? (
          <div className="space-y-6">
            <div className="text-center p-6 bg-primary/10 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">{mainResultLabel}</p>
              <p className="text-4xl font-bold text-primary">
                {results.mainResult} {mainResultUnit}
              </p>
              {results.details && (
                <>
                  <p className="text-sm text-gray-500 mt-4">Detalles</p>
                  <p className="text-sm">{results.details}</p>
                </>
              )}
            </div>
            
            <Separator />
            
            {results.materials && results.materials.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Materiales necesarios:</h4>
                <ul className="space-y-3">
                  {results.materials.map((material, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{material.name}</span>
                      <span className="font-semibold">{material.amount} {material.unit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {recommendations.length > 0 && (
              <>
                <Separator />
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Recomendaciones:</h4>
                  <ul className="text-sm space-y-2">
                    {recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
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

export default MaterialResultsDisplay;