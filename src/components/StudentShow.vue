<template>
  <template v-if="!isEdit">
    <router-link :to="'/student-info'+item._id">
      <td>{{item.name}}</td>
    </router-link>
  </template>
</template>

<script>

</script>