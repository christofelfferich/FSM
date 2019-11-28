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
            this.states = statetable;
            this.timers = {};
            this.setState('init')
        }
        setState(state) {
            this.state = state;
            this.handleEvent('init')
        }
        handleEvent(event) {
            if (this.states[this.state][event]) {
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
        cancelTimer(event) {
            if (this.timers[event]) {
                clearTimeout(this.timers[event]);
                delete(this.timers[event]);
            }
        }
    };
});
