// ============================= RegExp 构造函数 =============================

// RegExp构造函数的参数有两种情况.
/*
const regex_1 = new RegExp('xyz', 'i');
const regex_2 = new RegExp(/xyz/i);
// 等价于 var regex = /xyz/i;
*/

// ============================= 字符串的正则方法 =============================

// 字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()。
// ES6 将这 4 个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。

// ============================= u 修饰符 =============================

// ES6对正则增加 u 修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。
/*
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true
*/

// 一旦加上u修饰符号，就会修改下面这些正则表达式的行为。

//（1）点字符
// 点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。

/*
const s = '𠮷';

console.log(/^.$/.test(s)); // false
console.log(/^.$/u.test(s));// true
*/

//（2）Unicode 字符表示法
// ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词。

/*
console.log(/\u{61}/.test('a')); // false
console.log(/\u{61}/u.test('a')); // true
console.log(/\u{20BB7}/u.test('𠮷')); // true
*/

// 上面代码表示，如果不加u修饰符，正则表达式无法识别\u{61}这种表示法，只会认为这匹配 61 个连续的u。

//（3）量词
// 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符。

/*
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true
*/

//（4）预定义模式
/*
/^\S$/.test('𠮷') // false
/^\S$/u.test('𠮷') // true
*/

// 上面代码的\S是预定义模式，匹配所有非空白字符。只有加了u修饰符，它才能正确匹配码点大于0xFFFF的 Unicode 字符。

/*
// 利用这一点，可以写出一个正确返回字符串长度的函数。
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = '𠮷𠮷';

s.length // 4
codePointLength(s) // 2
*/

//（5）i 修饰符
// 有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。
/*
/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true
*/

// ============================= RegExp.prototype.unicode 属性 =============================
// 正则实例对象新增unicode属性，表示是否设置了u修饰符。

/*
const r1 = /hello/;
const r2 = /hello/u;

r1.unicode // false
r2.unicode // true
*/

// ============================= y 修饰符 =============================
// 除了u修饰符，ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。

// y 和 g 都是全局匹配，区别在于g是在剩余位置中匹配即可，而y需要从剩余的第一个位置开始

/*
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

// 剩余部分 _aa_a
r1.exec(s) // ["aa"], 剩余位置中有匹配即可
r2.exec(s) // null, 剩余位置开头为_ 所以为null

//保证每次都能头部匹配，y修饰符就会返回结果了。
var _s = 'aaa_aa_a';
var r = /a+_/y;

r.exec(_s) // ["aaa_"]
r.exec(_s) // ["aa_"]
*/

// 使用lastIndex属性，可以更好地说明y修饰符。
/*
const REGEX = /a/g;

// 指定从2号位置（y）开始匹配
REGEX.lastIndex = 2;

// 匹配成功
const match = REGEX.exec('xaya');

// 在3号位置匹配成功
match.index // 3

// 下一次匹配从4号位开始
REGEX.lastIndex // 4

// 4号位开始匹配失败
REGEX.exec('xaya') // null
*/

/*
const REGEX = /a/y;

// 指定从2号位置开始匹配
REGEX.lastIndex = 2;

// 不是粘连，匹配失败
REGEX.exec('xaya') // null

// 指定从3号位置开始匹配
REGEX.lastIndex = 3;

// 3号位置是粘连，匹配成功
const match = REGEX.exec('xaya');
match.index // 3
REGEX.lastIndex // 4
*/

// 实际上，y修饰符号隐含了头部匹配的标志^。
/*
/b/y.exec('aba')
// null
*/

/*
const REGEX = /a/gy;
'aaxa'.replace(REGEX, '-') // '--xa', 因为最后一个a不是下一次匹配的头部 所以不替换
*/

/*
'a1a2a3'.match(/a\d/y) // ["a1"]
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]
*/

// y修饰符的一个应用，是从字符串提取 token（词元），y修饰符确保了匹配之间不会有漏掉的字符。
// const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
// const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;
//
// tokenize(TOKEN_Y, '3 + 4')
// // [ '3', '+', '4' ]
// tokenize(TOKEN_G, '3 + 4')
// // [ '3', '+', '4' ]
//
// function tokenize(TOKEN_REGEX, str) {
//     let result = [];
//     let match;
//     while (match = TOKEN_REGEX.exec(str)) {
//         result.push(match[1]);
//     }
//     return result;
// }

// tokenize(TOKEN_Y, '3x + 4')
// // [ '3' ]
// tokenize(TOKEN_G, '3x + 4')
// // [ '3', '+', '4' ]
// g修饰符会忽略非法字符，而y修饰符不会，这样就很容易发现错误。

// ============================= RegExp.prototype.sticky 属性 =============================
// 与y修饰符相匹配，ES6 的正则实例对象多了sticky属性，表示是否设置了y修饰符。
/*
var r = /hello\d/y;
r.sticky // true
*/

// ============================= RegExp.prototype.flags 属性 =============================
// ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符。
/*
// ES5 的 source 属性
// 返回正则表达式的正文
console.log(/abc/ig.source);
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
console.log(/abc/ig.flags);
// 'gi'
*/

// ============================= s 修饰符：dotAll 模式 =============================
// . 匹配任意单个字符
// 不匹配utf-16 可以通过 u 修饰符解决
// 不匹配 行 修饰符，包括：
/*
U+000A 换行符（\n）
U+000D 回车符（\r）
U+2028 行分隔符（line separator）
U+2029 段分隔符（paragraph separator）
*/

/*
console.log(/foo.bar/.test('foo\nbar')); //false
// 希望匹配任意单个字符的一种变通写法
console.log(/foo[^]bar/.test('foo\nbar')); //true
// s 修饰符 匹配任意单个字符
console.log(/foo.bar/s.test('foo\nbar')); // true
*/

