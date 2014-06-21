Biju.js
==================================
Biju is a simple way to track tasks from terminal. No need database, because it saves tasks in a file.

## Settings
Set the environment variable BIJU_FILE with the absolute path to the file that will be used.

```sh
  export BIJU_FILE=~/.biju
```
## Install [![NPM version](https://badge.fury.io/js/biju.svg)](http://badge.fury.io/js/biju)

```sh
  npm install biju -g
```

## Usage
Biju offers five actions: add, list, remove, clear and help.

### Adding tasks
```sh
  biju add 'task I'
```
or

```sh
  biju add 'task I' '2014-06-15'
```
The difference is that it is not given a date, the current date will be added.

### Listing tasks
```sh
  biju list
```
```sh
------- Today -------
->  foo
------- 2014-06-15 -------
->  foo
->  bar
```

or you can use keywords: yesterday, today and tomorrow

```sh
  biju list today
```
```sh
->  foo
```

### Removing a task
```sh
  biju remove 'task I'
```

### Cleaning the house
```sh
  biju clear
```


### HELP
```sh
  biju help
```

```sh
============== Biju Help ====================
 biju add 'task name' <'2014-06-03'>
 biju remove 'task name'
 biju list <yesterday | today | tomorrow>
 biju clear
```

## License
Biju is available under the MIT license.