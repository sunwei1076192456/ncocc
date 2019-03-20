<template>
	<div style="margin: 20px;">
        <div>
            <Row style="margin-bottom: 25px;">
                <Col span="8">登录名：
                	<Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
                </Col>
                <Col span="6">用户角色：
                    <Select v-model="userRole" filterable clearable style="width: 100px">
                        <Option v-for="item in allRoleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col span="6">用户状态：
                    <Select v-model="state" filterable clearable style="width: 100px">
                        <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col span="4"><Button type="primary" shape="circle" icon="ios-search" @click="search()">搜索</Button></Col>
            </Row>
        </div>            
        <div>
            <ul>
                <li>
                    <Button type="primary" icon="md-add" @click="openNewModal()">新建</Button>
                    <Button type="success" icon="md-build" @click="openModifyModal()">修改</Button>
                    <Button type="error" icon="md-trash" @click="del()">删除</Button>
                </li>
                <li>
                    <div style="padding: 10px 0;">
                    	<Table border :columns="columns1" :data="data1" :height="400" @on-selection-change="s=>{change(s)}" @on-row-dblclick="s=>{dblclick(s)}"></Table>
                    </div> 
                </li>
                <li>
                    <div style="text-align: right;">
                        <Page :total="total" :page-size="pageInfo.pageSize" show-elevator show-total @on-change="e=>{pageSearch(e)}"></Page>
                    </div>  
                </li>
            </ul>
        </div>
        <!--新建modal-->  
        <Modal :mask-closable="false" :visible.sync="newModal" :loading = "loading" v-model="newModal" width="600" title="添加" @on-ok="newOk('userNew')" @on-cancel="cancel()">
             <Form ref="userNew" :model="userNew" :rules="ruleNew" :label-width="80" >
                <Row>
                    <Col span="12">
                        <FormItem label="登录名:" prop="loginName">
                            <Input v-model="userNew.loginName" style="width: 204px" type="text" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="姓名:" prop="name">
                            <Input v-model="userNew.name" style="width: 204px" type="text" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="密码:" prop="password">
                            <Input v-model="userNew.password" type="password" style="width:200px" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="确认密码:" prop="passwordAgain">
                            <Input v-model="userNew.passwordAgain" type="password" style="width:200px" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="邮箱:" prop="email">
                            <Input v-model="userNew.email" type="text" style="width:200px" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="手机:" prop="phone">
                            <Input v-model="userNew.phone" type="text" style="width:200px" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <!--修改modal 
        <Modal :mask-closable="false" :visible.sync="modifyModal" v-model="modifyModal" width="600" title="修改" @on-ok="modifyOk()" @on-cancel="cancel()">
             <Form :label-width="80" >
                <Row>
                    <Col span="12">
                        <Form-item label="登录名:">
                            <Input v-model="userModify.loginName" style="width: 204px" disabled="disabled" />
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="用户类型:">
                            <Select v-model="userModify.usertype" style="width:200px">
                                <Option  :value="0">普通用户</Option>
                                <Option  :value="1">管理员</Option>
                            </Select>
                             <Input v-model="userModify.email" style="width: 204px"/>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </Modal>
        -->
        <Modal :mask-closable="false" :visible.sync="modifyModal" :loading = "loading" v-model="modifyModal" width="600" title="修改" @on-ok="modifyOk()" @on-cancel="cancel()">
             <Form ref="userModify" :model="userModify" :rules="ruleModify" :label-width="80" >
                <Row>
                    <Col span="12">
                        <FormItem label="登录名:" prop="loginName">
                            <Input v-model="userModify.loginName" style="width: 204px" type="text" disabled="disabled" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="姓名:" prop="name">
                            <Input v-model="userModify.name" style="width: 204px" type="text" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="密码:" prop="password">
                            <Input v-model="userModify.password" type="password" style="width:200px" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="确认密码:" prop="passwordAgain">
                            <Input v-model="userModify.passwordAgain" type="password" style="width:200px" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="邮箱:" prop="email">
                            <Input v-model="userModify.email" type="text" style="width:200px" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="手机:" prop="phone">
                            <Input v-model="userModify.phone" type="text" style="width:200px" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <!--配置角色modal-->  
        <Modal v-model="roleModal" width="500" title="角色配置" @on-ok="roleOk()" @on-cancel="cancel()">
            <div>
                <Table border :columns="columns2" :data="data2" :height="260"  @on-selection-change="s=>{change2(s)}"></Table>
            </div>
        </Modal>
    </div>
