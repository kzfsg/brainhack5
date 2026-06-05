// DigiLife — Hi-Fi Screens.
// Assembles the play-flow map and the 8 phone artboards onto a pan/zoom
// design canvas, mirroring the design handoff's "DigiLife Hi-Fi.html".

import type { ComponentType } from 'react';
import { DesignCanvas, type Section } from './design/canvas/DesignCanvas';
import { IOSDevice } from './design/ios/IOSFrame';
import { FlowMap } from './design/flow/FlowMap';
import { SCREENS } from './data/screens';

// One phone screen, centered on a softly-lit artboard backdrop.
function PhoneArtboard({ Screen }: { Screen: ComponentType }) {
  return (
    <div
      style={{
        width: 460,
        height: 920,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #1a2440 0%, #0E162B 70%)',
      }}
    >
      <IOSDevice width={402} height={874} dark>
        <Screen />
      </IOSDevice>
    </div>
  );
}

export default function App() {
  const sections: Section[] = [
    {
      id: 'flow',
      title: 'Play Flow',
      subtitle: 'The 8 screens linked end-to-end · loop, mini-game interrupt, delayed callback',
      artboards: [
        {
          id: 'flow-map',
          label: 'Linked Screens',
          width: 2900,
          height: 1480,
          background: 'transparent',
          render: () => <FlowMap />,
        },
      ],
    },
    {
      id: 'digilife',
      title: 'DigiLife · Hi-Fi Screens',
      subtitle: '8 mobile screens · iPhone-class device frames · Built from the wireframe deck',
      artboards: SCREENS.map((s) => ({
        id: s.id,
        label: s.label,
        width: 460,
        height: 920,
        background: 'transparent',
        render: () => <PhoneArtboard Screen={s.Component} />,
      })),
    },
  ];

  return <DesignCanvas sections={sections} />;
}
