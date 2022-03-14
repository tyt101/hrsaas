<template>
  <upload-excel :on-success="success" />
</template>

<script>
export default {
    methods: {
        async success({ header, results }) {
            console.log(header)
            console.log(results)
        }
    }
}
</script>

<style>

</style>