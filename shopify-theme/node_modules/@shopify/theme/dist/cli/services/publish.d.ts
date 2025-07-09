import { AdminSession } from '@shopify/cli-kit/node/session';
export declare function renderArgumentsWarning(id: string): void;
export declare function publish(adminSession: AdminSession, themeId: string | undefined, options: {
    force: boolean;
}): Promise<void>;
