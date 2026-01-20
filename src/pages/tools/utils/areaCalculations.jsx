export function calculateRectangleArea(width, length, units, toast) {
  const w = parseFloat(width);
  const l = parseFloat(length);

  if (isNaN(w) || isNaN(l) || w <= 0 || l <= 0) {
    toast({
      title: "Error",
      description: "Ingrese valores válidos para ancho y largo",
      variant: "destructive",
    });
    return null;
  }

  return {
    area: w * l,
    perimeter: 2 * (w + l),
    units,
  };
}

export function calculateTriangleArea(base, height, units, toast) {
  const b = parseFloat(base);
  const h = parseFloat(height);

  if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
    toast({
      title: "Error",
      description: "Ingrese valores válidos para base y altura",
      variant: "destructive",
    });
    return null;
  }

  return {
    area: (b * h) / 2,
    units,
  };
}

export function calculateCircleArea(radius, units, toast) {
  const r = parseFloat(radius);

  if (isNaN(r) || r <= 0) {
    toast({
      title: "Error",
      description: "Ingrese un radio válido",
      variant: "destructive",
    });
    return null;
  }

  return {
    area: Math.PI * r * r,
    circumference: 2 * Math.PI * r,
    units,
  };
}

export function calculatePolygonArea(points, units, toast) {
  if (!points || points.length < 3) {
    toast({
      title: "Error",
      description: "Un polígono necesita al menos 3 puntos",
      variant: "destructive",
    });
    return null;
  }

  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area +=
      points[i].x * points[j].y -
      points[j].x * points[i].y;
  }

  return {
    area: Math.abs(area / 2),
    units,
  };
}
