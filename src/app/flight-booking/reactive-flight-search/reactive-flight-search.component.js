"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var flight_service_1 = require("../flight-search/flight.service");
var ReactiveFlightSearchComponent = (function () {
    function ReactiveFlightSearchComponent(flightService, fb, eventService) {
        var _this = this;
        this.flightService = flightService;
        this.fb = fb;
        this.eventService = eventService;
        this.flights = [];
        this.basket = {
            "3": true,
            "4": false,
            "5": true
        };
        //private http: Http;
        this.loading = false;
        this.formMetaData = [
            { label: 'Airport of Departure', name: 'from' },
            { label: 'Airport of Destination', name: 'to' },
        ];
        // this.http = http;
        this.filter = fb.group({
            from: [
                '',
                []
            ],
            to: [
                ''
            ]
        });
        this.flights$ = this
            .filter
            .valueChanges
            .debounceTime(500)
            .filter(function (v) { return v.from.length > 2; })
            .distinctUntilChanged(function (oldVal, newVal) { return oldVal.from === newVal.from; })
            .filter(function (value) { return _this.filter.valid; })
            .do(function (v) {
            console.debug(v);
            _this.loading = true;
        })
            .switchMap(function (value) { return _this.flightService.find(value.from, value.to); })
            .do(function (v) {
            console.debug(v);
            _this.loading = false;
        });
    }
    ReactiveFlightSearchComponent.prototype.search = function () {
        var _this = this;
        var from = this.filter.controls['from'].value;
        // this.filter.controls['from'].setValue('Kognito');
        this.flightService
            .find(this.filter.value.from, this.filter.value.to)
            .subscribe(function (flights) {
            _this.flights = flights;
        }, function (errResp) {
            console.error('Fehler beim Laden', errResp);
        });
    };
    ReactiveFlightSearchComponent.prototype.select = function (f) {
        this.eventService.flightSelected.next(f);
    };
    return ReactiveFlightSearchComponent;
}());
ReactiveFlightSearchComponent = __decorate([
    core_1.Component({
        selector: 'reactive-flight-search',
        templateUrl: 'reactive-flight-search.component.html',
        styleUrls: ['./reactive-flight-search.component.css'],
        providers: [flight_service_1.FlightService]
    })
], ReactiveFlightSearchComponent);
exports.ReactiveFlightSearchComponent = ReactiveFlightSearchComponent;
