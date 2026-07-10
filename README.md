# Lease Dashboard React v2

Aangepast volgens de afgesproken architectuur:

- Eén JSON-bestand per auto in `src/data/cars/`
- `src/data/index.json` als auto-index
- `imageUrl` per auto voor echte afbeeldingen in autokaarten
- Fallback als een afbeelding niet laadt

## Starten

```bash
npm install
npm run dev
```

## Nieuwe auto toevoegen

1. Maak een nieuw JSON-bestand in `src/data/cars/`.
2. Voeg de auto toe aan `src/data/index.json`.
3. Zorg dat `imageUrl` gevuld is.
