import { useThree } from "@react-three/fiber";
import AtlasMaterial from "./AtlasMaterial";

const AtlasSkies = ({ value }) => {
  const { viewport } = useThree();

  return (
    <group>
      <mesh
        scale={[
          viewport.height * 0.5,
          viewport.height * 0.5,
          viewport.height * 0.5,
        ]}
      >
        {/* <planeGeometry args={[0.314085, 1, 1]} /> */}
        <planeGeometry args={[1, 1.7, 1]} />
        <AtlasMaterial value={value} />
        {/* <CombinedColourMaterial mask={mask} value={value} textures={textures} /> */}
      </mesh>
    </group>
  );
};

export default AtlasSkies;
