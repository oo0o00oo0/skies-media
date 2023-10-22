import CombinedColourMaterial from "../CombinedColourMaterial/CombinedColourMaterial";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

type Props = {
  urls: string[];
  value: number;
  save: boolean;
};

const CombinedColourPlane = (props: Props) => {
  const { urls, value } = props;
  const { viewport } = useThree();

  const textures = useTexture(urls);

  return (
    <mesh scale={[viewport.width * 0.66, viewport.width, viewport.width]}>
      <planeGeometry args={[1, 1, 1]} />
      <CombinedColourMaterial value={value} textures={textures} />
    </mesh>
  );
};

export default CombinedColourPlane;
