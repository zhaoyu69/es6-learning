// 3. 变量的解构赋值

// ============================ 数组的解构赋值 ============================
/*
* let a=1;
* let b=2;
* let c=3;
* */
// let [a, b, c] = [1, 2, 3];

// 这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

// let [foo, ...bar] = [1, 2, 3, 4];
/*
* foo = 1;
* bar = [2,3,4];
* */

// 解构不成功 返回undefined
// let [foo] = [];
// let [bar, foo] = [1];

// 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。
// let [x, y, ...z] = ['a'];
/*
* let x='a';
* y undefined
* z []
* */

/*
// 等号的右边不是数组
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
*/

// let [x, y, z] = new Set(['a', 'b', 'c']);
// x = 'a';

// 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        // yield b;
        // a=b;b=a+b;同时完成
        [a, b] = [b, a + b];
    }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
// console.log(first, second, third, fourth, fifth, sixth);
// (a) 0 1 1 2 3 5
// (b) 1 1 2 3 5 8

// 解构赋值允许指定默认值。
// es6内部严格按照 === 来判定一个位置是否有值
// undefined 默认值才生效

/*
let [x = 1] = [undefined];
x = 1

let [x = 1] = [null];
x = null
*/

// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
/*
function f() {
    console.log('aaa');
}

let [x = f()] = [1];
console.log(x); // 1 不会打印出aaa 因为直接赋值 没有用到默认值 所以不调用函数
let [y = f()] = [];
console.log(y); // undefined 会打印aaa 因为解构赋值是undefined用到了默认值 调用了函数
*/

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

// let [x = 1, y = x] = [];     // x=1; y=1
// let [x = 1, y = x] = [2];    // x=2; y=2
// let [x = 1, y = x] = [1, 2]; // x=1; y=2
// let [x = y, y = 1] = [];     // ReferenceError: y is not defined
// console.log(x, y);

// ============================ 对象的解构赋值 ============================

// 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
/*
let { bar, foo } = { foo: "aaa", bar: "bbb" };
// foo // "aaa"
// bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
// baz // undefined
*/

// 赋予新的属性名
/*
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
// baz = "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
// f // 'hello'
// l // 'world'
*/

// 根本 : let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
// foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。

/*
let obj = { p: ['Hello', { y: 'World' }] };
let { p: [x, { y }] } = obj;
// x // "Hello"
// y // "World"
console.log(p); //ReferenceError: p is not defined
// 因为p此时是模式 不是变量 所以并没有被赋值 如果需要p被赋值，写成这样let { p, p: [x, { y }] } = obj;
*/

/*
const node = {
    loc: {
        start: {
            line: 1,
            column: 5
        }
    }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
console.log(loc, start, line);
// line // 1
// loc  // Object {start: Object}
// start // Object {line: 1, column: 5}
// 注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。
*/

/*
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
// obj.prop = 123;
// arr[0] = true;
//
// obj = {prop:123};
// arr = [true];
*/

// 对象解构的默认值
/*
let {x = 3} = {};
x // 3

let {x, y = 5} = {x: 1};
x // 1
y // 5

let {x: y = 3} = {};
y // 3

let {x: y = 3} = {x: 5};
y // 5

let { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
*/

// 解构失败的情况
/*
let {foo} = {bar: 'baz'};
// foo // undefined

let {foo: {bar}} = {baz: 'baz'};
//foo undefined foo.bar error
*/

// 如果要将一个已经声明的变量用于解构赋值，必须非常小心。

/*
//错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
// 因为其会将{x}理解为代码块，有块级作用域

//正确的写法
let x;
({x} = {x: 1});
*/

// 数组的本质是对象 可以对数组进行对象的解构赋值
/*
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
*/

// ============================ 字符串的解构赋值 ============================
// 字符串被转换成了一个类似数组的对象。
/*
const [a, b, c, d, e] = 'hello';
// a // "h"
// b // "e"
// c // "l"
// d // "l"
// e // "o"

let {length : len} = 'hello';
// len // 5
*/


// ============================ 数值和布尔值的解构赋值 ============================
/*
let {toString: s} = 123;
// s === Number.prototype.toString // true

let {toString: s} = true;
// s === Boolean.prototype.toString // true
*/

// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
/*
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
*/

// ============================ 函数参数的解构赋值 ============================
/*
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
*/

/*
const x = [[1, 2], [3, 4]].map(([a, b]) => a + b);
console.log(x);
*/

// 函数参数的解构也可以使用默认值。
/*
function move({x = 0, y = 0} = {}) {
    return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
*/

/*
function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
*/

// 以上两种结果不同 是因为第一种是为变量x,y指定默认值 而第二红是指定默认的参数对象

/*
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
*/

// ============================ 圆括号问题 ============================
// ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
// 所以尽量不适用圆括号

// 不能使用圆括号的情况

// （1）变量声明语句
/*
// 全部报错
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
*/

//（2）函数参数 (也属于变量声明)
/*
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
*/

//（3）赋值语句的模式
/*
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];

// 报错
[({ p: a }), { x: c }] = [{}, {}];
*/

// 可以使用圆括号的情况
// 赋值语句的非模式部分，可以使用圆括号。
/*
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
*/

// ============================ 用途 ============================

/*
// （1）交换变量的值
let x = 1;
let y = 2;

[x, y] = [y, x];
*/

/*
// （2）从函数返回多个值
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
*/

/*
// （3）函数参数的定义
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
*/

/*
// （4）提取 JSON 数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
*/

/*
//（5）函数参数的默认值
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
*/

/*
// （6）遍历 Map 结构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    console.log(key + " is " + value);
}
// first is hello
// second is world
*/

/*
//（7）输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");
*/
