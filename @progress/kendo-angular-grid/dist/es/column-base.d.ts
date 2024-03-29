import { TemplateRef, QueryList } from '@angular/core';
import { HeaderTemplateDirective } from './header-template.directive';
import { FooterTemplateDirective } from './footer-template.directive';
/**
 * @hidden
 */
export declare const isSpanColumn: (column: any) => any;
/**
 * @hidden
 */
export declare class ColumnBase {
    parent: ColumnBase;
    /**
     * The title of the column.
     */
    title: string;
    /**
     * The width of the column in pixels.
     */
    width: number;
    /**
     * Toggles the locked (frozen) state of the columns.
     * Locked (frozen) columns are visible at all times during the horizontal scrolling of the Grid.
     * For the option to work properly, make sure that the Grid is configured to meet the following requirements:
     * - Scrolling is enabled.
     * - The `height` option of the Grid is set.
     * - The widths of all Grid columns are explicitly set in pixels.
     * In this way, the Grid adjusts the layout of the frozen and non-frozen columns.
     *
     * @default false
     *
     * @example
     * ```ts
     * @@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" [scrollable]="scrollable" style="height: 200px">
     *          <kendo-grid-column field="ProductID" title="Product ID" width="120" [locked]="true">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    private gridData: any[];
     *
     *    constructor() {
     *        this.gridData = products;
     *    }
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     *
     * ```
     */
    locked: boolean;
    /**
     * Sets the visibility of the column.
     *
     * @default false
     */
    hidden: boolean;
    /**
     * Sets the condition that needs to be satisfied for a column to remain visible.
     *
     * If you set the `hidden` property, the behavior of `media` is overridden.
     *
     * @example
     * ```ng-template-no-run
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" [media]="'(min-width: 320px)'">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     *
     * Accepts the device identifiers that are [available in Bootstrap 4](https://v4-alpha.getbootstrap.com/layout/grid/#grid-options):
     *
     * * `"xs"`&mdash;Equivalent to `"(max-width: 576px)"`.
     * * `"sm"`&mdash;Equivalent to `"(min-width: 576px)"`.
     * * `"md"`&mdash;Equivalent to `"(min-width: 768px)"`.
     * * `"lg"`&mdash;Equivalent to `"(min-width: 992px)"`.
     * * `"xl"`&mdash;Equivalent to `"(min-width: 1200px)"`.
     *
     * @example
     * ```ng-template-no-run
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" [media]="'md'">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     */
    media: string;
    /**
     * Sets the custom styles to be applied to the column cells.
     * The `style` option uses the [NgStyle](https://angular.io/docs/ts/latest/api/common/index/NgStyle-directive.html)
     * directive to apply the property under the hood.
     *
     * @example
     * ```ts
     * @@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [style]="{'text-align': 'right'}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    style: {
        [key: string]: string;
    };
    /**
     * Sets the custom styles to be applied to the column headers.
     * The `headerStyle` option uses the [NgStyle](https://angular.io/docs/ts/latest/api/common/index/NgStyle-directive.html)
     * directive to apply the property under the hood.
     *
     * @example
     * ```ts
     * @@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [headerStyle]="{'text-align': 'right'}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    headerStyle: {
        [key: string]: string;
    };
    /**
     * Sets the custom styles for the column footers.
     * The `footerStyle` option uses the [NgStyle](https://angular.io/docs/ts/latest/api/common/index/NgStyle-directive.html)
     * directive to apply the property under the hood.
     *
     * @example
     * ```ts
     * @@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [footerStyle]="{'text-align': 'right'}">
     *              <ng-template kendoGridFooterTemplate>
     *                  footer text
     *              </ng-template>
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    footerStyle: {
        [key: string]: string;
    };
    /**
     * Sets the custom CSS classes to the column cells.
     * The `class` option uses the [NgClass](https://angular.io/docs/ts/latest/api/common/index/NgClass-directive.html)
     * directive to apply the property under the hood.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     *
     * @@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        tr .myClass {
     *            text-align: right
     *       }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [class]="{'myClass': true}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    cssClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * Sets the custom CSS classes to the column header cell.
     * The `headerClass` option uses the [NgClass](https://angular.io/docs/ts/latest/api/common/index/NgClass-directive.html)
     * directive to apply the property under the hood.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     *
     * @@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        tr .myClass {
     *            text-align: right
     *       }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [headerClass]="{'myClass': true}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    headerClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * Sets the custom CSS classes to the column footer cell.
     * The `footerClass` option uses the [NgClass](https://angular.io/docs/ts/latest/api/common/index/NgClass-directive.html)
     * directive to apply the property under the hood.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     *
     * @@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        tr .myClass {
     *            text-align: right
     *       }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [footerClass]="{'myClass': true}">
     *              <ng-template kendoGridFooterTemplate>
     *                  footer text
     *              </ng-template>
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    footerClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * @hidden
     */
    headerTemplates: QueryList<HeaderTemplateDirective>;
    /**
     * @hidden
     */
    footerTemplate: FooterTemplateDirective;
    /**
     * @hidden
     */
    readonly level: number;
    /**
     * @hidden
     */
    readonly isLocked: boolean;
    private _width;
    /**
     * @hidden
     */
    readonly colspan: number;
    /**
     * @hidden
     */
    rowspan(totalColumnLevels: number): number;
    /**
     * @hidden
     */
    readonly headerTemplateRef: TemplateRef<any>;
    /**
     * @hidden
     */
    readonly footerTemplateRef: TemplateRef<any>;
    readonly displayTitle: string;
    constructor(parent?: ColumnBase);
}
