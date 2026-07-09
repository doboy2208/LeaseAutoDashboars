import cars from '../data/cars.json';
import features from '../data/features.json';
import scoring from '../data/scoring.json';
import type { Car, Scores } from '../types/domain';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const featureScore = (car: Car, ids: string[]) => {
  const present = ids.filter((id) => car.features[id]?.value).length;
  return (present / ids.length) * 100;
};

export const allCars = cars as Car[];
export const allFeatures = features;

export const defaultWeights = scoring.weights as Scores;

export const featureCount = (car: Car) =>
  allFeatures.filter((feature) => car.features[feature.id]?.value).length;

export const categoryScores = (car: Car): Scores => ({
  comfort: featureScore(car, scoring.groups.comfort),
  technology: featureScore(car, scoring.groups.technology),
  space: clamp(((car.specs.trunkLiters + car.specs.frunkLiters) - 300) / (971 - 300) * 100, 0, 100),
  charging: clamp((car.specs.dcChargingKw - 80) / (320 - 80) * 100, 0, 100),
  value:
    (featureCount(car) / allFeatures.length) * 100 * 0.4 +
    clamp((1050 - car.lease.pricePerMonth) / (1050 - 620) * 100, 0, 100) * 0.35 +
    clamp((car.specs.rangeKm - 300) / (625 - 300) * 100, 0, 100) * 0.25
});

export const totalScore = (car: Car, weights: Scores) => {
  const scores = categoryScores(car);
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0) || 1;
  return Object.entries(weights).reduce((sum, [key, weight]) => sum + scores[key as keyof Scores] * weight, 0) / totalWeight;
};
