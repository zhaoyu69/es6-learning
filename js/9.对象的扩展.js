// ========================== 属性的简洁表示法 ===========================
// const foo = 'bar';
// const baz = {foo};
// baz // {foo: "bar"}
//
// // 等同于
// const baz = {foo: foo};
// ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值。

// ========================== 属性名表达式 ===========================
// 1.
// var obj = {
//     foo: true,
//     abc: 123
// };

// 2.
// let propKey = 'foo';
//
// let obj = {
//     [propKey]: true,
//     ['a' + 'bc']: 123
// };

// 3.
// let obj = {
//     ['h' + 'ello']() {
//         return 'hi';
//     }
// };
//
// obj.hello() // hi

// 属性名表达式与简洁表示法，不能同时使用，会报错。
// // 报错
// const foo = 'bar';
// const bar = 'abc';
// const baz = { [foo] };
//
// // 正确
// const foo = 'bar';
// const baz = { [foo]: 'abc'};

// 属性名表达式如果是一个对象 ==> 字符串[object Object]
// const keyA = {a: 1};
// const keyB = {b: 2};
//
// const myObject = {
//     [keyA]: 'valueA',
//     [keyB]: 'valueB'
// };
//
// //因为keyA, keyB都是[object Object] 所以会覆盖
// console.log(myObject) // Object {[object Object]: "valueB"}

// ========================== 方法的 name 属性 ==============================
// 对象的方法的name 和 函数的name属性一样
// const person = {
//     sayName() {
//         console.log('hello!');
//     },
// };
//
// person.sayName.name   // "sayName"

// 如果使用getter setter，则name属性位于对象的get，set属性上
// const obj = {
//     get foo() {},
//     set foo(x) {}
// };
//
// console.log(obj.foo.name)
// // TypeError: Cannot read property 'name' of undefined
//
// const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
//
// descriptor.get.name // "get foo"
// descriptor.set.name // "set foo"

// 如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
// const key1 = Symbol('description');
// const key2 = Symbol();
// let obj = {
//     [key1]() {},
//     [key2]() {},
// };
// obj[key1].name // "[description]"
// obj[key2].name // ""

// ========================== Object.is() =============================
// Object.is它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
// Object.is('foo', 'foo')
// // true
// Object.is({}, {})
// // false

// 不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
// +0 === -0 //true
// NaN === NaN // false
//
// Object.is(+0, -0) // false
// Object.is(NaN, NaN) // true

// ========================== Object.assign() =============================
// Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
// 同名属性 后面的覆盖前面的
// const target = { a: 1, b: 1 };
//
// const source1 = { b: 2, c: 2 };
// const source2 = { c: 3 };
//
// Object.assign(target, source1, source2);
// console.log(target) // {a:1, b:2, c:3}
//
// // 如果该参数不是对象，则会先转成对象，然后返回。
// console.log(typeof Object.assign(2)) // "object"
//
// // 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。但是若不在首参数，就不会报错
// console.log(Object.assign(undefined)) // 报错
// console.log(Object.assign(null)) // 报错)
//
// let obj = {a: 1};
// Object.assign(obj, undefined) === obj // true
// Object.assign(obj, null) === obj // true

// 字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
// const v1 = 'abc';
// const v2 = true;
// const v3 = 10;
//
// const obj = Object.assign({}, v1, v2, v3);
// console.log(obj); // { "0": "a", "1": "b", "2": "c" }

// Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。

// 注意点：
//（1）浅拷贝
//（2）同名属性的替换
//（3）数组的处理
// console.log(Object.assign([1, 2, 3], [4, 5])); //[4, 5, 3]
//（4）取值函数的处理
// Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
// const source = {
//     get foo() { return 1 }
// };
// const target = {};
//
// console.log(Object.assign(target, source)); // { foo: 1 }

// 常见用途：
//（1）为对象添加属性
// class Point {
//     constructor(x, y) {
//         Object.assign(this, {x, y});
//     }
// }
// let pos = new Point(1,2);
// console.log(pos); //Point {x: 1, y: 2}

//（2）为对象添加方法
// Object.assign(SomeClass.prototype, {
//     someMethod(arg1, arg2) {
//     },
//     anotherMethod() {
//     }
// });

//（3）克隆对象
// 只克隆原始对象的值，不能克隆他继承的值
// function clone(origin) {
//     return Object.assign({}, origin);
// }
// 保持继承链
// function clone(origin) {
//     let originProto = Object.getPrototypeOf(origin);
//     return Object.assign(Object.create(originProto), origin);
// }

//（4）合并多个对象
// const merge =
//     (target, ...sources) => Object.assign(target, ...sources);

//（5）为属性指定默认值
// 用户配置 覆盖 默认配置
// const DEFAULTS = {
//     logLevel: 0,
//     outputFormat: 'html'
// };
//
// function processContent(options) {
//     options = Object.assign({}, DEFAULTS, options);
//     console.log(options);
//     // ...
// }

// ========================= 属性的可枚举性和遍历 ===========================
// 可枚举性
// let obj = { foo: 123 };
// let description = Object.getOwnPropertyDescriptor(obj, 'foo');
// console.log(description);
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }

// 描述对象的enumerable属性，称为"可枚举性"，如果该属性为false，就表示某些操作会忽略当前属性。

// 属性的遍历
//（1）for...in
//（2）Object.keys(obj)
//（3）Object.getOwnPropertyNames(obj)
//（4）Object.getOwnPropertySymbols(obj)
//（5）Reflect.ownKeys(obj)

// ======================== Object.getOwnPropertyDescriptors() =======================
// const obj = {
//     foo: 123,
//     get bar() { return 'abc' }
// };
//
// let descriptions = Object.getOwnPropertyDescriptors(obj);
// console.log(descriptions);
// // { foo:
// //    { value: 123,
// //      writable: true,
// //      enumerable: true,
// //      configurable: true },
// //   bar:
// //    { get: [Function: get bar],
// //      set: undefined,
// //      enumerable: true,
// //      configurable: true } }
//
// function getOwnPropertyDescriptors(obj) {
//     const result = {};
//     for (let key of Reflect.ownKeys(obj)) {
//         result[key] = Object.getOwnPropertyDescriptor(obj, key);
//     }
//     return result;
// }
// console.log(getOwnPropertyDescriptors(obj));

// Object.assign() 无法正确拷贝get属性和set属性
// Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法，就可以实现正确拷贝。
const source = {
    set foo(value) {
        console.log(value);
    }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }