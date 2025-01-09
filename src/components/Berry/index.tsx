import React, { useEffect } from "react";

export type BerryMode = "inline" | "popup";
export interface BerryProps {
    mode: BerryMode;
};

export default function Berry({ mode }: BerryProps) {
    useEffect(() => {
        loadBerry(mode);
    }, [mode]);
    return null;
}

function loadBerry(mode: BerryMode) {
    if (!document.getElementById('berry-widget-script')) {
        const script = document.createElement('script');
        script.id = 'berry-widget-script';
        script.src = 'https://www.berryapp.io/js/berry-widget.min.js';
        script.async = true;
        document.head.appendChild(script);
  
        script.onload = () => {
          initBerry(mode);
        }
  
        script.onerror = () => console.error('Failed to load Berry widget script');
      } else {
        initBerry(mode);
      }
    }
    
function initBerry(mode: BerryMode) {
    if (!window.Berry) {
      console.error("Berry not defined");
      return;
    }
  
    window.Berry.init(mode === 'inline' ? inlineConfig : popupConfig);
  };
  

  const commonConfig = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU5NDg5MTcsImV4cCI6MTc0MTYwODkxNywiYXVkIjoiV2lkZ2V0SW5pdGlhbGl6YXRpb24iLCJvcmdhbml6YXRpb25JZCI6NjN9.oJEGkGq1q3uFD66J916f_ZBrqQjPHP9orUOKFxInG38',
    primaryColor: '#021b9a',
    botUrlPath: 'nova',
    showNewChat: true,
    resumeChat: true,
  }

  const inlineConfig = {
    ...commonConfig,
    isOpenByDefault: true,
    parentElementId: 'inline-berry-chatbot-container',
    hideToggle: true,
    height: 850,
  }

  const popupConfig = {
    ...commonConfig,
    position: { side: 'right', offsetX: 25, offsetY: 100 },
    isOpenByDefault: false,
  }
