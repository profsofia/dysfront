export function calculatePrismVolume(width, length, height, units, toast) {
  const w = parseFloat(width);
  const l = parseFloat(length);
  const h = parseFloat(height);

  if ([w, l, h].some(v => isNaN(v) || v <= 0)) {
    toast({
      title: "Error",
      description: "Ingrese valores válidos para ancho, largo y altura",
      variant: "destructive",
    });
    return null;
  }

  return {
    volume: w * l * h,
    surfaceArea: 2 * (w*l + w*h + l*h),
    units,
  };
}

export function calculateCylinderVolume(radius, height, units, toast) {
  const r = parseFloat(radius);
  const h = parseFloat(height);

  if ([r, h].some(v => isNaN(v) || v <= 0)) {
    toast({
      title: "Error",
      description: "Ingrese valores válidos para radio y altura",
      variant: "destructive",
    });
    return null;
  }

  return {
    volume: Math.PI * r * r * h,
    surfaceArea: 2 * Math.PI * r * (r + h),
    units,
  };
}

export function calculateExcavationVolume(
  length,
  width,
  depth,
  slope,
  units,
  toast
) {
  const l = parseFloat(length);
  const w = parseFloat(width);
  const d = parseFloat(depth);
  const s = parseFloat(slope);

  if ([l, w, d].some(v => isNaN(v) || v <= 0)) {
    toast({
      title: "Error",
      description: "Ingrese valores válidos para la excavación",
      variant: "destructive",
    });
    return null;
  }

  // volumen base
  let volume = l * w * d;

  // ajuste por pendiente (simplificado)
  if (s > 0) {
    volume *= (1 + s * 0.5);
  }

  return {
    volume,
    units,
  };
}
