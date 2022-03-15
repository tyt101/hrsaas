<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            showDialog: false,
            imgUrl: '',
            fileList: [{ url: 'https://img2.baidu.com/it/u=1446103087,965574921&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=695' }]
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
        }
    }
}
</script>

<style>
    .disabled .el-upload--picture-card{
        display: none;
    }
</style>