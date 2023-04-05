<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	export let data;
	export let form;
</script>

<svelte:head>
	<title>Svelte News - {data.post?.title}</title>
</svelte:head>

<div class="space-y8">
	<article>
		<h2 class="text-2xl font-bold">{data.post?.title}</h2>
		<p>{data.post?.description}</p>
	</article>

	<form method="post" action="?/comment" use:enhance class="space-y2">
		{#if form?.error}
			<p class="text-red-5">{form?.message}</p>
		{/if}
		<input type="hidden" name="postId" value={data.post?.id} />
		<label>
			<span class="label-text">
				New Comment
				{#if !$page.data.account}
					<span class="text-sm text-red-5">You must be logged in to comment</span>
				{/if}
			</span>
			<textarea name="comment" class="input" required disabled={!$page.data.account} />
		</label>

		<button type="submit" class="btn btn-primary" disabled={!$page.data.account}>Submit</button>
	</form>

	<section>
		<h2 class="mb4 text-xl font-semibold underline underline-dashed">Comments</h2>

		{#if data.post?.comments.length > 0}
			<ul class="space-y4">
				{#each data.post?.comments as comment}
					<li class="border-b border-gray-5 border-dashed">
						<p>{comment.content}</p>
						<p class="text-sm text-gray-5">By {comment.account.username}</p>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No comments yet</p>
		{/if}
	</section>
</div>
