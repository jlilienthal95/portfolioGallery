import { writable } from 'svelte/store';

type Image = {
    path: string,
    sha?: string,
    size?: number,
    type?: string,
    url?: string,
  };

export const imagesState = writable<Image[]>([]);