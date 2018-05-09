const ZWNJ = "\u200c";
const ZWJ = "\u200d";
const BOM = "\ufeff";
const BS = "\u0008";
const controlChars = [ZWNJ, ZWJ, BOM];

const HT = "\u0009";
const VT = "\u000b";
const FF = "\u000c";
const SP = "\u0020";
const NPSP = "\u00a0";
const NEL = "\u0085";
const whiteSpaces = [HT, VT, FF, SP, NPSP, NEL];

const LF = "\u000a";
const CR = "\u000d";
const LS = "\u2028";
const PS = "\u2029";
const lineTerminators = [LF, CR, LS, PS];

console.log("control characters");
console.log("ZWNJ\t" + JSON.stringify(ZWNJ));
console.log("ZWJ\t" + JSON.stringify(ZWJ));
console.log("BOM\t" + JSON.stringify(BOM));
console.log("BS\t" + JSON.stringify(BS));
console.log("white spaces");
console.log("HT\t" + JSON.stringify(HT));
console.log("VT\t" + JSON.stringify(VT));
console.log("FF\t" + JSON.stringify(FF));
console.log("SP\t" + JSON.stringify(SP));
console.log("NPSP\t" + JSON.stringify(NPSP));
console.log("NEL\t" + JSON.stringify(NEL));
console.log("line terminators");
console.log("LF\t" + JSON.stringify(LF));
console.log("CR\t" + JSON.stringify(CR));
console.log("LS\t" + JSON.stringify(LS));
console.log("PS\t" + JSON.stringify(PS));

for(var i=0; i<=0x1f; ++i) {
	console.log(JSON.stringify(String.fromCharCode(i)));
}
console.log(JSON.stringify(String.fromCharCode(0x7f)));

