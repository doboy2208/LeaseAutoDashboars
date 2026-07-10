import { useMemo, useState } from 'react';
import type { Page } from './types/navigation';
import type { Scores } from './types/domain';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { Cars } from './pages/Cars';
import { ScoreModel } from './pages/ScoreModel';
import { Matrix } from './pages/Matrix';
import { Ranking } from './pages/Ranking';
import { allCars } from './services/carRepository';
import { allFeatures, defaultWeights, totalScore } from './services/scoreEngine';

export function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [weights, setWeights] = useState<Scores>(defaultWeights);
  const [query, setQuery] = useState('');
  const [segment, setSegment] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1100);
  const [minRange, setMinRange] = useState(300);

  const segments = ['all', ...Array.from(new Set(allCars.map((car) => car.segment)))];

  const filteredCars = useMemo(
    () =>
      allCars
        .filter((car) =>
          `${car.brand} ${car.model} ${car.trim}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
        .filter((car) => segment === 'all' || car.segment === segment)
        .filter((car) => car.lease.pricePerMonth <= maxPrice)
        .filter((car) => car.specs.rangeKm >= minRange)
        .sort((a, b) => totalScore(b, weights) - totalScore(a, weights)),
    [query, segment, maxPrice, minRange, weights]
  );

  return (
    <div className="app-shell">
      <Navigation active={page} onChange={setPage} />

      <main className="main">
        <header className="hero">
          <p className="eyebrow">Lease Intelligence Platform</p>
          <h1>Elektrische leaseauto’s vergelijken</h1>
          <p>
            React + TypeScript met één JSON-bestand per auto en afbeeldingen in
            autokaarten.
          </p>
        </header>

        {page === 'cars' && (
          <section className="toolbar">
            <label>
              Zoeken
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Merk of model"
              />
            </label>

            <label>
              Segment
              <select
                value={segment}
                onChange={(event) => setSegment(event.target.value)}
              >
                {segments.map((item) => (
                  <option key={item} value={item}>
                    {item === 'all' ? 'Alle segmenten' : item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Max. prijs
              <input
                type="range"
                min="600"
                max="1100"
                step="10"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
              <b>€ {maxPrice}</b>
            </label>

            <label>
              Min. bereik
              <input
                type="range"
                min="300"
                max="650"
                step="10"
                value={minRange}
                onChange={(event) => setMinRange(Number(event.target.value))}
              />
              <b>{minRange} km</b>
            </label>
          </section>
        )}

        {page === 'dashboard' && <Dashboard cars={allCars} weights={weights} />}
        {page === 'cars' && <Cars cars={filteredCars} weights={weights} />}
        {page === 'scoremodel' && (
          <ScoreModel weights={weights} setWeights={setWeights} />
        )}
        {page === 'matrix' && (
          <Matrix cars={allCars} features={allFeatures} />
        )}
        {page === 'ranking' && <Ranking cars={allCars} weights={weights} />}
      </main>
    </div>
  );
}
