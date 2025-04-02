<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { name: 'Apple Americano', stock: 99, number: 0, price: 16, image: '/image/AppleAmericano.png' },
  { name: 'Lemon Sparkling water', stock: 5, number: 0, price: 12, image: '/image/LemonSparklingWater.png' },
  { name: 'Strawberry Matcha Latte', stock: 18, number: 0, price: 13, image: '/image/StrawberryMatchaLatte.png' },
  { name: 'Peach Blossom Latte', stock: 60, number: 0, price: 16, image: '/image/PeachBlossomLatte.png' },
  { name: 'Grapefruit Sparkling Americano', stock: 27, number: 0, price: 14, image: '/image/GrapefruitSparklingAmericano.png' }
])
const afterSubmit = ref(false)

const totalPayment = computed(() => {
  return products.value.reduce((sum, product) => {
    return sum + (product.number * product.price)
  }, 0)
})

function add(index) {
  if (products.value[index].stock > 0) {
    products.value[index].number++
    products.value[index].stock--
  }
}

function minus(index) {
  if (products.value[index].number > 0) {
    products.value[index].number--
    products.value[index].stock++
  }
}

function submit() {
  products.value.forEach(product => {
    product.number = 0
  })
  afterSubmit.value = true
}
</script>

<template>
  <h1>Order your coffee here ～</h1>

  <div class="products-container">
    <div v-for="(product, index) in products" :key="index" class="product-card">
      <img class="image" :src="product.image" :alt="product.name">
      <div class="product-info">
        <div class="product-name">
          {{ product.name }}
        </div>
        <div class="product-price">￥{{ product.price }}/cup</div>
      </div>
      <div class="stockLeft">{{ product.stock }} cups left</div>
      <div class="order-controls">
        <button @click="minus(index)" :disabled="product.number === 0">－</button>
        <span>{{ product.number }}</span>
        <button @click="add(index)" :disabled="product.stock === 0">＋</button>
      </div>
    </div>
  </div>

  <div class="checkout-section">
    <div class="sum">
      <div>Total bill: ￥{{ totalPayment }}</div>
    </div>

    <button class="submit-btn" @click="submit">Purchase</button>
    <div class="afterSubmit" v-if="afterSubmit">
      <button>You have successfully purchased your coffee!</button>
    </div>
  </div>
</template>

<style scoped>
.products-container {
  margin-bottom: 30px;
}

.product-card {
  width: 48%;
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 15px;
  margin-bottom: 15px;
  border: 2px solid rgb(225, 194, 255);
  border-radius: 12px;
  background-color: white;
  position: relative;
}

.product-card::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid rgb(225, 194, 255);
  border-radius: 12px;
  z-index: -1;
}

.image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.product-info {
  flex: 2;
  font-size: 20px;
}

.product-name {
  font-size: 25px;
  font-weight: bold;
  border-top: 0;
  color: rgb(84, 9, 176);
}

.product-price {
  border-top: 30px;
}

.order-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stockLeft {
  display: flex;
  align-items: last baseline;
  justify-content: center;
}

.order-controls button {
  width: 25px;
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

.order-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.checkout-section {
  margin-bottom: 10%; 
}

.sum {
  margin: 10px;
  font-size: 1.2em;
  font-weight: bold;
}

.submit-btn {
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

.submit-btn:hover {
  background-color: rgb(225, 194, 255);
}

.afterSubmit {
  margin-top: 0; 
  font-size: 16px;
}

.afterSubmit button {
  background-color: rgb(221, 255, 224);
}
</style>