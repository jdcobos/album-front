import {
  Popup,
  ImageUploader,
  Toast,
  ConfigProvider,
  Button,
} from "antd-mobile";
import "../../../stylesheet/profile/profile.scss";
import { useEffect, useState, useRef, useCallback } from "react";
import enUS from "antd-mobile/es/locales/en-US";
import Webcam from "react-webcam";

interface FileItem {
  url: string;
  name?: string;
  type?: string;
}

const MobileFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="mobile-frame">
    {children}
  </div>
);

const AddMultimedia = ({ open, setOpen }: any) => {
  const [openPopup, setOpenPopup] = useState(open);
  const [fileList, setFileList] = useState<any[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    setOpenPopup(open);
  }, [open]);

  const onClose = (value: boolean) => {
    setOpenPopup(value);
    setOpen(value);
    setShowCamera(false);
    
    // Reset the component state when closing
    if (!value) {
      setFileList([]);
    }
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Convert base64 to a file object
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "captured-image.jpg", {
              type: "image/jpeg",
            });
            setFileList([{ url: imageSrc, file }]);
            setShowCamera(false);
          });
      }
    }
  }, [webcamRef]);

  const mockUpload = async (file: File): Promise<FileItem> => {
    return new Promise((resolve, reject) => {
      // Check file size (15MB max)
      const maxSizeMB = 15;
      if (file.size > maxSizeMB * 1024 * 1024) {
        Toast.show(`La imagen es demasiado grande (máx. ${maxSizeMB}MB)`);
        reject(new Error(`File too large (max ${maxSizeMB}MB)`));
        return;
      }

      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type.toLowerCase())) {
        Toast.show("Formato de archivo no soportado. Use JPG, PNG, GIF o WebP");
        reject(new Error("Invalid file type"));
        return;
      }

      try {
        // Create a preview URL for the file
        const previewUrl = URL.createObjectURL(file);
        
        // Return the file data in the expected format
        resolve({
          url: previewUrl,
          name: file.name,
          type: file.type,
        });
      } catch (error) {
        console.error("Error creating preview:", error);
        reject(new Error("Error al procesar la imagen"));
      }
    });
  };

  const videoConstraints = {
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: "user",
    aspectRatio: window.innerWidth / window.innerHeight,
  };

  return (
    <Popup
      visible={openPopup}
      onMaskClick={() => onClose(false)}
      onClose={() => onClose(false)}
      bodyStyle={{ height: '100%' }}
      className="profile-popup"
    >
      {!showCamera && (
        <Button
          onClick={() => onClose(false)}
          className="profile-popup-back-button"
        >
          ←
        </Button>
      )}

      {showCamera ? (
        <div className="profile-camera-container">
          <MobileFrame>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                ...videoConstraints,
                aspectRatio: 9 / 16,
              }}
            />
          </MobileFrame>
          <div className="profile-camera-controls">
            <Button
              onClick={capture}
              className="profile-capture-button"
            />
            <Button
              onClick={() => setShowCamera(false)}
              className="profile-cancel-button"
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <div className="profile-upload-section">
          <div className="profile-upload-title">
            Sube un momento desde la galeria click en el +
            <ConfigProvider
              locale={{
                ...enUS,
                ImageUploader: {
                  ...enUS.ImageUploader,
                  uploading: 'Subiendo imagen...',
                  upload: 'Subir imagen',
                },
              }}
            >
              <ImageUploader
                className="profile-img-uploader"
                value={fileList}
                onChange={setFileList}
                upload={mockUpload}
                multiple={false}
                maxCount={1}
                showUpload={fileList.length === 0}
                preview
              />
            </ConfigProvider>
          </div>
          <div className="profile-upload-instruction">
            O tambien puedes
          </div>
          <div style={{ marginTop: 16 }}>
            <Button
              color="primary"
              onClick={() => setShowCamera(true)}
              disabled={fileList.length > 0}
              block
              className="profile-camera-button"
            >
              Tomar foto con la cámara
            </Button>
            <Button
              onClick={() => onClose(false)}
              block
              className="profile-close-button"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default AddMultimedia;
