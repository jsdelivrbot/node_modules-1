import { OnDestroy, NgZone, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SuspendService } from '../suspend.service';
import { PDFService } from './pdf.service';
import { PDFMarginComponent } from './pdf-margin.component';
import { PDFMargin } from './pdf-margin.interface';
import { PDFTemplateDirective } from './pdf-template.directive';
import { ColumnBase } from '../column-base';
/**
 * Configures the PDF export settings of the Kendo UI Grid.
 */
export declare class PDFComponent implements OnDestroy {
    protected pdfService: PDFService;
    protected suspendService: SuspendService;
    protected ngZone: NgZone;
    /**
     * Exports all Grid pages, starting from the first one.
     */
    allPages: boolean;
    /**
     * The author of the PDF document.
     */
    author: string;
    /**
     * A flag indicating whether to produce actual hyperlinks in the exported PDF file.
     * It is also possible to set a CSS selector. All matching links will be ignored.
     */
    avoidLinks: boolean | string;
    /**
     * The creator of the PDF document.
     * @default "Kendo UI PDF Generator"
     */
    creator: string;
    /**
     * The date when the PDF document is created. Defaults to `new Date()`.
     */
    date: Date;
    /**
     * Specifies the file name of the exported PDF file.
     * @default "Export.pdf"
     */
    fileName: string;
    /**
     * If set to `true`, the content is forwarded to `proxyURL` even if the browser supports the saving of files locally.
     */
    forceProxy: boolean;
    /**
     * Specifies the keywords of the exported PDF file.
     */
    keywords: string;
    /**
     * If set to `true`, reverses the paper dimensions so that the width corresponds to the longer side.
     */
    landscape: boolean;
    /**
     * Specifies the margins of the page (numbers or strings with units).
     *
     * The supported units are:
     * * `"mm"`
     * * `"cm"`
     * * `"in"`
     * * (Default) `"pt"`
     */
    margin: PDFMargin;
    /**
     * Specifies the paper size of the PDF document. Defaults to `"auto"` which means that the paper size is determined by the content.
     * The size of the content in pixels matches the size of the output in points (1 pixel = 1/72 inch).
     * If set, the Grid uses an automatic page-breaking algorithm.
     * This enables the `repeatHeaders` and `scale` options and allows you to specify a template.
     *
     * The supported values are:
     * - A predefined size: `A4`, `A3`, and so on.
     * - An array of two numbers that specifies the width and height in points (1pt = 1/72in).
     * - An array of two strings that specifies the width and height in units. The supported units are `"mm"`, `"cm"`, `"in"`, and `"pt"`.
     */
    paperSize: string | number[] | string[];
    /**
     * If set to `true`, repeats the Grid headers on each page.
     */
    repeatHeaders: boolean;
    /**
     * A scale factor.
     *
     * The text size on the screen might be too big for print.
     * To scale down the output in PDF, use this option.
     */
    scale: number;
    /**
     * The URL of the server-side proxy which streams the file to the end user.
     * You need to use a proxy if the browser is not capable of saving files locally&mdash;for example, Internet Explorer 9 and Safari.
     * The responsibility for implementing the server-side proxy is yours.
     *
     * In the request body, the proxy receives a POST request with the following parameters:
     *
     * - `"contentType"`&mdash;The MIME type of the file.
     * - `"base64"`&mdash;The base-64 encoded file content.
     * - `"fileName"`&mdash;The file name, as requested by the caller.
     *
     * The proxy returns the decoded file with the `"Content-Disposition"` header set to `attachment; filename="<fileName.pdf>"`.
     */
    proxyURL: string;
    /**
     * A name or keyword that indicates where to display the document that is returned from the proxy.
     * To display the document in a new window or iframe,
     * the proxy has to set the `"Content-Disposition"` header to `inline; filename="<fileName.pdf>"`.
     * @default "_self"
     */
    proxyTarget: string;
    /**
     * Sets the subject of the PDF file.
     */
    subject: string;
    /**
     * Sets the title of the PDF file.
     */
    title: string;
    /**
     * @hidden
     */
    pageTemplateDirective: PDFTemplateDirective;
    /**
     * @hidden
     */
    marginComponent: PDFMarginComponent;
    columns: QueryList<ColumnBase>;
    protected progress: HTMLElement;
    protected component: any;
    protected container: HTMLElement;
    protected skip: number;
    protected pageSize: number;
    protected originalHeight: string;
    protected originalOverflow: string;
    protected saveSubscription: Subscription;
    protected renderAllPages: boolean;
    protected originalColumns: ColumnBase[];
    protected pageTemplate: any;
    constructor(pdfService: PDFService, suspendService: SuspendService, ngZone: NgZone);
    ngOnDestroy(): void;
    protected savePDF(component: any): void;
    protected initProgress(): void;
    protected applyScroll(overlay: HTMLElement): void;
    protected draw(): void;
    protected drawDOM(element: HTMLElement, options: any): void;
    protected saveFile(dataURI: string): void;
    protected complete(): void;
    protected removeContainer(): void;
    protected changePage(skip: number, take: number, callback: () => void, columns?: any[]): void;
    protected changeColumns(columns: any[], callback: () => void): void;
    protected reset(): void;
    protected readonly drawOptions: any;
    protected readonly drawMargin: any;
    protected onStable(callback: () => void): void;
}
