import { FC, useRef, useState } from 'react';
import { Modal } from 'react-native';
import { WebView } from 'react-native-webview';

export const Cocoon: FC = () => {
  const webViewRef = useRef<WebView | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  // useEffect(() => {
  //   const showCocoonHandler = () => setVisible(true);

  //   clientEventEmitter.on('showCocoon', showCocoonHandler);

  //   return () => {
  //     clientEventEmitter.removeListener('showCocoon', showCocoonHandler);
  //   };
  // }, []);

  // useEffect(() => {
  //   const sendMessageHandler = () => {
  //     if (webViewRef?.current) {
  //       webViewRef?.current?.postMessage('Hi to React - from React native');
  //     }
  //   };

  //   clientEventEmitter.on('openAuthFlow', sendMessageHandler);

  //   return () => {
  //     clientEventEmitter.removeListener('openAuthFlow', sendMessageHandler);
  //   };
  // }, []);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'http://localhost:4200/' }}
      onLoad={() => console.log('loaded')}
      injectedJavaScriptBeforeContentLoaded={`
    window.onerror = function(message, sourcefile, lineno, colno, error) {
      alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
      return true;
    };
    true;
  `}
    />
  );
};

export default Cocoon;
