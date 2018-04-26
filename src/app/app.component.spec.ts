// Copyright (C) 2017 Nokia

import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {OAuthModule, OAuthService} from "angular-oauth2-oidc";

class OAuthServiceMock {
    hasValidAccessToken() {
        return true;
    }
    logout() {}
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NgbModule.forRoot(),
                OAuthModule.forRoot(),
            ],
            providers: [
                {provide: OAuthService, useClass: OAuthServiceMock}
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));


    it('should render title', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.navbar-brand').textContent).toContain('CloudFlow');
    }));

    it('should render a logout button', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#logout').textContent).toBeDefined();
    }));
});
