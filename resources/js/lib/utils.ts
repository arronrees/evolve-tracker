import { BreadcrumbItem } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Replacement {
    find: string;
    replace: string;
}

export const replacePlaceholders = (str: string, replacements: Replacement[]): string => {
    for (let i = 0; i < replacements.length; i++) {
        const { find, replace } = replacements[i];

        str = str.replace(find, replace);
    }

    return str;
};

export const mapBreadcrumbs = (
    breadcrumbs: BreadcrumbItem[],
    linkReplacements: Replacement[],
    titleReplacements: Replacement[] = [],
): BreadcrumbItem[] => {
    return breadcrumbs.map((item) => ({
        ...item,
        title: replacePlaceholders(item.title, titleReplacements),
        href: replacePlaceholders(item.href, linkReplacements),
    }));
};
