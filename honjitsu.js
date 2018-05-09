"use strict";
const assert = require("myassert");
const crypto =  require("crypto");
const expectedSha1Hex = "6b4016472030307a38f6ca23f76572ae0bed338f";
const expectedGitHash = "65bc72dcc76a2b79289b04d49364e29e41b2ff1b";
const input =  "本日は晴天なり";
const actual = crypto.createHash("sha1").update(input).digest("hex")
assert.equal(actual, expectedSha1Hex);

function Utf8(s){
	assert.isString(s);
	this.input = s;
  this.utf8String = unescape(encodeURIComponent(s));

	this.getUint8Array = function(){
		var array = [];
		for(var i=0; i<this.utf8String.length; ++i) {
			const x = this.utf8String.charCodeAt(i) % 256;
			if(x < 0) {
				array.push(x + 256);
			} else {
				array.push(x);
			}//if
		}//for
		assert.isUint8Array(array);
		return new Uint8Array(array);
	};//getUint8Array

	this.getInt8Array = function(){
		var array = [];
		for(var i=0; i<this.utf8String.length; ++i) {
			const x = this.utf8String.charCodeAt(i) % 256;
			if(x < -128) {
				array.push(x + 256);
			} else if (x > 127) {
				array.push(x - 256);
			} else {
				array.push(x);
			}//if
		}//for
		assert.isInt8Array(array);
		return new Int8Array(array);
	};//getInt8Array

	this.getSha1Hex = function(){
		const hash1 = crypto.createHash("sha1").update(this.getUint8Array()).digest("hex");
		const hash2 = crypto.createHash("sha1").update(this.getInt8Array()).digest("hex");
		const hash3 = crypto.createHash("sha1").update(this.input, "utf8").digest("hex");
		const hash4 = crypto.createHash("sha1").update(this.utf8String, "ascii").digest("hex");
		assert.equal(hash1, hash2);
		assert.equal(hash2, hash3);
		assert.equal(hash3, hash4);
		return hash3;
	}//getSha1

	this.getGitHashHex = function(){
		const x = "blob " + this.utf8String.length + "\0" + this.utf8String;
		return crypto.createHash("sha1").update(x, "ascii").digest("hex");
	}//getGitHashHex

}//Utf8

const utf8 = new Utf8(input);
assert.equal(utf8.getSha1Hex(), expectedSha1Hex);
assert.equal(utf8.getGitHashHex(), expectedGitHash);

module.exports = Utf8;

