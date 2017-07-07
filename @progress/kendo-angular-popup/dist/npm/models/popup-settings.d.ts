import { ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Align } from './align.interface';
import { Collision } from './collision.interface';
import { Offset } from './offset.interface';
/**
 * The settings that can be used when the Popup is opened through `PopupService`.
 *
 * For an example on sample usage, refer to the
 * [`PopupService.open`]({% slug api_popup_popupservice_kendouiforangular %}#toc-open) method.
 */
export interface PopupSettings {
    /**
     * Controls the Popup animation. By default, the open and close animations are enabled.
     *
     * For more information, refer to the section on
     * [animation control]({% slug overview_popup_kendouiforangular %}#toc-animations).
     */
    animate?: boolean;
    /**
     * Specifies the element that will be used as an anchor. The Popup opens next to that element.
     */
    anchor?: ElementRef;
    /**
     * Defines the container to which the Popup will be appended.
     */
    appendTo?: ViewContainerRef;
    /**
     * Defines the content of the Popup.
     */
    content?: TemplateRef<any> | Function;
    /**
     * Specifies the anchor pivot point.
     *
     * For more information, refer to the section on
     * [positioning]({% slug overview_popup_kendouiforangular %}#toc-position).
     */
    anchorAlign?: Align;
    /**
     * Configures the collision behavior of the Popup.
     *
     * For more information, refer to the section on
     * [collisions]({% slug overview_popup_kendouiforangular %}#toc-viewport-boudary-detection).
     */
    collision?: Collision;
    /**
     * Specifies the pivot point of the Popup.
     *
     * For more information, refer to the section on
     * [positioning]({% slug overview_popup_kendouiforangular %}#toc-position).
     */
    popupAlign?: Align;
    /**
     * Specifies a list of CSS classes to be added to the internal animated element.
     *
     * > To style the content of the Popup, use this property binding.
     *
     * For more information, refer to the section on
     * [appearance control]({% slug overview_popup_kendouiforangular %}#toc-styling).
     */
    popupClass?: string | Array<string> | Object;
    /**
     * Specifies the absolute position of the element. The Popup opens next to that point.
     *
     * The Popup pivot point is defined by the `popupAlign` configuration option.
     * The boundary detection is applied by using the window viewport.
     *
     * For more information, refer to the section on
     * [static alignment]({% slug overview_popup_kendouiforangular %}#toc-to-specific-absolute-points).
     */
    offset?: Offset;
}
