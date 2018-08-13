// ============================ 函数参数的默认值 ===============================

// function log(x, y = 'World') {
//     console.log(x, y);
// }
//
// log('Hello') // Hello World
// log('Hello', 'China') // Hello China
// log('Hello', '') // Hello

// 默认值每次重新计算
// let x = 99;
// function foo(p = x + 1) {
//     console.log(p);
// }
//
// foo() // 100
//
// x = 100;
// foo() // 101

// ========================= 与解构赋值默认值结合使用 ===========================
// function foo({x, y = 5}) {
//     console.log(x, y);
// }
//
// foo({}) // undefined 5
// foo({x: 1}) // 1 5
// foo({x: 1, y: 2}) // 1 2
// foo() // TypeError: Cannot read property 'x' of undefined

// 默认值是函数默认值 即在不传参的情况下
// function foo({x, y = 5} = {}) {
//     console.log(x, y);
// }
//
// foo() // undefined 5

// // 写法一
// function m1({x = 0, y = 0} = {}) {
//     return [x, y];
// }
//
// // 写法二
// function m2({x, y} = { x: 0, y: 0 }) {
//     return [x, y];
// }
//
// console.log(m1({})); //[0,0]
// console.log(m2({})); //[undefined,undefined]

// ======================= 参数默认值的位置 ==========================
// 例一
// function f(x = 1, y) {
//     return [x, y];
// }
//
// f() // [1, undefined]
// f(2) // [2, undefined])
// f(, 1) // 报错
// f(undefined, 1) // [1, 1]
//
// // 例二
// function f(x, y = 5, z) {
//     return [x, y, z];
// }
//
// f() // [undefined, 5, undefined]
// f(1) // [1, 5, undefined]
// f(1, ,2) // 报错
// f(1, undefined, 2) // [1, 5, 2]

//上面代码中，有默认值的参数都不是尾参数。无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。
// function foo(x = 5, y = 6) {
//     console.log(x, y);
// }
//
// foo(undefined, null); // [5, null]

// ================== 函数的 length 属性 ======================
// length: 函数的参数个数减去指定了默认值的参数个数。
//(function (a, b, c = 5) {}).length // 2

//作用域：单独作用域
// var x = 1;
//
// function f(x, y = x) {
//     console.log(y);
// }
//
// f(2) // 2

// let x = 1;
//
// function f(y = x) {
//     let x = 2;
//     console.log(y);
// }
//
// f() // 1

// let foo = 'outer';
//
// function bar(func = () => foo) {
//     let foo = 'inner';
//     console.log(func());
// }
//
// bar(); // outer

// var x = 1;
// function foo(x, y = function() { x = 2; }) {
//     var x = 3;
//     y();
//     console.log(x);
// }
//
// foo() // 3
// x // 1
//
// var x = 1;
// function foo(x, y = function() { x = 2; }) {
//     x = 3;
//     y();
//     console.log(x);
// }
//
// foo() // 2
// x // 1

// ======================== rest 参数 ============================

// function add(...values) {
//     let sum = 0;
//
//     for (var val of values) {
//         sum += val;
//     }
//
//     return sum;
// }
//
// add(2, 5, 3) // 10

// // arguments变量的写法
// function sortNumbers() {
//     return Array.prototype.slice.call(arguments).sort();
// }
//
// // rest参数的写法
// const sortNumbers = (...numbers) => numbers.sort();

// function push(arr, ...items) {
//     items.forEach(item => {
//         arr.push(item);
//     });
// }
//
// const a = [];
// push(a, 1, 2, 3);
// console.log(a);

// rest只能作为最后一个参数， 函数的length属性不包括rest参数。

// ======================= 严格模式 ==============================
// 规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

// // 报错
// function doSomething(a, b = a) {
//     'use strict';
//     // code
// }
//
// // 报错
// const doSomething = function ({a, b}) {
//     'use strict';
//     // code
// };
//
// // 报错
// const doSomething = (...a) => {
//     'use strict';
//     // code
// };
//
// const obj = {
//     // 报错
//     doSomething({a, b}) {
//         'use strict';
//         // code
//     }
// };

// 1. 设定全局性的严格模式，这是合法的。
// 'use strict';
//
// function doSomething(a, b = a) {
//     // code
// }

