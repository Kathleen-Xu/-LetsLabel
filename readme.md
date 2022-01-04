<h1 align="center">图像标注网站 LetsLabel</h1>
<h4 align="center"> 用户手册</h4>

## :page_with_curl: 版本记录
<table>
  <tr>
      <th>文档版本号</th>
      <th>修订人</th>
      <th>修订日期</th>
      <th>变更内容</th>
      <th>备注</th>
  </tr>
  <tr>
      <td>1.0</td>
      <td>Kathleen-Xu</td>
      <td>2022/01/04</td>
      <td>新增</td>
      <td>使用说明</td>
  </tr>
</table>

## :gear: 环境配置

#### 技术栈

本项目使用 **React + Material UI + Django** 框架进行开发。

数据库使用 **mysql**，已部署在远程服务器上。

图片的存储使用 **Cloudinary**，一个可以为图片提供存储等功能的云服务。**【访问该网站需要 科 学 上 网，请确保运行项目前配置网络代理，且如果网络状况不佳可能会导致上传不成功】**

#### 运行步骤

<u>运行该项目前请确保你已经安装 Yarn，以及 Django</u>（开发环境的 Django 版本为 3.2.9）

**1. 克隆仓库到本地，或使用邮件中所发送的代码**

**2. 进入项目文件夹**

``` powershell
$ cd LetsLabel
$ cd Code
```
**3. 运行前端**
- 进入前端文件夹根目录
``` powershell
$ cd front-end
```
- 安装依赖
``` powershell
$ yarn
```
【关于组件中的BUG】安装依赖包后，请将 node_modules/react-image-annotate/RegionLabel/index.js 中129行起的 OnChange 函数修改为：
```javascript
onChange: function onChange(newTags) {
	return _onChange(_objectSpread({}, region, {
    	tags: newTags ? newTags.map(function (t) {
        	return t.value;
        }) : undefined,
    }));
},
```

- 运行前端
``` powershell
$ yarn start
```
**4. 运行后端**（如果有没有安装的模块，请根据报错提示进行pip install）

``` powershell
$ cd ../backEnd
$ django manage.py runserver
```


## :joystick: 功能介绍

#### 登录与注册

本网站除了查看任务广场外，其余所有操作（包括标注、发布、提交、复核等）都需要用户登录后才有权限进行操作。用户应先进行注册和登录。

注册使用邮箱进行注册，用户和密码需要6字节以上，用户名仅包含且必须包含数字和字母6-20位，密码仅包含且必须**同时**包含数字和字母6-20位。

###### 注册
<img src="C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104173804107.png" alt="register" style="width: 50%; align: center;">

###### 登录
<img src="C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104173821026.png" alt="register" style="width: 50%; align: center;">



#### 发布任务

点击“我的发布”，点击新建，即可进行任务的创建和发布。

通过<u>“上传图片”和“上传视频”两个标签</u>进行上传文件类型的切换，其中视频仅支持MP4格式。

- 支持批量上传图片
    - 上传的图片会被添加到上传框的下方进行显示

- 支持批量上传视频
    - 上传的视频会先在后台进行帧提取（间隔为10s），**请耐心等待至出现提取成功的提示**，提取获得的帧转换成图片，与上传图片类似地添加到上传框的下面进行显示

<u>点击**上传框下方**的图片</u>，被点击的图片会添加至**左侧任务发布面板**中（同一张图多次点击会进行重复添加）。

在填写任务名称，选择图片后，点击<u>发布</u>，**耐心等待至出现发布成功的提示**，任务即发布成功。

如果需要重新选择图片，请点击<u>重置</u>。

###### 图片上传

<img src="C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104212123770.png" alt="register" style="width: 100%; align: center;">

###### 视频提取帧后上传

<img src="C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104175117043.png" alt="register" style="width: 100%; align: center;">

###### 任务发布成功

<img src="C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104211950899.png" alt="register" style="width: 100%; align: center;">



#### 浏览任务

在首页“任务广场”，可以看到所有发布的任务。

