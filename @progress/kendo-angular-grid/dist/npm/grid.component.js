"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/map");
require("rxjs/add/operator/merge");
require("rxjs/add/operator/groupBy");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var column_component_1 = require("./column.component");
var column_group_component_1 = require("./column-group.component");
var detail_template_directive_1 = require("./detail-template.directive");
var utils_1 = require("./utils");
var browser_support_service_1 = require("./browser-support.service");
var data_collection_1 = require("./data.collection");
var selection_service_1 = require("./selection.service");
var edit_service_1 = require("./edit.service");
var details_service_1 = require("./details.service");
var groups_service_1 = require("./grouping/groups.service");
var columns_container_1 = require("./columns-container");
var group_info_service_1 = require("./grouping/group-info.service");
var group_connection_service_1 = require("./grouping/group-connection.service");
var list_component_1 = require("./list.component");
var change_notification_service_1 = require("./change-notification.service");
var no_records_template_directive_1 = require("./no-records-template.directive");
var column_base_1 = require("./column-base");
var row_sync_1 = require("./row-sync");
var cell_context_1 = require("./cell-context");
var kendo_angular_l10n_2 = require("@progress/kendo-angular-l10n");
var filter_service_1 = require("./filtering/filter.service");
var pager_template_directive_1 = require("./pager/pager-template.directive");
var pager_context_service_1 = require("./pager/pager-context.service");
var pdf_service_1 = require("./pdf/pdf.service");
var pdf_export_event_1 = require("./pdf/pdf-export-event");
var suspend_service_1 = require("./suspend.service");
var responsive_service_1 = require("./responsive.service");
var excel_service_1 = require("./excel/excel.service");
var column_list_1 = require("./column-list");
var toolbar_template_directive_1 = require("./toolbar-template.directive");
var column_common_1 = require("./column-common");
var scroll_sync_service_1 = require("./scroll-sync.service");
var createControl = function (source) { return function (acc, key) {
    acc[key] = new forms_1.FormControl(source[key]);
    return acc;
}; };
/**
 * Represents the Kendo UI Grid component for Angular.
 *
 * @example
 * ```ts-preview
 * @@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *        </kendo-grid>
 *    `
 * })
 * class AppComponent {
 *    private gridData: any[] = products;
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
 * ```
 */
