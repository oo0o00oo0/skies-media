import { useThree } from "@react-three/fiber";
import AtlasMaterial from "./AtlasMaterial";

const AtlasSkies = ({ value }) => {
  const { viewport } = useThree();

  return (
    <group>
      <mesh scale={[viewport.height, viewport.height, viewport.height]}>
        <planeGeometry args={[0.314085, 1, 1]} />
        <AtlasMaterial value={value} />
        {/* <CombinedColourMaterial mask={mask} value={value} textures={textures} /> */}
      </mesh>
    </group>
  );
};

export default AtlasSkies;
