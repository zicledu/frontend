import React, { useRef, ChangeEvent, useState } from 'react';

type ImageInputProps = {
  onImageChange: (file: File) => void;
  defaultSrc?: string;
};

const ImageInput: React.FC<ImageInputProps> = ({ onImageChange, defaultSrc = 'https://via.placeholder.com/150' }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(defaultSrc);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImageSrc(imageUrl); // 선택된 이미지로 미리보기 업데이트
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <img
        src={imageSrc}
        alt="Uploaded Image"
        style={{ width: '150px', height: '150px', cursor: 'pointer' }}
        onClick={handleImageClick}
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ImageInput;
