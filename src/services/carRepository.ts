import type { Car } from '../types/domain';

const modules = import.meta.glob('../data/cars/*.json', { eager: true }) as Record<string, { default: Car }>;

export const allCars: Car[] = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model));
