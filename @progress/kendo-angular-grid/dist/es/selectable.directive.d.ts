import { SelectionService } from './selection.service';
/**
 * @hidden
 */
export declare class SelectableDirective {
    private selectionService;
    index: number;
    private enabled;
    private ignored;
    constructor(selectionService: SelectionService);
    kendoGridSelectable: boolean;
    readonly className: boolean;
    onClick(target: any): void;
    protected shouldSelect(tagName: string): boolean;
}
