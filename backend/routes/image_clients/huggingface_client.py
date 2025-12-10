import os
import base64
import aiohttp
from fastapi import HTTPException, Depends

from ..auth import User, get_current_user
from ..common import router, ImageGenerateRequest, save_image_conversation, check_image_user_permissions

@router.post("/image/huggingface")
async def huggingface_endpoint(request: ImageGenerateRequest, user: User = Depends(get_current_user)):
    try:
        error_message, in_billing, out_billing = check_image_user_permissions(user, request)
        if error_message:
            raise HTTPException(status_code=403, detail=error_message)
        
        text_parts = []
        image_files = []
        
        for part in request.prompt:
            if part.get("type") == "text":
                text_parts.append(part.get("text"))
            elif part.get("type") == "image":
                file_path = part.get("content")
                abs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", file_path.lstrip("/")))
                image_files.append(abs_path)
        
        prompt = "\n\n".join(text_parts)
        
        # Hugging Face Inference API endpoint
        api_url = f"https://api-inference.huggingface.co/models/{request.model}"
        headers = {
            "Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}"
        }
        
        async with aiohttp.ClientSession() as session:
            if image_files:
                # Image-to-image or inpainting
                with open(image_files[0], "rb") as image_file:
                    image_data = image_file.read()
                
                data = aiohttp.FormData()
                data.add_field('inputs', prompt)
                data.add_field('image', image_data, filename='input.png', content_type='image/png')
                
                async with session.post(api_url, headers=headers, data=data) as response:
                    if response.status != 200:
                        error_text = await response.text()
                        raise HTTPException(status_code=response.status, detail=f"Hugging Face API error: {error_text}")
                    
                    image_bytes = await response.read()
            else:
                # Text-to-image
                payload = {
                    "inputs": prompt,
                    "parameters": {
                        "num_inference_steps": 30,
                        "guidance_scale": 7.5
                    }
                }
                
                async with session.post(api_url, headers=headers, json=payload) as response:
                    if response.status != 200:
                        error_text = await response.text()
                        raise HTTPException(status_code=response.status, detail=f"Hugging Face API error: {error_text}")
                    
                    image_bytes = await response.read()
        
        if not image_bytes:
            raise HTTPException(status_code=500, detail="No image generated")
        
        return save_image_conversation(user, request, image_bytes, in_billing, out_billing)
        
    except HTTPException:
        raise
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
