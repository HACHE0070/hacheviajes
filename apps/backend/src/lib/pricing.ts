export type PricingInputs = {
  basePrice: number;
  guests: number;
  serviceFeePercent: number; // 0-100
  taxRatePercent: number; // 0-100
  markupPercent: number; // 0-100
  seasonalMultiplier: number; // e.g., 1.2 for high season
  currency: string;
};

export type PriceBreakdown = {
  currency: string;
  base: number;
  guestComponent: number;
  serviceFee: number;
  markup: number;
  tax: number;
  total: number;
};

export function calculatePrice(input: PricingInputs): PriceBreakdown {
  const base = input.basePrice;
  const guestComponent = Math.max(0, input.guests - 1) * (base * 0.35);
  const subtotal = (base + guestComponent) * input.seasonalMultiplier;
  const serviceFee = subtotal * (input.serviceFeePercent / 100);
  const markup = subtotal * (input.markupPercent / 100);
  const beforeTax = subtotal + serviceFee + markup;
  const tax = beforeTax * (input.taxRatePercent / 100);
  const total = Math.round((beforeTax + tax) * 100) / 100;
  return {
    currency: input.currency,
    base: round2(base),
    guestComponent: round2(guestComponent),
    serviceFee: round2(serviceFee),
    markup: round2(markup),
    tax: round2(tax),
    total: round2(total)
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
