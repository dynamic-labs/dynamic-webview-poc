import { FC, useEffect, useRef } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import type { Client, WebViewOutboundEventEmitter } from 'client';

type CocoonProps<TClient extends Client = Client> = {
  client: TClient;
};

export const Cocoon: FC<CocoonProps> = ({ client }) => {
  const webViewRef = useRef<WebView | null>(null);
  const webViewOutboundEventEmitterRef =
    useRef<WebViewOutboundEventEmitter | null>(null);
  // const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    client.extend((client, core) => {
      webViewOutboundEventEmitterRef.current = core.webViewOutboundEventEmitter;

      return client;
    });
  }, [client]);

  const onMessage = (event: WebViewMessageEvent) => {
    let parsedData = null;

    try {
      parsedData = JSON.parse(event.nativeEvent.data);
    } catch (err) {
      console.log('error parsing data', err);
    }

    if (!parsedData) return;

    webViewOutboundEventEmitterRef.current?.emit(
      parsedData.handler,
      ...(parsedData.data as unknown[])
    );
  };

  return (
    <WebView
      ref={webViewRef}
      webviewDebuggingEnabled
      source={{
        uri: 'https://serval-sterling-correctly.ngrok-free.app/',
      }}
      onLoad={() => console.log('loaded')}
      injectedJavaScriptBeforeContentLoaded={`
    window.onerror = function(message, sourcefile, lineno, colno, error) {
      alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
      return true;
    };
    true;
  `}
      onMessage={onMessage}
    />
  );
};

export default Cocoon;
