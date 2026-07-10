import type { Car, Scores } from '../types/domain';
import { totalScore } from '../services/scoreEngine';
import { formatEuro } from '../utils/format';

interface Props { cars: Car[]; weights: Scores }

export function Dashboard({ cars, weights }: Props) {
  const ranked = [...cars].sort((a, b) => totalScore(b, weights) - totalScore(a, weights));
  const best = ranked[0], cheapest = [...cars].sort((a, b) => a.lease.pricePerMonth - b.lease.pricePerMonth)[0], longest = [...cars].sort((a, b) => b.specs.rangeKm - a.specs.rangeKm)[0], roomiest = [...cars].sort((a, b) => (b.specs.trunkLiters + b.specs.frunkLiters) - (a.specs.trunkLiters + a.specs.frunkLiters))[0];
  return <section className="page"><div className="section-head"><div><p className="eyebrow">Overzicht</p><h2>Dashboard</h2></div></div><div className="kpi-grid"><article className="kpi"><span>Beste totaal</span><strong>{Math.round(totalScore(best, weights))}</strong><p>{best.brand} {best.model}</p></article><article className="kpi"><span>Laagste prijs</span><strong>{formatEuro(cheapest.lease.pricePerMonth)}</strong><p>{cheapest.brand} {cheapest.model}</p></article><article className="kpi"><span>Meeste range</span><strong>{longest.specs.rangeKm} km</strong><p>{longest.brand} {longest.model}</p></article><article className="kpi"><span>Meeste ruimte</span><strong>{roomiest.specs.trunkLiters + roomiest.specs.frunkLiters} L</strong><p>{roomiest.brand} {roomiest.model}</p></article></div><div className="panel"><p className="eyebrow">Advies</p><h2>Top 3 prijs/kwaliteit</h2><div className="top-grid">{ranked.slice(0,3).map((car,index)=><article className="top-card" key={car.id}><div className="rank">{index+1}</div><h3>{car.brand} {car.model}</h3><p>Score {Math.round(totalScore(car, weights))}/100 · {formatEuro(car.lease.pricePerMonth)} p/m · {car.specs.rangeKm} km WLTP</p><p>{car.highlights[0]}</p></article>)}</div></div></section>;
}
