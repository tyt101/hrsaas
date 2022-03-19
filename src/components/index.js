import pagetools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
// import ScreenFull from './ScreenFull'
import SvgIcon from './SvgIcon'
export default {
    install(vue) {
        vue.component('pagetool', pagetools)
        vue.component('UploadExcel', UploadExcel)
        vue.component('ImageUpload', ImageUpload)
            // vue.component('ScreenFull', ScreenFull)
        vue.component('SvgIcon', SvgIcon)
    }
}