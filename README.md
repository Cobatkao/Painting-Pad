# Painting-Pad

> Draw anything your want | a simple drawing tool via Canvas & Plain Javascript

**keywords**: Canvas、plain javascript

# 细节

## 画笔轨迹问题

浏览器触发画笔的`onmousedown`事件的事件间隔过大，若画笔移动过快，则线条不连贯，频繁出现断点，如下图：

![pic](https://ws2.sinaimg.cn/large/006tNbRwgy1fw92qccmazj309y04qjra.jpg)

1. 点（圆的半径）和线条宽度（lineWidth）大小相同，或前者小于后者；
2. 其次，用线条将每两次之间移动造成的不连贯点连起来，再把当前点作为上一个点和下一个点连线，这样画出来的就是一条连贯的直线；

## 用变量来表示状态

# 知识点

## 鼠标事件

- `onmousedown`: 鼠标被按下
- `onmousemove`: 鼠标被移动
- `onmouseup`: 鼠标被松开时

鼠标点击事件的clientX/Y的距离是相对于视口的位置，而不是canvas的位置。