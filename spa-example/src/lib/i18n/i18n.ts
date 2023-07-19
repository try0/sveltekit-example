import i18next from 'i18next';
import { t } from 'i18next';
import i18n_en from '$lib/i18n/en.json';
import i18n_ja from '$lib/i18n/ja.json';

import zod_en from 'zod-i18n-map/locales/en/zod.json';
import zod_ja from 'zod-i18n-map/locales/ja/zod.json';
import { writable } from 'svelte/store';
import { zodI18nMap } from "zod-i18n-map"
import { z } from "zod";

export interface I18n {
    init(): void;
    change(lang: string): void;
}

i18next
    .init({
        lng: 'ja',
        fallbackLng: 'ja',
        resources: {
            en: { translation: i18n_en, zod: zod_en },
            ja: { translation: i18n_ja, zod: zod_ja }
        }
    });
z.setErrorMap(zodI18nMap);

export let str = writable(t);

export const i18n: I18n = {
    init: (): void => {
        i18next
            .init({
                lng: window.localStorage.getItem('lang') ?? 'ja',
                fallbackLng: 'ja',
                resources: {
                    en: { translation: i18n_en, zod: zod_en },
                    ja: { translation: i18n_ja, zod: zod_ja }
                }
            })
            .then(() => {
                str.set(t);
                z.setErrorMap(zodI18nMap);
            });
    },
    change: (lang: string): void => {
        i18next.changeLanguage(lang).then(() => {
            str.set(t);
            z.setErrorMap(zodI18nMap);
        });

        window.localStorage.setItem('lang', lang);

    }
}
