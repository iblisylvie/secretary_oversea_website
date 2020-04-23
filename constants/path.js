import path from 'path'

const PROJECT_ROOT = path.dirname(path.resolve(__dirname))
const SVG_DIR_FOR_SPRITE_LOADER = path.join(PROJECT_ROOT, 'assets/icons/svg')

export { PROJECT_ROOT, SVG_DIR_FOR_SPRITE_LOADER }
