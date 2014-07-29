Date.prototype.format = function () {
  'use strict';

  var
      d = this.getDate()
    , m = this.getMonth() + 1
    , y = this.getFullYear();

    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
};