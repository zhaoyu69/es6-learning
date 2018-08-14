// ============================= 概述 ===============================
// ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。
// 对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。类似于字符串类型。
// let s = Symbol();
// console.log(typeof s);

// let s1 = Symbol('foo');
// let s2 = Symbol('bar');
// console.log(s1, s2); // Symbol(foo) Symbol(bar)
//
// const obj = {
//     toString() {
//         return "abc";
//     }
// };
// const sym = Symbol(obj);
// console.log(sym); // Symbol(abc)

// Symbol参数只是表示对当前Symbol的描述，因此相同参数的Symbol函数的返回值是不相等的。
// let s1 = Symbol();
// let s2 = Symbol();
//
// s1 === s2 // false
//
// let s1 = Symbol('foo');
// let s2 = Symbol('foo');
//
// s1 === s2 // false

// Symbol 值不能与其他类型的值进行运算，会报错。
// let sym = Symbol('My symbol');
//
// console.log("your symbol is " + sym);
// // TypeError: can't convert symbol to string
// console.log(`your symbol is ${sym}`);
// // TypeError: can't convert symbol to string

// Symbol 值可以显式转为字符串, 布尔值，但不能转为数值
// let sym = Symbol('My symbol');
//
// String(sym); // 'Symbol(My symbol)'
// sym.toString(); // 'Symbol(My symbol)'
//
// console.log(Boolean(sym)); // true

// =========================== 作为属性名的 Symbol ===============================
// let mySymbol = Symbol();
// let a = {};
// a.mySymbol = 'Hello!';
// // a[mySymbol] = 'Hello!';
// // Symbol 值作为对象属性名时，不能用点运算符。
// console.log(a[mySymbol]); //undefined
// console.log(a['mySymbol']); //'Hello!'

// 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
// let s = Symbol();
//
// let obj = {
//     [s](arg) { console.log(arg) }
//     // [s]: function (arg) { console.log(arg) }
// };
//
// obj[s](123);

// Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
// Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。

// =========================== 实例：消除魔术字符串 ===========================
// function getArea(shape, options) {
//     let area = 0;
//
//     switch (shape) {
//         case 'Triangle': // 魔术字符串
//             area = .5 * options.width * options.height;
//             break;
//         /* ... more code ... */
//     }
//
//     return area;
// }
//
// getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串

// const shapeType = {
//     // triangle: 'Triangle'
//     triangle: Symbol()
// };
//
// function getArea(shape, options) {
//     let area = 0;
//     switch (shape) {
//         case shapeType.triangle:
//             area = .5 * options.width * options.height;
//             break;
//     }
//     return area;
// }
//
// getArea(shapeType.triangle, { width: 100, height: 100 });

// =========================== 属性名的遍历 =============================
// Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，
// 也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
// 但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
// const obj = {};
// let a = Symbol('a');
// let b = Symbol('b');
//
// obj[a] = 'Hello';
// obj[b] = 'World';
//
// const objectSymbols = Object.getOwnPropertySymbols(obj);
//
// console.log(objectSymbols); // [Symbol(a), Symbol(b)]

// const obj = {};
//
// let foo = Symbol("foo");
//
// Object.defineProperty(obj, foo, {
//     value: "foobar",
// });
//
// for (let i in obj) {
//     console.log(i); // 无输出
// }
//
// console.log(Object.getOwnPropertyNames(obj));// []
// console.log(Object.getOwnPropertySymbols(obj));// [Symbol(foo)]

// Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
// let obj = {
//     [Symbol('my_key')]: 1,
//     enum: 2,
//     nonEnum: 3
// };
//
// console.log(Reflect.ownKeys(obj)); //  ["enum", "nonEnum", Symbol(my_key)]

// ============================ Symbol.for()，Symbol.keyFor() =============================
// Symbol.for() 重新使用同一个Symbol值。
// let s1 = Symbol.for('foo');
// let s2 = Symbol.for('foo');
// let s3 = Symbol('foo');
// let s4 = Symbol('foo');
//
// console.log(s1 === s2); // true
// console.log(s1 === s3); // false
// console.log(s3 === s4); // false

