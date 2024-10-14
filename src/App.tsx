import React, {createRef, Suspense, useRef, useState} from 'react'
import './App.css'
import {Canvas, useFrame} from "@react-three/fiber";
import {GizmoHelper, GizmoViewport, OrbitControls, useGLTF} from "@react-three/drei";
import {Debug, Physics, useBox, useCylinder, usePlane} from '@react-three/cannon'


function Coin(props) {
  const {nodes: nodes} = useGLTF('/coin.glb');
  let [ref] = useCylinder(() => ({
    mass: 1,
    args: [1, 1, .25, 30],
    position: props.position,
    type: "Dynamic",
    sleepSpeedLimit: .1,
    sleepTimeLimit: 1,
    allowSleep: true,
    angularDamping: 0.2,
    linearDamping: 0.2,
  }));

  return <>
    <mesh ref={ref}
          geometry={nodes.COIN.geometry}
          {...props}>
      <meshStandardMaterial
        color="gold"
        roughness={.5}
        metalness={1}
        envMapIntensity={1}
      />
    </mesh>
  </>
}


function Machine(props) {
  const [boxRef1, api] = useBox(() => ({
    mass: 1,
    args: [1, 1, 1],
    rotation: [0, 0, Math.PI / 4],
    position: [1, 1, 1]
  }));

  useFrame((state, delta, frame) => {
    api.rotation.set(frame * 2, frame * 2, frame * 2)

  })
  return <>
    <mesh
      ref={boxRef1}
    >

      <meshStandardMaterial
        color="gold"
        roughness={.5}
        metalness={1}
        envMapIntensity={1}
      />
    </mesh>

  </>
}

function Plane(props) {
  const [ref] = usePlane(() => ({rotation: [-Math.PI / 2, 0, 0], type: "Static", ...props}))
  useFrame(() => {

  })
  return (
    <mesh ref={ref} color='red'>
      <planeGeometry args={[100, 100]}/>
      <meshStandardMaterial color="red" roughness={1}/>
    </mesh>
  )
}

function PusherBlock(props) {
  const [ref] = useBox(() => ({rotation: [-Math.PI / 2, 0, 0], ...props}))
  return (
    <mesh ref={ref} color='red'>
      <planeGeometry args={[100, 100]}/>
      <meshStandardMaterial color="red" roughness={1}/>
    </mesh>
  )
}

function App() {
  let ref = useRef(null);
  const [dpr, setDpr] = useState(0)

  let useState1 = useState(1);

  const meshRefs = React.useRef([...Array(useState1[0])].map(() => createRef()))

  return (
    <>
      {/*<div>*/}
      {/*  <button onClick={() => addCoin()}></button>*/}
      {/*</div>*/}
      <Canvas
        ref={ref}
        camera={{position: [2, 5, 5], fov: 30}}
        style={{
          backgroundColor: '#2b7abb',
          width: '100vw',
          height: '100vh',
        }}
      >
        <color attach="background" args={['lightpink']}/>
        <spotLight
          position={[15, 40, 15]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight intensity={1} position={[0, 5, 0]}/>
        <OrbitControls autoRotate={false}/>
        <Suspense fallback={null}>
          <Physics
            allowSleep={true}
            iterations={100} // Increase the number of solver iterations
            tolerance={0.001} // Set a lower tolerance for solver error
          >
            <Debug color='red' scale={1}>
              <Plane></Plane>
              <group>
                <Machine></Machine>
                {/*{meshRefs.current.map((coin, index) => <Coin ref={coin} key={index} position={[0, 6, 0]}></Coin>)}*/}
                {/*{meshRefs.current.map((coin, index) => <Coin ref={coin} key={index} position={[0, 6, 0]}></Coin>)}*/}
                {/*{meshRefs.current.map((coin, index) => <Coin ref={coin} key={index} position={[0, 6, 0]}></Coin>)}*/}
                {/*{meshRefs.current.map((coin, index) => <Coin ref={coin} key={index} position={[0, 6, 0]}></Coin>)}*/}
                {/*{meshRefs.current.map((coin, index) => <Coin ref={coin} key={index} position={[0, 6, 0]}></Coin>)}*/}
                {/*{meshRefs.current.map((coin, index) => <Coin ref={coin} key={index} position={[0, 6, 0]}></Coin>)}*/}
                {/*{meshRefs.current.map((coin, index) => <Coin ref={coin} key={index} position={[0, 6, 0]}></Coin>)}*/}
                {/*{meshRefs.current.map((coin, index) => <Coin ref={coin} key={index} position={[0, 6, 0]}></Coin>)}*/}
              </group>
            </Debug>
          </Physics>
        </Suspense>

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white"/>
        </GizmoHelper>

      </Canvas>
    </>
  );
}

const useRefs = () => {
  const refs = useRef<Record<string, HTMLElement | null>>({})

  const setRefFromKey = (key: string) => (element: HTMLElement | null) => {
    refs.current[key] = element;
  }

  return {refs: refs.current, setRefFromKey};
}


export default App
