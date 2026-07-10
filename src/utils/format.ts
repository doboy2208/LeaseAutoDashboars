export const formatEuro = (value: number) => new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: value % 1 ? 2 : 0 }).format(value);
