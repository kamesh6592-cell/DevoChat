# Hugging Face Image Generation Setup

## Configuration

### Environment Variable
Add your Hugging Face API key to your `.env` file and Render environment variables:

```env
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

### Get Your API Key
1. Go to https://huggingface.co/settings/tokens
2. Create a new access token (read access is sufficient)
3. Copy the token and add it to your environment variables

## Available Models

The following Hugging Face models are now available for image generation:

### 1. **FLUX.1 Dev** (`black-forest-labs/FLUX.1-dev`)
- High-quality text-to-image generation
- State-of-the-art image quality
- Free to use via Hugging Face Inference API

### 2. **Stable Diffusion XL** (`stabilityai/stable-diffusion-xl-base-1.0`)
- Popular and reliable
- Great for general-purpose image generation
- Fast inference

### 3. **Stable Diffusion 3.5** (`stabilityai/stable-diffusion-3.5-large`)
- Latest version of Stable Diffusion
- Improved quality and consistency
- Better prompt following

### 4. **Playground V2.5** (`playgroundai/playground-v2.5-1024px-aesthetic`)
- Optimized for aesthetic images
- 1024px resolution
- Great for artistic content

### 5. **Juggernaut XL** (`RunDiffusion/Juggernaut-XL-v9`)
- Community favorite
- Photorealistic outputs
- Excellent for portraits and landscapes

## Features

- ✅ **Text-to-Image**: Generate images from text prompts
- ✅ **Free Tier**: Use Hugging Face Inference API for free (rate-limited)
- ✅ **Multiple Models**: Choose from 5 different models
- ✅ **Dark Mode Support**: All UI elements support dark mode
- ✅ **No Billing**: Free models (billing set to $0.00)

## Usage

1. Go to "Generate Image" in your app
2. Select any Hugging Face model from the dropdown
3. Enter your prompt
4. Click generate!

## Rate Limits

Hugging Face Inference API has the following limits for free tier:
- ~1000 requests/hour per model
- May have cold start delays (first request takes longer)
- For production use, consider upgrading to Hugging Face Pro

## Troubleshooting

If you see errors:
1. **"Model is currently loading"** - Wait 20-30 seconds and try again (cold start)
2. **"Authorization required"** - Check your `HUGGINGFACE_API_KEY` is set correctly
3. **"Rate limit exceeded"** - Wait a few minutes or upgrade to Pro account

## Upgrading to Pro

For production use, consider upgrading to Hugging Face Pro:
- No rate limits
- Faster inference
- No cold starts
- Priority support

Visit: https://huggingface.co/pricing
