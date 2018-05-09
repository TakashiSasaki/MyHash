"use strict";
const myhash = require("myhash");
const assert = require("myassert");
const crypto = require("crypto");

const expectedSha1Hex = "6b4016472030307a38f6ca23f76572ae0bed338f";
const expectedGitHash = "65bc72dcc76a2b79289b04d49364e29e41b2ff1b";
const input =  "本日は晴天なり";
const actual = crypto.createHash("sha1").update(input).digest("hex")
assert.equal(actual, expectedSha1Hex);


const stringHash = new myhash.StringHash(input);
assert.equal(stringHash.getSha1Hex(), expectedSha1Hex);
assert.equal(stringHash.getGitHashHex(), expectedGitHash);

console.log(myhash.computePairHashBuffer(1,1));
console.log(myhash.computePairHashBuffer(1,"1"));
console.log(myhash.computePairHashBuffer("1",1));

