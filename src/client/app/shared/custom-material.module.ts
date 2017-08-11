import { NgModule } from '@angular/core';
import {
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdSidenavModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
} from '@angular/material';

@NgModule({
    imports: [
        MdButtonModule,
        MdToolbarModule,
        MdSelectModule,
        MdTabsModule,
        MdInputModule,
        MdProgressSpinnerModule,
        MdChipsModule,
        MdCardModule,
        MdSidenavModule,
        MdCheckboxModule,
        MdListModule,
        MdMenuModule,
        MdIconModule,
        MdTooltipModule
    ],
    exports: [
        MdButtonModule,
        MdToolbarModule,
        MdSelectModule,
        MdTabsModule,
        MdInputModule,
        MdProgressSpinnerModule,
        MdChipsModule,
        MdCardModule,
        MdSidenavModule,
        MdCheckboxModule,
        MdListModule,
        MdMenuModule,
        MdIconModule,
        MdTooltipModule
    ]
})

export class CustomMaterialModule { }
