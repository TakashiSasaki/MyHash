'use strict'
const assert = require("assert");

let string = "\uD800\uDC00";
let utf8Uint8Array = new Uint8Array([0xf0, 0x90, 0x80, 0x80]);
let utf8Uint16Array = new Uint16Array([0xf0, 0x90, 0x80, 0x80]);
let uint16Array = new Uint16Array([0xd800, 0xdc00]);
let int16ArrayOverflow = new Int16Array([0xd800, 0xdc00]);
let int16Array = new Int16Array([0xd800-0x8000, 0xdc00-0x8000]);
let littleEndianUint8Array = new Uint8Array([0xd8, 0x00, 0xdc, 0x00]);
let littleEndianInt8ArrayOverflow = new Int8Array([0xd8, 0x00, 0xdc, 0x00]);
let littleEndianInt8Array = new Int8Array([0xd8-0x80, 0x00, 0xdc-0x80, 0x00]);
let doubleZero = new Uint8Array([0x00, 0x00]);
let bigEndianUint8Array = new Uint8Array([0x00, 0xd8, 0x00, 0xdc]);
let bigEndianInt8ArrayOverflow = new Int8Array([0x00, 0xd8, 0x00, 0xdc]);
let bigEndianInt8Array = new Int8Array([0x00, 0xd8-0x80, 0x00, 0xdc-0x80]);


let utf8String = unescape(encodeURIComponent(string));
assert.equal(utf8String.charCodeAt(0), 0xf0);
assert.equal(utf8String.charCodeAt(1), 0x90);
assert.equal(utf8String.charCodeAt(2), 0x80);
assert.equal(utf8String.charCodeAt(3), 0x80);
assert.equal(typeof utf8String, "string");
assert.equal(utf8String.length, 4);

let utf16String = decodeURIComponent(escape(utf8String));
assert.equal(string, utf16String);
assert.equal(typeof utf16String, "string");
assert.equal(utf16String.length, 2);

function sha1hex(s, encoding){
  const x = eval(s);
  if(typeof x === "string" && typeof encoding === "undefined") {
    encoding = "utf8";
  }//if
  if(typeof x === "string") {
    var typeName = x.constructor.name + "(" + encoding + ")";
  } else {
    var typeName = x.constructor.name;
  }//if
  console.log(crypto.createHash("sha1").update(x, encoding).digest("hex") + " " + typeName + "\t" + s);
}//sha1hex

const crypto = require("crypto");
console.log('string = "\\uD800\\uDC00" which is codepoint 65536.');
console.log('encodeURIComponent(string) = ' + encodeURIComponent(string));
sha1hex("string");
sha1hex("doubleZero");
sha1hex("utf8Uint8Array");
sha1hex("utf8Uint16Array");
sha1hex("littleEndianUint8Array");
sha1hex("littleEndianInt8ArrayOverflow");
sha1hex("littleEndianInt8Array");
sha1hex("bigEndianUint8Array");
sha1hex("bigEndianInt8ArrayOverflow");
sha1hex("bigEndianInt8Array");
sha1hex("utf8String");
sha1hex("utf8String", "ascii");
sha1hex("utf8String", "latin1");
sha1hex("utf16String");
sha1hex("uint16Array");
sha1hex("int16Array");
sha1hex("int16ArrayOverflow");

