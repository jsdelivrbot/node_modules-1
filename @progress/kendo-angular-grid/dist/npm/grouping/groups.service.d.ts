import { ExpandStateService } from '../expand-state.service';
/**
 * @hidden
 */
export declare class GroupsService extends ExpandStateService {
    isInExpandedGroup(groupIndex: string, skipSelf?: boolean): boolean;
    isExpanded(index: any): boolean;
}
