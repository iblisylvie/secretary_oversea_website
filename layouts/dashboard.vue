<template>
  <section class="wrap">
    <!-- Mobile top bar  -->
    <div class="top-bar">
      <svg-icon icon-class="logo" class-name="logo" />
      <span>{{ pageTitle }}</span>
      <div @click="asideExpanded = true">
        <svg-icon icon-class="breadcrumb" class-name="breadcrumb" />
      </div>
    </div>

    <!-- Aside bar  -->
    <!-- Modal under mobile  -->
    <div v-if="asideExpanded" class="mask" @click="asideExpanded = false"></div>
    <aside class="aside" :class="{ expand: asideExpanded }">
      <div>
        <svg-icon icon-class="logo" class-name="logo" />
        <div @click="asideExpanded = false">
          <svg-icon icon-class="close" class-name="close" />
        </div>

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
        v-click-outside="onClickAccountOutSide"
        class="account"
        :class="{ expand: accountExpanded }"
        @click="() => (accountExpanded = true)"
      >
        <div class="options">
          <div class="option plain">
            <avatar :src="userInfo.head_image_url" class="avatar" />
            <span>{{ userInfo.nickname }}</span>
          </div>
          <div
            v-show="accountExpanded"
            class="option"
            @click.stop="onClickAccountSetting"
          >
            <svg-icon icon-class="aside-acc-setting" class-name="figure" />
            <span class="name">Account Setting</span>
          </div>
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
    <main class="main">
      <nuxt />
    </main>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
      userInfo: (state) => pick(state.auth, ['nickname', 'head_image_url']),
      activated: (state) => get(state, 'relation.relation.activated'),
      availableRoutes: (state) => get(state, 'auth.availableRoutes', []),
      asideMenu: (state) => {
        const availableRoutes = get(state, 'auth.availableRoutes', [])
        return availableRoutes
          .filter((menu) => menu.mapToAsideMenu)
          .sort(
            // ascending order
            (prevMenu, nextMenu) =>
              get(prevMenu, 'mapToAsideMenu.order') -
              get(nextMenu, 'meta.mapToAsideMenu.order')
          )
      }
    }),
    ...mapGetters('relation', ['skipGetStarted']),
    pageTitle() {
      const currentRoute = this.$route.path
      return get(
        this.availableRoutes.find((route) => route.path === currentRoute),
        'meta.title',
        ''
      )
    },
    menuDisabled() {
      const skipGetStarted = this.skipGetStarted
      return (route) => {
        if (
          !skipGetStarted &&
          ['/call-history', '/customization'].includes(route)
        ) {
          return true
        }
        return false
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickAccountOutSide() {
      this.accountExpanded = false
    },
    onClickAccountSetting() {
      this.accountExpanded = false
      this.$router.push({
        name: 'account-setting'
      })
    }
  },
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
  .close {
    display: none;
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

.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding-left: 257px;
  background: $main-panel-background;
  overflow: auto;
}

// Mobile layout
@include mobile {
  .wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    @include secondary-text($font-size: 18px);
    .breadcrumb {
      font-size: 22px;
    }
  }
  .aside {
    display: none;
    .logo {
      display: none;
    }
    .close {
      margin-bottom: 38px;
      display: flex;
      justify-content: flex-end;
      font-size: 20px;
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
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
    background: $model-color;
  }
  .main {
    position: relative;
    padding: 0 0 24px 0;
  }
}
</style>
