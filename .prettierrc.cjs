module.exports = {
  // (x)=>{},单个参数箭头函数是否显示小括号。(always:始终显示;avoid:省略括号。默认:always)
  arrowParens: "always",
  // 开始标签的右尖括号是否跟随在最后一行属性末尾，默认false
  bracketSameLine: false,
  // 对象字面量的括号之间打印空格 (true - Example: { foo: bar } ; false - Example: {foo:bar})
  bracketSpacing: true,
  // 是否格式化一些文件中被嵌入的代码片段的风格(auto|off;默认auto)
  embeddedLanguageFormatting: "auto",
  // 指定 HTML 文件的空格敏感度 (css|strict|ignore;默认css)
  htmlWhitespaceSensitivity: "css",
  // 当文件已经被 Prettier 格式化之后，是否会在文件顶部插入一个特殊的 @format 标记，默认false
  insertPragma: false,
  // 在 JSX 中使用单引号替代双引号，默认false
  jsxSingleQuote: false,
  // 每行最多字符数量，超出换行(默认80)
  printWidth: 80,
  // 超出打印宽度 (always | never | preserve )
  proseWrap: "preserve",
  // 对象属性是否使用引号(as-needed | consistent | preserve;默认as-needed:对象的属性需要加引号才添加;)
  quoteProps: "as-needed",
  // 是否只格式化在文件顶部包含特定注释(@prettier| @format)的文件，默认false
  requirePragma: false,
  // 结尾添加分号
  semi: true,
  // 使用单引号 (true:单引号;false:双引号)
  singleQuote: false,
  // 缩进空格数，默认2个空格
  tabWidth: 2,
  // 元素末尾是否加逗号，默认es5: ES5中的 objects, arrays 等会添加逗号，TypeScript 中的 type 后不加逗号
  trailingComma: "es5",
  // 指定缩进方式，空格或tab，默认false，即使用空格
  useTabs: false,
  // vue 文件中是否缩进 <style> 和 <script> 标签，默认 false
  vueIndentScriptAndStyle: false,

  endOfLine: "auto",
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "html",
      },
    },
  ],
};