每一条任务卡片中都包含了任务的基本信息，如任务名、发布人、发布时间以及是否已经有人提交任务、复核是否通过等情况。

单击一条任务，卡片展开，显示任务所携带的图片栏（**若该任务刚刚发布，可能由于网络原因图片加载较慢或者错乱，稍等片刻即可**）。

![image-20220104221705646](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104221705646.png)

任务一般有3种状态：

1. 尚无标注方案：所有用户都可以尝试标注。

![image-20220104221955938](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104221955938.png)

2. 已有标注方案但发布者尚未复核：发布者可以进行复核；所有用户可以进行导出。

![image-20220104222500300](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104222500300.png)

3. 已有标注方案且发布者已经复核：所有用户可以看到复核结果，也可以进行导出。

![image-20220104222703601](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104222703601.png)

![image-20220104222613319](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104222613319.png)



#### 选择任务进行标注

如果任务尚未有人提交标注方案，任务卡片中会显示**<u>标注</u>**按钮，点击标注，即可进入标注页面。（**为防止图片加载问题，请确保任务卡片展开后图片已正常加载后再进行标注；若标注页面图片加载有误，建议退出重进**）。

###### 添加Class和Tag

首先为标注面板添加标注所需用到的Class和Tag。**请注意：一经点击<u>开始标注</u>，Class和Tag将无法追加。**

![image-20220104214619004](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104214619004.png)

###### 开始标注

点击<u>开始标注</u>，进入标注面板。

- 左侧侧边栏前四个按键分别为：<u>选择 / 拖动 / 缩放 / 显示或隐藏标签</u>（进行添加Class和Tag时，下拉框可能超出面板，可以通过将图片向上拖动的方式，让下拉框完整地显示）

- 可以使用 <u>矩形框</u> 进行标注，并为该标注选择Class，添加Tag
- 可以通过右侧Regions中的列表选中已经做好的标注，对其进行删除或修改操作

- 右上角的 <u>PREV</u> 和 <u>NEXT</u> 支持切换图片
- 右上角的 <u>SAVE</u> 为暂存按钮，**在提交之前必须先进行保存**
- 在所有图片都标注完毕后，才可以点击 <u>确定提交</u>

**【由于本项目选择的组件有一些小问题，目前并不支持右上角的CLONE/SETTINGS，和右下角的History。此外，在为删除标注的Tag至0个时，组件会因为报错而卡顿。如遇此种情况，可以刷新标注界面，重新进行标注。另一种解决方法涉及到修改依赖包中组件的源代码，已在开头的运行说明中提出。】**

![image-20220104215056163](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104215056163.png)

![image-20220104220145017](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104220145017.png)

![image-20220104223618576](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104223618576.png)

###### 提交标注方案

先点击 <u>SAVE</u> 进行暂存，最后单击 <u>确认提交</u>。

页面会自动跳转到“我提交的”页面，可以看到提交记录。

![image-20220104221244230](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104221244230.png)

![image-20220104221547603](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104221547603.png)



#### 发布者复核标注方案

在有用户提交了标注方案后，任务发布者可以对该标注方案进行复核，选择通过或者不通过。（本项目暂不支持复现标注信息，用户可以通过导出进行自我判断。）

![image-20220104222531021](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104222531021.png)



#### 导出标注数据

选择一个任务的标注方案，选择导出格式进行导出。

![image-20220104225724812](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104225724812.png)



- COCO：导出为json格式，所有图片都包含在内。

![image-20220104230409932](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104230409932.png)

![image-20220104231750184](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104231750184.png)



- VOC：标注导出为XML格式，一个图片文件对应一个XML文件，分别存放在image和annotation文件夹下，以压缩包的格式导出。

![image-20220104232116866](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104232116866.png)

![image-20220104232850347](C:\Users\MI\AppData\Roaming\Typora\typora-user-images\image-20220104232850347.png)


## :telephone_receiver: 联系我们

如有问题，可以联系我：

#### :email: 邮箱: 2628968409@qq.com
####  :iphone: 手机: 13806730906
