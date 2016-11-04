const LoadReactPivot = require('../load');

const root = window || this;

if (typeof define === 'function' && define && define.amd) {
  // AMD
    define(['ReactPivot'], LoadReactPivot);
} else {
  // Global Variables
    root.ReactPivot = LoadReactPivot;
}
