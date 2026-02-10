<script lang="ts">
  import { relayStore } from '../stores/relay';
  import { t } from '../stores/i18n';
  import { isValidWebSocketUrl } from '../utils/validation';

  let newRelay = $state('');
  let error = $state('');

  function handleAddRelay() {
    error = '';
    
    if (!newRelay) {
      return;
    }

    if (!isValidWebSocketUrl(newRelay)) {
      error = 'Invalid WebSocket URL. Must start with wss:// or ws://';
      return;
    }

    relayStore.addRelay(newRelay);
    newRelay = '';
  }

  function handleRemoveRelay(relay: string) {
    relayStore.removeRelay(relay);
  }
</script>

<div class="relay-settings">
  <h3>{$t('currentRelays')}</h3>
  
  <div class="relay-list">
    {#each $relayStore.relays as relay}
      <div class="relay-item">
        <span class="relay-url">{relay}</span>
        <span class="relay-status" class:connected={$relayStore.connected.has(relay)}>
          {$relayStore.connected.has(relay) ? $t('connected') : $t('disconnected')}
        </span>
        <button onclick={() => handleRemoveRelay(relay)} class="remove-btn">
          {$t('remove')}
        </button>
      </div>
    {/each}
  </div>

  <div class="add-relay">
    <h4>{$t('addRelay')}</h4>
    <div class="input-group">
      <input
        type="text"
        bind:value={newRelay}
        placeholder={$t('relayUrlPlaceholder')}
        onkeydown={(e) => e.key === 'Enter' && handleAddRelay()}
      />
      <button onclick={handleAddRelay}>Add</button>
    </div>
    {#if error}
      <p class="error">{error}</p>
    {/if}
  </div>
</div>

<style>
  .relay-settings {
    max-width: 600px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 1em;
    color: #333;
  }

  h4 {
    margin-top: 2em;
    margin-bottom: 0.5em;
    color: #333;
  }

  .relay-list {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .relay-item {
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 0.8em;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .relay-url {
    flex: 1;
    font-family: monospace;
    font-size: 0.9em;
  }

  .relay-status {
    padding: 0.2em 0.6em;
    border-radius: 3px;
    font-size: 0.8em;
    background: #ffc107;
    color: #856404;
  }

  .relay-status.connected {
    background: #28a745;
    color: white;
  }

  .remove-btn {
    padding: 0.3em 0.8em;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
  }

  .remove-btn:hover {
    background: #c82333;
  }

  .add-relay {
    margin-top: 2em;
  }

  .input-group {
    display: flex;
    gap: 0.5em;
  }

  input {
    flex: 1;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
  }

  input:focus {
    outline: none;
    border-color: #ff3e00;
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

  button:hover {
    background: #e63900;
  }

  .error {
    color: #dc3545;
    margin-top: 0.5em;
    font-size: 0.9em;
  }
</style>
