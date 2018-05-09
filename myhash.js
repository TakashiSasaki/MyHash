"use strict";
const assert = require("myassert");
const crypto = require("crypto");

function StringHash(s){
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

	this.getSha1= function(){
		//const hash1 = crypto.createHash("sha1").update(this.getUint8Array());
		//const hash2 = crypto.createHash("sha1").update(this.getInt8Array());
		const hash3 = crypto.createHash("sha1").update(this.input, "utf8");
		//const hash4 = crypto.createHash("sha1").update(this.utf8String, "ascii");
		//assert.equal(hash1.digest("hex"), hash2.digest("hex"));
		//assert.equal(hash2.digest("hex"), hash3.digest("hex"));
		//assert.equal(hash3.digest("hex"), hash4.digest("hex"));
		return hash3;
	}//getSha1

	this.getSha1Hex = function(){
		return this.getSha1().digest("hex");
	}//getSha1Hex

	this.getSha1Buffer = function(){
	  const buffer = this.getSha1().digest();
		//console.log(buffer.buffer.constructor.name);
		return buffer;
	}//getSha1Buffer

	this.getGitHash = function(){
		const x = "blob " + this.utf8String.length + "\0" + this.utf8String;
		return crypto.createHash("sha1").update(x, "ascii");
	}//getGitHash

	this.getGitHashHex = function(){
		return this.getGitHash().digest("hex");
	}//getGitHashHex

	this.getGitHashBuffer = function(){
		const buffer = this.getGitHash().digest();
		//console.log(buffer.buffer.constructor.name);
		return buffer;
	}//getGitHashBuffer

}//StringHash

function computePairHashBuffer(k,v){
	if(typeof k !== "number" && typeof k !== "string") {
		assert.fail("key should be a number or a string.");
	}//if
	if(typeof v !== "boolean" && typeof v !== "number" && typeof v!== "string" && v !== null) {
		assert.fail("value should be a boolean, a number ,a string or null.");
  }//if
	const s = JSON.stringify(k)+":"+JSON.stringify(v);
	const stringHash = new StringHash(s);
	return stringHash.getGitHashBuffer();
}//computePairHash

function xorBuffers(x,y){
	var result = [];
	assert(x instanceof Buffer);
	assert(y instanceof Buffer);
	assert(x.byteLength() === y.byteLength());
	for(var i=0; i<x.byteLength; ++i) {
		result.push(x[i]^y[i]);
	}//for
	assert.isUint8Array(result);
	return Buffer.from(result);
}//xorBuffers

function computeArrayHash(a) {
	assert.isArray(a);
	for(var i=0; i<a.length; ++i) {
	}//for
}//computeArrayHash

function computeObjectHash(o) {
	assert.isObject(o);
}//computeObjectHash

module.exports.StringHash = StringHash;
module.exports.computePairHashBuffer = computePairHashBuffer;