// Symbol.keyFor 返回一个已登记的 Symbol 类型值的key。
// Symbol() 本身是未登记的 Symbol.for()是登记的，是全局环境的。
// let s1 = Symbol.for("foo");
// Symbol.keyFor(s1) // "foo"
//
// let s2 = Symbol("foo");
// Symbol.keyFor(s2) // undefined

// iframe = document.createElement('iframe');
// iframe.src = String(window.location);
// document.body.appendChild(iframe);
//
// console.log(iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')); // true

// ============================= 实例：模块的 Singleton 模式 ? =============================
// Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。
// mod.js
// function A() {
//     this.foo = 'hello';
// }
//
// if (!global._foo) {
//     global._foo = new A();
// }
//
// module.exports = global._foo;

// 任意文件require都可以直接修改 global._foo，可以使用 Symbol 保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写。
// mod.js
// const global = window.global;
// const FOO_KEY = Symbol.for('foo');
//
// function A() {
//     this.foo = 'hello';
// }
//
// if (!global[FOO_KEY]) {
//     global[FOO_KEY] = new A();
// }
//
// module.exports = global[FOO_KEY];

// =========================== 内置的 Symbol 值 ================================
// ====== Symbol.hasInstance =======
// 当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。

// class MyClass {
//     [Symbol.hasInstance](foo) {
//         return foo instanceof Array;
//     }
// }
//
// console.log([1, 2, 3] instanceof new MyClass()); // true
//
// class Even {
//     static
//     [Symbol.hasInstance](obj) {
//         return Number(obj) % 2 === 0;
//     }
// }
//
// console.log(1 instanceof Even );// false
// console.log(2 instanceof Even );// true
// console.log(12345 instanceof Even );// false

// ====== Symbol.isConcatSpreadable ======
// 等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。

// 数组默认行为展开 属性为undefined false不展开
// let arr1 = ['c', 'd'];
// ['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
// arr1[Symbol.isConcatSpreadable] // undefined
//
// let arr2 = ['c', 'd'];
// arr2[Symbol.isConcatSpreadable] = false;
// ['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

// 类似数组的对象正好相反，默认不展开，属性为true才展开
// let obj = {length: 2, 0: 'c', 1: 'd'};
// ['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']
//
// obj[Symbol.isConcatSpreadable] = true;
// ['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']

// 定义在类中 A1展开 A2不展开
// A1定义在实例上 A2定义在类本身 效果相同
// class A1 extends Array {
//     constructor(args) {
//         super(args);
//         this[Symbol.isConcatSpreadable] = true;
//     }
// }
// class A2 extends Array {
//     constructor(args) {
//         super(args);
//     }
//     get [Symbol.isConcatSpreadable] () {
//         return false;
//     }
// }
// let a1 = new A1();
// a1[0] = 3;
// a1[1] = 4;
// let a2 = new A2();
// a2[0] = 5;
// a2[1] = 6;
// console.log([1, 2].concat(a1).concat(a2));// [1, 2, 3, 4, [5, 6]]

// ====== Symbol.species ======
// class MyArray extends Array {
// }
//
// const a = new MyArray(1, 2, 3);
// const b = a.map(x => x);
// const c = a.filter(x => x > 1);
//
// console.log(b instanceof MyArray) // true
// console.log(c instanceof MyArray) // true
// console.log(b instanceof Array) // true

// a是MyArray的实例，b和c是a的衍生对象，他们不仅是Array的实例也是MyArray的实例
// Symbol.species属性就是为了解决这个问题而提供的。

// class MyArray extends Array {
//     static get [Symbol.species]() { return Array; }
// }
//
// const a = new MyArray();
// const b = a.map(x => x);
//
// console.log(b instanceof MyArray);// false
// console.log(b instanceof Array);// true
// 这里衍生对象b就不是MyArray的实例，仅仅是Array的实例。

// 总之，Symbol.species的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。
// 它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。

// ====== Symbol.match ======
// String.prototype.match(regexp)
// // 等同于
// regexp[Symbol.match](this)
//
// class MyMatcher {
//     [Symbol.match](string) {
//         return 'hello world'.indexOf(string);
//     }
// }
//
// 'e'.match(new MyMatcher()) // 1

// ====== Symbol.replace ======
// String.prototype.replace(searchValue, replaceValue)
// // 等同于
// searchValue[Symbol.replace](this, replaceValue)

