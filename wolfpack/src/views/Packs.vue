<template>
    <div>
        <AddPack />
        <WolfPack />
    </div>
</template>

<script>
import WolfPack from '../components/WolfPack'
import AddPack from '../components/AddPack'

export default {
    name: "Packs",
    components: {
        WolfPack,
        AddPack
    }
}
</script>

<style>

</style>