// 2. 把函数包在一个无参数的立即执行函数里面。
// const doSomething = (function () {
//     'use strict';
//     return function(value = 42) {
//         return value;
//     };
// }());

// ======================== name 属性 ===========================
// 函数的name属性，返回该函数的函数名。
// function dashazi() {}
// console.log(dashazi.name);
//
// // 匿名函数 es5返回空 es6返回实际的函数名
// var f = function(){};
// console.log(f.name);
//
// // 具名函数 es5/6返回一样
// var bar = function bar(){};
// console.log(bar.name);
//
// // 构造函数的name = anonymous
// console.log((new Function).name);
//
// // bind返回的函数的name + bound前缀
// console.log((function(){}).bind({}).name); // "bound "

// ========================= 箭头函数 ===============================

// 使用注意点：
/*
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。*！

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
*/

// function Timer() {
//     this.s1 = 0;
//     this.s2 = 0;
//     // 箭头函数
//     setInterval(() => this.s1++, 1000);
//     // 普通函数
//     setInterval(function () {
//         this.s2++;
//     }, 1000);
// }
//
// var timer = new Timer();
//
// setTimeout(() => console.log('s1: ', timer.s1), 3100); //3
// setTimeout(() => console.log('s2: ', timer.s2), 3100); //0

// function foo() {
//     return () => {
//         return () => {
//             return () => {
//                 console.log('id:', this.id);
//             };
//         };
//     };
// }
//
// var f = foo.call({id: 1});
//
// var t1 = f.call({id: 2})()(); // id: 1
// var t2 = f().call({id: 3})(); // id: 1
// var t3 = f()().call({id: 4}); // id: 1

// 内层都是箭头函数，均无自己的this都指向foo的this
// 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。

// function foo() {
//     setTimeout(() => {
//         console.log('args:', arguments);
//     }, 100);
// }
//
// foo(2, 4, 6, 8);
// // args: [2, 4, 6, 8]

// 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
// (function() {
//     return [
//         (() => this.x).bind({ x: 'inner' })()
//     ];
// }).call({ x: 'outer' });

// ============================== 嵌套的箭头函数 ===============================
// es5
// function insert(value) {
//     return {into: function (array) {
//             return {after: function (afterValue) {
//                     array.splice(array.indexOf(afterValue) + 1, 0, value);
//                     return array;
//                 }};
//         }};
// }
//
// insert(2).into([1, 3]).after(1); //[1, 2, 3]

// es6
// let insert = (value) => ({into: (array) => ({after: (afterValue) => {
//             array.splice(array.indexOf(afterValue) + 1, 0, value);
//             return array;
//         }})});
//
// insert(2).into([1, 3]).after(1); //[1, 2, 3]

// 部署管道机制（pipeline），前一个函数的输出是后一个函数的输入
// const pipeline = (...funcs) =>
//     val => funcs.reduce((a, b) => b(a), val);
//
// const plus1 = a => a + 1;
// const mult2 = a => a * 2;
// const addThenMult = pipeline(plus1, mult2);
//
// addThenMult(5);

// 简写
// const plus1 = a => a + 1;
// const mult2 = a => a * 2;
//
// mult2(plus1(5))

// // λ演算的写法
// fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))
//
// // ES6的写法
// var fix = f => (x => f(v => x(x)(v)))
// (x => f(v => x(x)(v)));

// ============================= 双冒号运算符 =================================
// "函数绑定"运算符，用来取代call、apply、bind调用

// foo::bar;
// // 等同于
// bar.bind(foo);
//
// foo::bar(...arguments);
// // 等同于
// bar.apply(foo, arguments);

// const hasOwnProperty = Object.prototype.hasOwnProperty;
// function hasOwn(obj, key) {
//     return obj::hasOwnProperty(key);
// }

// var method = obj::obj.foo;
// // 等同于
// // var method = ::obj.foo;
//
// let log = ::console.log;
// // 等同于
// // var log = console.log.bind(console);


// =========================== 尾调用优化 ================================
// 尾调用 最后一步调用另一个函数

// function f(x){
//     return g(x);
// }

