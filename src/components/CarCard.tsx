import type { Car, Scores } from '../types/domain';
import { categoryScores, featureCount, totalScore } from '../services/scoreEngine';
import { formatEuro } from '../utils/format';

interface Props {
  car: Car;
  weights: Scores;
}

export function CarCard({ car, weights }: Props) {
  const scores = categoryScores(car);
  const luggage = car.specs.trunkLiters + car.specs.frunkLiters;

  return (
    <article className="car-card">
      <div className="visual"><span className="badge">{car.segment}</span><div className="car-shape" /></div>
      <div className="card-body">
        <div className="title-row">
          <div><p className="brand">{car.brand}</p><h3>{car.model} {car.trim}</h3></div>
          <div className="score-pill">{Math.round(totalScore(car, weights))}</div>
        </div>
        <div className="stats">
          <div><span>Prijs</span><strong>{formatEuro(car.lease.pricePerMonth)}</strong></div>
          <div><span>Range</span><strong>{car.specs.rangeKm} km</strong></div>
          <div><span>DC</span><strong>{car.specs.dcChargingKw} kW</strong></div>
          <div><span>Bagage</span><strong>{luggage} L</strong></div>
        </div>
        <div className="scores">
          {Object.entries(scores).map(([key, value]) => (
            <div className="score-row" key={key}><span>{key}</span><div className="bar"><i style={{ width: `${Math.round(value)}%` }} /></div><strong>{Math.round(value)}</strong></div>
          ))}
        </div>
        <div className="chips"><span>{featureCount(car)}/19 opties</span><span>{car.dataQuality.overallConfidence}</span><span>{car.specs.doors} deuren</span></div>
        <p className="summary"><b>Plus:</b> {car.highlights.join(' · ')}</p>
        <p className="summary"><b>Let op:</b> {car.watchouts.join(' · ')}</p>
      </div>
    </article>
  );
}
