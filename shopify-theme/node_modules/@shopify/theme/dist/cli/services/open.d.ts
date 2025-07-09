import { AdminSession } from '@shopify/cli-kit/node/session';
export declare function open(adminSession: AdminSession, options: {
    development: boolean;
    live: boolean;
    editor: boolean;
    theme: string | undefined;
}): Promise<void>;
