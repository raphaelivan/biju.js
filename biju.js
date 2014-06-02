#!/usr/bin/env node
require('./date.js');

;(function(){
  function Biju () {
    var
        args = process.argv.slice(2)
      , method = args[0]
      , task = args[1]
      , date = args[2];

      callMethod(method);


    function callMethod (method) {
      if (Biju.hasOwnProperty(method)) {
        Biju[method].apply(args);
      } else {
        showOptions();
      }
    }


    function  showOptions () {
      console.log(
        "==================================\n",
        "add('task name', '03/06/2014') \n",
        "remove('task name')"
      )
    }
  };

  Biju.add = function (info) {
  };


  Biju.list = function () {
  };

  Biju.remove = function  ()  {

  }

  Biju();
})();
