import type { Car, FeatureDefinition } from '../types/domain';

interface Props {
  cars: Car[];
  features: FeatureDefinition[];
}

export function Matrix({ cars, features }: Props) {
  return (
    <section className="page">
      <div className="section-head"><div><p className="eyebrow">Details</p><h2>Functiematrix</h2></div></div>
      <div className="panel tablewrap">
        <table><thead><tr><th>Functie</th>{cars.map((car) => <th key={car.id}>{car.brand}<br />{car.model}</th>)}</tr></thead>
        <tbody>{features.map((feature) => (
          <tr key={feature.id}><td>{feature.label}</td>{cars.map((car) => <td key={`${car.id}-${feature.id}`} className={car.features[feature.id]?.value ? 'ok' : 'no'}>{car.features[feature.id]?.value ? '✓' : '×'}</td>)}</tr>
        ))}</tbody></table>
      </div>
    </section>
  );
}
