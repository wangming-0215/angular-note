# 模板语法 #

## 插值表达式 ({...}) ##

插值运算符可以把计算后的字符串插入到HTML元素标签内的文本或对标签的属性进行赋值。
一般来说，括号间的素材是一个模板表达式，Angular先对它求值，再把它转换成字符串

## 模板表达式 ##

模板表达式产生一个值。angular执行这个表达式，并把它赋值给绑定目标的属性，这个绑定目标可能是HTML元素，组件，或者指令。

JavaScript中那些具有或可能引发副作用的表达式是被禁止的，包括。
- 赋值(`=`, `+=`, `-=`, ...)
- `new`运算符
- 使用`;`或者`,`的链式表达式
- 自增或自减操作符(`++`和`--`)

和JavaScript语法的其他线束不同包括：
- 不支持位运算`|`和`&`
- 具有新的模板表达式运算符，比如`|`, `?.` 和 `!`

## 表达式上下文 ##

典型的表达式上下文就是这个组件实例，他是各种绑定值的来源。

表达式上下文可以包括组件之外的对象，比如`模板输入变量`和`模板引用变量`就是备选的上下文对象之一。

表达式中的上下文变量是由`模板变量`，`指令的上下文变量`（如果有）和`组件的成员`叠加而成的。如果我们要引用的变量名存在于一个以上的命名空间中，那么，模板变量是最优先的，其次是指令的上下文变量，最后是组件的成员。

模板表达式不能引用`全局命名空间`中的任何东西，比如`window`或者`document`。他们也不能调用`console.log`或者`Math.max`。他们只能引用上下文中的成员。

## 表达式指南 ##

- 没有可见的副作用
  
  模板表达式除了改变目标属性的值外，不应该改变应用中的任何状态。这条规则是Angular`单向数据流`策略的基础。永远不用担心读取组件值可能改变另外的显示值。在一次单独的渲染过程中，视图应该总是稳定的。

- 执行迅速

  Angular执行模板表达式比我们想像的频繁。他们可能在每一次按键或者鼠标移动后被调用。表达式应该快速结束，否则用户会感到拖沓，特别是在比较慢的设备上。当计算代价较高时，应该考虑缓存那些从其他值计算得出的值。

- 非常简单

  虽然也可以写出相当复杂的模板表达式，但是不要这样写。

  常规是属性名或者方法调用。偶尔的逻辑取反(`!`)也还凑合。其他情况下，应在组件中实现应用和业务逻辑，是开发和测试变得更容易。

- 幂等性

  最好使用`幂等的`表达式，因为他没有副作用，并且能提升Angular变更检测的性能。

  在Angular的术语中，幂等的表达式应该总是返回完全相同的东西，直到某个依赖值发生改变。

  在单独的一次时间循环中，被依赖的值不应该改变。如果幂等的表达式返回一个字符串或数字，连续调用它两次，也应该返回相同的字符串或数字。如果幂等的表达式返回一个对象(包括`Date`或`Array`)，连续调用它两次，也应该返回同一个对象的引用。

## 模板语句 ##

模板语句用来响应由绑定目标(如HTML元素、组件或者指令)触发的事件。出现在`=`右侧的引号中：`(event)="statement"`。

模板语句由副作用。这是事件处理的关键。因为我们要根据用户的输入来更新应用的状态。

响应事件是Angular中`单向数据流`的另一面。在一次时间循环中，可以随意改变任何地方的任何东西。

和模板表达式一样，模板语句抵用的语言也想JavaScript。模板语句解析器和模板表达式解析器有所不同，特别之处在于它支持基本的赋值(`=`)和表达式链式(`;`和`,`)。

然而，某些JavaScript语法仍然是不允许的：
- `new`运算符
- 自增和自减运算符
- 操作并赋值
- 位操作符`|`和`&`
- 模板表达式运算符

## 语句上下文 ##

和表达式中一样，语句只能引用语句上下文---通常是正在绑定事件的那个组件实例。

典型的语句上下文就是当前组件的实例。

