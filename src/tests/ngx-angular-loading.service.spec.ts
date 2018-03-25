'use strict';

import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';

import { Component } from '@angular/core';
import { NGXLoadingService } from '../ngx-angular-loading/ngx-angular-loading.service';

describe('NGXLoadingService', () => {
  let modalService: NGXLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NGXLoadingService
      ]
    });
  });

  beforeEach(inject([NGXLoadingService], (ngxLoadingService: NGXLoadingService) => {
    modalService = ngxLoadingService;
  }));

  /**
   * Sanity check - it can be created
   */
  it('should be injected successfully', () => {
    expect(modalService).toBeDefined();
  });

  /**
   * Sanity check - API is as expected
   */
  it('should have a method called start', () => {
    expect(typeof modalService.start).toBe('function');
  });

  it('should have a method called finish', () => {
    expect(typeof modalService.finish).toBe('function');
  });

  it('should have a method called setDefaultOptions', () => {
    expect(typeof modalService.setDefaultOptions).toBe('function');
  });

  it('should have a propety called ngxLoadingOptions', () => {
    expect(typeof modalService.ngxLoadingOptions).toBe('object');
  });

  it('should have a propety called ngxLoadingOptions.spinnerOptions', () => {
    expect(typeof modalService.ngxLoadingOptions.spinnerOptions).toBe('object');
  });
  it('should have a propety called ngxLoadingOptions.spinnerOptions', () => {
    expect(Object.keys(modalService.ngxLoadingOptions).length).toBe(6);
  });

});