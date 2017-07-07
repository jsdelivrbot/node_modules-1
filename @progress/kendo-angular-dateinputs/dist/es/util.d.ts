import { CellContext } from './calendar/models/cell-context.interface';
/**
 * @hidden
 */
export declare const range: (start: number, end: number) => number[];
/**
 * @hidden
 */
export declare const isInDatesArray: (date: Date, dates?: Date[]) => boolean;
/**
 * @hidden
 */
export declare const isInRange: (candidate: Date, min: Date, max: Date) => boolean;
/**
 * @hidden
 */
export declare const isValidRange: (min: Date, max: Date) => boolean;
/**
 * @hidden
 */
export declare const dateInRange: (candidate: Date, min: Date, max: Date) => Date;
/**
 * @hidden
 */
export declare const guid: () => string;
/**
 * @hidden
 */
export declare const noop: (_: any) => void;
/**
 * @hidden
 */
export declare const isDocumentAvailable: () => boolean;
/**
 * @hidden
 */
export declare const cellContextToString: (ctx: CellContext) => string;
/**
 * @hidden
 */
export declare const stringifyClassObject: (classes: {
    [x: string]: boolean;
}) => string;
/**
 * @hidden
 */
export declare const generateDates: (start: Date, count: number) => Date[];
/**
 * @hidden
 */
export declare const monthsDistance: (d1: Date, d2: Date) => number;
/**
 * @hidden
 */
export declare const shiftWeekNames: (names: string[], offset: number) => string[];
/**
 * @hidden
 */
export declare const approximateStringMatching: (oldTextOrigin: string, oldFormat: string, newTextOrigin: string, caret: number) => any[];
