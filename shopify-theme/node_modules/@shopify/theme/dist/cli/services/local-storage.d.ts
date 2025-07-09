export interface ThemeLocalStorageSchema {
    themeStore: string;
}
export declare function getThemeStore(): string;
export declare function setThemeStore(store: string): void;
export declare function getDevelopmentTheme(): string | undefined;
export declare function setDevelopmentTheme(theme: string): void;
export declare function removeDevelopmentTheme(): void;
