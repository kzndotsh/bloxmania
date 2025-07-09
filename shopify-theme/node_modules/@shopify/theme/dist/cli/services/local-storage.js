import { LocalStorage } from '@shopify/cli-kit/node/local-storage';
import { outputDebug, outputContent } from '@shopify/cli-kit/node/output';
let _themeLocalStorageInstance;
let _developmentThemeLocalStorageInstance;
function themeLocalStorage() {
    if (!_themeLocalStorageInstance) {
        _themeLocalStorageInstance = new LocalStorage({ projectName: 'shopify-cli-theme-conf' });
    }
    return _themeLocalStorageInstance;
}
function developmentThemeLocalStorage() {
    if (!_developmentThemeLocalStorageInstance) {
        _developmentThemeLocalStorageInstance = new LocalStorage({
            projectName: 'shopify-cli-development-theme-conf',
        });
    }
    return _developmentThemeLocalStorageInstance;
}
export function getThemeStore() {
    return themeLocalStorage().get('themeStore');
}
export function setThemeStore(store) {
    themeLocalStorage().set('themeStore', store);
}
export function getDevelopmentTheme() {
    outputDebug(outputContent `Getting development theme...`);
    return developmentThemeLocalStorage().get(getThemeStore());
}
export function setDevelopmentTheme(theme) {
    outputDebug(outputContent `Setting development theme...`);
    developmentThemeLocalStorage().set(getThemeStore(), theme);
}
export function removeDevelopmentTheme() {
    outputDebug(outputContent `Removing development theme...`);
    developmentThemeLocalStorage().delete(getThemeStore());
}
//# sourceMappingURL=local-storage.js.map