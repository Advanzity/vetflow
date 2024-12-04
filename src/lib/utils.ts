
import clsx, { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function twMerge(...classes: ClassValue[]) {
    return classes.filter(Boolean).join(' ');
}