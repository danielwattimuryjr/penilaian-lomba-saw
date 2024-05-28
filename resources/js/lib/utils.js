import { clsx } from 'clsx';

import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function roundToDecimalPlaces(number, decimalPlaces = 3) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
}

export function formatCurrency(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Opsional: Mengatur jumlah digit desimal minimum
    }).format(number);
}
