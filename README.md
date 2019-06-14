# Discussion

## 快速开始

### 第一步 克隆项目到本地


```
    git clone https://github.com/paniuncle/discussion.git
```

### 第二步 修改配置文件

#### 进入到src目录，修改domain.js文件
```
const BACKEND_URL = "http://localhost:8888/index.php/api/";

export default {
    apiUrl: BACKEND_URL
};
```
将BACKEND_URL修改到您部署后端的URL地址

#### 进入到根目录，修改vue.config.js

```
    devServer: {

        // 配置多个代理
        proxy: {
            "/": {
                target: "http://localhost:8888",
                ws: false,
                changeOrigin: true
            }
        }
    }
```
将http://localhost:8888，修改成您后端的URL地址


### 第三步 修改将文件run build
打开命令行，进入到本项目的根目录，然后输入以下代码
```
npm run build
```

### 第四步 复制dist文件夹到前端部署的页面

### 第五步 克隆后端文件

```
git clone https://github.com/paniuncle/discussion_backend.git
```

### 第六步 修改后端配置文件
#### 修改网站的title
进入到本项目根目录的application目录下

修改config.php中的
```
    'web_title'              => 'Discussion - 论坛',
    'web_desc'               => 'Discussion is a new bbs system.',
    'web_keywords'           => 'discussion,admin,admin,test',
```

#### 配置跨域（必需）
进入到本项目根目录的application目录下

修改common.php
```
function allowCross(){
    header("Access-Control-Allow-Credentials:true");
    header("Access-Control-Allow-Origin: http://localhost:8080");//注意修改这里填写你的前端的域名
    header("Access-Control-Max-Age:3600");
    header("Access-Control-Allow-Headers:DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,Uid");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
}
```

将http://localhost:8080 替换成你前端的地址

#### 配置数据库
进入到本项目根目录的application目录下

修改database.php
```

return [
    // 数据库类型
    'type'            => 'mysql',
    // 服务器地址
    'hostname'        => 'localhost',
    // 数据库名
    'database'        => 'discussion',
    // 用户名
    'username'        => 'root',
    // 密码
    'password'        => 'root',
    // 端口
    'hostport'        => '8889',
    // 连接dsn
    'dsn'             => '',
    // 数据库连接参数
    'params'          => [],
    // 数据库编码默认采用utf8
    'charset'         => 'utf8',
    // 数据库表前缀
    'prefix'          => '',
    // 数据库调试模式
    'debug'           => true,
    // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
    'deploy'          => 0,
    // 数据库读写是否分离 主从式有效
    'rw_separate'     => false,
    // 读写分离后 主服务器数量
    'master_num'      => 1,
    // 指定从服务器序号
    'slave_no'        => '',
    // 自动读取主库数据
    'read_master'     => false,
    // 是否严格检查字段是否存在
    'fields_strict'   => true,
    // 数据集返回类型
    'resultset_type'  => 'array',
    // 自动写入时间戳字段
    'auto_timestamp'  => false,
    // 时间字段取出后的默认时间格式
    'datetime_format' => 'Y-m-d H:i:s',
    // 是否需要进行SQL性能分析
    'sql_explain'     => false,
];
```

#### 导入sql文件
将本文本复制
```

create schema discussion collate utf8_general_ci;

create table comment
(
	cid int auto_increment
		primary key,
	tid int null,
	uid int null,
	create_time datetime null,
	status int default 0 null
);

create table comment_content
(
	cid int not null
		primary key,
	content longtext null
);

create table division
(
	did int auto_increment
		primary key,
	parent int default 0 null,
	nodes int null,
	name varchar(255) null,
	`desc` varchar(255) null,
	status int default 0 null
);

create table session
(
	uid int not null
		primary key,
	session varchar(255) null,
	timeout datetime null
);

create table thread
(
	tid int auto_increment
		primary key,
	division int null,
	title varchar(255) null,
	view int null,
	reply int null,
	uid int null,
	active_time datetime null,
	status int default 0 null
);

create table thread_content
(
	tid int not null
		primary key,
	content longtext null
);

create table user
(
	uid int auto_increment
		primary key,
	username varchar(22) null,
	password varchar(36) null,
	salt varchar(6) null,
	email varchar(255) null,
	avatar varchar(255) null,
	`group` int default 1 null,
	reg_time datetime null,
	status int(1) default 0 null
);

create table user_group
(
	gid int auto_increment
		primary key,
	name varchar(255) null,
	super int default 0 null,
	moderator int default 0 null,
	division int default 0 null
);


```

### 第七步 部署后端


一定要将public目录作为网站部署的根目录


