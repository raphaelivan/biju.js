require('./date.js');

;(function(){
  'use strict'

  var
        fs = require('fs')
      , log = require('pretty-log')
      , Biju = { file: process.env.BIJU_FILE };

  /* Define the initializer method */
  Biju.init = function () {
    var
        args = process.argv.slice(2)
      , method = args[0];

    if (!Biju.file) {
      return log.error('You need to set BIJU_FILE environment variable. e.g (export BIJU_FILE="~/.biju.txt"');
    };

    callMethod(method);
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
        log.error("Error writing file");
        throw err;
      };

      log.success('Note saved!');
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
          displayDayList(output, day);
        } else {
          displayCompleteList(output);
        }
    });
  };

  Biju.clear = function () {
    var
        file = Biju.file
      , stdin;
    log.warn('Are you sure?(y | n)');
    stdin = process.openStdin();
    stdin.addListener('data', function(d) {
      var answer = d.toString().substring(0, d.length-1);
      if (answer == 'y') {
        fs.writeFile(file, '', 'utf-8', function (err) {});
        log.success('Clean!');
      }
      process.exit(0);
    });
  }

  Biju.help = function () {
    showOptions();
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
            , output = '';

          if (note.match(re)) {
            output = data.replace(e + ';','');
          };

          fs.writeFile(file, output, 'utf-8', function (err) {
          });
        });
    });
  };


  // Display information about a specifc day
  function displayDayList (output, day) {
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
            var s = '-> ' + e;
            console.log(s.green);
          };
        });
      }
    };
  };

  // Display information of every day
  function displayCompleteList (output) {
    for (var k in output) {
      if (k === new Date().format()) {
        console.log('-------- Today --------'.blue);
      } else {
        if (k !== 'undefined') {
          var s = '-------'+ k +'------';
          console.log(s.blue);
        };
      }

      output[k].forEach(function (e) {
        if (e) {
          var s = '-> ' + e;
          console.log(s.green);
        };
      });
    };
  }

  // show menu options
  function  showOptions () {
    console.log(
      "============== Biju Help ====================\n".blue,
      "biju add 'task name' <'2014-06-03'>\n".blue,
      "biju remove 'task name'\n".blue,
      "biju list <yesterday | today | tomorrow>\n".blue,
      'biju clear'.blue
    )
  }

  function callMethod (method) {
    if (Biju.hasOwnProperty(method)) {
      Biju[method].call();
    } else {
      showOptions();
    }
  }

  exports.init = Biju.init;
})();
