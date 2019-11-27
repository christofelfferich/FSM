(function (root, factory) { 'use strict';
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.Fsm = factory();
    }
}(this, function () { 'use strict';
   /**
     * Standalone, JavaScript implementation of a Finite State Machine.
     * Copyright (c) 2011-2019, Christof Elfferich
     *                                            All rights preserved.
     */
    class Fsm {
        constructor(statetable, config) {
            for (const [k, v] of Object.entries(statetable)) {
                this[k] = v;
            }
            if (config) {
                for (const [k, v] of Object.entries(config)) {
                    this[k] = v;
                }
            }
            this.timers = {};
            this.currentstate = 'init';
            this.handleEvent('init');
        };
        handleEvent(event, args) {
            if (this.states[this.currentstate].hasOwnProperty(event)) {
                this.states[this.currentstate][event].call(this, args);
            }
        };
        startTimer(timeout, event) {
            this.cancelTimer(event);
            this.timers[event] = setTimeout(_ => {
                delete(this.timers[event]);
                this.handleEvent(event);
            }, timeout);
        };
        cancelTimer(timername) {
            if (this.timers.hasOwnProperty(timername)) {
                clearTimeout(this.timers[timername]);
                delete(this.timers[timername]);
            }
        };
    };
    return Fsm;
}));
