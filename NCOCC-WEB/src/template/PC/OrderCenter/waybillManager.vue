<template>
	<div style="margin: 20px;">
        <div>
            <Row style="margin-bottom: 25px;">
                <Col span="8">运单号：
                	<Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
                </Col>
                <Col span="6">船期：
                    <Select v-model="userRole" filterable clearable style="width: 100px">
                        <Option v-for="item in allRoleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col span="6">船公司：
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
                    	<Table border :columns="waybillcol" :data="waybilldata" :height="400" @on-selection-change="s=>{change(s)}" @on-row-dblclick="s=>{dblclick(s)}"></Table>
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
                pageInfo:{
                	page:1,
                	pageSize:10
                },
                waybillcol:[
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '船期',
                        key: 'schedule'
                    },
                    {
                        title: '船名/船次',
                        key: 'shipname'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '客户简称',
                        key: 'customeralias'
                    },
                    {
                        title: '船公司',
                        key: 'shipcop'
                    },
                    {
                        title: '箱型',
                        key: 'boxtype'
                    },
                    {
                        title: '箱号',
                        key: 'boxnum'
                    },
                    {
                        title: '门点',
                        key: 'addr'
                    },
                    {
                        title: '联系人',
                        key: 'contact'
                    },
                    {
                        title: '联系电话',
                        key: 'contactphone'
                    }
                ],
                waybilldata:[{}]
            }
        },
        mounted(){},
        methods:{}
    }
</script>