!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.KendoDateMath=t():e.KendoDateMath=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(1)),n(r(4)),n(r(7)),n(r(2)),n(r(3)),n(r(6)),n(r(8)),n(r(10)),n(r(9)),n(r(11)),n(r(12)),n(r(13)),n(r(14)),n(r(15)),n(r(16)),n(r(17)),n(r(5)),n(r(18)),n(r(19))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2),a=r(3);t.addDays=function(e,t){var r=a.cloneDate(e);return r.setDate(r.getDate()+t),n.adjustDST(r,e.getHours())}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(3);t.adjustDST=function(e,t){var r=n.cloneDate(e);return 0===t&&23===r.getHours()&&r.setHours(r.getHours()+2),r}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.cloneDate=function(e){return e?new Date(e.getTime()):e}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2),a=r(3),u=r(5),o=12,i=function(e,r){return e.getMonth()!==r?u.lastDayOfMonth(t.addMonths(e,-1)):e};t.addMonths=function(e,t){var r=a.cloneDate(e),u=(r.getMonth()+t)%o,d=(o+u)%o;return r.setMonth(r.getMonth()+t),i(n.adjustDST(r,e.getHours()),d)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),a=r(6);t.lastDayOfMonth=function(e){var t=a.createDate(e.getFullYear(),e.getMonth()+1,1);return n.addDays(t,-1)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2);t.createDate=function(e,t,r,a,u,o,i){void 0===a&&(a=0),void 0===u&&(u=0),void 0===o&&(o=0),void 0===i&&(i=0);var d=new Date(e,t,r,a,u,o,i);return e>-1&&e<100&&d.setFullYear(d.getFullYear()-1900),n.adjustDST(d,a)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1);t.addWeeks=function(e,t){return n.addDays(e,7*t)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(9),a=r(2),u=r(3);t.dayOfWeek=function(e,t,r){void 0===r&&(r=n.Direction.Forward);var o=u.cloneDate(e),i=(t-o.getDay()+7*r)%7;return o.setDate(o.getDate()+i),a.adjustDST(o,e.getHours())}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r;!function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward"}(r=t.Direction||(t.Direction={}))},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r;!function(e){e[e.Sunday=0]="Sunday",e[e.Monday=1]="Monday",e[e.Tuesday=2]="Tuesday",e[e.Wednesday=3]="Wednesday",e[e.Thursday=4]="Thursday",e[e.Friday=5]="Friday",e[e.Saturday=6]="Saturday"}(r=t.Day||(t.Day={}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(9),a=r(8);t.nextDayOfWeek=function(e,t){return a.dayOfWeek(e,t,n.Direction.Forward)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(9),a=r(8);t.prevDayOfWeek=function(e,t){return a.dayOfWeek(e,t,n.Direction.Backward)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(6);t.getDate=function(e){return n.createDate(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(3),a=r(10);t.firstDayInWeek=function(e,t){void 0===t&&(t=a.Day.Sunday);for(var r=n.cloneDate(e);r.getDay()!==t;)r.setDate(r.getDate()-1);return r}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(6);t.firstDayOfMonth=function(e){return n.createDate(e.getFullYear(),e.getMonth(),1)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isEqual=function(e,t){return!e&&!t||e&&t&&e.getTime()===t.getTime()}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(13),a=r(16);t.isEqualDate=function(e,t){return!e&&!t||e&&t&&a.isEqual(n.getDate(e),n.getDate(t))}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MS_PER_DAY=864e5},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(10),a=r(1),u=r(6),o=r(12),i=r(18),d=function(e,t){return t!==n.Day.Monday?a.addDays(o.prevDayOfWeek(e,t),4):a.addDays(e,4-(e.getDay()||7))},c=function(e,t){var r=u.createDate(e.getFullYear(),0,1,-6),n=d(e,t),a=n.getTime()-r.getTime(),o=Math.floor(a/i.MS_PER_DAY);return 1+Math.floor(o/7)};t.weekInYear=function(e,t){void 0===t&&(t=n.Day.Monday);var r=a.addDays(e,-7),u=a.addDays(e,7),o=c(e,t);return 0===o?c(r,t)+1:53===o&&c(u,t)>1?1:o}}])});