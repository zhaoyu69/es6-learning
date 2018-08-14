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
// const source = {
//     set foo(value) {
//         console.log(value);
//     }
// };
//
// const target1 = {};
// Object.assign(target1, source);
//
// Object.getOwnPropertyDescriptor(target1, 'foo')
// // { value: undefined,
// //   writable: true,
// //   enumerable: true,
// //   configurable: true }

// Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法，就可以实现正确拷贝。
// const source = {
//     set foo(value) {
//         console.log(value);
//     }
// };
//
// const target2 = {};
// Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
// Object.getOwnPropertyDescriptor(target2, 'foo')
// // { get: undefined,
// //   set: [Function: set foo],
// //   enumerable: true,
// //   configurable: true }

// 上面代码中，两个对象合并的逻辑可以写成一个函数。
// const shallowMerge = (target, source) => Object.defineProperties(
//     target,
//     Object.getOwnPropertyDescriptors(source)
// );

// Object.getOwnPropertyDescriptors方法的另一个用处，是配合Object.create方法，将对象属性克隆到一个新对象。这属于浅拷贝。
// const clone = Object.create(Object.getPrototypeOf(obj),
//     Object.getOwnPropertyDescriptors(obj));
//
// // 或者
//
// const shallowClone = (obj) => Object.create(
//     Object.getPrototypeOf(obj),
//     Object.getOwnPropertyDescriptors(obj)
// );

// 以前 继承对象 __proto__
// const obj = {
//     __proto__: prot,
//     foo: 123,
// };

// ES6 规定__proto__只有浏览器要部署，其他环境不用部署。
// const obj = Object.create(prot);
// obj.foo = 123;
//
// // 或者
//
// const obj = Object.assign(
//     Object.create(prot),
//     {
//         foo: 123,
//     }
// );

// const obj = Object.create(
//     prot,
//     Object.getOwnPropertyDescriptors({
//         foo: 123,
//     })
// );

// Mixin 混入模式
// let mix = (object) => ({
//     with: (...mixins) => mixins.reduce(
//         (c, mixin) => Object.create(
//             c, Object.getOwnPropertyDescriptors(mixin)
//         ), object)
// });
//
// // multiple mixins example
// let a = {a: 'a'};
// let b = {b: 'b'};
// let c = {c: 'c'};
// let d = mix(c).with(a, b);
// console.log(d.a);
// console.log(d.b);
// console.log(d.c);

// ============= __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf() ===============
//__proto__属性,用来读取或设置当前对象的prototype对象。
// es5 的写法
// const obj = {
//     method: function() {  }
// };
// obj.__proto__ = someOtherObj;
//
// // es6 的写法
// var obj = Object.create(someOtherObj);
// obj.method = function() {  };

// Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。
// // 格式
// Object.setPrototypeOf(object, prototype);
//
// // 用法
// const o = Object.setPrototypeOf({}, null);
//
// // 等同于
// function _(obj, proto) {
//     obj.__proto__ = proto;
//     return obj;
// }

// let proto = {};
// let _obj = { x: 10 };
// Object.setPrototypeOf(_obj, proto);
//
// proto.y = 20;
// proto.z = 40;
//
// console.log(_obj);
// console.log(_obj.__proto__);

// 如果第一个参数不是对象，会自动转为对象。
// Object.setPrototypeOf(1, {}) === 1 // true
// Object.setPrototypeOf('foo', {}) === 'foo' // true
// Object.setPrototypeOf(true, {}) === true // true

// 由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。
// Object.setPrototypeOf(undefined, {})
// Object.setPrototypeOf(null, {})

// Object.getPrototypeOf() 用于读取一个对象的原型对象。
// console.log(Object.getPrototypeOf(_obj) === _obj.__proto__);

