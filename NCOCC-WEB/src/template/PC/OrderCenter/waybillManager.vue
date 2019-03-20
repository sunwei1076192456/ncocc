<template>
	<div style="margin: 20px;">
        <div>
            <Row style="margin-bottom: 25px;">
                <Col span="8">运单号：
                	<Input v-model="orderId" placeholder="请输入..." style="width:200px"></Input>
                </Col>
                <!-- <Col span="6">船期：
                    <Select v-model="sailingDate" filterable clearable style="width: 100px">
                        <Option v-for="item in allRoleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col span="6">船名：
                    <Select v-model="shipnameCode" filterable clearable style="width: 100px">
                        <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col> -->
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
                        <Col class="panel table-panel" :span="24">
                    	   <Table style="width: 100%;" :loading="pageInfo.loading" border :columns="waybillcol" :data="waybilldata" :height="400" @on-selection-change="s=>{change(s)}" @on-row-dblclick="s=>{dblclick(s)}"></Table>
                        </Col>
                    </div> 
                </li>
                <li>
                    <div style="text-align: right;">
                        <Page :total="total" :page-size="pageInfo.pageSize" show-elevator show-total @on-change="e=>{pageSearch(e)}"></Page>
                    </div>  
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import 'iview/dist/styles/iview.css';
	export default {
        data () {
            return {
                /*当前用户登录名*/
                loginName:null,
                /*用于模糊查询的订单号*/
                orderId:null,
                /*sailingDate:null,
                shipnameCode:null,*/
                /*分页total属性绑定值*/
                total:0,
                /*loading*/
                loading: true,
                pageInfo:{
                	page:1,
                	pageSize:10
                },
                waybillcol:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '状态',
                        width: 70,
                        key: 'status',
                        align: 'center'
                    },
                    {
                        title: '船期',
                        width: 90,
                        key: 'sailingdate',
                        align: 'center'
                    },
                    {
                        title: '船名',
                        width: 100,
                        key: 'shipname_code',
                        align: 'center'
                    },
                    {
                        title: '船次',
                        width: 70,
                        key: 'voyage',
                        align: 'center'
                    },
                    {
                        title: '类型',
                        width: 70,
                        key: 'businesstype_code',
                        align: 'center'
                    },
                    {
                        title: '客户简称',
                        width: 100,
                        key: 'cusabbreviation',
                        align: 'center'
                    },
                    {
                        title: '船公司',
                        width: 90,
                        key: 'shipabbreviation',
                        align: 'center'
                    },
                    {
                        title: '运单号',
                        width: 180,
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '箱型',
                        width: 70,
                        key: 'containertype_code',
                        align: 'center'
                    },
                    {
                        title: '箱号',
                        width: 120,
                        key: 'containernumber',
                        align: 'center'
                    },
                    {
                        title: '门点',
                        width: 70,
                        key: 'deliveryplace_code',
                        align: 'center'
                    },
                    {
                        title: '联系人',
                        width: 80,
                        key: 'contact_id',
                        align: 'center'
                    },
                    {
                        title: '联系电话',
                        width: 150,
                        key: 'contact_id',
                        align: 'center'
                    }
                ],
                waybilldata:[]
            }
        },
        mounted(){
            /*页面初始化调用方法*/
            this.initLoginName();
            this.getTable({
                "pageInfo":this.pageInfo,
                "loginName":this.loginName
            });
        },
        methods:{
            /*得到表数据*/
            getTable(e) {
                this.axios({
                  method: 'get',
                  url: '/api/BillService/queryBillByIng.do',
                  params: {
                    'page':e.pageInfo.page,
                    'pageSize':e.pageInfo.pageSize,
                    'loginName':e.loginName
                  }
                }).then((response) => {
                    this.waybilldata=response.data.extend.bill;
                    this.total=response.data.extend.totalCount;
                }).catch((error) => {
                  this.$Message.error(error);
                });
            },
            initLoginName(){
                this.loginName = window.localStorage.getItem("currentUser_name");
            },
            /*pageInfo实体初始化*/
            initPageInfo(){
                this.pageInfo.page = 1;
                this.pageInfo.pageSize = 10;
            },
        }
    }
</script>