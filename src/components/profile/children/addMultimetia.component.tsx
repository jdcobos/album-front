import {
  Popup,
  ImageUploader,
  Toast,
  ConfigProvider,
  Button,
  Input,
} from "antd-mobile";
import "../../../stylesheet/profile/profile.scss";
import { useEffect, useState, useRef, useCallback } from "react";
import enUS from "antd-mobile/es/locales/en-US";
import Webcam from "react-webcam";
import Request from "../../../actions/request";

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
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
      setDescription("");
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

  const handleSaveMoment = async () => {
  if (!fileList.length) {
      alert('Por favor, selecciona o captura una imagen');
    return;
  }

  if (!description.trim()) {
       alert('Por favor, agrega una descripción');
    return;
  }

  let toastKey: any = null;
  try {
    setIsSaving(true);
    const formData = new FormData();
    const fileItem = fileList[0];

    // Show loading toast
    toastKey = Toast.show({
      content: 'Guardando momento...',
      icon: 'loading',
      position: 'bottom',
      duration: 0, // Don't auto close
    });

    // Handle different file types
    if (fileItem.file instanceof File) {
      formData.append('file', fileItem.file);
    } 
    else if (fileItem.url && fileItem.url.startsWith('blob:')) {
      const response = await fetch(fileItem.url);
      const blob = await response.blob();
      const file = new File([blob], fileItem.name || 'captured-image.jpg', { 
        type: fileItem.type || 'image/jpeg' 
      });
      formData.append('file', file);
    } 
    else if (fileItem.file) {
      formData.append('file', fileItem.file);
    } 
    else {
      throw new Error('Formato de archivo no soportado');
    }

    formData.append('description', description);

    await Request({
      method: 'POST',
      route: 'multimedia',
      params: formData,
      customHeaders: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Close any open toasts
    if (toastKey) {
      Toast.clear();
    }

       alert('Momento guardado exitosamente');
    onClose(false);
    
    // Refresh the page after a short delay to show the success message
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error: any) {
    console.error('Error saving moment:', error);
    
 

     alert(error?.response?.data?.error || 'Error al guardar el momento. Intenta de nuevo.')
  } finally {
    setIsSaving(false);
  }
};

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

  const toggleCamera = useCallback(() => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  }, []);

  const videoConstraints = {
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: {
      exact: facingMode
    },
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
              data-facingside={facingMode}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
                WebkitTransform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
              }}
            />
          </MobileFrame>
          <div className="profile-camera-controls">
            {isMobile && (
              <Button
                onClick={toggleCamera}
                className="profile-switch-camera-button"
              >
                🔄
              </Button>
            )}
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
            <Input
              placeholder="Describe este momento..."
              value={description}
              onChange={setDescription}
              style={{
                margin: '16px 0',
                '--text-align': 'center',
                '--placeholder-color': '#999',
              }}
            />
            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <Button
                onClick={() => onClose(false)}
                block
                className="profile-close-button"
                style={{ flex: 1 }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveMoment}
                block
                color="primary"
                loading={isSaving}
                style={{
                  flex: 1,
                  backgroundColor: '#051132',
                  borderColor: '#051132',
                }}
              >
                {isSaving ? 'Guardando...' : 'Guardar Momento'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default AddMultimedia;
