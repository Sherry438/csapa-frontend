<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Create a responsive data, when data changes, the HTML will automatically change
const text = ref('')
const router = useRouter()
const username = ref('')
const password = ref('')

// Send request to server to get data
function login() {
    axios.post("http://localhost:8080/login", {
        "username": username.value,
        "password": password.value
    })
        .then(res => {
            if (res.data === 'user') {
                router.push('/order')
            } else if (res.data === 'seller') {
                router.push('/manage')
            } else {
                alert('Login failed: ' + res.data)
            }
        })
}
</script>

<template>
    <div class="outline">
        <div class="card">
            <div>
                <label for="username">Username </label>
                <input id="username" type="text" placeholder="Enter your username" v-model="username">
            </div>

            <div class="password-field">
                <label for="password">Password </label>
                <input id="password" type="password" placeholder="Enter your password" v-model="password">
            </div>
            <div>
                <button class="submit" @click="login">LOGIN</button>
            </div>
        </div>
    </div>
</template>

<style>

.password-field {
    margin-top: 15px; 
}

label {
    font-size: 24px;

}

.submit {
    margin-top: 50px;
    font-size: 24px;
    width: 300px;
    height: 50px;
    background-color: rgb(225, 194, 255);
    border-radius: 8px;
}

.card {
    background-color: white;
    border: 3px solid rgb(58, 0, 128);
    border-style: dotted;
    border-width: 3px;
    padding: 30px;
    border-radius: 15px;
}

.outline {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(210, 221, 255);
}
</style>