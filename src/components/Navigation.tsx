type Page = 'dashboard' | 'cars' | 'scoremodel' | 'matrix' | 'ranking';

interface Props {
  active: Page;
  onChange: (page: Page) => void;
}

const items: { id: Page; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'cars', label: 'Auto’s' },
  { id: 'scoremodel', label: 'Scoremodel' },
  { id: 'matrix', label: 'Functiematrix' },
  { id: 'ranking', label: 'Ranglijst' }
];

export function Navigation({ active, onChange }: Props) {
  return (
    <aside className="sidebar">
      <div className="brandmark">
        <span className="logo">EV</span>
        <span><strong>Lease Dashboard</strong><small>Levend rapport</small></span>
      </div>
      <nav className="nav">
        {items.map((item) => (
          <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => onChange(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
