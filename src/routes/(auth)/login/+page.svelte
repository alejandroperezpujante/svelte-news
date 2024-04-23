<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Github } from 'lucide-svelte';

	import { loginSchema } from './loginSchema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data;

	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance } = form;
</script>

<main class="flex-1 content-center">
	<Card.Root class="max-w-sm mx-auto">
		<Card.Header>
			<Card.Title tag="h1" class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your credentials to access your profile</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="post" use:enhance>
				<Form.Field {form} name="identifier">
					<Form.Control let:attrs>
						<Form.Label>Identifier</Form.Label>
						<Input {...attrs} bind:value={$formData.identifier} />
						<Form.Description>Enter your username or email</Form.Description>
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input
							type="password"
							{...attrs}
							bind:value={$formData.password}
							autocomplete="currentPassword"
						/>
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Button class="w-full mt-4">Enter</Form.Button>
			</form>
		</Card.Content>

		<Card.Footer class="grid gap-2">
			<Button href="/login/github" variant="outline" class="w-full gap-2">
				<span>Login with GitHub</span>
				<Github />
			</Button>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="##" class="underline">Sign up</a>
			</div>
		</Card.Footer>
	</Card.Root>
</main>
