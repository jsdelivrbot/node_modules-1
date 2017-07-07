import { ComponentRef, EventEmitter } from '@angular/core';
import { PopupComponent } from '../popup.component';
/**
 * Holds references to the Popup object instance.
 * Controls the Popups that have been opened through the `PopupService`.
 *
 * For an example on sample usage, refer to the
 * [`PopupService.open`]({% slug api_popup_popupservice_kendouiforangular %}#toc-open) method.
 */
export interface PopupRef {
    /**
     * A reference to the Popup instance.
     */
    popup: ComponentRef<PopupComponent>;
    /**
     * A reference to the HTML element of the Popup.
     */
    popupElement: HTMLElement;
    /**
     * A reference to the child component of the Popup.
     * Available when the Popup is opened with [component content]({% slug service_dialog_kendouiforangular %}#toc-using-components).
     */
    content: ComponentRef<any>;
    /**
     * Closes and destroys the Popup component.
     */
    close: Function;
    /**
     * Fires when the anchor is scrolled outside the screen boundaries.
     *
     * For more information, refer to the section on
     * [scrolling outside the viewport]({% slug overview_popup_kendouiforangular %}#toc-viewport-boundary-detection).
     */
    popupAnchorViewportLeave: EventEmitter<any>;
    /**
     * Fires after the component is closed.
     */
    popupClose: EventEmitter<any>;
    /**
     * Fires after the component is opened and the open animation has ended.
     */
    popupOpen: EventEmitter<any>;
}
