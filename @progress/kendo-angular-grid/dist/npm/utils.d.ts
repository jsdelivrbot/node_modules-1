import { QueryList } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
/**
 * @hidden
 */
export declare const isPresent: (value: any) => boolean;
/**
 * @hidden
 */
export declare const isBlank: Function;
/**
 * @hidden
 */
export declare const isArray: Function;
/**
 * @hidden
 */
export declare const isTruthy: Function;
/**
 * @hidden
 */
export declare const isNullOrEmptyString: Function;
/**
 * @hidden
 */
export declare const isChanged: (propertyName: string, changes: any, skipFirstChange?: boolean) => boolean;
/**
 * @hidden
 */
export declare const anyChanged: (propertyNames: string[], changes: any, skipFirstChange?: boolean) => boolean;
/**
 * @hidden
 */
export declare const observe: <T>(list: QueryList<T>) => Observable<any>;
/**
 * @hidden
 */
export declare const isUniversal: () => boolean;
/**
 * @hidden
 */
export declare const extractFormat: (format: string) => string;
