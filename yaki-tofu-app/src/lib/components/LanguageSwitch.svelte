<script lang="ts">
  import { languageStore, type Language } from '../stores/i18n';

  function switchLanguage(lang: Language) {
    languageStore.setLanguage(lang);
  }
</script>

<div class="flex gap-1">
  <button
    class="px-2 py-1 rounded text-xs transition-colors {$languageStore === 'en' ? 'bg-white text-orange-500 font-medium' : 'bg-orange-400 text-white hover:bg-white hover:text-orange-500'}"
    onclick={() => switchLanguage('en')}
  >
    EN
  </button>
  <button
    class="px-2 py-1 rounded text-xs transition-colors {$languageStore === 'ja' ? 'bg-white text-orange-500 font-medium' : 'bg-orange-400 text-white hover:bg-white hover:text-orange-500'}"
    onclick={() => switchLanguage('ja')}
  >
    JA
  </button>
</div>
