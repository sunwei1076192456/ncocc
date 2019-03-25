<template>
  <Card style="width:350px">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
          业务信息
    </p>
    <div>
      <Row style="margin-bottom: 25px;">
        <Col span="4">客户简称：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="4">船期：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="4">业务类型：
          <Select v-model="state" filterable clearable style="width: 100px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="4">船名：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
      </Row>
      <Row style="margin-bottom: 25px;">
        <Col span="4">航次：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="4">船公司：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="4">运单号：
          <Select v-model="state" filterable clearable style="width: 100px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="4">箱号：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
      </Row>
      <Row style="margin-bottom: 25px;">
        <Col span="4">封号：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="4">联系电话：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="4">柜型：
          <Select v-model="state" filterable clearable style="width: 100px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="4">送货地点：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
      </Row>
      <Row style="margin-bottom: 25px;">
        <Col span="4">收货单位：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="4">司机：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="4">送货日期：
          <Select v-model="state" filterable clearable style="width: 100px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="4">车牌号：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
      </Row>
      <Row style="margin-bottom: 25px;">
        <Col span="4">车队：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="4">派车司机：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="8">送货备注：
          <Select v-model="state" filterable clearable style="width: 100px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row style="margin-bottom: 25px;">
        <Col span="4">提箱地点：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="4">毛重：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="8">回单备注：
          <Select v-model="state" filterable clearable style="width: 100px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row style="margin-bottom: 25px;">
        <Col span="4">回空箱时间：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="4">门提空箱时间：
          <Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>
        </Col>
        <Col span="8">
        </Col>
      </Row>
    </div>     
  </Card>
</template>
<script>
export default {
  
}
</script>