// const x = {};
// x[Symbol.replace] = (...s) => console.log(s);
//
// 'Hello'.replace(x, 'World'); // ["Hello", "World"]
// Symbol.replace方法会收到两个参数，第一个参数是replace方法正在作用的对象，上面例子是Hello，第二个参数是替换后的值，上面例子是World。

// ====== Symbol.search ======
// String.prototype.search(regexp)
// // 等同于
// regexp[Symbol.search](this)

// class MySearch {
//     constructor(value) {
//         this.value = value;
//     }
//     [Symbol.search](string) {
//         return string.indexOf(this.value);
//     }
// }
// console.log('foobar'.search(new MySearch('foo'))); // 0

// ====== Symbol.split ======
// String.prototype.split(separator, limit)
// // 等同于
// separator[Symbol.split](this, limit)

// class MySplitter {
//     constructor(value) {
//         this.value = value;
//     }
//     [Symbol.split](string) {
//         let index = string.indexOf(this.value);
//         if (index === -1) {
//             return string;
//         }
//         return [
//             string.substr(0, index),
//             string.substr(index + this.value.length)
//         ];
//     }
// }
//
// 'foobar'.split(new MySplitter('foo'))
// // ['', 'bar']
//
// 'foobar'.split(new MySplitter('bar'))
// // ['foo', '']
//
// 'foobar'.split(new MySplitter('baz'))
// // 'foobar'

// ====== Symbol.iterator ======
// 指向该对象的默认遍历器方法。
// const myIterable = {};
// myIterable[Symbol.iterator] = function* () {
//     yield 1;
//     yield 2;
//     yield 3;
// };
//
// console.log([...myIterable]); // [1, 2, 3]

// 对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器。
// class Collection {
//     *[Symbol.iterator]() {
//         let i = 0;
//         while(this[i] !== undefined) {
//             yield this[i];
//             ++i;
//         }
//     }
// }
//
// let myCollection = new Collection();
// myCollection[0] = 1;
// myCollection[1] = 2;
//
// for(let value of myCollection) {
//     console.log(value);
// }
// // 1
// // 2

// ====== Symbol.toPrimitive ======
// 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
// Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。
// Number：该场合需要转成数值
// String：该场合需要转成字符串
// Default：该场合可以转成数值，也可以转成字符串
// let obj = {
//     [Symbol.toPrimitive](hint) {
//         switch (hint) {
//             case 'number':
//                 return 123;
//             case 'string':
//                 return 'str';
//             case 'default':
//                 return 'default';
//             default:
//                 throw new Error();
//         }
//     }
// };
//
// console.log(2 * obj) // 246
// console.log(3 + obj) // '3default'
// console.log(obj == 'default') // true
// console.log(obj === 'default') // false
// console.log(String(obj)) // 'str'

// ====== Symbol.toStringTag ======
// 在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。
// 也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。

// // 例一
// ({[Symbol.toStringTag]: 'Foo'}.toString())
// // "[object Foo]"
//
// // 例二
// class Collection {
//     get [Symbol.toStringTag]() {
//         return 'xxx';
//     }
// }
// let x = new Collection();
// console.log(Object.prototype.toString.call(x)); // "[object xxx]"

// ====== Symbol.unscopables ======
// 该对象指定了使用with关键字时，哪些属性会被with环境排除。

// 数组有7个属性 会被with命令排除
// console.log(Array.prototype[Symbol.unscopables]);
// // {
// //   copyWithin: true,
// //   entries: true,
// //   fill: true,
// //   find: true,
// //   findIndex: true,
// //   includes: true,
// //   keys: true
// // }
//
// Object.keys(Array.prototype[Symbol.unscopables])
// // ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']

// // 没有 unscopables 时
// class MyClass {
//     foo() { return 1; }
// }
//
// var foo = function () { return 2; };
//
// with (MyClass.prototype) {
//     console.log(foo()); // 1
// }

// // 有 unscopables 时
// class MyClass {
//     foo() { return 1; }
//     get [Symbol.unscopables]() {
//         return { foo: true };
//     }
// }
//
// var foo = function () { return 2; };
//
// with (MyClass.prototype) {
//     // 当前作用域的foo被排除，寻找外层作用域的变量
//     foo(); // 2
// }