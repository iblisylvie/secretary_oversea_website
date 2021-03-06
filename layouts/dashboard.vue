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
        <div @click="asideExpanded = false">
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
            <span class="text">{{ menu.mapToAsideMenu.name }}</span>
            <span
              v-if="menu.meta.beta"
              :style="{
                fontSize: '12px',
                color: 'rgb(2, 174, 252)',
                position: 'absolute',
                right: '20px',
                top: '4px'
              }"
              >beta</span
            >
          </nuxt-link>
        </div>
      </div>
      <!-- Account  -->
      <div
        v-click-outside="onClickAccountOutSide"
        class="account"
        :class="{ expand: accountExpanded }"
        @click="() => (accountExpanded = !accountExpanded)"
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
import { get, pick, remove } from 'lodash-es'

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
    ...mapGetters('relation', ['skipGetStarted']),
    ...mapState({
      userInfo: (state) => pick(state.account, ['nickname', 'head_image_url']),
      activated: (state) => get(state, 'relation.relation.activated')
    }),
    asideMenu() {
      const asideMenu = [
        {
          path: '/get-started',
          name: 'GetStarted',
          meta: {
            title: 'Get Started' // Document title
          },
          mapToAsideMenu: {
            order: 1,
            name: 'Get Started',
            icon: 'aside-logo'
          }
        },
        {
          path: '/call-history',
          name: 'CallHistory',
          meta: {
            title: 'Call History' // Document title
          },
          mapToAsideMenu: {
            order: 2,
            name: 'Call History',
            icon: 'phone'
          }
        },
        {
          path: '/customization',
          name: 'Customization',
          meta: {
            title: 'Customization', // Document title
            beta: true
          },
          mapToAsideMenu: {
            order: 3,
            name: 'Customization',
            icon: 'customization'
          }
        },
        {
          path: '/premium',
          name: 'Premium',
          meta: {
            title: 'Premium' // Document title
          },
          mapToAsideMenu: {
            order: 4,
            name: 'Premium',
            icon: 'premium'
          }
        },
        {
          path: '/support',
          name: 'Support',
          meta: {
            title: 'Support' // Document title
          },
          mapToAsideMenu: {
            order: 5,
            name: 'Support',
            icon: 'support'
          }
        },
        {
          path: '/feedback',
          name: 'Feedback',
          meta: {
            title: 'Feedback' // Document title
          },
          mapToAsideMenu: {
            order: 6,
            name: 'Feedback',
            icon: 'feedback'
          }
        }
      ]
      if (this.skipGetStarted) {
        remove(asideMenu, (item) => item.path === '/get-started')
      }
      return asideMenu
        .filter((menu) => menu.mapToAsideMenu)
        .sort(
          // ascending order
          (prevMenu, nextMenu) =>
            get(prevMenu, 'mapToAsideMenu.order') -
            get(nextMenu, 'meta.mapToAsideMenu.order')
        )
    },
    pageTitle() {
      const currentRoute = this.$route.path
      return get(
        this.asideMenu.find((route) => route.path === currentRoute),
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
  middleware: ['auth']
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
    position: relative;
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
      span.text {
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
    background: $white;
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
      margin-bottom: 6px;
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
      z-index: 3;
    }
  }
  .aside .account.expand .option.plain {
    margin-bottom: 12px;
  }
  .aside .account.expand .option {
    margin-bottom: 8px;
  }
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 3;
    background: $model-color;
  }
  .main {
    position: relative;
    padding: 0 0 24px 0;
  }
}
</style>
