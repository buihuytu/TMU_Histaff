var coreFileUtils = (function () {

    return {
        blobToBase64: async (blob) => {
            return new Promise((resolve, _) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(blob)
            })
        },
        compressImage: async blob => {
            const response = await createImageBitmap(blob)
            const { width, height } = response
            const dWidth = width > height ? 1024 : 1024 * width / height
            const dHeight = width < height ? 1024 : 1024 / width * height
            const offscreen = new OffscreenCanvas(dWidth, dHeight)
            const ctx = offscreen.getContext('2d')
            ctx.drawImage(response, 0, 0, dWidth, dHeight)
            const result = offscreen.convertToBlob({
                type: 'image/jpeg',
                quality: 0.9,
            })
            return result
        }
    }

})()