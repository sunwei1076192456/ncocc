<style>
    .disAuditResult .ivu-form-item-content{
        margin-left: 0px !important;
    }
    ul li{
      list-style-type:none;
    }
    input{
      border: none;
    }
</style>
<template>
	<div style="margin: 20px;">
        <div>
            <Row style="margin-bottom: 25px;">
                <Col span="8">运单号：
                	<Input v-model="waybill" placeholder="请输入..." style="width:200px"></Input>
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
                     <Button type="warning" @click="openDispatcherAuditModal()">调度派车</Button>
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
                waybill:null,

                /*选择的数量*/
                count:0,
                /*选中的组数据*/
                groupId:null,
                groupWorkOrderId:null,
                /*sailingDate:null,
                shipnameCode:null,*/
                /*分页total属性绑定值*/
                total:0,
                /*loading*/
                loading: true,
                /*调度审核modal的显示参数*/
                auditModal:false,
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
                        width: 80,
                        key: 'status',
                        align: 'center'
                    },
                    {
                        title: '船期',
                        width: 120,
                        key: 'sailingdate',
                        align: 'center'
                    },
                    {
                        title: '船名',
                        width: 100,
                        key: 'shipname_code',
                        align: 'center',
                        render: (h, params) => {
                            for(var i in this.shipNameList){
                                if(params.row.shipname_code == this.shipNameList[i].value){
                                    return h('div', [
                                        h('strong', null,this.shipNameList[i].label)
                                ]); 
                                }
                            }
                            
                        }
                    },
                    {
                        title: '船次',
                        width: 120,
                        key: 'voyage',
                        align: 'center'
                    },
                    {
                        title: '类型',
                        width: 80,
                        key: 'businesstype_code',
                        align: 'center',
                        render: (h, params) => {
                            for(var i in this.busiList){
                                if(params.row.businesstype_code == this.busiList[i].value){
                                    return h('div', [
                                        h('strong', null,this.busiList[i].label)
                                ]); 
                                }
                            }
                            
                        }
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
                        width: 150,
                        key: 'waybill',
                        align: 'center'
                    },
                    {
                        title: '箱型',
                        width: 80,
                        key: 'containertype_code',
                        align: 'center',
                        render: (h, params) => {
                            for(var i in this.conTypeList){
                                if(params.row.containertype_code == this.conTypeList[i].value){
                                    return h('div', [
                                        h('strong', null,this.conTypeList[i].label)
                                ]); 
                                }
                            }
                            
                        }
                    }/*,
                    {
                        title: '箱号',
                        width: 120,
                        key: 'containernumber',
                        align: 'center'
                    },
                    {
                        title: '卸货地点',
                        width: 100,
                        key: 'unloading_goods_addr',
                        align: 'center'
                    },
                    {
                        title: '联系人',
                        width: 80,
                        key: 'contact',
                        align: 'center'
                    },
                    {
                        title: '联系电话',
                        width: 120,
                        key: 'iphone',
                        align: 'center'
                    }*/
                ],
                wayBill:{
                    order_id:null,
                    work_order_id:null,
                    create_by:null,
                    businesstype_code:null,
                    customer_id:null,
                    is_urgent:0,
                    is_deduction:0,
                    is_delay:0,
                    sailingdate:null,
                    forecastsailingdate:null,
                    shipping_id:null,
                    protocoltype_code:null,
                    containertype_code:null,
                    containerbelong_code:null,
                    tradetype_code:null,
                    shipname_code:null,
                    waybill:null,
                    containernumber:null,
                    voyage:null,
                    detention:null,
                    demurrage:null,
                    sealnumber:null,
                    packingtype_code:null,
                    loading_goods_addr:null,
                    unloading_goods_addr:null,
                    start_time:null,
                    end_time:null,
                    productname:null,
                    productweight:null,
                    productvolume:null,
                    productnubmer:null,
                    containerweight:null,
                    draw_container_addr:null,
                    return_container_addr:null,
                    port_container_time:null,
                    ship_container_time:null,
                    draw_container_time:null,
                    return_container_time:null,
                    remark:null,
                    contact:null,
                    iphone:null,
                    iphone_res:null,
                    contact_res:null,
                    handle_remark:null
                },
                waybilldata:[],
                //所有客户
                custList:[],
                /*初始所有业务类型*/
                busiList:[],
                //所有船务
                shipList:[],
                //所有船名
                shipNameList:[],
                //所有箱型
                conTypeList:[],
                //所有箱属
                conBelongList:[],
                //运输协议
                protocolTypeList:[],
                //包装种类
                packingTypeList:[],
                //免箱使计算方式
                detentionTypeList:[],
                //提.送货地址
                addrInfoList:[],
                //贸易类型
                tradeTypeList:[]
            }
        },
        mounted(){
            /*页面初始化调用方法*/
            this.initLoginName();
            this.getTable({
                "pageInfo":this.pageInfo,
                "loginName":this.loginName,
                "waybill":this.waybill,
                "tacheId":"1002"
            });
            this.axios({
              method: 'get',
              url: '/api/BillService/queryCommonInfo.do'
            }).then((response) => {
                this.custList = response.data.extend.cust;
                this.busiList = response.data.extend.businessType;
                this.conBelongList = response.data.extend.conBelong;
                this.conTypeList = response.data.extend.conType;
                this.protocolTypeList = response.data.extend.protocolType;
                this.packingTypeList = response.data.extend.packingType;
                this.detentionTypeList = response.data.extend.detentionType;
                this.shipList = response.data.extend.ship;
                this.addrInfoList = response.data.extend.addrInfo;
                this.shipNameList = response.data.extend.shipName;
                this.tradeTypeList = response.data.extend.tradeType;
            }).catch((error) => {
              this.$Message.error(error);
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
                    'loginName':e.loginName,
                    'waybill':e.waybill,
                    'tacheId':e.tacheId
                  }
                }).then((response) => {
                    this.waybilldata=response.data.extend.bill;
                    //console.log(this.waybilldata);
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
                    "waybill":this.waybill,
                    "tacheId":"1002"
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
            initWayBill(){
                this.wayBill.order_id=null;
                this.wayBill.work_order_id=null;
                this.wayBill.create_by=this.loginName;
                this.wayBill.businesstype_code=null;
                this.wayBill.customer_id=null;
                this.wayBill.is_urgent=0;
                this.wayBill.is_deduction=0;
                this.wayBill.is_delay=0;
                this.wayBill.sailingdate=null;
                this.wayBill.forecastsailingdate=null;
                this.wayBill.shipping_id=null;
                this.wayBill.protocoltype_code=null;
                this.wayBill.containertype_code=null;
                this.wayBill.containerbelong_code=null;
                this.wayBill.tradetype_code=null;
                this.wayBill.shipname_code=null;
                this.wayBill.waybill=null;
                this.wayBill.containernumber=null;
                this.wayBill.voyage=null;
                this.wayBill.detention=null;
                this.wayBill.demurrage=null;
                this.wayBill.sealnumber=null;
                this.wayBill.packingtype_code=null;
                this.wayBill.loading_goods_addr=null;
                this.wayBill.unloading_goods_addr=null;
                this.wayBill.start_time=null;
                this.wayBill.end_time=null;
                this.wayBill.productname=null;
                this.wayBill.productweight=null;
                this.wayBill.productvolume=null;
                this.wayBill.productnubmer=null;
                this.wayBill.containerweight=null;
                this.wayBill.draw_container_addr=null;
                this.wayBill.return_container_addr=null;
                this.wayBill.port_container_time=null;
                this.wayBill.ship_container_time=null;
                this.wayBill.draw_container_time=null;
                this.wayBill.return_container_time=null;
                this.wayBill.remark=null;
                this.wayBill.contact=null;
                this.wayBill.iphone=null;
                this.wayBill.iphone_res=null;
                this.wayBill.contact_res=null;
                this.wayBill.handle_remark=null;
            },
            wayBillSet(e){
                this.wayBill.order_id=e.id;
                this.wayBill.work_order_id=e.workOrderId;
                this.wayBill.create_by=e.create_by;
                this.wayBill.businesstype_code=e.businesstype_code;
                this.wayBill.customer_id=e.customer_id;
                this.wayBill.is_urgent=e.is_urgent;
                this.wayBill.is_deduction=e.is_deduction;
                this.wayBill.is_delay=e.is_delay;
                this.wayBill.sailingdate=e.sailingdate;
                this.wayBill.forecastsailingdate=e.forecastsailingdate;
                this.wayBill.shipping_id=e.shipping_id;
                this.wayBill.protocoltype_code=e.protocoltype_code;
                this.wayBill.containertype_code=e.containertype_code;
                this.wayBill.containerbelong_code=e.containerbelong_code;
                this.wayBill.containerbelong_code=e.containerbelong_code;
                this.wayBill.tradetype_code=e.tradetype_code;
                this.wayBill.shipname_code=e.shipname_code;
                this.wayBill.waybill=e.waybill;
                this.wayBill.containernumber=e.containernumber;
                this.wayBill.voyage=e.voyage;
                this.wayBill.detention=e.detention;
                this.wayBill.demurrage=e.demurrage;
                this.wayBill.sealnumber=e.sealnumber;
                this.wayBill.packingtype_code=e.packingtype_code;
                this.wayBill.loading_goods_addr=e.loading_goods_addr;
                this.wayBill.unloading_goods_addr=e.unloading_goods_addr;
                this.wayBill.start_time=e.start_time;
                this.wayBill.end_time=e.end_time;
                this.wayBill.productname=e.productname;
                this.wayBill.productweight=e.productweight;
                this.wayBill.productvolume=e.productvolume;
                this.wayBill.productnubmer=e.productnubmer;
                this.wayBill.containerweight=e.containerweight;
                this.wayBill.draw_container_addr=e.draw_container_addr;
                this.wayBill.return_container_addr=e.return_container_addr;
                this.wayBill.port_container_time=e.port_container_time;
                this.wayBill.ship_container_time=e.ship_container_time;
                this.wayBill.draw_container_time=e.draw_container_time;
                this.wayBill.return_container_time=e.return_container_time;
                this.wayBill.remark=e.remark;
                this.wayBill.contact=e.contact;
                this.wayBill.iphone=e.iphone;
                this.wayBill.iphone_res=e.iphone_res;
                this.wayBill.contact_res=e.contact_res;
                this.wayBill.handle_remark=e.handle_remark;
            },
            cancel() {
                /*this.$Message.info('点击了取消');*/
                this.loading=false;
            },
             /*table选择后触发事件*/
            change(e){
                if(e.length==1){
                    this.wayBillSet(e['0']);
                }
                this.setGroupId(e);              
            },
            /*通过选中的行设置groupId的值*/
            setGroupId(e){
                this.groupId=[];
                this.groupWorkOrderId=[];
                this.count=e.length;
                for (var i = 0; i <= e.length - 1; i++) {
                    this.groupId.push(e[i].id);
                    this.groupWorkOrderId.push(e[i].workOrderId);
                }
            }

    }
  }
</script>

