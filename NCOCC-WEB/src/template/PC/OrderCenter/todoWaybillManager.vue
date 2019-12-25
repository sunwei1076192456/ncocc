<style>
  .newBillModal .ivu-form-item-content{
        margin-left: 0px !important;
    }
    ul li{
      list-style-type:none;
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
          <Button type="primary" icon="md-add" @click="openNewModal()">新建</Button>
          <!-- <Button type="success" icon="md-build" @click="openModifyModal()">修改</Button> -->
          <Button type="error" icon="md-trash" @click="del()">作废</Button>
          <Poptip confirm title="是否确认接受此订单!" @on-ok="confirmAcceptOrder()" @on-cancel="cancel()">
            <Button type="warning">确认接单</Button>
          </Poptip>
        </li>
        <li>
          <div style="padding: 10px 0;">
            <Col class="panel table-panel" :span="24">
            <Table style="width: 100%;" :loading="pageInfo.loading" border :columns="waybillcol" :data="waybilldata" :height="400" @on-selection-change="s=>{change(s)}"></Table>
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
    <!-- 新增运单 -->
    <Modal :mask-closable="false" :visible.sync="newModal" :loading="loading" v-model="newModal" width="750" title="新增代办单" @on-ok="newOk('wayBillNew')" @on-cancel="cancel()">
      <Form ref="wayBillNew" :model="wayBillNew" :rules="ruleNew" :label-width="80" class="newBillModal">
        <Row style="margin-bottom: 25px;">
          <!-- <Col span="8"><span style="color:red">*</span>业务类型：
                    <FormItem prop="businesstype_code">
                        <Select v-model="wayBillNew.businesstype_code" filterable clearable style="width: 150px;">
                        <Option v-for="item in busiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                  </FormItem>
                    </Col> -->
          <Col span="6"><span style="color:red">*</span>船务：
          <FormItem prop="shipping_id">
            <Select v-model="wayBillNew.shipping_id" filterable clearable style="width: 150px;">
              <Option v-for="item in shipList" :value="item.value" :key="item.value">{{ item.abbreviation }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="6"><span style="color:red">*</span>船期：
          <FormItem prop="sailingdate">
            <DatePicker type="date" @on-change="sailingdateChange" v-model="wayBillNew.sailingdate" format="yyyy-MM-dd" style="width:150px"></DatePicker>
            <!-- <DatePicker type="date" v-model="wayBillNew.sailingdate" format="yyyy-MM-dd" style="width:150px"></DatePicker> -->
          </FormItem>
          </Col>
          <Col span="6"><span style="color:red">*</span>船名：
          <FormItem prop="shipname_code">
            <Select v-model="wayBillNew.shipname_code" filterable clearable style="width: 150px">
              <Option v-for="item in shipNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="6"><span style="color:red">*</span>航次：
          <FormItem prop="voyage">
            <Input v-model="wayBillNew.voyage" style="width:150px"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row style="margin-bottom: 25px;">
          <!-- <Col span="8"><span style="color:red">*</span>预计船期：
                    <FormItem prop="forecastsailingdate">
                       <DatePicker type="date"   @on-change="forecastsailingdateChange" v-model="wayBillNew.forecastsailingdate" format="yyyy-MM-dd" style="width:150px"></DatePicker>
                      <!-- <DatePicker type="date" v-model="wayBillNew.forecastsailingdate" format="yyyy-MM-dd" style="width:150px"></DatePicker> 
                  </FormItem>
                    </Col> -->
          <Col span="6"><span style="color:red">*</span>代办人：
          <FormItem prop="customer_id">
            <Select v-model="wayBillNew.customer_id" filterable clearable style="width: 150px;">
              <Option v-for="item in custList" :value="item.id" :key="item.id">{{ item.abbreviation }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="6"><span style="color:red">*</span>运单号：
          <FormItem prop="waybill">
            <Input v-model="wayBillNew.waybill" style="width:150px"></Input>
          </FormItem>
          </Col>
          <Col span="6"><span style="color:red">*</span>箱属：
          <FormItem prop="containerbelong_code">
            <Select v-model="wayBillNew.containerbelong_code" filterable clearable style="width: 150px">
              <Option v-for="item in conBelongList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="6"><span style="color:red">*</span>运输协议：
          <FormItem prop="protocoltype_code">
            <Select v-model="wayBillNew.protocoltype_code" filterable clearable style="width: 150px">
              <Option v-for="item in protocolTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row style="margin-bottom: 25px;">
          <Col span="6"><span style="color:red">*</span>箱型：
          <FormItem prop="containertype_code">
            <Select v-model="wayBillNew.containertype_code" filterable clearable style="width: 150px">
              <Option v-for="item in conTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="6"><span style="color:red">*</span>箱号：
          <FormItem prop="containernumber">
            <Input v-model="wayBillNew.containernumber" style="width:150px"></Input>
          </FormItem>
          </Col>
          <Col span="6">铅封号：
          <FormItem prop="sealnumber">
            <Input v-model="wayBillNew.sealnumber" style="width:150px"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row style="margin-bottom: 25px;">
          <Col span="6"><span style="color:red">*</span>联系人：
          <FormItem prop="contact">
            <Input v-model="wayBillNew.contact" style="width:150px"></Input>
          </FormItem>
          </Col>
          <Col span="6"><span style="color:red">*</span>联系人电话：
          <FormItem prop="iphone">
            <Input v-model="wayBillNew.iphone" style="width:150px"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row style="margin-bottom: 25px;">
          <Col span="6"><span style="color:red">*</span>免箱使用天数：
          <FormItem prop="detention">
            <Input v-model="wayBillNew.detention" style="width:150px"></Input>
          </FormItem>
          </Col>
          <Col span="6"><span style="color:red">*</span>免堆存天数：
          <FormItem prop="demurrage">
            <Input v-model="wayBillNew.demurrage" style="width:150px"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row style="margin-bottom: 25px;">
          <Col span="6"><span style="color:red">*</span>提箱地址：
          <FormItem prop="draw_container_addr">
            <Select v-model="wayBillNew.draw_container_addr" filterable clearable style="width: 150px">
              <Option v-for="item in addrInfoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="6"><span style="color:red">*</span>返箱地址：
          <FormItem prop="return_container_addr">
            <Select v-model="wayBillNew.return_container_addr" filterable clearable style="width: 150px">
              <Option v-for="item in addrInfoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row style="margin-bottom: 25px;">
          <Col span="8">操作备注：
          <FormItem prop="handle_remark">
            <textarea v-model="wayBillNew.handle_remark" style="width:500px" :autosize="{minRows: 2,maxRows: 5}"></textarea>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    <!--查看驳回原因modal-->
    <Modal v-model="rejectReasonModal" width="500" title="驳回原因">
      <div>
        <Table border :columns="rejectdataCol" :data="rejectdata" :height="260"></Table>
      </div>
      <div slot="footer">
        <Button type="info" size="large" long @click="cancel()">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import 'iview/dist/styles/iview.css';
export default {
  data() {
    return {
      /*当前用户登录名*/
      loginName: null,
      /*用于模糊查询的订单号*/
      waybill: null,
      /*选中的组数据*/
      groupId: null,
      /*sailingDate:null,
      shipnameCode:null,*/
      /*分页total属性绑定值*/
      total: 0,
      /*loading*/
      loading: true,
      /*新建modal的显示参数*/
      newModal: false,
      /*驳回原因modal的显示参数*/
      rejectReasonModal: false,
      pageInfo: {
        page: 1,
        pageSize: 10
      },
      rejectdataCol: [{
          title: '驳回原因',
          width: 200,
          key: 'rejectReason'
        },
        {
          title: '驳回时间',
          width: 150,
          key: 'rejectTime'
        },
        {
          title: '驳回人',
          width: 115,
          key: 'rejectPerson'
        }
      ],
      waybillcol: [{
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
          width: 100,
          key: 'sailingdate',
          align: 'center'
        },
        {
          title: '船名',
          width: 100,
          key: 'shipname_code',
          align: 'center',
          render: (h, params) => {
            for (var i in this.shipNameList) {
              if (params.row.shipname_code == this.shipNameList[i].value) {
                return h('div', [
                  h('strong', null, this.shipNameList[i].label)
                ]);
              }
            }

          }
        },
        {
          title: '船次',
          width: 100,
          key: 'voyage',
          align: 'center'
        },
        {
          title: '类型',
          width: 80,
          key: 'businesstype_code',
          align: 'center',
          render: (h, params) => {
            for (var i in this.busiList) {
              if (params.row.businesstype_code == this.busiList[i].value) {
                return h('div', [
                  h('strong', null, this.busiList[i].label)
                ]);
              }
            }

          }
        },
        {
          title: '代办人',
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
          width: 70,
          key: 'containertype_code',
          align: 'center',
          render: (h, params) => {
            for (var i in this.conTypeList) {
              if (params.row.containertype_code == this.conTypeList[i].value) {
                return h('div', [
                  h('strong', null, this.conTypeList[i].label)
                ]);
              }
            }

          }
        },
        {
          title: '箱号',
          width: 120,
          key: 'containernumber',
          align: 'center'
        },
        /*{
          title: '卸货地点',
          width: 100,
          key: 'unloading_goods_addr',
          align: 'center'
        },*/
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
        },
        {
          title: '操作',
          width: 180,
          align: 'center',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                },
                style: {
                  marginLeft: '0px'
                },
                on: {
                  click: () => {
                    this.relationSet(params.row);
                  }
                }
              }, '打印'),
              h('Button', {
                props: {
                  type: 'warning',
                },
                style: {
                  display: (params.row.isDisReject == 'Y') ? "inline-block" : "none",
                },
                on: {
                  click: () => {
                    this.lookRejectReason(params.row);
                  }
                }
              }, '驳回原因')
            ]);
          }
        },
      ],
      wayBill: {
        create_by: null,
        businesstype_code: null,
        customer_id: null,
        is_urgent: 0,
        is_deduction: 0,
        is_delay: 0,
        sailingdate: null,
        forecastsailingdate: null,
        shipping_id: null,
        protocoltype_code: null,
        containertype_code: null,
        containerbelong_code: null,
        tradetype_code: null,
        shipname_code: null,
        waybill: null,
        containernumber: null,
        voyage: null,
        // deliveryplace:null,
        detention: null,
        demurrage: null,
        //detentiontype_code:null,
        sealnumber: null,
        packingtype_code: null,
        //area_id:null,
        //district_id:null,
        loading_goods_addr: null,
        unloading_goods_addr: null,
        start_time: null,
        end_time: null,
        productname: null,
        productweight: null,
        productvolume: null,
        productnubmer: null,
        containerweight: null,
        draw_container_addr: null,
        return_container_addr: null,
        port_container_time: null,
        ship_container_time: null,
        draw_container_time: null,
        return_container_time: null,
        remark: null,
        contact: null,
        iphone: null,
        iphone_res: null,
        contact_res: null,
        handle_remark: null,
        //新增三个：收货点，收货状态，货盘码
        handle_point: null,
        receive_goods_state: null,
        good_pallet_code: null
      },
      wayBillNew: {
        businesstype_code: null,
        customer_id: null,
        is_urgent: 0,
        is_deduction: 0,
        is_delay: 0,
        sailingdate: null,
        forecastsailingdate: null,
        shipping_id: null,
        protocoltype_code: null,
        containertype_code: null,
        containerbelong_code: null,
        tradetype_code: null,
        shipname_code: null,
        waybill: null,
        containernumber: null,
        voyage: null,
        // deliveryplace:null,
        detention: null,
        demurrage: null,
        //detentiontype_code:null,
        sealnumber: null,
        packingtype_code: null,
        //area_id:null,
        //district_id:null,
        loading_goods_addr: null,
        unloading_goods_addr: null,
        start_time: null,
        end_time: null,
        productname: null,
        productweight: null,
        productvolume: null,
        productnubmer: null,
        containerweight: null,
        draw_container_addr: null,
        return_container_addr: null,
        port_container_time: null,
        ship_container_time: null,
        draw_container_time: null,
        return_container_time: null,
        remark: null,
        contact: null,
        iphone: null,
        iphone_res: null,
        contact_res: null,
        handle_remark: null,
        //新增三个：收货点，收货状态，货盘码
        handle_point: [],
        receive_goods_state: null,
        good_pallet_code: null
      },
      ruleNew: {
        customer_id: [
          { type: 'number', required: true, message: '请选择代办人', trigger: 'blur' }
        ],
        shipping_id: [
          { type: 'number', required: true, message: '请选择船务', trigger: 'blur' }
        ],
        sailingdate: [
          { type: 'string', required: true, message: '请填写船期', trigger: 'change' }
        ],
        shipname_code: [
          { type: 'number', required: true, message: '请选择船名', trigger: 'blur' }
        ],
        waybill: [
          { type: 'string', required: true, message: '请填写运单号', trigger: 'blur' }
        ],
        voyage: [
          { type: 'string', required: true, message: '请填写航次', trigger: 'blur' }
        ],
        protocoltype_code: [
          { type: 'number', required: true, message: '请选择运输协议', trigger: 'blur' }
        ],
        tradetype_code: [
          { type: 'number', required: true, message: '请选择贸易类型', trigger: 'blur' }
        ],
        containernumber: [
          { type: 'string', required: true, message: '请填写箱号', trigger: 'blur' }
        ],
        containerbelong_code: [
          { type: 'number', required: true, message: '请选择箱属', trigger: 'blur' }
        ],
        containertype_code: [
          { type: 'number', required: true, message: '请选择箱型', trigger: 'blur' }
        ],
        detention: [
          { type: 'string', required: true, message: '请填写免箱天数', trigger: 'blur' }
        ],
        demurrage: [
          { type: 'string', required: true, message: '请填写免堆存天数', trigger: 'blur' }
        ],
        contact: [
          { type: 'string', required: true, message: '请填写联系人', trigger: 'blur' }
        ],
        iphone: [
          { type: 'string', required: true, message: '请填写联系电话', trigger: 'blur' }
        ],
        /*handle_point: [
          { type: 'array', required: true, message: '请选择收货点', trigger: 'blur' }
        ],
        receive_goods_state: [
          { type: 'number', required: true, message: '请选择收货状态', trigger: 'blur' }
        ],
        good_pallet_code: [
          { type: 'string', required: true, message: '请填写货盘码', trigger: 'blur' }
        ],*/
        draw_container_addr: [
          { type: 'number', required: true, message: '请填写提箱地址', trigger: 'blur' }
        ],
        return_container_addr: [
          { type: 'number', required: true, message: '请填写返箱地址', trigger: 'blur' }
        ]
      },
      waybilldata: [],
      rejectdata: [],
      //所有客户
      custList: [],
      /*初始所有业务类型*/
      busiList: [],
      //所有船务
      shipList: [],
      //所有船名
      shipNameList: [],
      //所有箱型
      conTypeList: [],
      //所有箱属
      conBelongList: [],
      //运输协议
      protocolTypeList: [],
      //包装种类
      packingTypeList: [],
      //免箱使计算方式
      detentionTypeList: [],
      //提.送货地址
      addrInfoList: [],
      //贸易类型
      tradeTypeList: [],
      //省市区县
      districtList: [],
      /*初始收货状态*/
      ReceiveGoodStateList: [
        { "label": '正常', "value": 0 },
        { "label": '加急', "value": 1 },
        { "label": '扣货', "value": 2 },
      ]
    }
  },
  mounted() {
    /*页面初始化调用方法*/
    this.initLoginName();
    this.getTable({
      "pageInfo": this.pageInfo,
      "loginName": this.loginName,
      "waybill": this.waybill
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
      this.districtList = response.data.extend.district;
    }).catch((error) => {
      this.$Message.error(error);
    });
  },
  methods: {
    /*得到表数据*/
    getTable(e) {
      this.axios({
        method: 'get',
        url: '/api/BillService/queryBillByIng.do',
        params: {
          'page': e.pageInfo.page,
          'pageSize': e.pageInfo.pageSize,
          'loginName': e.loginName,
          'waybill': e.waybill,
          "tacheId": "1000",
          "businessType": "27"
        }
      }).then((response) => {
        this.waybilldata = response.data.extend.bill;
        //console.log(waybilldata);
        this.total = response.data.extend.totalCount;
      }).catch((error) => {
        this.$Message.error(error);
      });
    },
    /*搜索按钮点击事件*/
    search() {
      this.initPageInfo();
      this.getTable({
        "pageInfo": this.pageInfo,
        "loginName": this.loginName,
        "waybill": this.waybill
      });
    },
    initLoginName() {
      this.loginName = window.localStorage.getItem("currentUser_name");
    },
    /*pageInfo实体初始化*/
    initPageInfo() {
      this.pageInfo.page = 1;
      this.pageInfo.pageSize = 10;
    },
    openNewModal() {
      this.newModal = true;
      this.initWayBillNew();
      // this.data1.sort();
      this.count = 0;
      this.groupId = null;
    },
    initWayBill() {
      this.wayBill.create_by = this.loginName;
      this.wayBill.businesstype_code = null;
      this.wayBill.customer_id = null;
      this.wayBill.is_urgent = 0;
      this.wayBill.is_deduction = 0;
      this.wayBill.is_delay = 0;
      this.wayBill.sailingdate = null;
      this.wayBill.forecastsailingdate = null;
      this.wayBill.shipping_id = null;
      this.wayBill.protocoltype_code = null;
      this.wayBill.containertype_code = null;
      this.wayBill.containerbelong_code = null;
      this.wayBill.tradetype_code = null;
      this.wayBill.shipname_code = null;
      this.wayBill.waybill = null;
      this.wayBill.containernumber = null;
      this.wayBill.voyage = null;
      this.wayBill.detention = null;
      this.wayBill.demurrage = null;
      this.wayBill.sealnumber = null;
      this.wayBill.packingtype_code = null;
      this.wayBill.loading_goods_addr = null;
      this.wayBill.unloading_goods_addr = null;
      this.wayBill.start_time = null;
      this.wayBill.end_time = null;
      this.wayBill.productname = null;
      this.wayBill.productweight = null;
      this.wayBill.productvolume = null;
      this.wayBill.productnubmer = null;
      this.wayBill.containerweight = null;
      this.wayBill.draw_container_addr = null;
      this.wayBill.return_container_addr = null;
      this.wayBill.port_container_time = null;
      this.wayBill.ship_container_time = null;
      this.wayBill.draw_container_time = null;
      this.wayBill.return_container_time = null;
      this.wayBill.remark = null;
      this.wayBill.contact = null;
      this.wayBill.iphone = null;
      this.wayBill.iphone_res = null;
      this.wayBill.contact_res = null;
      this.wayBill.handle_remark = null;
      this.wayBill.handle_point = null;
      this.wayBill.receive_goods_state = null;
      this.wayBill.good_pallet_code = null;
    },
    initWayBillNew() {
      this.wayBillNew.businesstype_code = 27 //默认代办;
      this.wayBillNew.customer_id = null;
      this.wayBillNew.is_urgent = null;
      this.wayBillNew.is_deduction = null;
      this.wayBillNew.is_delay = null;
      this.wayBillNew.sailingdate = null;
      this.wayBillNew.forecastsailingdate = null;
      this.wayBillNew.shipping_id = null;
      this.wayBillNew.protocoltype_code = null;
      this.wayBillNew.containertype_code = null;
      this.wayBillNew.containerbelong_code = null;
      this.wayBillNew.tradetype_code = null;
      this.wayBillNew.shipname_code = null;
      this.wayBillNew.waybill = null;
      this.wayBillNew.containernumber = null;
      this.wayBillNew.voyage = null;
      this.wayBillNew.detention = null;
      this.wayBillNew.demurrage = null;
      this.wayBillNew.sealnumber = null;
      this.wayBillNew.packingtype_code = null;
      this.wayBillNew.loading_goods_addr = null;
      this.wayBillNew.unloading_goods_addr = null;
      this.wayBillNew.start_time = null;
      this.wayBillNew.end_time = null;
      this.wayBillNew.productname = null;
      this.wayBillNew.productweight = null;
      this.wayBillNew.productvolume = null;
      this.wayBillNew.productnubmer = null;
      this.wayBillNew.containerweight = null;
      this.wayBillNew.draw_container_addr = null;
      this.wayBillNew.return_container_addr = null;
      this.wayBillNew.port_container_time = null;
      this.wayBillNew.ship_container_time = null;
      this.wayBillNew.draw_container_time = null;
      this.wayBillNew.return_container_time = null;
      this.wayBillNew.remark = null;
      this.wayBillNew.contact = null;
      this.wayBillNew.iphone = null;
      this.wayBillNew.iphone_res = null;
      this.wayBillNew.contact_res = null;
      this.wayBillNew.handle_remark = null;
      this.wayBillNew.handle_point = [];
      this.wayBillNew.receive_goods_state = null;
      this.wayBillNew.good_pallet_code = null;
    },
    getModifyTimes(e) {
      this.FormItem.data = e;
    },
    forecastsailingdateChange(e) {
      this.wayBillNew.forecastsailingdate = e;
    },
    sailingdateChange(e) {
      this.wayBillNew.sailingdate = e;
    },
    drawContainerTimeChange(e) {
      this.wayBillNew.draw_container_time = e;
    },
    returnContainerTimeChange(e) {
      this.wayBillNew.return_container_time = e;
    },
    portContainerTimeChange(e) {
      this.wayBillNew.port_container_time = e;
    },
    shipContainerTimeChange(e) {
      this.wayBillNew.ship_container_time = e;
    },
    startTimeChange(e) {
      this.wayBillNew.start_time = e;
    },
    endTimeChange(e) {
      this.wayBillNew.end_time = e;
    },
    newOk(wayBillNew) {
      this.$refs[wayBillNew].validate((valid) => {
        if (valid) {
          this.initWayBill();
          this.wayBillSet(this.wayBillNew);
          this.axios({
            method: 'post',
            url: '/api/BillService/saveBill.do',
            data: this.wayBill
          }).then(function(response) {
            this.initWayBillNew();
            if (response.data.resultCode == 200) {
              this.getTable({
                "pageInfo": this.pageInfo,
                "loginName": this.loginName
              });
              this.$Message.info('添加成功');
            } else {
              this.$Message.error(response.data.resultMsg);
            }
          }.bind(this)).catch(function(error) {
            alert(error);
          });
          this.newModal = false;
        } else {
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
    wayBillSet(e) {
      this.wayBill.businesstype_code = e.businesstype_code;
      this.wayBill.customer_id = e.customer_id;
      this.wayBill.is_urgent = e.is_urgent;
      this.wayBill.is_deduction = e.is_deduction;
      this.wayBill.is_delay = e.is_delay;
      this.wayBill.sailingdate = e.sailingdate;
      this.wayBill.forecastsailingdate = e.forecastsailingdate;
      this.wayBill.shipping_id = e.shipping_id;
      this.wayBill.protocoltype_code = e.protocoltype_code;
      this.wayBill.containertype_code = e.containertype_code;
      this.wayBill.containerbelong_code = e.containerbelong_code;
      this.wayBill.containerbelong_code = e.containerbelong_code;
      this.wayBill.tradetype_code = e.tradetype_code;
      this.wayBill.shipname_code = e.shipname_code;
      this.wayBill.waybill = e.waybill;
      this.wayBill.containernumber = e.containernumber;
      this.wayBill.voyage = e.voyage;
      this.wayBill.detention = e.detention;
      this.wayBill.demurrage = e.demurrage;
      this.wayBill.sealnumber = e.sealnumber;
      this.wayBill.packingtype_code = e.packingtype_code;
      this.wayBill.loading_goods_addr = e.loading_goods_addr;
      this.wayBill.unloading_goods_addr = e.unloading_goods_addr;
      this.wayBill.start_time = e.start_time;
      this.wayBill.end_time = e.end_time;
      this.wayBill.productname = e.productname;
      this.wayBill.productweight = e.productweight;
      this.wayBill.productvolume = e.productvolume;
      this.wayBill.productnubmer = e.productnubmer;
      this.wayBill.containerweight = e.containerweight;
      this.wayBill.draw_container_addr = e.draw_container_addr;
      this.wayBill.return_container_addr = e.return_container_addr;
      this.wayBill.port_container_time = e.port_container_time;
      this.wayBill.ship_container_time = e.ship_container_time;
      this.wayBill.draw_container_time = e.draw_container_time;
      this.wayBill.return_container_time = e.return_container_time;
      this.wayBill.remark = e.remark;
      this.wayBill.contact = e.contact;
      this.wayBill.iphone = e.iphone;
      this.wayBill.iphone_res = e.iphone_res;
      this.wayBill.contact_res = e.contact_res;
      this.wayBill.handle_remark = e.handle_remark;
      this.wayBill.handle_point = e.handle_point.join(',');
      this.wayBill.receive_goods_state = e.receive_goods_state;
      this.wayBill.good_pallet_code = e.good_pallet_code;
    },
    cancel() {
      /*this.$Message.info('点击了取消');*/
      this.rejectReasonModal = false;
    },
    /*分页点击事件*/
    pageSearch(e) {
      this.pageInfo.page = e;
      this.getTable({
        "pageInfo": this.pageInfo,
        "loginName": this.loginName
      });
    },
    /*table选择后触发事件*/
    change(e) {
      /*if(e.length==1){
          this.userModifySet(e['0']);
      }*/
      this.setGroupId(e);
    },
    /*通过选中的行设置groupId的值*/
    setGroupId(e) {
      this.groupId = [];
      this.count = e.length;
      for (var i = 0; i <= e.length - 1; i++) {
        this.groupId.push(e[i].id);
      }
    },
    confirmAcceptOrder() {
      if (this.groupId != null && this.groupId != "") {
        this.axios({
          method: 'post',
          url: '/api/BillService/confirmAcceptOrder.do',
          data: this.groupId
        }).then(function(response) {
          this.groupId = null;
          this.count = 0;
          if (response.data.resultCode == 200) {
            this.getTable({
              "pageInfo": this.pageInfo,
              "loginName": this.loginName
            });
            this.$Message.info('接单成功');
          } else {
            //iView.Message.error('添加失败');
            this.$Message.error(response.data.resultMsg);
          }
        }.bind(this)).catch(function(error) {
          this.$Message.error('接单失败');
        });
      } else {
        this.$Message.warning('请至少选择一项');
      }
    },

    lookRejectReason(e) {
      this.axios({
        method: 'get',
        url: '/api/BillService/queryBillRejectReason.do',
        params: {
          'orderId': e.id,
          'tacheCode': e.disRejectTache
        }
      }).then((response) => {
        this.rejectdata = response.data.extend.rejectReasonList;
        this.rejectReasonModal = true;
      }).catch((error) => {
        this.$Message.error(error);
      });

    },
    del() {
      if (this.groupId != null && this.groupId != "") {
        this.axios({
          method: 'post',
          url: '/api/BillService/deleteOrder.do',
          data: this.groupId
        }).then(function(response) {
          this.groupId = null;
          this.count = 0;
          if (response.data.resultCode == 200) {
            this.getTable({
              "pageInfo": this.pageInfo,
              "loginName": this.loginName
            });
            this.$Message.info('作废成功');
          } else {
            this.$Message.error(response.data.resultMsg);
          }
        }.bind(this)).catch(function(error) {
          this.$Message.error('作废失败');
        });
      } else {
        this.$Message.warning('请至少选择一项作废');
      }
    }
  }
}

</script>
