import Command from '@shopify/cli-kit/node/base-command';
export default class List extends Command {
    static description: string;
    static hidden: boolean;
    static flags: {
        'ignore-errors': import("@oclif/core/lib/interfaces/parser.js").BooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
