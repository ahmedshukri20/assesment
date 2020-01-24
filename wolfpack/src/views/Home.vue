<template>
    <div>
        <AddWolf />
        <Wolves />
    </div>
</template>

<script>
import Wolves from '../components/Wolves'
import AddWolf from '../components/AddWolf'

export default {
    name: "Home",
    components: {
        Wolves,
        AddWolf
    }
}
</script>

<style>

</style>