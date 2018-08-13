// ========================== 二进制和八进制表示法 ===============================
// 二进制写法 0b(0B) 八进制写法0o(0O)
console.log(0b111110111 === 503); // true
console.log(0o767 === 503); // true

// 非严格模式
(function(){
    console.log(0o11 === 011);
})(); // true

// 严格模式
(function(){
    'use strict';
    console.log(0o11 === 011);
})(); // Uncaught SyntaxError: Octal literals are not allowed in strict mode.

//十进制显示
Number('0b111')  // 7
Number('0o10')  // 8

// =========================== Number.isFinite(), Number.isNaN() ==========================
// Number.isFinite() 检查一个数值是否为有限 如果不是数值 返回false
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

// Number.isNaN() 检查一个数值是否为NAN
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true

// ============================ Number.parseInt(), Number.parseFloat() ==========================
// 将全局性的parseInt, parseFloat放在Number对象里，减少全局性方法 似语言逐渐模块化

// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45

Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

// ============================ Number.isInteger() ===============================
// 用来判断一个数值是否为整数 如果不是数值 返回false
Number.isInteger(25) // true
Number.isInteger(25.1) // false

// javascript内部，整数和浮点数采用同种存储方法 所以25和25.0被视为同一个值
Number.isInteger(25) // true
Number.isInteger(25.0) // true

// 存储格式 64双精度格式 53（1隐藏位+52有效位）二进制位 超过部分可能被舍弃 所以导致误判
Number.isInteger(3.0000000000000002) // true

// 最小限制 5E-324 小于该值 转化为0
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true

// ==================== Number.EPSILON ======================
// 一个极小的常量，实际上是js能够表示的最小精度。是可接受的最小误差范围。

// ==================== 安全整数和 Number.isSafeInteger() =======================
// 准确的整数范围 （-2^53, 2^53）超过范围 无法正确表示
Math.pow(2, 53) === Math.pow(2, 53) + 1 //true

// ES6 引入 Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER 常量表示这个上下限
// Number.isSafeInteger() 判断一个整数是否在安全范围内

// 包含运算的 超过安全范围的以范围边界为准
Number.isSafeInteger(9007199254740993 - 990)
// 9007199254740993 超过范围 按9007199254740992 计算
// 所以需要验证运算数 和 运算结果

// ================== Math 对象的扩展 =====================
// 新增 17 个 Math对象的方法 Math.
// todo:对于非数值，以下方法内部调用Number先转换为数值，无法直接转换的值记为NAN
// 1. trunc() 去除一个数的小数部分 返回整数部分
Math.trunc(2.33); //2
Math.trunc(-2.33); //-2
Math.trunc(-0.33); //-0
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN

// 2. sign() 判断正、负或零
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

// 3.cbrt() 计算一个数的立方根
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734

// 4. clz32()
// JavaScript 的整数使用 32 位二进制形式表示，Math.clz32方法返回一个数的 32 位无符号整数形式有多少个前导 0。
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
// 0 的二进制形式全为 0，所以有 32 个前导 0；
// 1 的二进制形式是0b1，只占 1 位，所以 32 位之中有 31 个前导 0；
// 1000 的二进制形式是0b1111101000，一共有 10 位，所以 32 位之中有 22 个前导 0。

// << 左移运算符
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2

// 对于小数 该方法只考虑整数部分
// NAN是的结果是32

// 5. imul() 返回两个数以32位符号整数形式相乘的结果，返回的也是一个32位的带符号整数
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4

// 6. fround() 返回一个数的32位单精度浮点数形式
// 对于32位单精度格式来说，数值精度是24个二进制位（1 位隐藏位与 23 位有效位）
// 范围（-2^24, 2^24）超过范围丢失精度 取边界值

// 未丢失有效精度
Math.fround(1.125) // 1.125
Math.fround(7.25)  // 7.25

// 丢失精度
Math.fround(0.3)   // 0.30000001192092896
Math.fround(0.7)   // 0.699999988079071
Math.fround(1.0000000123) // 1

// NAN 和 Infinity 返回原值
Math.fround(NaN)      // NaN
Math.fround(Infinity) // Infinity

// 7. hypot() 返回所有参数的平方和的平方根
// todo: 勾股定理的意思？
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3

// 对数方法
// 1) expm1()
// Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。

// 2) log1p()
// Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
Math.log1p(1)  // 0.6931471805599453
Math.log1p(0)  // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN

// 3) log10()
// Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。
Math.log10(2)      // 0.3010299956639812
Math.log10(1)      // 0
Math.log10(0)      // -Infinity
Math.log10(-2)     // NaN
Math.log10(100000) // 5

// 4) log2()
// Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。
Math.log2(3)       // 1.584962500721156
Math.log2(2)       // 1
Math.log2(1)       // 0
Math.log2(0)       // -Infinity
Math.log2(-2)      // NaN
Math.log2(1024)    // 10
Math.log2(1 << 29) // 29

// 双曲函数方法
// Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
// Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
// Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
// Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
// Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
// Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）

// =================== 指数运算符 ======================
// ** 类似于 Math.pow()
a **= 2;
// 等同于 a = a * a;

// 微小差异
Math.pow(99, 99)
// 3.697296376497263e+197

99 ** 99
// 3.697296376497268e+197
