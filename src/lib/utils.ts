import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitaliseString(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
