import { Component, OnInit } from '@angular/core';
import { Value } from './value';
import { ValueService } from './value.service';

@Component({
    moduleId: module.id,
    selector: 'value',
    templateUrl: 'values.component.html'
})
export class ValueComponent implements OnInit {
    values: Value[] = [];
    errorMessage: string = '';
    isLoading: boolean = true;
    constructor(private valueService: ValueService) { }

    ngOnInit() {
        this.valueService
            .getAll()
            .subscribe(
                /* happy path */ p => this.values = p,
                /* error path */ e => this.errorMessage = e,
                /* on Complete */()=> this.isLoading = false
            );
    }
}