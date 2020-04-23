import SvgIcon from './SvgIcon'

SvgIcon.install = function(Vue) {
  Vue.component(SvgIcon.name, SvgIcon)
}

const req = require.context(`~/assets/icons/svg`, false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)

export default SvgIcon
