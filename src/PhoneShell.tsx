// Responsive presentation wrapper.
// On phones the app fills the screen (full-bleed device, real app feel).
// On wider screens it shows a centered iPhone-class frame scaled to fit,
// sitting on a softly-lit dark backdrop.

import React from 'react';
import { IOSDevice } from './design/ios/IOSFrame';

const DEVICE_W = 402;
const DEVICE_H = 874;
const MOBILE_MAX = 560;

export function PhoneShell({ children }: { children: React.ReactNode }) {
  const [vp, setVp] = React.useState({ w: window.innerWidth, h: window.innerHeight });
  React.useEffect(() => {
    const r = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  const isMobile = vp.w <= MOBILE_MAX;

  if (isMobile) {
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
        <IOSDevice width={vp.w} height={vp.h} dark bare>
          {children}
        </IOSDevice>
      </div>
    );
  }

  const scale = Math.min((vp.h - 48) / DEVICE_H, (vp.w - 48) / DEVICE_W, 1);
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #16203c 0%, #080F1F 70%)',
      }}
    >
      <div style={{ width: DEVICE_W * scale, height: DEVICE_H * scale }}>
        <div style={{ width: DEVICE_W, height: DEVICE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <IOSDevice width={DEVICE_W} height={DEVICE_H} dark>
            {children}
          </IOSDevice>
        </div>
      </div>
    </div>
  );
}