语句上下文可以引用模板自身上下文中的属性。在下面的例子中，就是把模板的$event对象，模板的输入变量(let hero)和模板的引用变量(#heroForm)传给了组件中的一个事件处理器方法。

```html
<button (click)="onSave($event)">Save</button>
<button *ngFor="let hero of heroes" (click)="deleteHero(hero)">{{ hero.name }}</button>
<form #heroForm (ngSubmit)="onSubmit(heroForm)">...</form> 
```
模板上下文中的变量名优先级高于组件上下文中的变量名。在上面的`deleteHero(hero)`中，`hero`是一个模板输入变量，而不是组件中的`hero`变量。

模板语句不能引用全局命名空间中的任何东西。比如不能引用window或者document，也不能调用console.log或者Math.max

## 语句指南 ##

和表达式一样，避免写复杂的模板语句。常规是函数调用或者属性赋值。

## 绑定语法：概览 ##

数据绑定是一种机制，用来协调用户所见和应用数据。虽然我们能往HTML推送至或者从HTML拉取值，但是如果把这些琐事交给数据绑定框架处理，应用会更容易编写，阅读和维护。只要简单地在绑定源和目标HTML元素之间声明绑定，框架就会完成这项工作。

Angular提供了各种各样的数据绑定。

绑定的类型可以根据数据流的方向分成三类：从数据源到视图，从视图到数据源以及双向的从视图到数据源再到视图。

|数据方向|语法|绑定类型:|
|:-----:|:--:|:--:|
|单向：从数据源到视图目标|{{expression}}, [target]="expression", bind-target="expression"|插值表达式，property,attibute，类，样式|
|单向：从视图目标到数据源|(target)="statement"|事件|
|双向|[(target)]="expression"|双向|

除了插值表达式之外的绑定类型，在等号左边为目标名。

这个目标名就是属性（Property）的名字。它可能看起来像是元素属性（Attribute）的名字，但他不是。要理解他们的不同点，必须尝试用另一种方式来审视模板中的HTML。

### 新的思维模型 ###

数据绑定的威力和允许用自定义标记扩展HTML词汇的能，容易误导我们把模板HTML当成HTML+

它其实就是HTML+。但他也跟我们熟悉的HTML有着显著的不同。我们需要一种新的思维模型。

在正常的HTML开发过程中，我们使用HTML元素创建视觉结构，通过把字符串常量设置到元素的attribute来修改那些元素。

在Angular模板中，我们仍使用同样的方式来创建结构和初始化attribute值。

然后，用封装了HTML的组件创建新元素，并把他们当做原生HTML元素在模板中使用。

这就是HTML+。

现在开始学习数据绑定。我们碰到的第一种数据绑定是这样的。

```html
<!-- Bind button disabled state to `isUnchanged` property -->
<button [disabled]="isUnchanged">Save</button>
```

过会儿再认识那个怪异的方括号记法。直觉告诉我们，我们正在绑定按钮的`disabled`attribute。并把它设置为组件isUnchanged属性的当前值。

但是我们的直觉是错的！日常的HTML思维模式在误导我们。实际上，一旦开始数据绑定，就不再跟HTML attribute 打交道了。 这里不是设置attribute，而是设置DOM元素、组件和指令的property

### HTML attitude 与 DOM property 的对比 ###

要理解Angular绑定如何工作。重点是高清HTML attribute 和DOM property之间的区别。

attribute是由HTML定义的。property是由DOM定义的。

- 少量HTML attribute 和 property之间有着1:1的映射， 如`id`。
- 有些HTML attribute 没有对应的property， 如`colspan`.
- 有些DOM property没有对应的attribute， 如`textContent`。
- 大量HTML attribute卡起来映射到了property...但却不像我们想的那样。

最后一类尤其让人困惑……除非我们能理解这个普遍原则：

**attribute 初始化DOM property，然后他们的任务就完成了。property的值可以改变，attribute的值不能改变。**

例如，当浏览器渲染`<input type="text" value="Bob">`时，它将创建响应的DOM节点，其`value` property的值被初始化为"Bob".

当用户在输入框中输入`Sally`是，DOM元素的`value` property变成了`Sally`。但是这个是HTML`value` attribute保持不变。如果我们读取input元素的attribute，就会发现确实没变。

HTML attribute value指定了初始值；DOM value property是当前值。

`disabled` attribute是另一个古怪的例子。按钮的`disabled` property 是`false`,因为默认情况下按钮是可用的.当我们添加`disabled` attribute时,只要他出现了按钮的`disabled` property就初始化为true,于是按钮就被禁用了.

添加或删除`disabled` attribute会禁用或启用这个按钮.但attribute的值无关紧要,这就是我们为什么没法通过`<button disabled="false">仍被禁用</button>`这种写法来启用按钮.

设置按钮的`disabled` proper图(如,通过Angular绑定)可以禁用或者启用这个按钮,这就是property的价值.就算名字相同,HTML attribute 和 DOM property也不是同一样东西.

这句话值得在强调一次:模板绑定是通过property和事件来工作的,而不是attribute.

在Angular的事件中,attribute唯一的作用是用来初始化元素和指令的状态.当进行数据绑定是,只是在于元素和指令的property和事件打交道,而attribute就完全靠边站了.

### 绑定目标 ###

数据绑定中的目标是DOM中的某些东西.这个目标可能是(元素|组件|指令的)property, (元素|组件|指令的)事件,或(极少数情况下)attribute名.

