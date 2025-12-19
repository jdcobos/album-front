import {
  Popup,
  ImageUploader,
  Toast,
  ConfigProvider,
  Button,
} from "antd-mobile";
import { useEffect, useState, useRef, useCallback } from "react";
import enUS from "antd-mobile/es/locales/en-US";
import Webcam from "react-webcam";

const MobileFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: "375px",
      height: "700px",
      margin: "20px auto",
      overflow: "hidden",
      backgroundColor: "#000",
      borderRadius: "8px",
      aspectRatio: "9/16",
      maxHeight: "80vh",
    }}
  >
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

  const mockUpload = async (file: File) => {
    return new Promise<{ url: string }>((resolve, reject) => {
      setTimeout(() => {
        if (file.size > 5 * 1024 * 1024) {
          Toast.show("La imagen es demasiado grande");
          reject(new Error("File too large"));
          return;
        }

        resolve({
          url: URL.createObjectURL(file),
        });
      }, 1000);
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
      bodyStyle={{
        height: "100%",
      }}
      style={
        {
          "--adm-popup-body-height": "100vh",
          "--adm-popup-body-position-bottom-height": "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        } as React.CSSProperties
      }
    >
      {!showCamera && (
        <div style={{ position: "absolute", top: 16, left: 16, zIndex: 1000 }}>
          <Button
            onClick={() => onClose(false)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              padding: 0,
              backgroundColor: "#051132",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
            }}
          >
            ←
          </Button>
        </div>
      )}

      {showCamera ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#000",
            position: "absolute",
          }}
        >
          <MobileFrame>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                ...videoConstraints,
                aspectRatio: 9 / 16,
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scaleX(-1)",
              }}
            />
          </MobileFrame>
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              zIndex: 10000,
            }}
          >
            <Button
              onClick={capture}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                padding: 0,
                backgroundColor: "white",
                border: "4px solid #051132",
              }}
            />
            <Button
              onClick={() => setShowCamera(false)}
              style={{
                position: "absolute",
                right: "20px",
                bottom: "0",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "25px" }}>
          <div
            style={{
              fontSize: "16px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            Sube un momento desde la galeria click en el +
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
                className="profile_img"
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
          <div
            style={{
              fontSize: "16px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            O tambien puedes
          </div>

          <div style={{ marginTop: 16 }}>
            <Button
              color="primary"
              onClick={() => setShowCamera(true)}
              disabled={fileList.length > 0}
              block
              style={{
                backgroundColor: "#051132",
                border: "4px solid #051132",
                marginBottom: "12px",
              }}
            >
              Tomar foto con la cámara
            </Button>
            <Button
              onClick={() => onClose(false)}
              block
              style={{
                backgroundColor: "transparent",
                color: "#051132",
                border: "2px solid #051132",
                fontWeight: "bold",
              }}
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
