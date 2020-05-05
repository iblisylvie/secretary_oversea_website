<template>
  <section class="container-wrap">
    <div class="top">
      <div class="aside-logo">
        <svg-icon icon-class="logo" class-name="aside-logo-shape" />
      </div>
      <div>{{ 'Call History' }}</div>
      <div class="breadcrumb">
        <svg-icon
          icon-class="breadcrumb"
          class-name="breadcrumb-shape"
        ></svg-icon>
      </div>
    </div>
    <b-sidebar :fullheight="true" open class="aside">
      <div class="aside">
        <div>
          <div class="aside-logo">
            <svg-icon icon-class="logo" class-name="aside-logo-shape" />
          </div>
          <nuxt-link
            v-for="(menu, index) in asideMenu"
            :key="index"
            :to="menu.path"
            :class="{ active: menu.path === $route.path }"
            class="aside-menu-item"
          >
            <svg-icon
              :icon-class="menu.mapToAsideMenu.icon"
              class-name="aside-menu-icon"
            ></svg-icon>
            <span>{{ menu.mapToAsideMenu.name }}</span>
          </nuxt-link>
        </div>
        <div
          class="aside-account"
          :class="{ active: asideAccountActive }"
          @mouseenter="asideAccountActive = true"
          @mouseleave="asideAccountActive = false"
        >
          <div class="aside-account-popup">
            <div class="aside-account-user">
              <avatar :src="userInfo.head_image_url" />
              <!-- <img
                class="aside-account-avatar"
                :src="userInfo.head_image_url"
                :onerror="defaultImg"
                alt="avatar"
              /> -->
              <span class="aside-account-user-name">{{
                userInfo.nickname
              }}</span>
            </div>
            <div class="aside-account-menu">
              <nuxt-link to="/account-setting" class="aside-account-menu-item">
                <svg-icon
                  icon-class="aside-acc-setting"
                  class-name="aside-account-menu-icon"
                ></svg-icon>
                <span class="aside-account-menu-name">Account Setting</span>
              </nuxt-link>
              <div
                class="aside-account-menu-item"
                @click="$store.dispatch('auth/LOGOUT')"
              >
                <svg-icon
                  icon-class="power-off"
                  class-name="aside-account-menu-icon"
                ></svg-icon>
                <span class="aside-account-menu-name">Log Out</span>
              </div>
            </div>
          </div>
          <div class="aside-account-plate">
            <div class="aside-account-user" v-show="!asideAccountActive">
              <avatar :src="userInfo.head_image_url" />
              <!-- <img
                class="aside-account-avatar"
                :src="userInfo.head_image_url"
                :onerror="defaultImg"
                alt="avatar"
              /> -->
              <span class="aside-account-user-name">{{
                userInfo.nickname
              }}</span>
            </div>
            <svg-icon icon-class="fold" class-name="aside-account-folder">
            </svg-icon>
          </div>
        </div>
      </div>
    </b-sidebar>
    <main class="main-content">
      <nuxt />
    </main>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { get, pick } from 'lodash-es'

export default {
  name: '',
  directives: {},
  components: {},
  filters: {},
  props: {},
  data: () => ({
    asideAccountActive: false,
    defaultImg:
      'this.src="' + require('~/assets/icons/svg/default-avatar.svg') + '"'
  }),
  computed: {
    ...mapState({
      // arrow functions can make the code very succinct!
      asideMenu: (state) => {
        const availableRoutes = state.auth.availableRoutes
        return availableRoutes
          .filter((menu) => menu.mapToAsideMenu)
          .sort(
            // ascending order
            (prevMenu, nextMenu) =>
              get(prevMenu, 'mapToAsideMenu.order') -
              get(nextMenu, 'meta.mapToAsideMenu.order')
          )
      },
      userInfo: (state) => pick(state.auth, ['nickname', 'head_image_url'])
    })
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
  middleware: 'auth'
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.top {
  display: none;
}
.aside {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
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
  &-menu {
    &-item {
      display: flex;
      align-items: center;
      padding: 16px 32px 16px;
      font-weight: bold;
      font-size: 14px;
      color: #717d8b;
      &.active {
        border-radius: 8px;
        background: $aside-menu-active-background;

        & span {
          @include gradient-text;
        }
      }
    }
    &-icon {
      margin-right: 16px;
      font-size: 22px;
    }
  }
  &-account {
    padding: 16px 24px;
    border-radius: 8px;
    background: #f3f6f8;
    &.active {
      background: #fff;
      & > .aside-account-plate {
        justify-content: flex-end;
        & > .aside-account-user {
          display: none;
        }
        & > .aside-account-folder {
          transform: rotate(180deg);
        }
      }
      & > .aside-account-popup {
        display: block;
      }
    }
    &-plate {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-user {
      display: flex;
      align-items: center;
      &-avatar {
        margin-right: 16px;
        width: 32px;
        height: 32px;
        border: 2px solid #fff;
        border-radius: 100%;
      }
      &-name {
        color: #59687a;
        font-size: 14px;
        font-weight: bold;
      }
    }
    &-folder {
      width: 12px;
    }
    &-popup {
      display: none;
    }
    &-menu {
      margin: 40px 0;
      &-item {
        margin-bottom: 32px;
        display: block;
        cursor: pointer;
      }
      &-icon {
        width: 14px;
        margin-right: 22px;
      }
      &-name {
        color: #717d8b;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
.main-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding-left: $sidebar-width;
  background: $main-panel-background;
}

@include mobile {
  .container-wrap {
    padding: 12px;
    background: $main-panel-background;
  }
  .aside-logo {
    margin: 0;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include primary-text($font-size: 18px);
  }
  .aside {
    display: none;
  }
  .main-content {
    position: relative;
    padding: 0;
  }
  .breadcrumb-shape {
    font-size: 22px;
  }
}
</style>
