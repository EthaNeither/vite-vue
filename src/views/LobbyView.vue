<template>
    <nav>
        <router-link :to="{ name: 'classroom' }">Classroom</router-link> |
        <router-link :to="{ name: 'restaurant' }">Restaurant</router-link> |
        <router-link :to="{ name: 'MRT' }">MRT</router-link> |
        <router-link :to="{ name: 'supermarket' }">Supermarket</router-link>
    </nav>
</template>

<script>
export default{
}
</script>

<style>
nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    padding: 10px;
    border-radius: 4px;
}

nav a.router-link-exact-active {
    color: white;
    background: crimson;
}
</style>