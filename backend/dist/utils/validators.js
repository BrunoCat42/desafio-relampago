"use strict";
function isEmpty(text) {
    return !text || text.trim() === "";
}
function isFutureDate(date) {
    const today = new Date();
    const inputDate = new Date(date);
    return inputDate.getTime() >= today.getTime();
}
