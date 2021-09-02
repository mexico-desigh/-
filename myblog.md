状态码：

0：成功状态

1: 数据格式错误

2： 用户已存在

3： 用户不存在

4： 密码错误

5： 用户未登录

6： 登录失败

7： 注册失败

8: 上传失败

遇到的问题：

##### 1、webpack-dev-Server 报错 版本更新

![preview](https://segmentfault.com/img/bVvkJf/view)

解决办法：更新 webpack-dev-Server

npm i webpack-dev-Server -S

2、安装 multer 时出现问题

![image-20210818210525873](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210818210525873.png)

解决办法：cnpm i multer -S

3、cannot find module 'express'

![image-20210818211327400](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210818211327400.png)

4、上传头像

使用 multer 来将图片存到磁盘中

npm i multer -S

使用 element UI 里面上传头像的组件时，需要设置 with-credentials 为 true，支持发送 cookie 凭证信息，此时 session 才可以通过 cookie 判断当前的状态，获取到 userInfo 的信息
