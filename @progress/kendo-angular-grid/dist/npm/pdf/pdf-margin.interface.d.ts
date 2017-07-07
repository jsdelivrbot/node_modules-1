/**
 * Specifies the margins of the page (numbers or strings with units). Supported units are "mm", "cm", "in" and "pt" (default).
 */
export interface PDFMargin {
    /**
     * The bottom margin. Numbers are considered to be in `"pt"` units.
     */
    bottom?: number | 'string';
    /**
     * The left margin. Numbers are considered to be in `"pt"` units.
     */
    left?: number | 'string';
    /**
     * The right margin. Numbers are considered to be in `"pt"` units.
     */
    right?: number | 'string';
    /**
     * The top margin. Numbers are considered to be in `"pt"` units.
     */
    top?: number | 'string';
}
