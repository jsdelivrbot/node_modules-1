import { Renderer2, EventEmitter, ElementRef } from '@angular/core';
import { Direction } from './direction';
/**
 * @hidden
 */
export declare class SearchBarComponent {
    direction: Direction;
    activeDescendant: string;
    id: string;
    disabled: boolean;
    tabIndex: number;
    popupOpen: boolean;
    placeholder: string;
    role: string;
    userInput: string;
    suggestedText: string;
    valueChange: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onClick: EventEmitter<any>;
    onNavigate: EventEmitter<any>;
    input: ElementRef;
    readonly searchBarClass: boolean;
    readonly value: string;
    private _userInput;
    private _composing;
    private renderer;
    compositionStart(): void;
    compositionUpdate(): void;
    compositionEnd(): void;
    constructor(rtl: boolean, renderer: Renderer2);
    ngOnChanges(changes: any): void;
    private writeInputValue(text);
    private setInputSelection(start, end);
    handleInput(event: any): void;
    handleFocus(event: any): void;
    handleBlur(event: any): void;
    handleKeydown(event: any): void;
    focus(): void;
    blur(): void;
    resizeInput(size: number): void;
}
