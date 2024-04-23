<script lang="ts">
	export let date: Date;
</script>

<time datetime={date.toISOString()}>
	{date.toLocaleString('en-us', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	})}
</time>
