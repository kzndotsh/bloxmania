import {
  init_cjs_shims
} from "./chunk-PKR7KJ6P.js";

// ../cli-kit/dist/private/node/context/deprecations-store.js
init_cjs_shims();
var globalWithDeprecationsStore = {
  ...globalThis,
  deprecationsStore: {
    nextDeprecationDate: void 0
  }
};
function getNextDeprecationDate() {
  return globalWithDeprecationsStore.deprecationsStore.nextDeprecationDate;
}
function setNextDeprecationDate(dates) {
  if (dates.length < 1)
    return;
  let earliestFutureDateTime = earliestDateTimeAfter(Date.now(), dates);
  if (!earliestFutureDateTime)
    return;
  let nextDeprecationDate = getNextDeprecationDate();
  (!nextDeprecationDate || earliestFutureDateTime < nextDeprecationDate.getTime()) && (globalWithDeprecationsStore.deprecationsStore.nextDeprecationDate = new Date(earliestFutureDateTime));
}
function earliestDateTimeAfter(afterTime, dates) {
  return dates.map((date) => date.getTime()).sort().find((time) => time > afterTime);
}

export {
  getNextDeprecationDate,
  setNextDeprecationDate
};
//# sourceMappingURL=chunk-CP3BRHWK.js.map
