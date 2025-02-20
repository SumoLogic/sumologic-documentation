import React, { useEffect } from "react";

export type BerryMode = "inline" | "popup";
export interface BerryProps {
    mode: BerryMode;
};

declare global {
  interface Window {
    Berry: any;
  }
}

export default function Berry({ mode }: BerryProps) {
     useEffect(() => {
        function onColorModeChange(newColorMode) {
          if (!window.Berry) {
            return;
          }

          window.Berry.update({
            colorMode: newColorMode,
          })
        }

        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
              const newColorMode = getCurrentColorMode();
              onColorModeChange(newColorMode);
            }
          });
        });

        observer.observe(document.documentElement, { attributes: true });
      }, []);

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

    const colorMode = getCurrentColorMode();
    const config = {
        ...(mode === 'inline' ? inlineConfig : popupConfig),
        colorMode: colorMode,
    };

    window.Berry.init(config);
  };

  function getCurrentColorMode(): 'light' | 'dark' {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light' || theme === 'dark') {
      return theme;
    } else {
      return 'light';
    }
  }


  const commonConfig = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU5NDg5MTcsImV4cCI6MTc3MzE0NDAwMCwiYXVkIjoiV2lkZ2V0SW5pdGlhbGl6YXRpb24iLCJvcmdhbml6YXRpb25JZCI6NjN9.vuE19Wp0nWR0y1l6agTlUjHYqP778J_atl4aUuLW9jM',
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
    height: 700,
    showResize: false,
  }

  const popupConfig = {
    ...commonConfig,
    position: { side: 'right', offsetX: 25, offsetY: 100 },
    isOpenByDefault: false,
  }
