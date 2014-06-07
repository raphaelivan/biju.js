#!/usr/bin/env node
require('./date.js');
;(function(){
  'use strict'

  var fs = require('fs');

  /* create Biju Object */
  var Biju = {
    file: '.list.txt'
  };

  /* Define the initializer method */
  Biju.init = function (file) {
    var
        args = process.argv.slice(2)
      , method = args[0];

    callMethod(method);
  }


  function  showOptions () {
    console.log(
      "==================================\n",
      "add('task name', '03/06/2014') \n",
      "remove('task name')\n",
      'list'
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
      , date = args[2] ? args[2] : new Date().format()
      , file = Biju.file
      , buffer = new Buffer(note + ':' + date + ';')

    fs.appendFile(file, buffer, function (err) {
      if (err) {
        throw 'error writing file:' + err;
      };

      console.log('Note saved!')
    });
  };


  Biju.list = function () {
    var
        file = Biju.file
      , output = {};

    fs.readFile(file, function (err, buffer){
      var
          data = buffer.toString()
        , lines = data.split(';');

        lines.forEach(function (e) {
          var
              split = e.split(':')
            , date = split[1]
            , note = split[0];

          if (output[date]) {
            output[date].push(note);
          } else {
            output[date] = [];
            output[date].push(note);
          }
        });


      for (var k in output) {
        if (k === new Date().format()) {
          console.log('------- Today -------');
        } else {
          if (k !== 'undefined') {
            console.log('-------', k, '-------');
          };
        }

        output[k].forEach(function (e) {
          if (e) {
            console.log("-> ", e);
          };
        });
      };
    })
  };

  Biju.remove = function  ()  {
  };

  delete Biju.init();
})();
