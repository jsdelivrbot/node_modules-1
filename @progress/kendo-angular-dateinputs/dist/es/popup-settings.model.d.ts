/**
 * Used for configuring the dimensions of the popup container.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-datepicker [popupSettings]="{ animate: false }">
 *  </kendo-datepicker>
 * `
 * })
 * class AppComponent {
 * }
 * ```
 */
export interface PopupSettings {
    /**
     * Controls the popup animation. By default, the open and close animations are enabled.
     */
    animate?: boolean;
    /**
     * Specifies a list of CSS classes that are used for styling the popup.
     */
    popupClass?: string;
}
