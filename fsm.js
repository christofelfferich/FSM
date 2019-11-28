((root, factory) => {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.Fsm = factory();
    }
})(this, _ => {
    'use strict';
     /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  Standalone, JavaScript implementation of a Finite State Machine.  *
     *  Copyright (c) 2010-2019,                                          *
     *  Christof Elfferich                         all rights preserved.  *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    return class Fsm {
        constructor(statetable) {
            for (const [k, v] of Object.entries(statetable)) {
                this[k] = v;
            }
            this.timers = {}, this.state = 'init';
            this.handleEvent('init')
        }
        handleEvent(event) {
            if (event in this.states[this.state]) {
                this.states[this.state][event].call(this);
            }
        }
        startTimer(timeout, event) {
            this.cancelTimer(event)
            this.timers[event] = setTimeout(_ => {
                delete(this.timers[event]);
                this.handleEvent(event)
            }, timeout);
        }
        cancelTimer(timername) {
            if (timername in this.timers) {
                clearTimeout(this.timers[timername]);
                delete(this.timers[timername]);
            }
        }
    };
});
