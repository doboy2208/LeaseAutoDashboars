import type { Car, Scores } from '../types/domain';
import { CarCard } from '../components/CarCard';
interface Props { cars: Car[]; weights: Scores }
export function Cars({ cars, weights }: Props) { return <section className="page"><div className="section-head"><div><p className="eyebrow">Shortlist</p><h2>Auto’s</h2></div><small>{cars.length} auto’s</small></div><div className="car-grid">{cars.map((car)=><CarCard key={car.id} car={car} weights={weights} />)}</div></section>; }
