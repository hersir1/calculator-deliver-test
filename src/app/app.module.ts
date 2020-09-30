import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N, ru_RU} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import ru from '@angular/common/locales/ru';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CalculatorDirective} from './directives/calculator.directive';
import {NzModalModule} from 'ng-zorro-antd/modal';

registerLocaleData(ru);

@NgModule({
	declarations: [
		AppComponent,
		CalculatorDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		NzInputModule,
		NzButtonModule,
		NzModalModule
	],
	providers: [
		{provide: NZ_I18N, useValue: ru_RU}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
