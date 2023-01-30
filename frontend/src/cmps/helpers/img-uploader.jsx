import { useState } from 'react'
import { uploadService } from '../../services/connection/upload.service'

export function ImgUploader({ onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    // const { secure_url, height, width, original_filename, format } = await uploadService.uploadImg(ev)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    // setImgData({ imgUrl: secure_url, width, height, title: original_filename, fileType:format })
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded('bgImg', secure_url)
  }

  function getUploadLabel() {
    if (imgData.imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }
  console.log('imgData', imgData);
  return (
    <div className="upload-preview">
      {/* {imgData.imgUrl && (
        <>
        <h1>{imgData.title}</h1>
        <img
          src={imgData.imgUrl}
          style={{ maxWidth: '200px', float: 'right' }}

        />
        </>
      )} */}
      <label htmlFor="imgUpload" className=''>{getUploadLabel()}</label>
      <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" style={{ display: 'none' }} />
    </div>
  )
}
