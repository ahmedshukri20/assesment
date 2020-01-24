<script>
// component print markers
// recieves name, latitude and longitude properties
// On hover Markers shows name of the pack
	export default {
		props: {
			lat: { type: Number, required: true },
			lng: { type: Number, required: true },
			name: { type: String, required: true },
		},
		data: () => ({
			marker: null
		}),

		mounted() {
			this.$parent.getMap(map => {
				this.marker = new window.google.maps.Marker({
					position: { lat: this.lat, lng: this.lng },
					map: map,
					title: this.name
				})
			})
		}
	}
</script>