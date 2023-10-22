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

  const mask = useTexture("/images/mask.jpg");

  return (
    <group scale={0.95}>
      <mesh scale={[viewport.height, viewport.height, viewport.height]}>
        <planeGeometry args={[0.314085, 1, 1]} />
        <CombinedColourMaterial mask={mask} value={value} textures={textures} />
      </mesh>
    </group>
  );
};

export default CombinedColourPlane;
