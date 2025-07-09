import { getDevelopmentTheme, setDevelopmentTheme, removeDevelopmentTheme } from '../services/local-storage.js';
import { ThemeManager } from '@shopify/cli-kit/node/themes/theme-manager';
import { AbortError } from '@shopify/cli-kit/node/error';
export const DEVELOPMENT_THEME_NOT_FOUND = (themeId) => `Development theme #${themeId} could not be found. Please create a new development theme.`;
export const NO_DEVELOPMENT_THEME_ID_SET = 'No development theme ID has been set. Please create a development theme first.';
export class DevelopmentThemeManager extends ThemeManager {
    constructor(adminSession) {
        super(adminSession);
        this.context = 'Development';
        this.themeId = getDevelopmentTheme();
    }
    async find() {
        const theme = await this.fetch();
        if (!theme) {
            throw new AbortError(this.themeId ? DEVELOPMENT_THEME_NOT_FOUND(this.themeId) : NO_DEVELOPMENT_THEME_ID_SET);
        }
        return theme;
    }
    setTheme(themeId) {
        setDevelopmentTheme(themeId);
    }
    removeTheme() {
        removeDevelopmentTheme();
    }
}
//# sourceMappingURL=development-theme-manager.js.map