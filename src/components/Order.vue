<script setup>
import axios from 'axios'
import { ref } from 'vue'

const name = ref('product')
const skuList = ref([])
const order = ref({})

function getSku() {
  order.value = {}
  axios.get('http://localhost:8080/sku')
    .then(res => {
      console.log(res.data)
      skuList.value = res.data
      name.value = res.data[0].product
    })
}
getSku()

function add(sku) {
  if (sku.stock === 0) {
    return
  }
  if (order.value[sku.id] === undefined) {
    order.value[sku.id] = 0
  }
  order.value[sku.id] = (order.value[sku.id] || 0) + 1
  sku.stock--
}

function minus(sku) {
  if (order.value[sku.id] === 0 || order.value[sku.id] === undefined) {
    return
  }
  if (order.value[sku.id] === 1) {
    delete order.value[sku.id]
  }
  order.value[sku.id] = order.value[sku.id] - 1
  sku.stock++
}

function submit() {
  if (Object.keys(order.value).length === 0) {
    return alert('No Product Selected!')
  }
  axios.post(`http://localhost:8080/order/${localStorage.getItem('uid')}`, order.value)
    .then(res => {
      alert(res.data === true ? 'Success!' : 'Failed!')
      getSku()
    })
}
</script>


<template>
  <h1>Order your coffee here ～</h1>
  <div class="products-container">

    <div class="sku" v-for="sku in skuList" :key="sku">
      <div class="product-card">
        <img class="image" :src="sku.avatar || '/'">
        <b class="name">{{ sku.name }}</b>
        <div class="price">￥{{ sku.price }}</div>
        <div class="stock">{{ sku.stock }} left</div>
        <div class="order">
          <div class="set" @click="minus(sku)">－</div>
          <span>{{ order[sku.id] || 0 }}</span>
          <div class="set" @click="add(sku)">＋</div>
        </div>
      </div>
    </div>
  </div>
  <button class="submit" @click="submit">Purchase</button>
</template>

<style>
.image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.name {
  font-size: 25px;
  font-weight: bold;
  border-top: 0;
  color: rgb(84, 9, 176);
}

.price {
  border-top: 30px;
}

.submit {
  margin-top: 5px;
  margin-left: 3px;
  padding: 8px 16px;
  background-color: rgb(84, 9, 176);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 180px;
  height: 40px;
  font-size: 20px;
  margin-bottom: 0;
}

.products-container {
  margin-bottom: 30px;
}

.product-card {
  width: 50%;
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid rgb(225, 194, 255);
  border-radius: 12px;
  background-color: white;
  position: relative;
}


.order {
  width: 65px;
  height: 25px;
  border: none;
  border-radius: 10%;
  background-color: rgb(225, 194, 255);
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>