<script>
	import ThemeSelect from '$lib/components/ThemeSelect.svelte';
	import { Button } from '../ui/button';
</script>

<footer class="px-4 py-2 grid grid-cols-3">
	<ThemeSelect />

	<p class="text-center text-muted-foreground">
		Made with ❤️ by <Button
			variant="link"
			class="p-0"
			href="https://github.com/alejandroperezpujante"
			target="_blank"
			rel="noopener noreferrer">Alejandro Pérez Pujante</Button
		>
	</p>

	<div></div>
</footer>