var GridComponent = (function () {
    function GridComponent(supportService, selectionService, wrapper, groupInfoService, groupsService, changeNotification, detailsService, editService, filterService, pdfService, responsiveService, renderer, excelService, ngZone, scrollSyncService, rtl) {
        var _this = this;
        this.wrapper = wrapper;
        this.groupInfoService = groupInfoService;
        this.groupsService = groupsService;
        this.changeNotification = changeNotification;
        this.detailsService = detailsService;
        this.editService = editService;
        this.filterService = filterService;
        this.pdfService = pdfService;
        this.responsiveService = responsiveService;
        this.renderer = renderer;
        this.excelService = excelService;
        this.ngZone = ngZone;
        this.scrollSyncService = scrollSyncService;
        this.rtl = rtl;
        /**
         * Sets the data of the Grid. If an array is provided, the Grid automatically gets the total count.
         */
        this.data = [];
        /**
         * Defines the number of records to be skipped by the pager.
         * Required by the [paging]({% slug paging_grid_kendouiforangular %}) functionality.
         */
        this.skip = 0;
        /**
         * Defines the scroll mode used by the Grid.
         *
         * The available options are:
         *  - `none`&mdash;Renders no scrollbar.
         *  - `scrollable`&mdash;This is the default scroll mode. It requires the setting of the `height` option.
         *  - `virtual`&mdash;Displays no pager and renders a portion of the data (optimized rendering) while the user is scrolling the content.
         */
        this.scrollable = 'scrollable';
        /**
         * Enables the single-row [selection]({% slug selection_grid_kendouiforangular %}) of the Grid.
         */
        this.selectable = false;
        /**
         * Enables the [filtering]({% slug filtering_grid_kendouiforangular %}) of the Grid columns that have their `field` option set.
         */
        this.filterable = false;
        /**
         * Enables the [sorting]({% slug sorting_grid_kendouiforangular %}) of the Grid columns that have their `field` option set.
         */
        this.sortable = false;
        /**
         * Configures the pager of the Grid.
         *
         * The available options are:
         *
         * - `buttonCount: Number`&mdash;Sets the maximum numeric buttons count before the buttons are collapsed.
         * - `info: Boolean`&mdash;Toggles the information about the current page and the total number of records.
         * - `type: PagerType`&mdash;Accepts the `numeric` (buttons with numbers) and `input` (input for typing the page number) values.
         * - `pageSizes: Boolean` or `Array<number>`&mdash;Shows a menu for selecting the page size.
         * - `previousNext: Boolean`&mdash;Toggles the **Previous** and **Next** buttons.
         */
        this.pageable = false;
        /**
         * If set to `true`, the user can group the Grid by dragging the column header cells.
         * By default, grouping is disabled.
         */
        this.groupable = false;
        /**
         * Fires when the Grid filter is modified through the UI.
         * You have to handle the event yourself and filter the data.
         */
        this.filterChange = new core_1.EventEmitter();
        /**
         * Fires when the page of the Grid is changed.
         * You have to handle the event yourself and page the data.
         */
        this.pageChange = new core_1.EventEmitter();
        /**
         * Fires when the grouping of the Grid is changed.
         * You have to handle the event yourself and group the data.
         */
        this.groupChange = new core_1.EventEmitter();
        /**
         * Fires when the sorting of the Grid is changed.
         * You have to handle the event yourself and sort the data.
         */
        this.sortChange = new core_1.EventEmitter();
        /**
         * Fires when the user selects a Grid row.
         * Emits the [`SelectionEvent`]({% slug api_grid_selectionevent_kendouiforangular %}#toc-selectionchange).
         */
        this.selectionChange = new core_1.EventEmitter();
        /**
         * Fires when the data state of the Grid is changed.
         */
        this.dataStateChange = new core_1.EventEmitter();
        /**
         * Fires when the user expands a group header.
         */
        this.groupExpand = new core_1.EventEmitter();
        /**
         * Fires when the user collapses a group header.
         */
        this.groupCollapse = new core_1.EventEmitter();
        /**
         * Fires when the user expands a master row.
         */
        this.detailExpand = new core_1.EventEmitter();
        /**
         * Fires when the user collapses a master row.
         */
        this.detailCollapse = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Edit** command button to edit a row.
         */
        this.edit = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Cancel** command button to close a row.
         */
        this.cancel = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Save** command button to save changes in a row.
         */
        this.save = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Remove** command button to remove a row.
         */
        this.remove = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Add** command button to add a new row.
         */
        this.add = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Export to PDF** command button.
         */
        this.pdfExport = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Export to Excel** command button.
         */
        this.excelExport = new core_1.EventEmitter();
        this.columns = new core_1.QueryList();
        this.columnsContainer = new columns_container_1.ColumnsContainer(function () { return _this.columnList.filter(function (column) { return !_this.isHidden(column) && _this.matchesMedia(column); }); });
        this.view = new data_collection_1.DataCollection(function () { return new data_collection_1.DataResultIterator(_this.data, _this.skip, _this.showGroupFooters); });
        this.shouldGenerateColumns = true;
        this._sort = new Array();
        this._group = new Array();
        this.cachedWindowWidth = 0;
        this._rowClass = function () { return null; };
        this.direction = rtl ? 'rtl' : 'ltr';
        this.scrollbarWidth = supportService.scrollbarWidth;
        this.groupInfoService.registerColumnsContainer(function () { return _this.columnList; });
        if (selectionService) {
            this.selectionSubscription = selectionService.changes.subscribe(function (event) {
                _this.selectionChange.emit(event);
            });
        }
        this.groupExpandCollapseSubscription = groupsService.changes
            .filter(function (_a) {
            var dataItem = _a.dataItem;
            return utils_1.isPresent(dataItem);
        })
            .subscribe(function (_a) {
            var expand = _a.expand, group = _a.dataItem;
            return !expand ?
                _this.groupExpand.emit({ group: group }) :
                _this.groupCollapse.emit({ group: group });
        });
        this.detailsServiceSubscription = detailsService.changes
            .filter(function (_a) {
            var dataItem = _a.dataItem;
            return utils_1.isPresent(dataItem);
        })
            .subscribe(function (_a) {
            var expand = _a.expand, dataItem = _a.dataItem, index = _a.index;
            return expand ?
                _this.detailExpand.emit({ dataItem: dataItem, index: index }) :
                _this.detailCollapse.emit({ dataItem: dataItem, index: index });
        });
        this.filterSubscription = this.filterService.changes.subscribe(function (x) {
            _this.filterChange.emit(x);
        });
        this.attachStateChangesEmitter();
        this.attachEditHandlers();
        this.pdfSubscription = this.pdfService.exportClick.subscribe(this.emitPDFExportEvent.bind(this));
        this.excelSubscription = this.excelService.exportClick.subscribe(this.saveAsExcel.bind(this));
        this.columnsContainerChangeSubscription = this.columnsContainer.changes
            .filter(function () { return _this.totalColumnLevels > 0 && _this.lockedColumns.length > 0; })
            .subscribe(this.columnsContainerChange.bind(this));
        this.columnList = new column_list_1.ColumnList(this.columns);
    }
    Object.defineProperty(GridComponent.prototype, "sort", {
        /**
         */
        get: function () {
            return this._sort;
        },
        /**
         * The descriptors by which the data will be sorted.
         */
        set: function (value) {
            if (utils_1.isArray(value)) {
                this._sort = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "group", {
        /**
         */
        get: function () {
            return this._group;
        },
        /**
         * The descriptors by which the data will to be grouped.
         */
        set: function (value) {
            if (utils_1.isArray(value)) {
                this._group = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showTopToolbar", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarTemplate && ['top', 'both'].indexOf(this.toolbarTemplate.position) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showBottomToolbar", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarTemplate && ['bottom', 'both'].indexOf(this.toolbarTemplate.position) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isLocked", {
        /**
         * @hidden
         */
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showPager", {
        /**
         * @hidden
         */
        get: function () {
            return !this.isVirtual && this.pageable !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showGroupPanel", {
        /**
         * @hidden
         */
        get: function () {
            return this.groupable && this.groupable.enabled !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "rowClass", {
        get: function () {
            return this._rowClass;
        },
        /**
         * Defines a function that is executed for every data row in the component.
         *
         * @example
         * ```ts
         * import { Component, ViewEncapsulation } from '@angular/core';
         * import { RowClassArgs } from '@progress/kendo-angular-grid';
         *
         * @@Component({
         *    selector: 'my-app',
         *    encapsulation: ViewEncapsulation.None,
         *    styles: [`
         *        .k-grid tr.even { background-color: #f45c42; }
         *        .k-grid tr.odd { background-color: #41f4df; }
         *    `],
         *    template: `
         *        <kendo-grid [data]="gridData" [rowClass]="rowCallback">
         *        </kendo-grid>
         *    `
         * })
         * class AppComponent {
         *    private gridData: any[] = products;
         *
         *    rowCallback(context: RowClassArgs) {
         *        const isEven = context.index % 2 == 0;
         *        return {
         *            even: isEven,
         *            odd: !isEven
         *        };
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
         * ```
         */
        set: function (fn) {
            if (typeof fn !== 'function') {
                throw new Error("rowClass must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._rowClass = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedClasses", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "virtualClasses", {
        get: function () {
            return this.isVirtual;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "headerPadding", {
        get: function () {
            var padding = this.scrollbarWidth + 'px';
            var right = this.rtl ? 0 : padding;
            var left = this.rtl ? padding : 0;
            return "0 " + right + " 0 " + left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showGroupFooters", {
        get: function () {
            return column_common_1.columnsToRender(this.columnList.toArray()).filter(function (column) { return column.groupFooterTemplateRef; }).length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showFooter", {
        get: function () {
            return this.columnList.filter(function (column) { return column.footerTemplateRef; }).length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isVirtual", {
        get: function () {
            return this.scrollable === 'virtual';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isScrollable", {
        get: function () {
            return this.scrollable !== 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "visibleColumns", {
        get: function () {
            return this.columnsContainer.allColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedColumns", {
        get: function () {
            return this.columnsContainer.lockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedColumns", {
        get: function () {
            return this.columnsContainer.nonLockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columnsContainer.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedLeafColumns", {
        get: function () {
            return this.columnsContainer.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "leafColumns", {
        get: function () {
            return this.columnsContainer.leafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "totalColumnLevels", {
        get: function () {
            return this.columnsContainer.totalLevels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedWidth", {
        get: function () {
            var groupCellsWidth = this.group.length * 30; // this should be the value of group-cell inside the theme!
            return column_common_1.expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, groupCellsWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedWidth", {
        get: function () {
            if (this.lockedLeafColumns.length) {
                return column_common_1.expandColumns(this.nonLockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, 0);
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Expands the specified master row.
     *
     * @param {number} index - The absolute index of the master row.
     */
    GridComponent.prototype.expandRow = function (index) {
        if (!this.detailsService.isExpanded(index)) {
            this.detailsService.toggleRow(index, null);
        }
    };
    /**
     * Collapses the specified master row.
     *
     * @param {number} index - The absolute index of the master row.
     */
    GridComponent.prototype.collapseRow = function (index) {
        if (this.detailsService.isExpanded(index)) {
            this.detailsService.toggleRow(index, null);
        }
    };
    /**
     * Expands a group header item for the given index.
     * For example, `0_1` expands the second inner group of the first master group.
     *
     * @param {string} index - The underscore separated hierarchical index of the group.
     */
    GridComponent.prototype.expandGroup = function (index) {
        if (!this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    };
    /**
     * Collapses a group header item for the given index.
     * For example, `0_1` collapses the second inner group of the first master group.
     *
     * @param {string} index - The underscore separated hierarchical index of the group.
     */
    GridComponent.prototype.collapseGroup = function (index) {
        if (this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    };
    /**
     * @hidden
     */
    GridComponent.prototype.onDataChange = function () {
        this.autoGenerateColumns();
        this.changeNotification.notify();
        this.pdfService.dataChanged.emit();
    };
    GridComponent.prototype.ngOnChanges = function (changes) {
        if (utils_1.isChanged("data", changes)) {
            this.onDataChange();
        }
        if (this.lockedLeafColumns.length && utils_1.anyChanged(["pageSize", "skip", "sort", "group"], changes)) {
            this.changeNotification.notify();
        }
        if (utils_1.isChanged("height", changes, false)) {
            this.renderer.setStyle(this.wrapper.nativeElement, 'height', this.height + "px");
        }
    };
    GridComponent.prototype.ngAfterViewInit = function () {
        var resizeCheck = this.resizeCheck.bind(this);
        this.resizeSubscription = this.renderer.listen('window', 'resize', resizeCheck);
        this.orientationSubscription = this.renderer.listen('window', 'orientationchange', resizeCheck);
        this.attachScrollSync();
    };
    GridComponent.prototype.ngAfterContentChecked = function () {
        this.columnsContainer.refresh();
        this.verifySettings();
    };
    GridComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.shouldGenerateColumns = !this.columns.length;
        this.autoGenerateColumns();
        this.columnList = new column_list_1.ColumnList(this.columns);
        this.columnsChangeSubscription = this.columns.changes.subscribe(function () { return _this.verifySettings(); });
    };
    GridComponent.prototype.ngOnDestroy = function () {
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
        if (this.stateChangeSubscription) {
            this.stateChangeSubscription.unsubscribe();
        }
        if (this.groupExpandCollapseSubscription) {
            this.groupExpandCollapseSubscription.unsubscribe();
        }
        if (this.detailsServiceSubscription) {
            this.detailsServiceSubscription.unsubscribe();
        }
        if (this.editServiceSubscription) {
            this.editServiceSubscription.unsubscribe();
        }
        if (this.pdfSubscription) {
            this.pdfSubscription.unsubscribe();
        }
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
        if (this.columnsChangeSubscription) {
            this.columnsChangeSubscription.unsubscribe();
        }
        if (this.resizeSubscription) {
            this.resizeSubscription();
        }
        if (this.orientationSubscription) {
            this.orientationSubscription();
        }
        if (this.excelSubscription) {
            this.excelSubscription.unsubscribe();
        }
        if (this.columnsContainerChangeSubscription) {
            this.columnsContainerChangeSubscription.unsubscribe();
        }
        if (this.scrollSyncService) {
            this.scrollSyncService.destroy();
        }
    };
    /**
     * @hidden
     */
    GridComponent.prototype.attachScrollSync = function () {
        if (utils_1.isUniversal()) {
            return;
        }
        if (this.header) {
            this.scrollSyncService.registerEmitter(this.header.nativeElement, "header");
        }
        if (this.footer) {
            this.scrollSyncService.registerEmitter(this.footer.nativeElement, "footer");
        }
    };
    /**
     * Switches the specified table row in the edit mode.
     *
     * @param {number} index - The row index that will be switched in the edit mode.
     * @param {FormGroup} group - The [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html)
     * that describes the edit form.
     */
    GridComponent.prototype.editRow = function (index, group) {
        this.editService.editRow(index, group);
    };
    /**
     * Closes the editor for a given row.
     *
     * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
     * that the new item editor will be closed.
     */
    GridComponent.prototype.closeRow = function (index) {
        this.editService.close(index);
    };
    /**
     * Creates a new row editor.
     *
     * @param {FormGroup} group - The [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html) that describes
     * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
     */
    GridComponent.prototype.addRow = function (group) {
        var isFormGroup = group instanceof forms_1.FormGroup;
        if (!isFormGroup) {
            var fields = Object.keys(group).reduce(createControl(group), {});
            group = new forms_1.FormGroup(fields);
        }
        this.editService.addRow(group);
    };
    /**
     * Initiates the PDF export.
     */
    GridComponent.prototype.saveAsPDF = function () {
        this.pdfService.save(this);
    };
    /**
     * Initiates the Excel export.
     */
    GridComponent.prototype.saveAsExcel = function () {
        this.excelService.save(this);
    };
    /**
     * @hidden
     */
    GridComponent.prototype.notifyPageChange = function (source, event) {
        if (source === "list" && !this.isVirtual) {
            return;
        }
        this.pageChange.emit(event);
    };
    GridComponent.prototype.verifySettings = function () {
        if (core_1.isDevMode()) {
            if (this.lockedLeafColumns.length && this.detailTemplate) {
                throw new Error('Having both detail template and locked columns is not supported');
            }
            if (this.lockedLeafColumns.length && !this.nonLockedLeafColumns.length) {
                throw new Error('There should be at least one non locked column');
            }
            if (this.lockedLeafColumns.length && column_common_1.expandColumns(this.columnList.toArray()).filter(function (x) { return !x.width; }).length) {
                throw new Error('Locked columns feature requires all columns to have width set');
            }
            if (this.lockedLeafColumns.length && !this.isScrollable) {
                throw new Error('Locked columns are only supported when scrolling is enabled');
            }
            if (this.columnList.filter(column_group_component_1.isColumnGroupComponent).filter(function (x) { return x.children.length < 2; }).length) {
                throw new Error('ColumnGroupComponent should contain ColumnComponent or CommandColumnComponent');
            }
            if (this.columnList.filter(function (x) { return x.locked && x.parent && !x.parent.isLocked; }).length) {
                throw new Error('Locked child columns require their parent columns to be locked.');
            }
            if ((this.rowHeight || this.detailRowHeight) && !this.isVirtual) {
                throw new Error('Row height and detail row height settings requires virtual scrolling mode to be enabled.');
            }
        }
    };
    GridComponent.prototype.autoGenerateColumns = function () {
        if (this.shouldGenerateColumns && !this.columns.length && this.view.length) {
            this.columns.reset(Object.keys(this.view.at(0)).map(function (field) {
                var column = new column_component_1.ColumnComponent();
                column.field = field;
                return column;
            }));
        }
    };
    GridComponent.prototype.attachStateChangesEmitter = function () {
        var _this = this;
        this.stateChangeSubscription =
            this.pageChange.map(function (x) { return ({
                filter: _this.filter, group: _this.group, skip: x.skip, sort: _this.sort, take: x.take
            }); })
                .merge(this.sortChange.map(function (sort) { return ({
                filter: _this.filter, group: _this.group, skip: _this.skip, sort: sort, take: _this.pageSize
            }); }))
                .merge(this.groupChange.map(function (group) { return ({
                filter: _this.filter, group: group, skip: _this.skip, sort: _this.sort, take: _this.pageSize
            }); }))
                .merge(this.filterChange.map(function (filter) { return ({
                filter: filter, group: _this.group, skip: 0, sort: _this.sort, take: _this.pageSize
            }); }))
                .subscribe(function (x) { return _this.dataStateChange.emit(x); });
    };
    GridComponent.prototype.attachEditHandlers = function () {
        if (!this.editService) {
            return;
        }
        this.editServiceSubscription = this.editService
            .changes.subscribe(this.emitCRUDEvent.bind(this));
    };
    GridComponent.prototype.emitCRUDEvent = function (_a) {
        var action = _a.action, rowIndex = _a.rowIndex, formGroup = _a.formGroup, isNew = _a.isNew;
        var dataItem = this.view.at(rowIndex - this.skip);
        if (action !== 'add' && !dataItem) {
            dataItem = formGroup.value;
        }
        var args = {
            dataItem: dataItem,
            formGroup: formGroup,
            isNew: isNew,
            rowIndex: rowIndex,
            sender: this
        };
        switch (action) {
            case 'add':
                this.add.emit(args);
                break;
            case 'cancel':
                this.cancel.emit(args);
                break;
            case 'edit':
                this.edit.emit(args);
                break;
            case 'remove':
                this.remove.emit(args);
                break;
            case 'save':
                this.save.emit(args);
                break;
            default: break;
        }
    };
    GridComponent.prototype.isHidden = function (c) {
        return c.hidden || (c.parent && this.isHidden(c.parent));
    };
    GridComponent.prototype.matchesMedia = function (c) {
        var matches = this.responsiveService.matchesMedia(c.media);
        return matches && (!c.parent || this.matchesMedia(c.parent));
    };
    GridComponent.prototype.resizeCheck = function () {
        if (window.innerWidth !== this.cachedWindowWidth) {
            this.cachedWindowWidth = window.innerWidth;
            this.columnsContainer.refresh();
            this.verifySettings();
        }
    };
    GridComponent.prototype.emitPDFExportEvent = function () {
        var args = new pdf_export_event_1.PDFExportEvent();
        this.pdfExport.emit(args);
        if (!args.isDefaultPrevented()) {
            this.saveAsPDF();
        }
    };
    GridComponent.prototype.columnsContainerChange = function () {
        var _this = this;
        this.ngZone.onStable.take(1).subscribe(function () {
            if (_this.lockedHeader) {
                row_sync_1.syncRowsHeight(_this.lockedHeader.nativeElement.children[0], _this.header.nativeElement.children[0]);
            }
        });
    };
    return GridComponent;
}());
GridComponent.decorators = [
    { type: core_1.Component, args: [{
                exportAs: 'kendoGrid',
                providers: [
                    kendo_angular_l10n_2.LocalizationService,
                    browser_support_service_1.BrowserSupportService,
                    selection_service_1.SelectionService,
                    details_service_1.DetailsService,
                    groups_service_1.GroupsService,
                    group_info_service_1.GroupInfoService,
                    group_connection_service_1.GroupConnectionService,
                    change_notification_service_1.ChangeNotificationService,
                    edit_service_1.EditService,
                    pdf_service_1.PDFService,
                    suspend_service_1.SuspendService,
                    {
                        provide: cell_context_1.CELL_CONTEXT,
                        useValue: cell_context_1.EMPTY_CELL_CONTEXT
                    },
                    {
                        provide: kendo_angular_l10n_2.L10N_PREFIX,
                        useValue: 'kendo.grid'
                    },
                    filter_service_1.FilterService,
                    responsive_service_1.ResponsiveService,
                    pager_context_service_1.PagerContextService,
                    excel_service_1.ExcelService,
                    scroll_sync_service_1.ScrollSyncService
                ],
                selector: 'kendo-grid',
                template: "\n        <ng-container kendoGridLocalizedMessages\n            i18n-groupPanelEmpty=\"kendo.grid.groupPanelEmpty|The label visible in the Grid group panel when it is empty\"\n            groupPanelEmpty=\"Drag a column header and drop it here to group by that column\"\n\n            i18n-noRecords=\"kendo.grid.noRecords|The label visible in the Grid when there are no records\"\n            noRecords=\"No records available.\"\n\n            i18n-pagerFirstPage=\"kendo.grid.pagerFirstPage|The label for the first page button in Grid pager\"\n            pagerFirstPage=\"Go to the first page\"\n\n            i18n-pagerPreviousPage=\"kendo.grid.pagerPreviousPage|The label for the previous page button in Grid pager\"\n            pagerPreviousPage=\"Go to the previous page\"\n\n            i18n-pagerNextPage=\"kendo.grid.pagerNextPage|The label for the next page button in Grid pager\"\n            pagerNextPage=\"Go to the next page\"\n\n            i18n-pagerLastPage=\"kendo.grid.pagerLastPage|The label for the last page button in Grid pager\"\n            pagerLastPage=\"Go to the last page\"\n\n            i18n-pagerPage=\"kendo.grid.pagerPage|The label before the current page number in the Grid pager\"\n            pagerPage=\"Page\"\n\n            i18n-pagerOf=\"kendo.grid.pagerOf|The label before the total pages number in the Grid pager\"\n            pagerOf=\"of\"\n\n            i18n-pagerItems=\"kendo.grid.pagerItems|The label after the total pages number in the Grid pager\"\n            pagerItems=\"items\"\n\n            i18n-pagerItemsPerPage=\"kendo.grid.pagerItemsPerPage|The label for the page size chooser in the Grid pager\"\n            pagerItemsPerPage=\"items per page\"\n\n            i18n-filterEqOperator=\"kendo.grid.filterEqOperator|The text of the equal filter operator\"\n            filterEqOperator=\"Is equal to\"\n\n            i18n-filterNotEqOperator=\"kendo.grid.filterNotEqOperator|The text of the not equal filter operator\"\n            filterNotEqOperator=\"Is not equal to\"\n\n            i18n-filterIsNullOperator=\"kendo.grid.filterIsNullOperator|The text of the is null filter operator\"\n            filterIsNullOperator=\"Is null\"\n\n            i18n-filterIsNotNullOperator=\"kendo.grid.filterIsNotNullOperator|The text of the is not null filter operator\"\n            filterIsNotNullOperator=\"Is not null\"\n\n            i18n-filterIsEmptyOperator=\"kendo.grid.filterIsEmptyOperator|The text of the is empty filter operator\"\n            filterIsEmptyOperator=\"Is empty\"\n\n            i18n-filterIsNotEmptyOperator=\"kendo.grid.filterIsNotEmptyOperator|The text of the is not empty filter operator\"\n            filterIsNotEmptyOperator=\"Is not empty\"\n\n            i18n-filterStartsWithOperator=\"kendo.grid.filterStartsWithOperator|The text of the starts with filter operator\"\n            filterStartsWithOperator=\"Starts with\"\n\n            i18n-filterContainsOperator=\"kendo.grid.filterContainsOperator|The text of the contains filter operator\"\n            filterContainsOperator=\"Contains\"\n\n            i18n-filterNotContainsOperator=\"kendo.grid.filterNotContainsOperator|The text of the does not contain filter operator\"\n            filterNotContainsOperator=\"Does not contain\"\n\n            i18n-filterEndsWithOperator=\"kendo.grid.filterEndsWithOperator|The text of the ends with filter operator\"\n            filterEndsWithOperator=\"Ends with\"\n\n            i18n-filterGteOperator=\"kendo.grid.filterGteOperator|The text of the greater than or equal filter operator\"\n            filterGteOperator=\"Is greater than or equal to\"\n\n            i18n-filterGtOperator=\"kendo.grid.filterGtOperator|The text of the greater than filter operator\"\n            filterGtOperator=\"Is greater than\"\n\n            i18n-filterLteOperator=\"kendo.grid.filterLteOperator|The text of the less than or equal filter operator\"\n            filterLteOperator=\"Is less than or equal to\"\n\n            i18n-filterLtOperator=\"kendo.grid.filterLtOperator|The text of the less than filter operator\"\n            filterLtOperator=\"Is less than\"\n\n            i18n-filterIsTrue=\"kendo.grid.filterIsTrue|The text of the IsTrue boolean filter option\"\n            filterIsTrue=\"Is True\"\n\n            i18n-filterIsFalse=\"kendo.grid.filterIsFalse|The text of the IsFalse boolean filter option\"\n            filterIsFalse=\"Is False\"\n\n            i18n-filterBooleanAll=\"kendo.grid.filterBooleanAll|The text of the (All) boolean filter option\"\n            filterBooleanAll=\"(All)\"\n\n            i18n-filterAfterOrEqualOperator=\"kendo.grid.filterAfterOrEqualOperator|The text of the after or equal date filter operator\"\n            filterAfterOrEqualOperator=\"Is after or equal to\"\n\n            i18n-filterAfterOperator=\"kendo.grid.filterAfterOperator|The text of the after date filter operator\"\n            filterAfterOperator=\"Is after\"\n\n            i18n-filterBeforeOperator=\"kendo.grid.filterBeforeOperator|The text of the before date filter operator\"\n            filterBeforeOperator=\"Is before\"\n\n            i18n-filterBeforeOrEqualOperator=\"kendo.grid.filterBeforeOrEqualOperator|The text of the before or equal date filter operator\"\n            filterBeforeOrEqualOperator=\"Is before or equal to\"\n        >\n        </ng-container>\n        <kendo-grid-toolbar *ngIf=\"showTopToolbar\"></kendo-grid-toolbar>\n        <kendo-grid-group-panel\n            *ngIf=\"showGroupPanel\"\n            [text]=\"groupable.emptyText\"\n            [groups]=\"group\"\n            (change)=\"groupChange.emit($event)\">\n        </kendo-grid-group-panel>\n        <ng-template [ngIf]=\"isScrollable\">\n            <div\n                class=\"k-grid-header\"\n                [style.padding]=\"headerPadding\">\n                <div class=\"k-grid-header-locked\" #lockedHeader\n                    *ngIf=\"isLocked\"\n                     [style.width.px]=\"lockedWidth\">\n                    <table>\n                        <colgroup kendoGridColGroup\n                            [columns]=\"lockedLeafColumns\"\n                            [groups]=\"group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <thead kendoGridHeader\n                            [scrollable]=\"true\"\n                            [columns]=\"lockedColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [groups]=\"group\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [groupable]=\"showGroupPanel\"\n                            [sortable]=\"sortable\"\n                            (sortChange)=\"sortChange.emit($event)\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </thead>\n                    </table>\n                </div><div class=\"k-grid-header-wrap\" #header\n                    [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n                    [lockedWidth]=\"lockedWidth + scrollbarWidth + 3\">\n                    <table [style.width.px]=\"nonLockedWidth\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"nonLockedLeafColumns\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <thead kendoGridHeader\n                            [scrollable]=\"true\"\n                            [columns]=\"nonLockedColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [groupable]=\"showGroupPanel\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [sortable]=\"sortable\"\n                            [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                            (sortChange)=\"sortChange.emit($event)\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </thead>\n                    </table>\n                </div>\n            </div>\n            <kendo-grid-list\n                [data]=\"view\"\n                [rowHeight]=\"rowHeight\"\n                [detailRowHeight]=\"detailRowHeight\"\n                [total]=\"isVirtual ? view.total : pageSize\"\n                [take]=\"pageSize\"\n                [groups]=\"group\"\n                [groupable]=\"groupable\"\n                [skip]=\"skip\"\n                [columns]=\"columnsContainer\"\n                [selectable]=\"selectable\"\n                [detailTemplate]=\"detailTemplate\"\n                [noRecordsTemplate]=\"noRecordsTemplate\"\n                (pageChange)=\"notifyPageChange('list', $event)\"\n                [rowClass]=\"rowClass\">\n            </kendo-grid-list>\n            <div\n                *ngIf=\"showFooter\"\n                class=\"k-grid-footer\"\n                [style.paddingRight.px]=\"scrollbarWidth\">\n                <div\n                    *ngIf=\"lockedLeafColumns.length\"\n                    class=\"k-grid-footer-locked\"\n                    [style.width.px]=\"lockedWidth\">\n                    <table>\n                        <colgroup kendoGridColGroup\n                            [columns]=\"lockedLeafColumns\"\n                            [groups]=\"group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <tfoot kendoGridFooter\n                            [scrollable]=\"true\"\n                            [groups]=\"group\"\n                            [columns]=\"lockedLeafColumns\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </tfoot>\n                    </table>\n                </div><div #footer\n                    class=\"k-grid-footer-wrap\"\n                    [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n                    [lockedWidth]=\"lockedWidth + scrollbarWidth + 3\">\n                    <table [style.width.px]=\"nonLockedWidth\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"nonLockedLeafColumns\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <tfoot kendoGridFooter\n                            [scrollable]=\"true\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [columns]=\"nonLockedLeafColumns\"\n                            [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </tfoot>\n                    </table>\n                </div>\n            </div>\n        </ng-template>\n        <ng-template [ngIf]=\"!isScrollable\">\n            <table>\n                <colgroup kendoGridColGroup\n                    [columns]=\"leafColumns\"\n                    [groups]=\"group\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <thead kendoGridHeader\n                    [scrollable]=\"false\"\n                    [columns]=\"visibleColumns\"\n                    [totalColumnLevels]=\"totalColumnLevels\"\n                    [groups]=\"group\"\n                    [groupable]=\"showGroupPanel\"\n                    [sort]=\"sort\"\n                    [sortable]=\"sortable\"\n                    [filter]=\"filter\"\n                    [filterable]=\"filterable\"\n                    (sortChange)=\"sortChange.emit($event)\"\n                    [detailTemplate]=\"detailTemplate\">\n                </thead>\n                <tbody kendoGridTableBody\n                    [groups]=\"group\"\n                    [data]=\"view\"\n                    [skip]=\"skip\"\n                    [columns]=\"leafColumns\"\n                    [selectable]=\"selectable\"\n                    [noRecordsTemplate]=\"noRecordsTemplate\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [rowClass]=\"rowClass\">\n                </tbody>\n                <tfoot kendoGridFooter\n                    *ngIf=\"showFooter\"\n                    [scrollable]=\"false\"\n                    [groups]=\"group\"\n                    [columns]=\"leafColumns\"\n                    [detailTemplate]=\"detailTemplate\">\n                </tfoot>\n            </table>\n        </ng-template>\n        <kendo-pager\n            *ngIf=\"showPager\"\n            [template]=\"pagerTemplate\"\n            [pageSize]=\"pageSize\"\n            [total]=\"view.total\"\n            [skip]=\"skip\"\n            [options]=\"pageable\"\n            (pageChange)=\"notifyPageChange('pager', $event)\">\n        </kendo-pager>\n        <kendo-grid-toolbar *ngIf=\"showBottomToolbar\"></kendo-grid-toolbar>\n    "
            },] },
];
/** @nocollapse */
GridComponent.ctorParameters = function () { return [
    { type: browser_support_service_1.BrowserSupportService, },
    { type: selection_service_1.SelectionService, },
    { type: core_1.ElementRef, },
    { type: group_info_service_1.GroupInfoService, },
    { type: groups_service_1.GroupsService, },
    { type: change_notification_service_1.ChangeNotificationService, },
    { type: details_service_1.DetailsService, },
    { type: edit_service_1.EditService, },
    { type: filter_service_1.FilterService, },
    { type: pdf_service_1.PDFService, },
    { type: responsive_service_1.ResponsiveService, },
    { type: core_1.Renderer2, },
    { type: excel_service_1.ExcelService, },
    { type: core_1.NgZone, },
    { type: scroll_sync_service_1.ScrollSyncService, },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
]; };
GridComponent.propDecorators = {
    'data': [{ type: core_1.Input },],
    'pageSize': [{ type: core_1.Input },],
    'height': [{ type: core_1.Input },],
    'rowHeight': [{ type: core_1.Input },],
    'detailRowHeight': [{ type: core_1.Input },],
    'skip': [{ type: core_1.Input },],
    'scrollable': [{ type: core_1.Input },],
    'selectable': [{ type: core_1.Input },],
    'sort': [{ type: core_1.Input },],
    'filter': [{ type: core_1.Input },],
    'group': [{ type: core_1.Input },],
    'filterable': [{ type: core_1.Input },],
    'sortable': [{ type: core_1.Input },],
    'pageable': [{ type: core_1.Input },],
    'groupable': [{ type: core_1.Input },],
    'rowClass': [{ type: core_1.Input },],
    'filterChange': [{ type: core_1.Output },],
    'pageChange': [{ type: core_1.Output },],
    'groupChange': [{ type: core_1.Output },],
    'sortChange': [{ type: core_1.Output },],
    'selectionChange': [{ type: core_1.Output },],
    'dataStateChange': [{ type: core_1.Output },],
    'groupExpand': [{ type: core_1.Output },],
    'groupCollapse': [{ type: core_1.Output },],
    'detailExpand': [{ type: core_1.Output },],
    'detailCollapse': [{ type: core_1.Output },],
    'edit': [{ type: core_1.Output },],
    'cancel': [{ type: core_1.Output },],
    'save': [{ type: core_1.Output },],
    'remove': [{ type: core_1.Output },],
    'add': [{ type: core_1.Output },],
    'pdfExport': [{ type: core_1.Output },],
    'excelExport': [{ type: core_1.Output },],
    'columns': [{ type: core_1.ContentChildren, args: [column_base_1.ColumnBase,] },],
    'dir': [{ type: core_1.HostBinding, args: ['attr.dir',] },],
    'hostClasses': [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-grid',] },],
    'lockedClasses': [{ type: core_1.HostBinding, args: ['class.k-grid-lockedcolumns',] },],
    'virtualClasses': [{ type: core_1.HostBinding, args: ['class.k-grid-virtual',] },],
    'detailTemplate': [{ type: core_1.ContentChild, args: [detail_template_directive_1.DetailTemplateDirective,] },],
    'noRecordsTemplate': [{ type: core_1.ContentChild, args: [no_records_template_directive_1.NoRecordsTemplateDirective,] },],
    'pagerTemplate': [{ type: core_1.ContentChild, args: [pager_template_directive_1.PagerTemplateDirective,] },],
    'toolbarTemplate': [{ type: core_1.ContentChild, args: [toolbar_template_directive_1.ToolbarTemplateDirective,] },],
    'lockedHeader': [{ type: core_1.ViewChild, args: ["lockedHeader",] },],
    'header': [{ type: core_1.ViewChild, args: ["header",] },],
    'footer': [{ type: core_1.ViewChild, args: ["footer",] },],
    'list': [{ type: core_1.ViewChild, args: [list_component_1.ListComponent,] },],
};
exports.GridComponent = GridComponent;
