import React, { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

import axios from "axios";
import { useRouter } from "next/router";

import "react-image-crop/dist/ReactCrop.css";

function generateDownload(canvas:HTMLCanvasElement, crop:{[key:string]:any}, name?:string) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      if (!blob) return ;
      const formData = new FormData();
      formData.append("file", blob, `${name}.png`);

      axios.post(`/api/upload-image?name=${name}`, formData, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        // window.alert("DONE!")
      }).catch((err) => {
        console.error(err);
      });
    },
    "image/png",
    1
  );
}

export default function UploadWarlordImage() {

  const router = useRouter();
  const [upImg, setUpImg] = useState<string | ArrayBuffer | null>();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = useState({ unit: "%", width: 15, height: 28 });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const onSelectFile = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    if (!crop.width || !crop.height || !crop.x || !crop.y) return;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    if (!ctx) return;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <div className="App">
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      {// @ts-ignore
        <ReactCrop src={upImg} onImageLoaded={onLoad} crop={crop} onChange={c => setCrop(c)} onComplete={c => setCompletedCrop(c)}/>
      }
      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>
      <p>
        Note that the download below won't work in this sandbox due to the
        iframe missing 'allow-downloads'. It's just for your reference.
      </p>
      {previewCanvasRef.current &&
      <button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() => generateDownload(previewCanvasRef.current as HTMLCanvasElement, completedCrop as Crop, router.query.name as string)}>
          Download cropped image
      </button>
      }
    </div>
  );
}
