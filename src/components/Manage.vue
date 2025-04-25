<script setup>
const name = ref('product')
const skuList = ref([])

function getSku() {
    axios.get('http://localhost:8080/sku')
        .then(res => {
            skuList.value = res.data
            name.value = res.data[0].product
        })
}
getSku()

function submit() {
    axios.post('http://localhost:8080/manage', skuList.value)
        .then(res => {
            alert(res.data === true ? 'Success!' : 'Failed!')
            getSku()
        })
}
</script>



<template>
    <table>
        <tr>
            <th>AVATAR</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>STOCK</th>
        </tr>

        <tr class="sku" v-for="sku in skuList" :key="sku">
            <td><img class="avatar" :src="sku.avatar || '/'"></td>
            <td><b class="name">{{ sku.name }}</b></td>
            <td><input @change="" v-model="sku.price"></td>
            <td><input v-model="sku.stock"></td>
        </tr>
    </table>
</template>



<style></style>