import pagetools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
export default {
    install(vue) {
        vue.component('pagetool', pagetools)
        vue.component('UploadExcel', UploadExcel)
        vue.component('ImageUpload', ImageUpload)
    }
}