export default function formatCurrency(
  value?: number,
  showCurrencySymbol?: boolean,
): string {
  if (value === undefined) {
    return '';
  }

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return showCurrencySymbol
    ? formattedValue
    : formattedValue.replace('R$', '').trim();
}
