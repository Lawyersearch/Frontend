import { styled } from '@mui/material'
import Image, {ImageLoaderProps, ImageProps} from "next/image";

const nextImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://kuznetsovlabs.me${src}?w=${width}&q=${quality || 75}`
}

const RoundedImage = styled((props: ImageProps) => (
  <Image loader={nextImageLoader} {...props} />
))(({ theme }) => ({
  borderRadius: '50%',
  objectFit: 'contain',
  aspectRatio: '1'
}))

export default RoundedImage
