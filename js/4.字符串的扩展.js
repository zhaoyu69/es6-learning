// ============================ 字符的 Unicode 表示法 ============================

// 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。
// \u0000~\uFFFF 超出部分用两个双字节表示
/*
console.log("\u0061"); //'a'
console.log("\uD842\uDFB7"); //"𠮷"
console.log("\u20BB7"); //" 7" \u20BB+7 "\u20BB"不可打印 显示为空格
*/

// ES6 改进 可以使用"\u{}"
/*
console.log('\u{1F680}' === '\uD83D\uDE80');
// true
*/

// JavaScript有6种方法表示一个字符
/*
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
*/

// ============================ codePointAt() ============================

// JavaScript 字符存储格式 UTF-16 每个字符规定为2个字节

/*
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
*/

// 对于这种4个字节的字符，JavaScript 不能正确处理，字符串长度会误判为2，
// 而且charAt方法无法读取整个字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。
// codePointAt 能够正确处理 4 个字节储存的字符，返回一个字符的码点。
// 总之，codePointAt方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同。
// codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

/*
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false
*/

// ============================ String.fromCodePoint() ============================

// ES5 String.fromCharCode不能识别大于0xFFFF的码点，所以0x20BB7就发生了溢出，最高位2被舍弃了，最后返回码点U+0BB7对应的字符，而不是码点U+20BB7对应的字符。
// ES6 String.fromCodePoint方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode方法的不足。在作用上，正好与codePointAt方法相反。

// ============================ 字符串的遍历器接口 ============================

// 字符串可以被for...of循环遍历。
// 这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
/*
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
*/

// ============================ at() ============================

// ES5 对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。
// ES6 提出字符串实例的at方法，可以识别 Unicode 编号大于0xFFFF的字符，返回正确的字符。

/*
'abc'.charAt(0) // "a"
'𠮷'.charAt(0) // "\uD842"
// charAt方法期望返回的是用2个字节表示的字符，但汉字“𠮷”占用了4个字节，charAt(0)表示获取这4个字节中的前2个字节，无法正常显示

'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"
*/

// ============================ normalize() ============================

// 许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode 提供了两种方法。
// 1.直接提供带重音符号的字符，比如Ǒ（\u01D1）
// 2.提供原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。

/*
'\u01D1'==='\u004F\u030C' //false

'\u01D1'.length // 1
'\u004F\u030C'.length // 2
// JavaScript将合成字符视为两个字符所以不对等
*/

/*
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true
*/

// normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

// ============================ includes(), startsWith(), endsWith() ============================

// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

// 参数1：需要查找的字符串 参数2：开始搜索的位置（endsWith()针对前n个，其余两个针对从第n个位置直到字符串结束）

// ============================ repeat() ============================

// repeat方法返回一个新字符串，表示将原字符串重复n次。
// 'x'.repeat(3) // "xxx"
// 'hello'.repeat(2) // "hellohello"
// 'na'.repeat(0) // ""

// 如果参数是小数，向下取整
// 'na'.repeat(2.9) // "nana"

// 如果repeat的参数是负数或者Infinity，会报错。
// 'na'.repeat(Infinity)
// // RangeError
// 'na'.repeat(-1)
// // RangeError

// 如果参数(-1, 0] 或 NAN 都等同于0
// 'na'.repeat(-0.9) // ""
// 'na'.repeat(NaN) // ""

// 如果参数是字符串，先转换为数字
// 'na'.repeat('na') // ""
// 'na'.repeat('3') // "nanana"

// ============================ padStart()，padEnd() ============================

// 用于补全字符串的长度，padStart()用于头部补全，padEnd()用于尾部补全。

/*
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
*/

// 参数1：指定字符串的最小长度，参数2：用来补全的字符串。

// 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
// 'xxx'.padEnd(2, 'ab') // 'xxx'
// 'xxx'.padStart(2, 'ab') // 'xxx'

// 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
// 'abc'.padStart(10, '0123456789')
// '0123456abc'

// 如果省略第二个参数，默认使用空格补全长度。
// 'x'.padStart(4) // '   x'
// 'x'.padEnd(4) // 'x   '

// ============================ matchAll() ============================

// matchAll方法返回一个正则表达式在当前字符串的所有匹配, 正则表达式。

// ============================ 模板字符串 ============================

// 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

// let name = "Bob", time = "today";
// `Hello ${name}, how are you ${time}?`

// 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
// 如果你不想要这个换行，可以使用trim方法消除它。
/*
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());
*/

// 如果需要引用模板字符串本身，在需要时执行，可以像下面这样写。
/*
// 写法一
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack')// "Hello Jack!"

// 写法二
// let str = '(name) => `Hello ${name}!`';
// let func = eval.call(null, str);
// func('Jack') // "Hello Jack!"
*/

// ============================ 实例：模板编译 ============================

// 该模板使用<%...%>放置 JavaScript 代码，使用<%= ... %>输出 JavaScript 表达式。
/*
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
*/

// ============================ 标签模板 ============================

// 标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

// 如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
/*
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
*/

// 函数的内部其实就是将各个参数按照原来的位置拼合回去
// 参数1：是由模板字符串里的变量分割开的纯字符串的数组，
// 其他参数：...rest 是每个变量的值

/*
function passthru(literals, ...values) {
    let output = "";
    let index;
    for (index = 0; index < values.length; index++) {
        output += literals[index] + values[index];
    }

    output += literals[index]
    return output;
}
*/

// “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
// 将用户输入的特殊字符转义
/*
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}

//message: <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
*/

// 标签模板的另一个应用，就是多语言转换（国际化处理）。

/*
// 下面的hashTemplate函数
// 是一个自定义的模板处理函数
let libraryHtml = hashTemplate`
  <ul>
    #for book in ${myBooks}
      <li><i>#{book.title}</i> by #{book.author}</li>
    #end
  </ul>
`;
*/

/*
// 通过jsx函数，将一个 DOM 字符串转为 React 对象
jsx`
  <div>
    <input
      ref='input'
      onChange='${this.handleChange}'
      defaultValue='${this.state.value}' />
      ${this.state.value}
   </div>
`
*/

console.log`123`;
// ["123", row:Array[1]]

tag`First line\nSecond line`;
function tag(strings) {
    console.log(strings[0]);
    console.log(strings.raw[0]);
    // strings.raw[0] 为 "First line\\nSecond line"
    // 打印输出 "First line\nSecond line"
}

// ============================ String.raw() ============================

// String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。
/*
String.raw`Hi\n${2+3}!`;
// 返回 "Hi\\n5!"

String.raw`Hi\u000A!`;
// 返回 "Hi\\u000A!"
*/

// 如果原字符串的斜杠已经转义，那么String.raw会进行再次转义。
/*
String.raw`Hi\\n`
// 返回 "Hi\\\\n"
*/

// 可以当做正常函数使用
/*
String.raw({ raw: 'test' }, 0, 1, 2);
// 't0e1s2t'

// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
*/

// 函数实现
/*
String.raw = function (strings, ...values) {
  let output = '';
  let index;
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }

  output += strings.raw[index]
  return output;
}
*/

// ============================ 模板字符串的限制 ============================

