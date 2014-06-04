/* jshint strict: true, node: true */
"use strict";

exports.stock = [];
exports.replace = function(obj, method, func) {
  var existing = null;
  for(var i = 0; i < this.stock.length; i++) {
    if (this.stock[i].obj == obj && this.stock[i].method == method) {
      existing = this.stock[i];
      break;
    }
  }

  if(!existing)
    existing = this.stock.push({ obj: obj, method: method, func: obj[method] });

  var replaced = obj[method];
  obj[method] = func;
  return replaced;
};
exports.restore = function() {
  this.stock.forEach(function (item){
    item.obj[item.method] = item.func;
  });
  this.stock = [];
};

