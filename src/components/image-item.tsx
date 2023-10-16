import { useState } from "react";
import imageNotFound from "/public/assets/default image app.png";
import { Image } from "@mantine/core";
const ImageComponent = ({
  imagePath,
  w,
  h,
}: {
  imagePath: string;
  w?: string;
  h?: string;
}) => {
  const [imageExists, setImageExists] = useState(true);

  const handleImageError = () => {
    setImageExists(false);
  };
  if (imageExists) {
    return (
      <Image
        src={imagePath}
        alt="Image"
        onError={handleImageError}
        w={w}
        h={h}
      />
    );
  } else {
    return (
      <Image
        src={"assets/default image app.png"}
        alt="Image not found"
        w={w}
        h={h}
      />
    );
  }
};

export default ImageComponent;
