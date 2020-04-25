var Stack = /** @class */ (function () {
    function Stack() {
        this.items = []; // 存储数据
    }
    // 从栈顶添加元素，也叫压栈
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    // 弹出栈顶元素
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    // 返回栈顶元素
    Stack.prototype.top = function () {
        return this.items[this.items.length - 1];
    };
    // 判断栈是否为空
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    // 返回栈的大小
    Stack.prototype.size = function () {
        return this.items.length;
    };
    // 清空栈
    Stack.prototype.clear = function () {
        this.items = [];
    };
    return Stack;
}());
function is_legal_brackets(string) {
    var stack = new Stack();
    for (var i = 0; i < string.length; i++) {
        var v = string[i];
        // 遇到左括号入栈
        if (v === '(') {
            stack.push(v);
        }
        else if (v === ')') {
            // 遇到右括号判断栈是否为空
            if (stack.isEmpty()) {
                return false;
            }
            else {
                // 弹出左括号
                stack.pop();
            }
        }
    }
    // 如果栈为空，说明字符串括号合法
    return stack.isEmpty();
}
// 计算后缀表达式
function calc_exp(exp) {
    var stack = new Stack();
    for (var i = 0; i < exp.length; i++) {
        var v = exp[i];
        if (['+', '-', '*', '/'].includes(v)) {
            var val_1 = stack.pop();
            var val_2 = stack.pop();
            var exp_str = val_2 + v + val_1;
            // 计算并取整
            var res = eval(exp_str);
            // 计算结果压入栈中
            stack.push(res);
        }
        else {
            stack.push(v);
        }
    }
    if (stack.size() === 1) {
        return stack.pop();
    }
    else {
        return new Error();
    }
}
console.log(calc_exp(['4', '13', '5', '/', '+']));
// console.log(is_legal_brackets('da(daas)daas(das(das)da)'))
// console.log(is_legal_brackets('da(daas)daasdas(das)da)'))
// console.log(is_legal_brackets('()'))
// console.log(is_legal_brackets(')('))
