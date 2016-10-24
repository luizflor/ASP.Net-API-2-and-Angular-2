import { Component } from '@angular/core';
import './rxjs-operators';
import { ValueService } from './values/value.service';
@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers:[ValueService]
})
export class AppComponent { }
