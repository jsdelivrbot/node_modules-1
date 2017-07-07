import { ApplicationRef, ComponentFactoryResolver, ElementRef, InjectionToken, Injectable, Injector, Inject, Optional, TemplateRef } from '@angular/core';
import { PopupComponent } from './popup.component';
/**
 * Used to inject the Popup container. If not provided, the first root component of
 * the application is used.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Popup module
 * import { PopupModule, POPUP_CONTAINER } from '@progress/kendo-angular-popup';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * @@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, PopupModule], // import Popup module
 *     bootstrap:    [AppComponent],
 *     providers: [{
 *       provide: POPUP_CONTAINER,
 *       useFactory: () => {
 *          //return the container ElementRef, where the popup will be injected
 *       }
 *     }]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 * ```
 */
export var POPUP_CONTAINER = new InjectionToken('Popup Container');
/**
 * A service for opening Popup components dynamically.
 *
 * For more information on how to use this class, refer to the article about
 * [`PopupService`]({% slug service_popup_kendouiforangular %}).
 *
 * @export
 * @class PopupService
 */
var PopupService = (function () {
    function PopupService(applicationRef, componentFactoryResolver, injector, container) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.container = container;
    }
    Object.defineProperty(PopupService.prototype, "rootViewContainer", {
        /**
         * Gets the root view container into which the component will be injected.
         *
         * @returns {ComponentRef<any>}
         */
        get: function () {
            //https://github.com/angular/angular/blob/4.0.x/packages/core/src/application_ref.ts#L571
            var rootComponents = this.applicationRef.components || [];
            if (rootComponents[0]) {
                return rootComponents[0];
            }
            throw new Error("\n            View Container not found! Inject the POPUP_CONTAINER or define a specific ViewContainerRef via the appendTo option.\n            See http://www.telerik.com/kendo-angular-ui/components/popup/api/POPUP_CONTAINER/ for more details.\n        ");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupService.prototype, "rootViewContainerNode", {
        /**
         * Sets or gets the HTML element of the root component container.
         *
         * @returns {HTMLElement}
         */
        get: function () {
            return this.container ? this.container.nativeElement : this.getComponentRootNode(this.rootViewContainer);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens a Popup component.
     *
     * Created Popups are mounted in the DOM directly in the root application component.
     *
     * @param {PopupSettings} options - The options that define the Popup.
     * @returns {ComponentRef<PopupComponent>} - A reference to the Popup object.
     *
     * @example
     *
     * ```ts-no-run
     * @@Component({
     *   selector: 'my-app',
     *   template: `
     *     <ng-template #template>
     *      Popup content
     *     </ng-template>
     *     <button #anchor kendoButton (click)="toggle(anchor, template)">Toggle</button>
     *   `
     * })
     * export class AppComponent {
     *     public popupRef: PopupRef;
     *
     *     constructor( private popupService: PopupService ) {}
     *
     *     public open(anchor: ElementRef, template: TemplateRef<any>): void {
     *         if (this.popupRef) {
     *              this.popupRef.close();
     *              this.popupRef = null;
     *              return;
     *         }
     *
     *         this.popupRef = this.popupService.open({
     *           anchor: anchor,
     *           content: template
     *         });
     *     }
     * }
     * ```
     */
    PopupService.prototype.open = function (options) {
        if (options === void 0) { options = {}; }
        var _a = this.contentFrom(options.content), component = _a.component, nodes = _a.nodes;
        var popupComponentRef = this.appendPopup(nodes, options.appendTo);
        var popupInstance = popupComponentRef.instance;
        this.projectComponentInputs(popupComponentRef, options);
        if (component) {
            component.changeDetectorRef.detectChanges();
        }
        return {
            close: function () {
                // XXX: Destroy is required due to this bug
                // https://github.com/angular/angular/issues/15578
                //
                if (component) {
                    component.destroy();
                }
                else {
                    popupComponentRef.instance.content = null;
                    popupComponentRef.changeDetectorRef.detectChanges();
                }
                popupComponentRef.destroy();
            },
            content: component,
            popup: popupComponentRef,
            popupAnchorViewportLeave: popupInstance.anchorViewportLeave,
            popupClose: popupInstance.close,
            popupElement: this.getComponentRootNode(popupComponentRef),
            popupOpen: popupInstance.open
        };
    };
    PopupService.prototype.appendPopup = function (nodes, container) {
        var appRef = this.applicationRef;
        var popupComponentRef = this.createComponent(PopupComponent, nodes, container);
        if (!container) {
            appRef.attachView(popupComponentRef.hostView);
            this.rootViewContainerNode.appendChild(this.getComponentRootNode(popupComponentRef));
        }
        return popupComponentRef;
    };
    /**
     * Gets the HTML element for a component reference.
     *
     * @param {ComponentRef<any>} componentRef
     * @returns {HTMLElement}
     */
    PopupService.prototype.getComponentRootNode = function (componentRef) {
        return componentRef.hostView.rootNodes[0];
    };
    /**
     * Gets the `ComponentFactory` instance by its type.
     *
     * @param {*} componentClass
     * @param {*} nodes
     * @returns {ComponentRef<any>}
     */
    PopupService.prototype.getComponentFactory = function (componentClass) {
        return this.componentFactoryResolver.resolveComponentFactory(componentClass);
    };
    /**
     * Creates a component reference from a `Component` type class.
     *
     * @param {*} componentClass
     * @param {*} nodes
     * @returns {ComponentRef<any>}
     */
    PopupService.prototype.createComponent = function (componentClass, nodes, container) {
        var factory = this.getComponentFactory(componentClass);
        return container ?
            container.createComponent(factory, undefined, this.injector, nodes) :
            factory.create(this.injector, nodes);
    };
    /**
     * Projects the inputs onto the component.
     *
     * @param {ComponentRef<any>} component
     * @param {*} options
     * @returns {ComponentRef<any>}
     */
    PopupService.prototype.projectComponentInputs = function (component, options) {
        Object.getOwnPropertyNames(options)
            .filter(function (prop) { return prop !== 'content' || options.content instanceof TemplateRef; })
            .map(function (prop) {
            component.instance[prop] = options[prop];
        });
        return component;
    };
    /**
     * Gets the component and the nodes to append from the `content` option.
     *
     * @param {*} content
     * @returns {any}
     */
    PopupService.prototype.contentFrom = function (content) {
        if (!content || content instanceof TemplateRef) {
            return { component: null, nodes: [[]] };
        }
        var component = this.createComponent(content);
        var nodes = component ? [component.location.nativeElement] : [];
        return {
            component: component,
            nodes: [
                nodes // <ng-content>
            ]
        };
    };
    return PopupService;
}());
export { PopupService };
PopupService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PopupService.ctorParameters = function () { return [
    { type: ApplicationRef, },
    { type: ComponentFactoryResolver, },
    { type: Injector, },
    { type: ElementRef, decorators: [{ type: Inject, args: [POPUP_CONTAINER,] }, { type: Optional },] },
]; };
