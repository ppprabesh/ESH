import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `NPR ${price.toLocaleString('en-NP', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}
