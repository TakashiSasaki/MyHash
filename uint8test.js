"use strict";
const assert = require("myassert");
const list  = [-1,0,1,127,128,129];


function dump(x){
  assert.isArray(x);
  var a = [];
  for(var i=0; i<x.length; ++i) {
    a.push(x[i]);
  }//for
  console.log(""+a + "\t" + x.constructor.name);
}//dump

dump(list);
dump(new Uint8Array(list));
dump(new Int8Array(list));
dump(new Uint16Array(list));
dump(new Int16Array(list));

