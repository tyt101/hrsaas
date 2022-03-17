<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{disabled: fileComputed }"
      :on-remove="removeImg"
      :on-change="changImg"
      :before-upload="beforeupload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="percent" style="width:180px" :percentage="percent" :format="format(percentage)" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDwgANJyNVMvEH3YmkQqypPijUx94i5B0Y',
  SecretKey: 'JL6anjOlrhGYYInHUUDfqkOkpdAPO6Yj'
})
export default {
    data() {
        return {
            percent: 0,
            currentFileUid: null,
            showDialog: false,
            imgUrl: '',
            fileList: []
        }
    },
    computed: {
        fileComputed() {
            return this.fileList.length === 1
        }
    },
    methods: {
        preview(file) {
            this.imgUrl = file.url
            this.showDialog = true
        },
        removeImg(file) {
          this.fileList = this.fileList.filter(img => img.uid !== file.uid)
        },
        changImg(file, fileList) {
          this.fileList = fileList.map(Item => Item)
        },
        beforeupload(file, fileList) {
          const type = ['image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/png']
          const maxSize = 5 * 1024 * 1024
          if (!type.some(item => item === file.type)) {
            this.$message.warning('文件格式不正确')
            return false
          }
          if (file.size > maxSize) {
            this.$message.warning('图片过大,请上传小于5M的图片')
            return false
          }
          this.currentFileUid = file.uid
          return true
        },
        upload(params) {
          if (params.file) {
            cos.putObject({
              Bucket: 'yaya-1306912847',
              Region: 'ap-chengdu',
              Key: params.file.name,
              Body: params.file,
              StorageClass: 'STANDARD',
              onProgress: (params) => {
                this.percent = params.percent * 100
              }
            }, (err, data) => {
              if (!err && data.statusCode === 200) {
                this.fileList = this.fileList.map(item => {
                  if (item.uid === this.currentFileUid) {
                    return { url: 'http://' + data.Location, upload: true }
                  }
                  return item
                })
                setTimeout(() => {
                  this.$message.success('上传成功')
                  this.percent = 0
                }, 1000)
              }
            })
          }
        },
        format(percentage) {
          return percentage === 100 ? '满' : `${percentage}%`
        }
    }
}
</script>

<style>
    .disabled .el-upload--picture-card{
        display: none;
    }
</style>