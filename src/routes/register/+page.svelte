<script>
	import { enhance } from '$app/forms';
</script>

<main class="pt24">
	<form method="post" use:enhance class="grid place-content-center gap8">
		<div class="grid sm:grid-cols-2 gap4">
			<label>
				Email
				<input type="email" name="email" required class="input" />
			</label>

			<label>
				Username
				<input
					type="text"
					name="username"
					autocomplete="username"
					minlength="4"
					required
					class="input"
				/>
			</label>

			<label>
				Password
				<input
					type="password"
					name="password"
					autocomplete="new-password"
					minlength="8"
					required
					class="input"
				/>
			</label>

			<label>
				Confirm Password
				<input
					type="password"
					name="confirmPassword"
					autocomplete="new-password"
					minlength="8"
					required
					class="input"
				/>
			</label>
		</div>

		<button type="submit" class="btn btn-primary">Register</button>
	</form>
</main>
