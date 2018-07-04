<template>
  <el-menu mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">
      <nuxt-link to="/">Home</nuxt-link>
    </el-menu-item>
    <el-menu-item index="2">
      <nuxt-link to="/login">Login</nuxt-link>
    </el-menu-item>
    <el-menu-item index="3">
      <nuxt-link to="/register">Register</nuxt-link>
    </el-menu-item>
  </el-menu>
</template>
