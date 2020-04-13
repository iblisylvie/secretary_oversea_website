<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="~assets/images/logo.svg" alt="TicMeet Brand Logo" />
          <span class="level is-size-4 m-l-10">TicMeet</span>
        </b-navbar-item>
      </template>
      <template slot="start"> </template>

      <template slot="end">
        <nuxt-link to="/profile">
          <figure class="image is-48x48">
            <img class="is-rounded" src="~assets/images/avatar.jpg" />
          </figure>
        </nuxt-link>

        <b-navbar-item tag="div">
          <div class="buttons">
            <nuxt-link to="/" class="button is-light">
              <strong>Log Out</strong>
            </nuxt-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>