</template>
<script>
    import 'iview/dist/styles/iview.css';
	export default {
        data () {
            return {
                /*当前用户登录名*/
                /*userName = window.localStorage.getItem("currentUser_name");*/
                /*用于查找的登录名*/
                loginName:null,
                 /*用于查找的角色*/
                userRole:null,
                /*用于查找的用户状态*/
                state:null,
            	/*选择的数量*/
                count:null,
            	/*选中的组数据*/
                groupId:null,
            	/*新建modal的显示参数*/
                newModal:false,
                /*修改modal的显示参数*/
                modifyModal:false,
                /*角色配置modal的显示参数*/
                roleModal:false,
            	/*分页total属性绑定值*/
                total:0,
                /*loading*/
                loading: true,
                /*pageInfo实体*/
                pageInfo:{
                	page:1,
                	pageSize:10
                },
                /*user实体*/
                user:{
                    id:null,
                    name:null,
                    loginName:null,
                    password:null,
                    /*passwordAgain:null,*/
                    email:null,
                    phone:null
                },
                /*用于添加的user实体,和后台代码的user保持一致*/
                userNew:{
                	id:null,
					name:null,
					loginName:null,
					password:null,
                    passwordAgain:null,
					email:null,
                    phone:null
                },
                /*用于修改的user实体*/
                userModify:{
					id:null,
                    name:null,
                    loginName:null,
                    password:null,
                    passwordAgain:null,
                    email:null,
                    phone:null
                },
                /*新建验证*/
                ruleNew: {
                    loginName: [
                        { required: true, message: '输入姓名', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '输入登录名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '输入密码', trigger: 'blur' }
                    ],
                    passwordAgain: [
                        { required: true, message: '输入再次密码', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '输入手机号', trigger: 'blur' }
                    ]
                },
                /*修改验证*/
                ruleModify:{
                    name: [
                        { type:'string',required: true, message: '输入用户名', trigger: 'blur' }
                    ],
                    /*loginName: [
                        { type:'string',required: true, message: '输入登录名', trigger: 'blur' }
                    ],*/
                    password: [
                        { type:'string',required: true, message: '输入密码', trigger: 'blur' }
                    ],
                    passwordAgain: [
                        { required: true, message: '再次输入密码', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '输入手机号', trigger: 'blur' }
                    ]
                },
            	/*表显示字段*/
            	columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '登录名',
                        key: 'loginName'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '电话',
                        key: 'phone'
                    },
                    {
                        title: '用户类型',
                        align: 'center',
                        key: 'usertype',
                        render: (h, params) => {
                            if(params.row.usertype == 0){
                               return h('div', [
                                    h('strong', null,'管理员')
                                ]); 
                           }else if(params.row.usertype == 1){
                                return h('div', [
                                    h('strong', null,'财务')
                                ]); 
                           }else if(params.row.usertype == 2){
                                return h('div', [
                                    h('strong', null,'调度员')
                                ]); 
                           }else if(params.row.usertype == 3){
                                return h('div', [
                                    h('strong', null,'操作员')
                                ]); 
                           }
                           else{
                                return h('div', [
                                    h('strong', null,'无')
                                ]); 
                           }
                            
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                    },
                                    on: {
                                        click: () => {
                                            this.relationSet(params.row);
                                        }
                                    }
                                },'配置角色')
                            ]);
                        }
                    },
                ],
                /*表数据*/
                data1: [],
                /*表显示字段*/
                columns2: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '角色名称',
                        width: 120,
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'describer'
                    }
                ],
                /*表数据*/
                data2:[],
                /*所有角色临时存储*/
                allRoleList:[],
                /*初始用户状态*/
                stateList:[
                    {"label":'正常',"value":0},
                    {"label":'注销',"value":1},
                ],
                /*用户与角色关系列表*/
                relationList:null
            }
        },
        mounted(){
        	/*页面初始化调用方法*/
            this.getTable({
                "pageInfo":this.pageInfo,
                "loginName":this.loginName,
                "role":this.userRole,
                "state":this.state
            });
            this.axios({
              method: 'get',
              url: '/api/roleManger/getAllRoles.do'
            }).then((response) => {
                this.allRoleList = response.data.extend.role;
            }).catch((error) => {
              this.$Message.error(error);
            });
        },
        methods:{
        	/*pageInfo实体初始化*/
        	initPageInfo(){
        		this.pageInfo.page = 1;
        		this.pageInfo.pageSize = 10;
        	},
            /*user实体初始化*/
            initUser(){
                this.user.id = null;
                this.user.name = null;
                this.user.loginName = null;
                this.user.password = null;
                this.user.email = null;
                this.user.phone = null;
            },
            /*userNew实体初始化*/
            initUserNew(){
                this.userNew.id = null;
                this.userNew.name = null;
                this.userNew.loginName = null;
                this.userNew.password = null;
                this.userNew.passwordAgain = null;
                this.userNew.email = null;
                this.userNew.phone = null;
            },
            /*userModify实体初始化*/
            initUserModify(){
                this.userModify.id = null;
                this.userModify.name = null;
                this.userModify.loginName = null;
                this.userModify.password = null;
                this.userModify.passwordAgain = null;
                this.userModify.email = null;
                this.userModify.phone = null;
            },
            /*userNew设置*/
            userSet(e){
                this.user.id = e.id;
                this.user.name = e.name;
                this.user.loginName = e.loginName;
                this.user.password = e.password;
                this.user.email = e.email;
                this.user.phone = e.phone;
            },
            /*userNew设置*/
            userNewSet(e){
                this.userNew.id = e.id;
                this.userNew.name = e.name;
                this.userNew.loginName = e.loginName;
                this.userNew.password = e.password;
                this.userNew.passwordAgain = e.password;
                this.userNew.email = e.email;
                this.userNew.phone = e.phone;
            },
            /*userModify设置*/
            userModifySet(e){
                this.userModify.id = e.id;
                this.userModify.name = e.name;
                this.userModify.loginName = e.loginName;
                this.userModify.password = e.password;
                this.userModify.passwordAgain = e.password;
                this.userModify.email = e.email;
                this.userModify.phone = e.phone;
            },
            dateGet(e){
                var time = new Date(parseInt(e));
                return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes(); 
            },
            /*listDateSet(e){
                for (var i = e.length - 1; i >= 0; i--) {
                    e[i].createTime = this.dateGet(e[i].createTime);
                }
            },*/
            /*得到表数据*/
            getTable(e) {
                this.axios({
                  method: 'get',
                  url: '/api/userManger/queryAllUserByAuth.do',
                  params: {
                    'page':e.pageInfo.page,
                    'pageSize':e.pageInfo.pageSize,
                    'loginName':e.loginName,
                    "role":e.role,
                    "state":e.state
                  }
                }).then((response) => {
                    this.data1=response.data.extend.user;
                    this.total=response.data.extend.totalCount;
                }).catch((error) => {
                  this.$Message.error(error);
                });
            },
            /*搜索按钮点击事件*/
            search(){
                this.initPageInfo();
                this.getTable({
                    "pageInfo":this.pageInfo,
                    "loginName":this.loginName,
                    "role":this.userRole,
                    "state":this.state
                });   
            },
            /*分页点击事件*/
            pageSearch(e){
                this.pageInfo.page = e;
                this.getTable({  
                    "pageInfo":this.pageInfo,
                    "loginName":this.loginName
                });
            },
            /*新建点击触发事件*/
            openNewModal(){
                this.newModal = true;
                this.initUserNew();
                this.data1.sort();
                this.count = 0;
                this.groupId = null;
            },
            /*新建modal的newOk点击事件*/
            newOk (userNew) { 
                this.$refs[userNew].validate((valid) => {
                    if (valid) {
                        if(this.userNew.password == this.userNew.passwordAgain){
                            this.initUser();
                            this.userSet(this.userNew);
                            this.axios({
                                method: 'post',
                                url: '/api/userManger/saveUser.do',
                                data: this.user
                            }).then(function (response) {
                                this.initUserNew();
                                if(response.data.resultCode == 200){
                                    this.getTable({
                                    "pageInfo":this.pageInfo,
                                    "loginName":this.loginName
                                    });
                                     this.$Message.info('添加成功');
                                     //iView.Message.info('添加成功');
                                }else {
                                    this.$Message.error(response.data.resultMsg);
                                }
                            }.bind(this)).catch(function (error) {
                                alert(error);
                            });  
                            this.newModal = false;
                        }else{
                            this.$Message.error('两次输入的密码不相同！');
                            this.loading = false;
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }
                    }else {
                        this.$Message.error('表单验证失败!');
                        setTimeout(() => {
                            this.loading = false;
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }, 1000);
                    }
                })
            },
            /*点击修改时判断是否只选择一个*/
            openModifyModal(){
                if(this.count > 1 || this.count < 1){
                    this.modifyModal= false; 
                    this.$Message.warning('请至少选择一项(且只能选择一项)');  
                }else{
                    this.modifyModal = true;
                }
            },
            /*修改modal的modifyOk点击事件*/
             modifyOk () { 
                if(this.userModify.password == this.userModify.passwordAgain){
                    this.initUser();
                    this.userSet(this.userModify);
                    this.axios({
                      method: 'post',
                      url: '/api/userManger/modifyUser.do',
                      data: this.user
                    }).then(function (response) {
                        if(response.data.resultCode == 200){
                            this.getTable({
                            "pageInfo":this.pageInfo,
                            "loginName":this.loginName
                            });
                             this.$Message.info('更新成功');
                             //iView.Message.info('添加成功');
                        }else {
                            this.$Message.error(response.data.resultMsg);
                        }
                        this.initUserModify();
                        
                    }.bind(this)).catch(function (error) {
                      this.$Message.info('修改失败');
                    });  
                    this.modifyModal = false;
                }else{
                    this.$Message.error('两次输入的密码不相同！');
                            this.loading = false;
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                }
                
                // this.$refs[userModify].validate((valid) => {
                //     if (valid) {
                //         this.initUser();
                //         this.userSet(this.userModify);
                //         this.axios({
                //           method: 'put',
                //           url: '/users/'+this.user.id,
                //           data: this.user
                //         }).then(function (response) {
                //             this.initUserNew();
                //             this.getTable({
                //                 "pageInfo":this.pageInfo,
                //                 "loginName":this.loginName
                //             });
                //             this.$Message.info('修改成功');
                //         }.bind(this)).catch(function (error) {
                //           alert(error);
                //         });  
                //         this.modifyModal = false;
                //     }else {
                //         this.$Message.error('表单验证失败!');
                //         setTimeout(() => {
                //             this.loading = false;
                //             this.$nextTick(() => {
                //                 this.loading = true;
                //             });
                //         }, 1000);
                //     }
                // })
            },
            /*modal的cancel点击事件*/
            cancel() {
                /*this.$Message.info('点击了取消');*/
            },
            /*table选择后触发事件*/
            change(e){
                if(e.length==1){
                    this.userModifySet(e['0']);
                }
                this.setGroupId(e);              
            },
            /*通过选中的行设置groupId的值*/
            setGroupId(e){
                this.groupId=[];
                this.count=e.length;
                for (var i = 0; i <= e.length - 1; i++) {
                    this.groupId.push(e[i].id);
                }
            },
            /*删除table中选中的数据*/
            del(){
                if(this.groupId!=null && this.groupId!=""){
                    this.axios({
                      method: 'post',
                      url: '/api/userManger/deleteUser.do',
                      data: this.groupId
                    }).then(function (response) {
                        this.groupId=null;
                        this.count=0;
                        if(response.data.resultCode == 200){
                            this.getTable({
                            "pageInfo":this.pageInfo,
                            "loginName":this.loginName
                            });
                            this.$Message.info('删除成功');
                        }else{
                            //iView.Message.error('添加失败');
                            this.$Message.error(response.data.resultMsg);
                        }
                    }.bind(this)).catch(function (error) {
                        this.$Message.error('删除失败');
                    });
                }else{
                    this.$Message.warning('请至少选择一项删除');
                }
            },
            /*表格中双击事件*/
            dblclick(e){
                this.userModifySet(e);
                this.modifyModal = true;
                this.data1.sort();
            },
            /*流程配置*/
            relationSet(e){
                this.roleModal = true;
                this.data2 = [];
                this.axios({
                  method: 'get',
                  url: '/api/roleManger/getAllRolesByLoginName.do',
                  params: {
                    "loginName":e.loginName
                  }
                }).then(function (response) {
                    var roleList = [];
                    for(var i in response.data.extend.userRole){
                        roleList.push(response.data.extend.userRole[i].roleId);
                    }
                    for(var i in this.allRoleList){
                        if(roleList.indexOf(this.allRoleList[i].id) == -1){
                            this.data2.push({
                                "id": this.allRoleList[i].id,
                                "name": this.allRoleList[i].name,
                                "describer": this.allRoleList[i].describer,
                                "userName": e.loginName,
                                "_checked": false
                            });
                        }else {
                            this.data2.push({
                                "id": this.allRoleList[i].id,
                                "name": this.allRoleList[i].name,
                                "describer": this.allRoleList[i].describer,
                                "userName": e.loginName,
                                "_checked": true
                            });
                        }
                    }   
                }.bind(this)).catch(function (error) {
                  alert(error);
                });
            },
            /*配置角色modal确认按钮点击事件*/
            roleOk(){
                if(this.relationList!=null){
                    this.axios({
                      method: 'post',
                      url: '/api/roleManger/rolesConfigure.do',
                      data: this.relationList
                    }).then(function (response) {
                        if(response.data.resultCode == 200){
                            this.getTable({
                            "pageInfo":this.pageInfo,
                            "loginName":this.loginName
                            });
                            this.$Message.info('配置成功');     
                        }else{
                            this.$Message.error(response.data.resultMsg);
                        }
                        
                    }.bind(this)).catch(function (error) {
                      this.$Message.error(error);
                    });
                    this.relationList = null;
                }
            },
            /*配置角色modal中表选择改变事件*/
            change2(e){
                this.relationList = [];
                if(e.length == 0){
                    this.relationList.push({
                        "userName": this.data2[0].userName
                    }); 
                }
                for (var i in e) {
                    this.relationList.push({
                        "userName": e[i].userName,
                        "roleId": e[i].id
                    });  
                }
            }
        }
    }
</script>