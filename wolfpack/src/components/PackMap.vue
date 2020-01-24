<template>
	<div id="myMap">
		<div id="map" ref="map">
			<map-marker v-for="pack in allPacks" :key="pack.id" :lat="pack.lat" :lng="pack.lng" :name="pack.name"></map-marker>
		</div>
	</div>
</template>

<script>
import MapMarker from "./MapMarker"
import {
    mapGetters,
    mapActions
} from "vuex";

export default {
    components: {
        MapMarker
    },
    data: () => ({
        map: null
    }),
    methods: {
        ...mapActions(['fetchPacks']),
        getMap(callback) {
            let vm = this

            function checkForMap() {
                if (vm.map) callback(vm.map)
                else setTimeout(checkForMap, 200)
            }
            checkForMap()
        }
    },
    computed: {
        ...mapGetters(['allPacks']),
        packs() {
            return localStorage.getItem(localStorage.packsObj);
        }
    },
    created() {
        this.fetchPacks();
    },
    mounted() {
        localStorage.setItem('packsObj', JSON.stringify(this.packs));
        this.map = new window.google.maps.Map(this.$refs["map"], {
            center: {
                lat: 52,
                lng: 5
            },
            zoom: 7
        })
    }
}
</script>

<style scoped>
	#map {
		height: 600px;
		background: gray;
	}
</style>