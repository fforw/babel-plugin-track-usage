var moduleFn = require('./service/moduleFn');
var nonvar = require('./service/nonVarMod');
var a = 123;
var b = moduleFn('Foo');
var c = nonvar('A');
var d = nonvar('Ignored', 1);
var e = moduleFn('NotIgnored', 2);
