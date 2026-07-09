export type Confidence = 'high' | 'medium' | 'low';
export type MaintenanceStatus = 'concept' | 'in_verification' | 'verified' | 'review_needed';

export interface FeatureValue {
  value: boolean;
  confidence: Confidence;
}

export interface FeatureDefinition {
  id: string;
  label: string;
  type: 'boolean';
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  trim: string;
  segment: string;
  lease: { pricePerMonth: number; contractKmPerYear: number };
  specs: { rangeKm: number; dcChargingKw: number; acChargingKw: number; doors: number; trunkLiters: number; frunkLiters: number };
  dataQuality: { overallConfidence: Confidence; maintenanceStatus: MaintenanceStatus };
  highlights: string[];
  watchouts: string[];
  features: Record<string, FeatureValue>;
}

export interface Scores {
  comfort: number;
  technology: number;
  space: number;
  charging: number;
  value: number;
}
