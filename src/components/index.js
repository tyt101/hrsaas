import pagetools from './PageTools'
import UploadExcel from './UploadExcel'
export default {
    install(vue) {
        vue.component('pagetool', pagetools)
        vue.component('UploadExcel', UploadExcel)
    }
}