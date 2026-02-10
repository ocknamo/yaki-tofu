<script lang="ts">
  import { languageStore, type Language } from '../stores/i18n';

  function switchLanguage(lang: Language) {
    languageStore.setLanguage(lang);
  }
</script>

<div class="language-switch">
  <button
    class:active={$languageStore === 'en'}
    onclick={() => switchLanguage('en')}
  >
    EN
  </button>
  <button
    class:active={$languageStore === 'ja'}
    onclick={() => switchLanguage('ja')}
  >
    日本語
  </button>
</div>

<style>
  .language-switch {
    display: flex;
    gap: 0.5em;
  }

  button {
    padding: 0.3em 0.8em;
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
  }

  button:hover {
    background: #e0e0e0;
  }

  button.active {
    background: #ff3e00;
    color: white;
    border-color: #ff3e00;
  }
</style>
