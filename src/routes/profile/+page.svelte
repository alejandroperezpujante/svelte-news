<script>
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateEmailSchema, updatePasswordSchema, updateUsernameSchema } from './updateSchemas';
	import { enhance } from '$app/forms';

	export let data;

	const emailForm = superForm(data.updateForms.email, {
		validators: zodClient(updateEmailSchema)
	});
	const { form: emailFormData, message: emailMessage, enhance: emailEnhance } = emailForm;

	const passwordForm = superForm(data.updateForms.password, {
		validators: zodClient(updatePasswordSchema)
	});
	const {
		form: passwordFormData,
		message: passwordMessage,
		enhance: passwordEnhance
	} = passwordForm;

	const usernameForm = superForm(data.updateForms.username, {
		validators: zodClient(updateUsernameSchema)
	});
	const {
		form: usernameFormData,
		message: usernameMessage,
		enhance: usernameEnhance
	} = usernameForm;
</script>

<main class="flex-1 container py-6 space-y-8">
	<hgroup class="space-y-2">
		<h1 class="text-3xl font-bold">Welcome to your profile {data.user?.username}</h1>
		<p class="text-sm text-muted-foreground">
			This is your profile page. You can edit your profile information here.
		</p>
	</hgroup>

	<!-- Update info card -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Profile Information</Card.Title>
			<Card.Description>Update your profile information</Card.Description>
		</Card.Header>

		<Card.Content>
			<form method="post" action="?/update:email" use:emailEnhance>
				<Form.Field form={emailForm} name="email">
					<Form.Control let:attrs>
						<Form.Label>New Email</Form.Label>
						<Input type="email" {...attrs} bind:value={$emailFormData.email} />
						{#if $emailMessage}
							<Form.Description>{$emailMessage}</Form.Description>
						{/if}
						<Form.FieldErrors />
					</Form.Control>
					<Form.Button>Update Email</Form.Button>
				</Form.Field>
			</form>

			<Separator class="my-4" />

			<form method="post" action="?/update:password" use:passwordEnhance>
				<Form.Field form={passwordForm} name="currentPassword">
					<Form.Control let:attrs>
						<Form.Label>Current Password</Form.Label>
						<Input
							type="password"
							{...attrs}
							bind:value={$passwordFormData.currentPassword}
							autocomplete="current-password"
						/>
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<fieldset class="grid grid-cols-2 gap-4">
					<Form.Field form={passwordForm} name="newPassword">
						<Form.Control let:attrs>
							<Form.Label>New Password</Form.Label>
							<Input
								type="password"
								{...attrs}
								bind:value={$passwordFormData.newPassword}
								autocomplete="new-password"
							/>
							<Form.FieldErrors />
							<Form.Button>Update Password</Form.Button>
						</Form.Control>
					</Form.Field>

					<Form.Field form={passwordForm} name="confirmNewPassword">
						<Form.Control let:attrs>
							<Form.Label>Confirm Password</Form.Label>
							<Input
								type="password"
								{...attrs}
								bind:value={$passwordFormData.confirmNewPassword}
								autocomplete="new-password"
							/>
							<Form.FieldErrors />
						</Form.Control>
					</Form.Field>
				</fieldset>
			</form>

			<Separator class="my-4" />

			<form method="post" action="?/update:username" use:usernameEnhance>
				<Form.Field form={usernameForm} name="username">
					<Form.Control let:attrs>
						<Form.Label>New Username</Form.Label>
						<Input type="text" {...attrs} bind:value={$usernameFormData.username} />
						{#if $usernameMessage}
							<Form.Description>{$usernameMessage}</Form.Description>
						{/if}
						<Form.FieldErrors />
					</Form.Control>
					<Form.Button>Update Username</Form.Button>
				</Form.Field>
			</form>
		</Card.Content>
	</Card.Root>

	<!-- Delete sessions, linked OAuth or account -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Account Management</Card.Title>
			<Card.Description>Manage your account sessions and linked OAuth providers</Card.Description>
		</Card.Header>

		<!-- TODO: Store session information for display -->
		<Card.Content>
			<form method="post" action="?/delete:sessions" use:enhance>
				<Label>Session Management</Label>
				<p class="text-sm text-muted-foreground">
					You can delete all your sessions and log you out from all devices.
				</p>

				<Button type="submit" variant="destructive" class="mt-4">Delete All Sessions</Button>
			</form>

			<Separator class="my-4" />

			<!-- TODO: Add and list all linked providers -->
			<form method="post" action="?/delete:oauth" use:enhance>
				<Label>OAuth Providers</Label>
				<p class="text-sm text-muted-foreground">
					You can unlink your OAuth providers from your account.
				</p>
				<p class="text-sm text-muted-foreground">
					You will still be able to log in with your email and password.
				</p>
				<p class="text-sm text-muted-foreground">You will also be logged out from all devices.</p>

				<Button type="submit" variant="destructive" class="mt-4">Unlink OAuth Providers</Button>
			</form>

			<Separator class="my-4" />

			<!-- TODO: Ask for confirmation -->
			<form method="post" action="?/delete:account" use:enhance>
				<Label>Account Deletion</Label>
				<p class="text-sm text-muted-foreground">
					You can delete your account. This action is irreversible.
				</p>

				<Button type="submit" variant="destructive" class="mt-4">Delete Account</Button>
			</form>
		</Card.Content>
	</Card.Root>
</main>
