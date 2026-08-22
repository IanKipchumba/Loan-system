export type RideType = "Standard" | "Comfort" | "XL";

const baseFares: Record<RideType, number> = { Standard: 18, Comfort: 26, XL: 34 };

export function estimateFare(type: RideType, distanceMiles: number): number {
  const distance = Math.max(0, distanceMiles);
  return baseFares[type] + Math.round(distance * 1.2);
}

export function canRequestRide(destination: string): boolean {
  return destination.trim().length > 0;
}
