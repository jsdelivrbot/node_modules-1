import { Component, Input, ContentChild, ContentChildren, NgZone, QueryList } from '@angular/core';
import { SuspendService } from '../suspend.service';
import { PDFService } from './pdf.service';
import { PDFMarginComponent } from './pdf-margin.component';
import { drawDOM, pdf } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
import { exportElement } from './export-element';
import { GridQuery } from './grid-query';
import { PDFTemplateDirective } from './pdf-template.directive';
import { ColumnBase } from '../column-base';
var createElement = function (tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    return element;
};
var createDiv = function (className) {
    return createElement('div', className);
};
var compileTemplate = function (templateRef) {
    var context = {};
    var embeddedView = templateRef.createEmbeddedView(context);
    var result = function (data) {
        Object.assign(context, data);
        embeddedView.detectChanges();
        var templateWrap = createElement('span');
        embeddedView.rootNodes.forEach(function (rootNode) {
            templateWrap.appendChild(rootNode.cloneNode(true));
        });
        return templateWrap;
    };
    result.destroy = function () {
        embeddedView.destroy();
        embeddedView = null;
    };
    return result;
};
/**
 * Configures the PDF export settings of the Kendo UI Grid.
 */
var PDFComponent = (function () {
    function PDFComponent(pdfService, suspendService, ngZone) {
        this.pdfService = pdfService;
        this.suspendService = suspendService;
        this.ngZone = ngZone;
        /**
         * The creator of the PDF document.
         * @default "Kendo UI PDF Generator"
         */
        this.creator = 'Kendo UI PDF Generator';
        /**
         * Specifies the file name of the exported PDF file.
         * @default "Export.pdf"
         */
        this.fileName = 'Export.pdf';
        this.columns = new QueryList();
        this.saveSubscription = pdfService.savePDF.subscribe(this.savePDF.bind(this));
        this.complete = this.complete.bind(this);
        this.reset = this.reset.bind(this);
        this.draw = this.draw.bind(this);
    }
    PDFComponent.prototype.ngOnDestroy = function () {
        this.saveSubscription.unsubscribe();
        this.reset();
    };
    PDFComponent.prototype.savePDF = function (component) {
        var pageSize = component.pageSize;
        var total = component.view.total;
        var columns = this.columns.toArray();
        if (columns.length) {
            this.originalColumns = component.columns.toArray();
        }
        this.component = component;
        this.suspendService.scroll = true;
        this.initProgress();
        this.renderAllPages = this.allPages && pageSize < total;
        if (this.renderAllPages) {
            this.skip = component.skip;
            this.pageSize = pageSize;
            this.changePage(0, total, this.draw, columns);
        }
        else if (columns.length) {
            this.changeColumns(columns, this.draw);
        }
        else {
            this.draw();
        }
    };
    PDFComponent.prototype.initProgress = function () {
        var wrapperElement = this.component.wrapper.nativeElement;
        var progress = this.progress = createDiv('k-loading-pdf-mask');
        var overlay = wrapperElement.cloneNode(true);
        progress.appendChild(overlay);
        progress.appendChild(createDiv('k-loading-color'));
        progress.appendChild(createElement('span', 'k-i-loading k-icon'));
        this.originalHeight = wrapperElement.style.height;
        this.originalOverflow = wrapperElement.style.overflow;
        wrapperElement.style.height = wrapperElement.offsetHeight + 'px';
        wrapperElement.style.overflow = 'hidden';
        wrapperElement.appendChild(progress);
        this.applyScroll(overlay);
    };
    PDFComponent.prototype.applyScroll = function (overlay) {
        var query = new GridQuery(this.component.wrapper.nativeElement);
        var content = query.content();
        if (content) {
            var overlayQuery = new GridQuery(overlay);
            var overlayContent = overlayQuery.content();
            overlayContent.scrollTop = content.scrollTop;
            overlayContent.scrollLeft = content.scrollLeft;
            overlayQuery.header().scrollLeft = query.header().scrollLeft;
            var footer = query.footer();
            if (footer) {
                overlayQuery.footer().scrollLeft = footer.scrollLeft;
            }
            var lockedContent = query.content(true);
            if (lockedContent) {
                var overlayLockedContent = overlayQuery.content(true);
                overlayLockedContent.scrollTop = lockedContent.scrollTop;
                overlayLockedContent.scrollLeft = lockedContent.scrollLeft;
            }
        }
    };
    PDFComponent.prototype.draw = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var container = _this.container = createDiv('k-grid-pdf-export-element');
            var element = exportElement(_this.component.wrapper.nativeElement);
            container.appendChild(element);
            document.body.appendChild(container);
            _this.drawDOM(element, _this.drawOptions);
        });
    };
    PDFComponent.prototype.drawDOM = function (element, options) {
        var _this = this;
        drawDOM(element, options)
            .then(function (root) {
            return pdf.exportPDF(root, options);
        })
            .then(function (dataURI) {
            _this.saveFile(dataURI);
        }).then(this.complete, this.complete);
    };
    PDFComponent.prototype.saveFile = function (dataURI) {
        saveAs(dataURI, this.fileName, {
            forceProxy: this.forceProxy,
            proxyTarget: this.proxyTarget,
            proxyURL: this.proxyURL
        });
    };
    PDFComponent.prototype.complete = function () {
        if (this.pageTemplate) {
            this.pageTemplate.destroy();
            delete this.pageTemplate;
        }
        if (this.component) {
            var originalColumns = this.originalColumns;
            delete this.originalColumns;
            if (this.renderAllPages) {
                this.changePage(this.skip, this.pageSize, this.reset, originalColumns);
            }
            else if (originalColumns) {
                this.changeColumns(originalColumns, this.reset);
            }
            else {
                this.reset();
            }
        }
        else {
            this.reset();
        }
        this.removeContainer();
    };
    PDFComponent.prototype.removeContainer = function () {
        if (this.container) {
            document.body.removeChild(this.container);
            delete this.container;
        }
    };
    PDFComponent.prototype.changePage = function (skip, take, callback, columns) {
        var _this = this;
        this.ngZone.run(function () {
            _this.pdfService.dataChanged.take(1).subscribe(function () {
                if (columns && columns.length) {
                    _this.changeColumns(columns, callback);
                }
                else {
                    _this.onStable(callback);
                }
            });
            _this.component.notifyPageChange('pdf', { skip: skip, take: take });
        });
    };
    PDFComponent.prototype.changeColumns = function (columns, callback) {
        var _this = this;
        this.ngZone.run(function () {
            _this.onStable(callback);
            _this.component.columns.reset(columns);
        });
    };
    PDFComponent.prototype.reset = function () {
        this.suspendService.scroll = false;
        this.renderAllPages = false;
        if (!this.component) {
            return;
        }
        var wrapperElement = this.component.wrapper.nativeElement;
        wrapperElement.removeChild(this.progress);
        wrapperElement.style.height = this.originalHeight;
        wrapperElement.style.overflow = this.originalOverflow;
        delete this.progress;
        delete this.component;
    };
    Object.defineProperty(PDFComponent.prototype, "drawOptions", {
        get: function () {
            if (this.pageTemplateDirective) {
                this.pageTemplate = compileTemplate(this.pageTemplateDirective.templateRef);
            }
            return {
                _destructive: true,
                allPages: this.allPages,
                author: this.author,
                avoidLinks: this.avoidLinks,
                creator: this.creator,
                date: this.date,
                keywords: this.keywords,
                landscape: this.landscape,
                margin: this.drawMargin,
                paperSize: this.paperSize,
                repeatHeaders: this.repeatHeaders,
                scale: this.scale,
                subject: this.subject,
                template: this.pageTemplate,
                title: this.title
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PDFComponent.prototype, "drawMargin", {
        get: function () {
            var marginComponent = this.marginComponent;
            var margin = this.margin;
            if (marginComponent) {
                margin = Object.assign(margin || {}, marginComponent.options);
            }
            return margin;
        },
        enumerable: true,
        configurable: true
    });
    PDFComponent.prototype.onStable = function (callback) {
        var _this = this;
        // not sure if it is an actual scenario. occurs in the tests.
        // onStable is triggered in the same pass without the change detection
        // thus the callback is called before the changes are applied without the timeout
        setTimeout(function () {
            _this.ngZone.onStable.take(1).subscribe(callback);
        }, 0); // tslint:disable-line: align
    };
    return PDFComponent;
}());
export { PDFComponent };
PDFComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-pdf',
                template: ''
            },] },
];
/** @nocollapse */
PDFComponent.ctorParameters = function () { return [
    { type: PDFService, },
    { type: SuspendService, },
    { type: NgZone, },
]; };
PDFComponent.propDecorators = {
    'allPages': [{ type: Input },],
    'author': [{ type: Input },],
    'avoidLinks': [{ type: Input },],
    'creator': [{ type: Input },],
    'date': [{ type: Input },],
    'fileName': [{ type: Input },],
    'forceProxy': [{ type: Input },],
    'keywords': [{ type: Input },],
    'landscape': [{ type: Input },],
    'margin': [{ type: Input },],
    'paperSize': [{ type: Input },],
    'repeatHeaders': [{ type: Input },],
    'scale': [{ type: Input },],
    'proxyURL': [{ type: Input },],
    'proxyTarget': [{ type: Input },],
    'subject': [{ type: Input },],
    'title': [{ type: Input },],
    'pageTemplateDirective': [{ type: ContentChild, args: [PDFTemplateDirective,] },],
    'marginComponent': [{ type: ContentChild, args: [PDFMarginComponent,] },],
    'columns': [{ type: ContentChildren, args: [ColumnBase,] },],
};
