#!/usr/bin/env node
require('./date.js');

;(function(){
  function Biju () {
    var
        args = process.argv.slice(2)
      , method = args[0];

    callMethod(method);

    function  showOptions () {
      console.log(
        "==================================\n",
        "add('task name', '03/06/2014') \n",
        "remove('task name')"
      )
    }


    function callMethod (method) {
      if (Biju.hasOwnProperty(method)) {
        Biju[method].apply(args);
      } else {
        showOptions();
      }
    }
  };

  Biju.add = function (info) {
    var
        args = process.argv.slice(2)
      , method = args[0]
      , task = args[1]
      , date = args[2];

    if (!date) {
      var date = new Date().format();
    };

    console.log(args);
  };


  Biju.list = function () {
  };

  Biju.remove = function  ()  {
  };
})();
