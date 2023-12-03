import { fileNames } from "@data/fileNames";
import CombinedColourMaterial from "../CombinedColourMaterial/CombinedColourMaterial";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

type Props = {
  value: number;
  save: boolean;
};

const CombinedColourPlane = (props: Props) => {
  const { value } = props;
  const { viewport } = useThree();

  const textures = useTexture(
    fileNames.map((fileName) => `/images/skies/${fileName}.jpg`)
  );

  const mask = useTexture("/images/mask.jpg");

  return (
    <group>
      <mesh
        // scale={[viewport.width, viewport.width, viewport.width]}
        scale={[viewport.height, viewport.height, viewport.height]}
      >
        <planeGeometry args={[0.314085, 1, 1]} />
        <CombinedColourMaterial mask={mask} value={value} textures={textures} />
      </mesh>
    </group>
  );
};

export default CombinedColourPlane;
