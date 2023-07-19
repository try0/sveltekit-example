import i18next from 'i18next';
import { t } from 'i18next';
import i18n_en from '$lib/i18n/en.json';
import i18n_ja from '$lib/i18n/ja.json';
import { writable } from 'svelte/store';

export interface I18n {
    init(): void;
    change(lang: string): void;
}

i18next
    .init({
        lng: 'ja',
        fallbackLng: 'ja',
        resources: {
            en: { translation: i18n_en },
            ja: { translation: i18n_ja }
        }
    });

export let str = writable(t);

export const i18n: I18n = {
    init: (): void => {
        i18next
            .init({
                lng: window.localStorage.getItem('lang') ?? 'ja',
                fallbackLng: 'ja',
                resources: {
                    en: { translation: i18n_en },
                    ja: { translation: i18n_ja }
                }
            })
            .then(() => {
                str.set(t);
            });
    },
    change: (lang: string): void => {
        i18next.changeLanguage(lang).then(() => {
            str.set(t);
        });

        window.localStorage.setItem('lang', lang);
    }
}
