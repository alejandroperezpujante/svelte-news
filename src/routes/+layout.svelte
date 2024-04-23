<script>
	import '../app.pcss';

	import SiteHeader from '$lib/components/site/SiteHeader.svelte';
	import SiteFooter from '$lib/components/site/SiteFooter.svelte';

	export let data;
</script>

<SiteHeader isAuthenticated={data.isAuthenticated} />
<slot />
<SiteFooter />
