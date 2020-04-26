<template>
  <section>
    <b-sidebar :fullheight="true" open class="aside">
      <div class="aside">
        <div class="aside-logo">
          <svg-icon icon-class="logo" class-name="aside-logo-shape" />
        </div>
        <nuxt-link to="/about" class="aside-menu-item active"
          >Call History</nuxt-link
        >
        <nuxt-link class="aside-menu-item" to="/about">Call History</nuxt-link>
      </div>
    </b-sidebar>
    <main class="main-content">
      <nuxt />
    </main>
  </section>
</template>

<script>
export default {
  name: '',
  directives: {},
  components: {},
  filters: {},
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
  middleware: 'auth'
}
</script>

<style lang="scss" scoped>
.aside {
  height: 100%;
  padding: 20px 16px;
  background: $sidebar-background;
  &-logo {
    margin: 34px auto 50px;
    width: 56px;
    height: 56px;
    padding: 10px;
    background: #fff;
    border-radius: 14px;
    text-align: center;
    &-shape {
      font-size: 36px;
    }
  }
  &-menu-item {
    display: block;
    padding: 16px 32px 16px;
    font-weight: bold;
    font-size: 14px;
    color: #717d8b;
    &.active {
      border-radius: 8px;
      background: $aside-menu-active-background;
      color: #141b24;
    }
  }
}
.main-content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding-left: $sidebar-width;
  background: $main-panel-background;
}
</style>
