export function calculateConcrete(
  length,
  width,
  thickness,
  concreteType,
  units,
  toast
) {
  const l = parseFloat(length);
  const w = parseFloat(width);
  const t = parseFloat(thickness);

  if ([l, w, t].some(v => isNaN(v) || v <= 0)) {
    toast({
      title: "Error",
      description: "Ingrese largo, ancho y espesor válidos",
      variant: "destructive",
    });
    return null;
  }

  const volume = l * w * t;

  const densityFactor = {
    standard: 2400,
    highStrength: 2500,
    lightweight: 1800,
    foundation: 2450,
  }[concreteType] || 2400;

  return {
    mainResult: volume,
    weightKg: volume * densityFactor,
    units,
  };
}

export function calculateBricks(
  wallLength,
  wallHeight,
  brickType,
  mortarPercent,
  units,
  toast
) {
  const l = parseFloat(wallLength);
  const h = parseFloat(wallHeight);
  const m = parseFloat(mortarPercent);

  if ([l, h].some(v => isNaN(v) || v <= 0)) {
    toast({
      title: "Error",
      description: "Ingrese dimensiones válidas del muro",
      variant: "destructive",
    });
    return null;
  }

  const area = l * h;

  const bricksPerM2 = {
    standard: 50,
    block: 12.5,
    thin: 60,
  }[brickType] || 50;

  let bricks = area * bricksPerM2;
  bricks *= 1 + m / 100;

  return {
    mainResult: Math.ceil(bricks),
    area,
    units,
  };
}

export function calculatePaint(
  wallArea,
  coats,
  paintType,
  units,
  toast
) {
  const area = parseFloat(wallArea);
  const c = parseInt(coats, 10);

  if (isNaN(area) || area <= 0) {
    toast({
      title: "Error",
      description: "Ingrese un área válida a pintar",
      variant: "destructive",
    });
    return null;
  }

  const coverage = {
    latex: 10,
    acrylic: 12,
    oil: 8,
    primer: 6,
  }[paintType] || 10;

  const liters = (area / coverage) * c;

  return {
    mainResult: liters.toFixed(2),
    coats: c,
    units,
  };
}
