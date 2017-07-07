import { ViewContainerRef, OnInit, OnDestroy, OnChanges, ComponentRef, ComponentFactoryResolver, SimpleChange } from '@angular/core';
import { ColumnComponent } from '../column.component';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterComponent } from './filter-component.interface';
/**
 * @hidden
 */
export declare class FilterHostDirective implements OnInit, OnDestroy, OnChanges {
    private host;
    private resolver;
    column: ColumnComponent;
    filter: CompositeFilterDescriptor;
    protected component: ComponentRef<FilterComponent>;
    constructor(host: ViewContainerRef, resolver: ComponentFactoryResolver);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    private componentType();
    private initComponent({column, filter});
}
