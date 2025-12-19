import { Popup, ImageUploader, Toast, ConfigProvider, Button } from 'antd-mobile'
import { useEffect, useState, useRef, useCallback } from 'react'
import enUS from 'antd-mobile/es/locales/en-US'
import Webcam from 'react-webcam'

const AddMultimedia = ({ open, setOpen }: any) => {
  const [openPopup, setOpenPopup] = useState(open)
  const [fileList, setFileList] = useState<any[]>([])
  const [showCamera, setShowCamera] = useState(false)
  const webcamRef = useRef<Webcam>(null)

  useEffect(() => {
    setOpenPopup(open)
  }, [open])

  const onClose = (value: boolean) => {
    setOpenPopup(value)
    setOpen(value)
    setShowCamera(false)
  }

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        // Convert base64 to a file object
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' })
            setFileList([{ url: imageSrc, file }])
            setShowCamera(false)
          })
      }
    }
  }, [webcamRef])


  const mockUpload = async (file: File) => {
    return new Promise<{ url: string }>((resolve, reject) => {
      setTimeout(() => {
        if (file.size > 5 * 1024 * 1024) {
          Toast.show('La imagen es demasiado grande')
          reject(new Error('File too large'))
          return
        }

        resolve({
          url: URL.createObjectURL(file), 
        })
      }, 1000)
    })
  }

  const videoConstraints = {
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: 'user',
    aspectRatio: window.innerWidth / window.innerHeight
  };

  return (
    <Popup
      visible={openPopup}
      onMaskClick={() => onClose(false)}
      onClose={() => onClose(false)}
      bodyStyle={{
        padding: showCamera ? 0 : 16,
        height: '100vh',
      }}
      style={{
        '--adm-popup-body-height': '100vh',
        '--adm-popup-body-position-bottom-height': '100vh',
      } as React.CSSProperties}
    >
        <div>
                <div>
                    Sube un momento desde la galeria
                    <ConfigProvider
                    locale={{
                        ...enUS,
                        ImageUploader: {
                        ...enUS.ImageUploader,
                        uploading: "Subiendo imagen...",
                        upload: "Subir imagen",
                        },
                    }}
                    >
                    <ImageUploader
                        value={fileList}
                        onChange={setFileList}
                        upload={mockUpload}
                        multiple={false}
                        maxCount={1}
                        showUpload={fileList.length === 0 && !showCamera}
                        preview
                    />
                    </ConfigProvider>
                </div>
                <div style={{ marginTop: 16 }}>
                  <Button 
                    color='primary' 
                    onClick={() => setShowCamera(true)}
                    disabled={fileList.length > 0}
                  >
                    Tomar foto con la cámara
                  </Button>
                  {showCamera && (
                    <div style={{ marginTop: 16, textAlign: 'center' }}>
                      <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'black',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          videoConstraints={videoConstraints}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                      <div style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        zIndex: 10000
                      }}>
                        <Button 
                          color='primary' 
                          onClick={capture}
                          style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            padding: 0,
                            backgroundColor: 'white',
                            border: '4px solid #1677ff'
                          }}
                        ></Button>
                        <Button 
                          onClick={() => setShowCamera(false)}
                          style={{
                            position: 'absolute',
                            right: '20px',
                            bottom: '0',
                            color: 'white',
                            backgroundColor: 'rgba(0,0,0,0.5)'
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
            </div>

    </Popup>
  )
}

export default AddMultimedia
