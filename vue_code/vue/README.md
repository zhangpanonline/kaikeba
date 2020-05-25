### 根(/)目录 ###
|目录|解释|
|:----|:----:|
benchmarks|
dist | 发布目录
examples|测试代码
flow|flow的类型声明
packages|核心代码之外的独立库
scripts|构建脚本
src|源码
test|测试用例
types|ts类型声明

### /dist目录 ###
|目录|解释|
|:----|:----:|
\*runtime\*|仅包含运行时，不包含编译器,一般的webpack项目用的就是这个版本，因为webpack会提前预编译，将html模板语法变为js函数，因此最终运行时不需要编译器
\*common\*|cjs规范，用于webpack1,nodejs
\*esm\*|ES模块，用于webpack2+
\*umd\*|universal module definition,兼容cjs和amd(异步加载模块)，用于浏览器

### /src目录 ###
|目录|解释|
|:----|:----:|
compiler|编译器相关,将html模板变为为render函数
core|核心代码
platforms|平台代码
server|服务端渲染
sfc|单文件组件
shared|共享代码

### /src/core目录 ###
|目录|解释|
|:----|:----:|
components|通用组件如keep-alive
global-api|全局API如vue.use()、vue.components()
instance|构造函数等
observer|响应式相关
util|
vodm|虚拟DOM相关

### /src/platforms目录 ###
|目录|解释|
|:----|:----:|
web|浏览器平台
weex|