import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const CalculatorForm = ({ type, fields, units }) => {
  if (type === 'poligono') {
    const { points, setPoints, toast } = fields;

    const addPolygonPoint = () => {
      setPoints([...points, { x: '', y: '' }]);
    };
  
    const removePolygonPoint = (index) => {
      if (points.length > 3) {
        const newPoints = [...points];
        newPoints.splice(index, 1);
        setPoints(newPoints);
      } else {
        toast({
          title: "Error",
          description: "Un polígono debe tener al menos 3 puntos.",
          variant: "destructive",
        });
      }
    };
  
    const updatePolygonPoint = (index, field, value) => {
      const newPoints = [...points];
      newPoints[index][field] = value;
      setPoints(newPoints);
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Coordenadas de los puntos</Label>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addPolygonPoint}
            className="text-xs"
          >
            Añadir punto
          </Button>
        </div>
        
        {points.map((point, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <div className="flex">
                <div className="flex items-center justify-center bg-muted px-3 rounded-l-md border border-r-0">
                  X
                </div>
                <Input
                  type="number"
                  placeholder="X"
                  value={point.x}
                  onChange={(e) => updatePolygonPoint(index, 'x', e.target.value)}
                  className="rounded-l-none"
                />
              </div>
              <div className="flex">
                <div className="flex items-center justify-center bg-muted px-3 rounded-l-md border border-r-0">
                  Y
                </div>
                <Input
                  type="number"
                  placeholder="Y"
                  value={point.y}
                  onChange={(e) => updatePolygonPoint(index, 'y', e.target.value)}
                  className="rounded-l-none"
                />
              </div>
            </div>
            {points.length > 3 && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => removePolygonPoint(index)}
                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              >
                ×
              </Button>
            )}
          </div>
        ))}
      </div>
    );
  }

  const gridColsClass = fields.length === 3 ? 'sm:grid-cols-3' : 
                        fields.length === 4 ? 'sm:grid-cols-2' : // For material calculator specific layouts
                        'sm:grid-cols-2';
  
  return (
    <div className={`grid grid-cols-1 ${gridColsClass} gap-4 ${fields.length === 1 ? 'max-w-sm mx-auto' : ''}`}>
      {fields.map(field => (
        <div key={field.id} className={`space-y-2 ${field.type === 'select' && fields.length === 4 ? 'sm:col-span-1' : ''}`}>
          <Label htmlFor={field.id}>{field.label}</Label>
          {field.type === 'select' ? (
            <Select value={field.value} onValueChange={field.setter}>
              <SelectTrigger id={field.id}>
                <SelectValue placeholder={`Seleccionar ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex">
              <Input
                id={field.id}
                type="number"
                placeholder={field.label}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
              />
              {field.unit && (
                <div className="flex items-center justify-center bg-muted px-3 rounded-r-md border border-l-0">
                  {field.unit}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CalculatorForm;