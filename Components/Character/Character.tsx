"use client";
import React from "react";
import { Avatar, AvatarProps, CAMERA, PoseModel } from "@readyplayerme/visage";
import { memo } from "react";
type Props = {
  setLoaded: any;
  loaded: any;
};

const Character = ({ setLoaded, loaded }: Props) => {
  const modelSrc = "/sunilCasualModel.glb";
  const animationSrc = "/idleAnimation.fbx";
  return (
    <div className="h-screen w-screen fixed right-[550px]">
      <Avatar
        modelSrc={modelSrc}
        headMovement={true}
        animationSrc={animationSrc}
        idleRotation={true}
        bloom={{
          intensity: 1,
          kernelSize: 1,
          luminanceSmoothing: 1,
          luminanceThreshold: 1,
          materialIntensity: 1,
          mipmapBlur: true,
        }}
        dpr={2}
        effects={{
          ambientOcclusion: false,
          bloom: {
            intensity: 1,
            kernelSize: 1,
            luminanceSmoothing: 1,
            luminanceThreshold: 1,
            materialIntensity: 1,
            mipmapBlur: true,
          },
        }}
        emotion={{
          cheekSquintLeft: 0.3,
          eyeLookInRight: 0.6,
          eyeLookOutLeft: 0.6,
          jawOpen: 0.1,
          mouthDimpleLeft: 0.3,
          mouthPressLeft: 0.1,
          mouthSmileLeft: 0.2,
          mouthSmileRight: 0.1,
        }}
        environment="soft"
        fillLightColor="#6794FF"
      />
    </div>
  );
};

export default memo(Character);
