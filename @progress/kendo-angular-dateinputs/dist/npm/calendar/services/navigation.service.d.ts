import { KeyDown } from '../models/keydown.interface';
import { Action } from '../models/navigation-action.enum';
/**
 * @hidden
 */
export declare class NavigationService {
    action(event: KeyDown): Action;
    move(candidate: Date, action: Action): Date;
}
