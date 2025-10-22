export function calculatePrice(input) {
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
function round2(n) {
    return Math.round(n * 100) / 100;
}
