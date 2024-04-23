<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Github } from 'lucide-svelte';

	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registerSchema } from './registerSchema.js';

	export let data;

	const form = superForm(data.form, {
		validators: zodClient(registerSchema)
	});
	const { form: formData, enhance } = form;
</script>

<main class="flex-1 content-center">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Sign Up</Card.Title>
			<Card.Description>Enter your information to create an account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="post" class="grid gap-4" use:enhance>
				<div class="grid grid-cols-2 gap-4">
					<Form.Field {form} name="username">
						<Form.Control let:attrs>
							<Form.Label>Username</Form.Label>
							<Input {...attrs} bind:value={$formData.username} autocomplete="username" />
						</Form.Control>
					</Form.Field>
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input type="email" {...attrs} bind:value={$formData.email} />
						</Form.Control>
					</Form.Field>
				</div>
				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input
							type="password"
							{...attrs}
							bind:value={$formData.password}
							autocomplete="new-password"
						/>
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="confirmPassword">
					<Form.Control let:attrs>
						<Form.Label>Confirm Password</Form.Label>
						<Input
							type="password"
							{...attrs}
							bind:value={$formData.confirmPassword}
							autocomplete="new-password"
						/>
					</Form.Control>
				</Form.Field>
				<Button type="submit" class="w-full">Create an account</Button>
				<Button href="/login/github" variant="outline" class="w-full gap-2">
					<span>Register with GitHub</span>
					<Github />
				</Button>
			</form>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/login" class="underline">Log In</a>
			</div>
		</Card.Content>
	</Card.Root>
</main>
