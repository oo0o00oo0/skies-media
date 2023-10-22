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
    <group rotation-z={Math.PI * -0.5}>
      <mesh scale={[viewport.width, viewport.width, viewport.width]}>
        <planeGeometry args={[0.314085, 1, 1]} />
        <CombinedColourMaterial mask={mask} value={value} textures={textures} />
      </mesh>
    </group>
  );
};

export default CombinedColourPlane;
