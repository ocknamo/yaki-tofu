<script lang="ts">
  import { getImageSize, isRecommendedSize, formatImageSize, type ImageSize } from '../utils/imageUtils';
  import { t } from '../stores/i18n';

  interface Props {
    url: string;
  }

  let { url }: Props = $props();
  let imageSize: ImageSize | null = $state(null);
  let loading = $state(false);
  let error = $state('');

  $effect(() => {
    if (url) {
      loadImage();
    } else {
      imageSize = null;
      error = '';
    }
  });

  async function loadImage() {
    loading = true;
    error = '';
    imageSize = null;

    try {
      const size = await getImageSize(url);
      imageSize = size;
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load image';
    } finally {
      loading = false;
    }
  }
</script>

{#if url}
  <div class="image-preview">
    <h4>{$t('imagePreview')}</h4>
    {#if loading}
      <p>Loading...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else if imageSize}
      <img src={url} alt="Badge preview" />
      <div class="image-info">
        <p>Size: {formatImageSize(imageSize)}</p>
        {#if !isRecommendedSize(imageSize)}
          <p class="warning">
            {$t('imageSizeWarning')} {formatImageSize(imageSize)}
          </p>
        {/if}
      </div>
    {/if}
  </div>
{/if}

<style>
  .image-preview {
    margin-top: 1em;
    padding: 1em;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #f9f9f9;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 0.5em;
    color: #333;
  }

  img {
    max-width: 200px;
    max-height: 200px;
    border-radius: 4px;
    display: block;
    margin-bottom: 0.5em;
  }

  .image-info p {
    margin: 0.25em 0;
    font-size: 0.9em;
  }

  .warning {
    color: #ff9800;
    font-weight: bold;
  }

  .error {
    color: #dc3545;
  }
</style>
