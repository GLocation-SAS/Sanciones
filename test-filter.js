// Test para verificar qué pasa con diferentes valores
const testValues = [
  "",
  "  ",
  "undefined",
  "null",
  "N/A",
  "—",
  "-",
  "Valor válido",
  null,
  undefined,
  []
];

const isValidFilterValue = (value) => {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  const invalidValues = ["", "undefined", "null", "—", "-", "N/A"];
  return !invalidValues.includes(trimmed);
};

testValues.forEach(val => {
  console.log('Value:', JSON.stringify(val), '=> isValid:', isValidFilterValue(val));
});

// Simular lo que hace el código
const mockData = [
  { categoria: "" },
  { categoria: "Válido" },
  { categoria: null },
  { categoria: undefined },
  { categoria: "N/A" }
];

const vals = new Set();
mockData.forEach(row => {
  const raw = row.categoria;
  if (raw === null || raw === undefined) {
    console.log('Skipping null/undefined');
  } else {
    const stringVal = String(raw);
    console.log('Processing:', JSON.stringify(raw), '=> String:', stringVal, '=> isValid:', isValidFilterValue(stringVal));
    if (isValidFilterValue(stringVal)) {
      vals.add(stringVal);
    }
  }
});

console.log('\nFinal values:', Array.from(vals));