// . /s 成为dotAll模式 还增加了dotAll属性 返回该正则是否处在dotAll模式
/*
const re = /foo.bar/s;
// 另一种写法
// const re = new RegExp('foo.bar', 's');

re.test('foo\nbar') // true
re.dotAll // true
re.flags // 's'
*/

// /s修饰符和多行修饰符/m不冲突，两者一起使用的情况下，.匹配所有字符，而^和$匹配每一行的行首和行尾。

//

// "先行断言"指的是，x只有在y前面才匹配，必须写成/x(?=y)/。
// "先行否定断言"指的是，x只有不在y前面才匹配，必须写成/x(?!y)/

/*
console.log(/\d+(?=%)/.exec('100% of US presidents have been male'));  // ["100"]
console.log(/\d+(?!%)/.exec('that’s all 44 of them'));                 // ["44"]

// "后行断言"正好与"先行断言"相反，x只有在y后面才匹配，必须写成/(?<=y)x/。
// "后行否定断言"则与"先行否定断言"相反，x只有不在y后面才匹配，必须写成/(?<!y)x/

console.log(/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')); // ["100"]
console.log(/(?<!\$)\d+/.exec('it’s is worth about €90'));               // ["90"]
*/

// 以上括号中的内容均不计入返回结果

/*
const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
'$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar');
// '$bar %foo foo'
*/

// 先右后左 不符合预期的行为
/*
console.log(/(?<=(\d+)(\d+))$/.exec('1053')); // ["", "1", "053"]
console.log(/^(\d+)(\d+)$/.exec('1053')); // ["1053", "105", "3"]
*/

// 上面代码中，需要捕捉两个组匹配。
// 没有“后行断言”时，第一个括号是贪婪模式，第二个括号只能捕获一个字符，所以结果是105和3。
// 而“后行断言”时，由于执行顺序是从右到左，第二个括号是贪婪模式，第一个括号只能捕获一个字符，所以结果是1和053。

// “后行断言”的反斜杠引用，也与通常的顺序相反，必须放在对应的那个括号之前。
/*
console.log(/(?<=(o)d\1)r/.exec('hodor'));  // null
console.log(/(?<=\1d(o))r/.exec('hodor'));  // ["r", "o"]
*/

// ============================= Unicode 属性类 =============================
// ES2018 引入了一种新的类的写法\p{...}和\P{...}，允许正则表达式匹配符合 Unicode 某种属性的所有字符。
// 使用时必须加上 u 修饰符

/*
const regexGreekSymbol = /\p{Script=Greek}/u;
console.log(regexGreekSymbol.test('π'));// true
*/

// \P{…}是\p{…}的反向匹配，即匹配不满足条件的字符。
/*
const regex = /^\p{Decimal_Number}+$/u;
console.log(regex.test('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼')); // true
*/

/*
// 匹配所有数字
const regex = /^\p{Number}+$/u;
console.log(regex.test('²³¹¼½¾')); // true
console.log(regex.test('㉛㉜㉝')); // true
console.log(regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ')); // true
*/

/*
// 匹配所有空格
\p{White_Space}

// 匹配各种文字的所有字母，等同于 Unicode 版的 \w
[\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配各种文字的所有非字母的字符，等同于 Unicode 版的 \W
[^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// 匹配 Emoji
/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu

// 匹配所有的箭头字符
const regexArrows = /^\p{Block=Arrows}+$/u;
regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true
*/

// ============================= 具名组匹配 =============================

// 圆括号为组匹配
/*
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
*/

// 组匹配的问题是只能根据顺序用数字序号来引用。
// ES2018 引入了具名组匹配（Named Capture Groups），允许为每一个组匹配指定一个名字。
// ?<name> 数字序号仍有效
// 若无匹配groups.name 为undefined

/*
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
console.log("year:", year, "month:", month, "day:", day);
*/

// ============================= 解构赋值和替换 =============================
/*
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
console.log(one);  // foo
console.log(two);  // bar
*/

/*
// 字符串替换时，使用${name}引用具名组
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

const s = '2015-01-02'.replace(re, '$<day>/$<month>/$<year>');
console.log(s);
// '02/01/2015'
*/

/*
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
const s = '2015-01-02'.replace(re, (
    matched, // 整个匹配结果 2015-01-02
    capture1, // 第一个组匹配 2015
    capture2, // 第二个组匹配 01
    capture3, // 第三个组匹配 02
    position, // 匹配开始的位置 0
    S, // 原字符串 2015-01-02
    groups // 具名组构成的一个对象 {year, month, day}
) => {
    // console.log(matched, capture1, capture2, capture3, position, S, groups);
    let {day, month, year} = groups;
    return `${day}/${month}/${year}`;
});
console.log(s);
*/

// ============================= 引用 =============================
// 如果要在正则表达式内部引用某个“具名组匹配”，可以使用\k<组名>的写法。

/*
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
*/

// 数字引用（\1）依然有效。
/*
const RE_TWICE = /^(?<word>[a-z]+)!\1$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
*/

// ============================= String.prototype.matchAll =============================
// 目前有一个提案，增加了String.prototype.matchAll方法，可以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组。
const string = 'test1test2test3';

// g 修饰符加不加都可以
const regex = /t(e)(st(\d?))/g;

for (const match of string.matchAll(regex)) {
    console.log(match);
}
// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]

/*
// 遍历器转为数组
// 转为数组方法一
[...string.matchAll(regex)]

// 转为数组方法二
Array.from(string.matchAll(regex));
*/
