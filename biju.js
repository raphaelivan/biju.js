#!/usr/bin/env node
require('./date.js');
;(function(){
  'use strict'

  var fs = require('fs');

  /* create Biju Object */
  var Biju = {
    file: process.env.BIJU_FILE
  };

  /* Define the initializer method */
  Biju.init = function () {
    var
        args = process.argv.slice(2)
      , method = args[0];

    if (!Biju.file) {
      return console.log('You need to set BIJU_FILE environment variable. e.g (export BIJU_FILE="~/.biju.txt"');
    };

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

      console.log('Note saved!');
    });
  };


  Biju.list = function () {
    var
        file = Biju.file
      , output = {}
      , day = process.argv.slice(2)[1];

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

        if (day) {
          displayDayList(day);
        } else {
          displayCompleteList();
        }
    });


    function displayDayList (day) {
      var interval = 24 * 60 * 60 * 1000;

      switch (day) {
        case 'yesterday':
          day = new Date( new Date().getTime() - interval).format();
          break;
        case 'today':
          day = new Date().format();
          break;
        case 'tomorrow':
          day = new Date( new Date().getTime() + interval).format();
          break;
      }


      for (var k in output) {
        if (k === day) {
          output[k].forEach(function (e) {
            if (e) {
              console.log("-> ", e);
            };
          });
        }
      };
    };

    function displayCompleteList () {
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
    }
  };

  Biju.clear = function () {
    var
        file = Biju.file
      , stdin;
    console.log('Are you sure?(y | n)');
    stdin = process.openStdin();
    stdin.addListener('data', function(d) {
      var answer = d.toString().substring(0, d.length-1);
      if (answer == 'y') {
        fs.writeFile(file, '', 'utf-8', function (err) {});
        console.log('Clean!');
      }
      process.exit(0);
    });
  }


  Biju.remove = function () {
    var
        file = Biju.file
      , n = process.argv.slice(2)[1];

    fs.readFile(file, function (err, buffer){
      var
          data = buffer.toString()
        , lines = data.split(';');

        lines.forEach(function (e) {
          var
              split = e.split(':')
            , date = split[1]
            , note = split[0]
            , re = new RegExp(n,"i")
            , output;

          if (note.match(re)) {
            output = data.replace(e + ';','');
          };

          fs.writeFile(file, output, 'utf-8', function (err) {
          });
        });
    });
  };

  delete Biju.init();
})();
