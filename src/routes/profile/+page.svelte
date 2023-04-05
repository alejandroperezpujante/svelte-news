<script lang="ts">
  import { page } from "$app/stores";
	import { enhance } from "$app/forms";
</script>

Welcome {$page.data.account.username}

<form method="post" action="/logout?/all" use:enhance>
  <button type="submit">Close all sessions</button>
</form>
