import { ALLOWED_ROLES } from './fetch.js';
import { AbortError } from '@shopify/cli-kit/node/error';
export function filterThemes(store, themes, filter) {
    return filterByRole(store, themes, filter) || filterByTheme(store, themes, filter);
}
function filterByRole(store, themes, filter) {
    const role = filter.role;
    if (!role) {
        return;
    }
    const error = `The ${store} store doesn't have a theme with the "${role}" role`;
    return filterArray(themes, (theme) => {
        return theme.role === role;
    }).orThrow(error);
}
function filterByTheme(store, themes, filter) {
    const identifiers = filter.themeIdentifiers;
    return identifiers.flatMap((identifier) => {
        const error = `The ${store} store doesn't have a theme with the "${identifier}" ID or name`;
        return filterArray(themes, (theme) => {
            return `${theme.id}` === identifier || theme.name.toLowerCase().includes(identifier.toLowerCase());
        }).orThrow(error);
    });
}
function filterArray(themes, predicate) {
    const filteredThemes = themes.filter(predicate);
    if (filteredThemes.length > 0) {
        return { orThrow: (_errorMessage) => filteredThemes };
    }
    return {
        orThrow: (errorMessage) => {
            throw new AbortError(errorMessage);
        },
    };
}
export class Filter {
    constructor(queryProps) {
        this.queryProps = queryProps;
    }
    get role() {
        for (const role of ALLOWED_ROLES) {
            if (this.queryProps[role]) {
                return role;
            }
        }
    }
    get themeIdentifiers() {
        const identifiers = [this.queryProps.theme, this.queryProps.themes];
        return identifiers.flat().filter((i) => Boolean(i));
    }
    any() {
        return Object.values(this.queryProps).some((val) => {
            if (val?.length !== undefined) {
                return val.length > 0;
            }
            return Boolean(val);
        });
    }
}
//# sourceMappingURL=filter.js.map