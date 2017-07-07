import { NgZone } from "@angular/core";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
/**
 * @hidden
 */
export declare class ScrollSyncService {
    private ngZone;
    private changes;
    private elements;
    private source;
    private subscriptions;
    constructor(ngZone: NgZone);
    registerEmitter(el: any, sourceType: string): void;
    /**
     * destroy
     */
    destroy(): void;
    private scrollLeft({scrollLeft, sourceType});
}
