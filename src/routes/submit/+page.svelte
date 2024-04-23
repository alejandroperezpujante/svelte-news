<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';

	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { submitSchema } from './submitSchema.js';

	export let data;

	const types = {
		uncategorized: 'Uncategorized',
		news: 'News',
		discussion: 'Discussion',
		question: 'Question',
		job: 'Job'
	};

	const form = superForm(data.form, {
		validators: zodClient(submitSchema)
	});
	const { form: formData, message, enhance } = form;

	$: selectedType = {
		label: types[$formData.type],
		value: $formData.type
	};
</script>

<main class="flex-1 container py-6 content-center">
	<Card.Root>
		<Card.Header>
			<Card.Title tag="h1" class="text-3xl">Submit a new post</Card.Title>
			<Card.Description>Fill out the form below to submit a new post.</Card.Description>
		</Card.Header>

		<Card.Content>
			<form method="post" use:enhance>
				<Form.Field {form} name="title">
					<Form.Control let:attrs>
						<Form.Label>Title</Form.Label>
						<Input {...attrs} bind:value={$formData.title} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<!-- TODO: Migrate to a Markdown Editor (CartaMD seems nice) -->
				<Form.Field {form} name="body">
					<Form.Control let:attrs>
						<Form.Label>Body</Form.Label>
						<Textarea {...attrs} bind:value={$formData.body} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="type">
					<Form.Control let:attrs>
						<Form.Label>Type</Form.Label>
						<Select.Root
							selected={selectedType}
							onSelectedChange={(selected) => selected && ($formData.type = selected.value)}
							portal={null}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="Select a type" />
							</Select.Trigger>
							<Select.Content>
								{#each Object.entries(types) as [value, label]}
									<Select.Item {value} {label} />
								{/each}
							</Select.Content>
						</Select.Root>

						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Button class="mt-4">Create post</Form.Button>
			</form>
		</Card.Content>
		{#if $message}
			<Card.Footer>
				<p class="text-muted-foreground">{$message}</p>
			</Card.Footer>
		{/if}
	</Card.Root>
</main>
