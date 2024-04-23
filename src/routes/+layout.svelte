<script>
	import '../app.pcss';
	import SiteHeader from '$lib/components/site/SiteHeader.svelte';

	export let data;
</script>

<SiteHeader isAuthenticated={data.isAuthenticated} />
<slot />
