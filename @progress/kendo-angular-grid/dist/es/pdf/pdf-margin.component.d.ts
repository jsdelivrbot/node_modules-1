import { PDFMargin } from './pdf-margin.interface';
export declare class PDFMarginComponent implements PDFMargin {
    bottom: number | 'string';
    left: number | 'string';
    right: number | 'string';
    top: number | 'string';
    /**
     * @hidden
     */
    readonly options: any;
}
