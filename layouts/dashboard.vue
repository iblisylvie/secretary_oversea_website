<template>
  <section class="wrap">
    <!-- Mobile top bar  -->
    <div class="top-bar">
      <svg-icon icon-class="logo" class-name="logo" />
      <span>{{ 'xxxxxxx' }}</span>
      <div @click="asideExpanded = true">
        <svg-icon icon-class="breadcrumb" class-name="breadcrumb" />
      </div>
    </div>
    <!-- Aside bar  -->
    <aside class="aside" :class="{ expand: asideExpanded }">
      <div>
        <svg-icon icon-class="logo" class-name="logo" />
        <nuxt-link
          v-for="(menu, index) in asideMenu"
          :key="index"
          :to="menu.path"
          :class="{
            active: menu.path === $route.path,
            disabled: menuDisabled(menu.path)
          }"
          class="menu-item"
        >
          <svg-icon
            :icon-class="menu.mapToAsideMenu.icon"
            class-name="figure"
          ></svg-icon>
          <span>{{ menu.mapToAsideMenu.name }}</span>
        </nuxt-link>
      </div>
      <!-- Account  -->
      <div
        class="account"
        :class="{ expand: accountExpanded }"
        @mouseenter="accountExpanded = true"
        @mouseleave="accountExpanded = false"
      >
        <div class="options">
          <div class="option plain">
            <avatar :src="userInfo.head_image_url" class="avatar" />
            <span>{{ userInfo.nickname }}</span>
          </div>
          <nuxt-link
            v-show="accountExpanded"
            to="/account-setting"
            class="option"
          >
            <svg-icon icon-class="aside-acc-setting" class-name="figure" />
            <span class="name">Account Setting</span>
          </nuxt-link>
          <div
            v-show="accountExpanded"
            class="option"
            @click="$store.dispatch('auth/LOGOUT')"
          >
            <svg-icon icon-class="power-off" class-name="figure" />
            <span class="name">Log Out</span>
          </div>
        </div>
        <svg-icon icon-class="fold" class-name="folder" />
      </div>
    </aside>
    <main class="main-content">
      <nuxt />
    </main>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { get, pick } from 'lodash-es'

export default {
  name: 'Dashboard',
  directives: {},
  components: {},
  filters: {},
  props: {},
  data: () => ({
    accountExpanded: false,
    asideExpanded: false
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
      userInfo: (state) => pick(state.auth, ['nickname', 'head_image_url']),
      activated: (state) => get(state, 'relation.activated')
    }),
    menuDisabled() {
      const activated = this.activated
      return (route) => {
        if (!activated && ['/call-history', '/customization'].includes(route)) {
          return true
        }
        return false
      }
    }
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
.wrap {
  background: $main-panel-background;
}
.top-bar {
  display: none;
}
.logo {
  display: flex;
  align-items: center;
  width: 56px;
  height: 56px;
  padding: 10px;
  background: #fff;
  border-radius: 14px;
  text-align: center;
  font-size: 36px;
}
.aside {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 20px 16px;
  background: $sidebar-background;
  .logo {
    margin: 34px auto 50px;
    display: block;
  }
  .menu-item {
    display: flex;
    align-items: center;
    padding: 16px 32px;
    @include secondary-text;
    .figure {
      margin-right: 16px;
      font-size: 22px;
    }
    &.active {
      border-radius: 8px;
      background: $aside-menu-active-background;
      span {
        @include gradient-text;
      }
    }
    &.disabled {
      // cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
    }
  }
  .account {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-radius: 8px;
    background: #f3f6f8;
    .options {
      .option {
        display: flex;
        align-items: center;
        cursor: pointer;
        @include secondary-text($font-size: 14px);
        .avatar {
          margin-right: 12px;
        }
        .figure {
          margin-right: 12px;
          width: 32px;
          font-size: 14px;
        }
        .name {
          @include secondary-text($font-size: 14px);
        }
        &.plain {
          cursor: initial;
        }
      }
    }
    .folder {
      font-size: 12px;
    }
    &.expand {
      background: #fff;
      .folder {
        align-self: flex-end;
        transform: rotate(180deg);
      }
      .option {
        margin-bottom: 32px;
      }
      .option.plain {
        @include primary-text($font-size: 14px);
        margin-bottom: 44px;
      }
    }
  }
}

// Mobile layout
@include mobile {
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    @include primary-text($font-size: 18px);
    .breadcrumb {
      font-size: 22px;
    }
  }
  .aside {
    display: none;
    .logo {
      display: none;
    }
    &.expand {
      position: fixed;
      display: flex;
      top: 0;
      right: 0;
      bottom: 0;
      left: auto;
    }
  }
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
