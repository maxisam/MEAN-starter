import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from './custom-material.module';

@NgModule({
    imports: [
        CommonModule,
        CustomMaterialModule
    ],
    declarations: [],
    exports: [
        // angular2
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // 3rd party
        CustomMaterialModule
    ]
})

export class SharedModule { }