// // 情况一
// function f(x){
//     let y = g(x);
//     return y;
// }
//
// // 情况二
// function f(x){
//     return g(x) + 1;
// }
//
// // 情况三
// function f(x){
//     g(x);
// }

// 情况三类似于
// function f(x){
//     g(x);
//     return undefined;
// }

// 尾调用不一定出现在函数尾部，只要是最后一步操作即可。
// function f(x) {
//     if (x > 0) {
//         return m(x)
//     }
//     return n(x);
// }

// 尾递归 尾调用自身

// 阶乘 复杂度O(n)
// function factorial(n) {
//     if (n === 1) return 1;
//     return n * factorial(n - 1);
// }
//
// factorial(5) // 120

// 改写为尾递归 复杂度O(1);
// function factorial(n, total) {
//     if (n === 1) return total;
//     return factorial(n - 1, n * total);
// }
//
// factorial(5, 1) // 120

// 斐波那契数列
// function Fibonacci (n) {
//     if ( n <= 1 ) {return 1};
//
//     return Fibonacci(n - 1) + Fibonacci(n - 2);
// }
//
// Fibonacci(10) // 89
// Fibonacci(100) // 堆栈溢出
// Fibonacci(500) // 堆栈溢出

// 尾递归优化
// function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
//     if( n <= 1 ) {return ac2};
//
//     return Fibonacci2 (n - 1, ac2, ac1 + ac2);
// }
//
// Fibonacci2(100) // 573147844013817200000
// Fibonacci2(1000) // 7.0330367711422765e+208
// Fibonacci2(10000) // Infinity

// 不会发生栈溢出，相对节省内存。

// ========================= 递归函数的改写 =========================
// 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。需要把所有用到的内部变量改写成函数的参数

// function tailFactorial(n, total) {
//     if (n === 1) return total;
//     return tailFactorial(n - 1, n * total);
// }
//
// function factorial(n) {
//     return tailFactorial(n, 1);
// }
//
// factorial(5) // 120

// 柯里化：多参数的函数转换成单参数的形式。
// function currying(fn, n) {
//     return function (m) {
//         return fn.call(this, m, n);
//     };
// }
//
// function tailFactorial(n, total) {
//     if (n === 1) return total;
//     return tailFactorial(n - 1, n * total);
// }
//
// const factorial = currying(tailFactorial, 1);
//
// factorial(5) // 120

// es6默认参数写法
// function factorial(n, total = 1) {
//     if (n === 1) return total;
//     return factorial(n - 1, n * total);
// }
//
// factorial(5) // 120

// es6尾调用优化只在严格模式下开启 正常模式下无效
// 正常模式下 func.arguments func.caller 跟踪函数的调用栈
// 尾调用优化发生时，调用栈会改写 所以要通过严格模式禁用这两个变量

// 尾递归优化的实现
// 尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？
// 就是采用“循环”换掉“递归”！！！

// function sum(x, y) {
//     if (y > 0) {
//         return sum(x + 1, y - 1);
//     } else {
//         return x;
//     }
// }
//
// sum(1, 100000);

//蹦床函数（trampoline）可以将递归执行转为循环执行。
// function trampoline(f) {
//     while (f && f instanceof Function) {
//         f = f();
//     }
//     return f;
// }
//
// function sum(x, y) {
//     if (y > 0) {
//         return sum.bind(null, x + 1, y - 1);
//     } else {
//         return x;
//     }
// }
//
// trampoline(sum(1, 100000))

// 蹦床函数并不是真正的尾递归优化，下面的实现才是。
// function tco(f) {
//     var value;
//     var active = false;
//     var accumulated = [];
//
//     return function accumulator() {
//         accumulated.push(arguments);
//         if (!active) {
//             active = true;
//             while (accumulated.length) {
//                 value = f.apply(this, accumulated.shift());
//             }
//             active = false;
//             return value;
//         }
//     };
// }
//
// var sum = tco(function(x, y) {
//     if (y > 0) {
//         return sum(x + 1, y - 1)
//     }
//     else {
//         return x
//     }
// });
//
// sum(1, 100000)
// // 100001

// =========================== 函数参数的尾逗号 =============================
function clownsEverywhere(param1, param2,){}
clownsEverywhere(
    'foo',
    'bar',
);