// 如果参数不是对象，会自动转为对象。
// // 等同于 Object.getPrototypeOf(Number(1))
// Object.getPrototypeOf(1)
// // Number {[[PrimitiveValue]]: 0}
//
// // 等同于 Object.getPrototypeOf(String('foo'))
// Object.getPrototypeOf('foo')
// // String {length: 0, [[PrimitiveValue]]: ""}
//
// // 等同于 Object.getPrototypeOf(Boolean(true))
// Object.getPrototypeOf(true)
// // Boolean {[[PrimitiveValue]]: false}
//
// Object.getPrototypeOf(1) === Number.prototype // true
// Object.getPrototypeOf('foo') === String.prototype // true
// Object.getPrototypeOf(true) === Boolean.prototype // true

// 如果参数是undefined或null，它们无法转为对象，所以会报错。
// Object.getPrototypeOf(null)
// Object.getPrototypeOf(undefined)

// ========================== super 关键字 ==============================
// super 指向当前对象的原型对象。
// const proto = {
//     foo: 'hello'
// };
//
// const obj = {
//     foo: 'world',
//     find() {
//         return super.foo;
//     }
// };
//
// Object.setPrototypeOf(obj, proto);
// obj.find() // "hello"

// super 只能用在对象的方法之中，用在其他地方都会报错
// JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。
// const proto = {
//     x: 'hello',
//     foo() {
//         console.log(this.x);
//     },
// };
//
// const obj = {
//     x: 'world',
//     foo() {
//         // 指向原型proto的foo方法，但是this绑定的还是当前对象obj
//         super.foo();
//     }
// }
//
// Object.setPrototypeOf(obj, proto);
// obj.foo() // "world"

// ========================== Object.keys()，Object.values()，Object.entries() ===============================
// Object.keys() 参数对象自身的（不含继承）所有可遍历的属性的键名
// var obj = { foo: 'bar', baz: 42 };
// Object.keys(obj) // ["foo", "baz"]

// Object.values() 参数对象自身的（不含继承）所有可遍历的属性的键值
// const obj = { foo: 'bar', baz: 42 };
// Object.values(obj) // ["bar", 42]

// 返回的成员顺序
// const obj = { 100: 'a', 2: 'b', 7: 'c' };
// Object.values(obj) // ["b", "c", "a"]

// p不是可遍历的 p的描述对象的enumerable默认为false
// const obj = Object.create({}, {p: {value: 42}});
// Object.values(obj); // []

// 增加enumerable属性为true
// const obj = Object.create({}, {p:
//     {
//         value: 42,
//         enumerable: true
//     }
// });
// Object.values(obj); // [42]

// Object.values会过滤属性名为 Symbol 值的属性。
// Object.values({ [Symbol()]: 123, foo: 'abc' }); // ['abc']

// 如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。
// Object.values('foo'); // ['f', 'o', 'o']

// 如果参数不是对象，Object.values会先将其转为对象。
// Object.values(42) // []
// Object.values(true) // []

// Object.entries 参数对象自身的（不含继承）所有可遍历的属性的键值对
// const obj = { foo: 'bar', baz: 42 };
// Object.entries(obj) // [ ["foo", "bar"], ["baz", 42] ]

// Object.entries方法的另一个用处是，将对象转为真正的Map结构。
// const obj = { foo: 'bar', baz: 42 };
// const map = new Map(Object.entries(obj));
// console.log(map); // Map { foo: "bar", baz: 42 }

// ========================== 对象的扩展运算符 ===============================
// ...

// ============================== 解构赋值 ==================================
// 解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错
// 解构赋值必须是最后一个参数，否则会报错。
// 解构赋值的拷贝是浅拷贝
// 扩展运算符的解构赋值，不能复制继承自原型对象的属性。
// 扩展某个函数的参数，引入其他操作。
// function baseFunction({ a, b }) {
//     // ...
// }
// function wrapperFunction({ x, y, ...restConfig }) {
//     // 使用 x 和 y 参数进行操作
//     // 其余参数传给原始函数
//     return baseFunction(restConfig);
// }