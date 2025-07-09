import Dev from './dev.js';
export default class Serve extends Dev {
    static hidden: boolean;
    run(): Promise<void>;
}
