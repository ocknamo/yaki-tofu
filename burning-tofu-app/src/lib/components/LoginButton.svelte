<script lang="ts">
  import { authStore } from '../stores/auth';
  import { t } from '../stores/i18n';

  let loading = false;
  let error = '';

  async function handleLogin() {
    loading = true;
    error = '';
    try {
      await authStore.login();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Login failed';
    } finally {
      loading = false;
    }
  }

  function handleLogout() {
    authStore.logout();
  }
</script>

{#if !$authStore.hasNostrExtension}
  <div class="no-extension">
    <p>{$t('noExtension')}</p>
  </div>
{:else if $authStore.isLoggedIn}
  <div class="logged-in">
    <p>{$t('loggedInAs')}: <code>{$authStore.pubkey?.slice(0, 8)}...</code></p>
    <button onclick={handleLogout}>{$t('logout')}</button>
  </div>
{:else}
  <div class="login">
    <button onclick={handleLogin} disabled={loading}>
      {loading ? '...' : $t('login')}
    </button>
    {#if error}
      <p class="error">{error}</p>
    {/if}
  </div>
{/if}

<style>
  .no-extension {
    padding: 1em;
    background: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: 4px;
    margin-bottom: 1em;
  }

  .no-extension p {
    margin: 0;
    color: #856404;
  }

  .logged-in {
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 1em;
    background: #d4edda;
    border: 1px solid #28a745;
    border-radius: 4px;
    margin-bottom: 1em;
  }

  .logged-in p {
    margin: 0;
    color: #155724;
  }

  .logged-in code {
    background: #fff;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
  }

  .login {
    margin-bottom: 1em;
  }

  button {
    padding: 0.5em 1em;
    background: #ff3e00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
  }

  button:hover:not(:disabled) {
    background: #e63900;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .error {
    color: #dc3545;
    margin-top: 0.5em;
  }
</style>
