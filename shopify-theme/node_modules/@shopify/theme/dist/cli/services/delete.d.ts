import { AdminSession } from '@shopify/cli-kit/node/session';
export interface DeleteOptions {
    selectTheme: boolean;
    development: boolean;
    force: boolean;
    themes: string[];
}
export declare function deleteThemes(adminSession: AdminSession, options: DeleteOptions): Promise<void>;
export declare function renderDeprecatedArgsWarning(argv: string[]): void;
