#!/usr/bin/env node
require('./date.js');
;(function(){
  'use strict'

  var fs = require('fs');

  /* create Biju Object */
  var Biju = {
    file: 'list.txt'
  };

  /* Define the initializer method */
  Biju.init = function (file) {
    var
        args = process.argv.slice(2)
      , method = args[0];

    if (!file) {
      Biju.file = 'list.txt';

    };

    callMethod(method);
  }


  function  showOptions () {
    console.log(
      "==================================\n",
      "add('task name', '03/06/2014') \n",
      "remove('task name')"
    )
  }

  function callMethod (method) {
    if (Biju.hasOwnProperty(method)) {
      Biju[method].call();
    } else {
      showOptions();
    }
  }

  Biju.add = function () {
    var
        args = process.argv.slice(2)
      , note = args[1]
      , date = args[2]
      , file = Biju.file;

    if (!date) {
      var date = new Date().format();
    };

    fs.writeFile(
        file
      , (note + ':' + date + '\n')
      , function (err) {
        if (err) {
          return console.log('OOPS!')
        };

        console.log('Note saved!')
      }
    )
  };


  Biju.list = function () {
    var
      file = Biju.file;

    fs.readFile(file, function(err, buffer){
      var data = buffer.toString();

      console.log(data);
    })
  };

  Biju.remove = function  ()  {
  };

  delete Biju.init();
})();
