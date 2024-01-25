import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import type { Client, Core } from 'client';
import { StyleSheet, View } from 'react-native';

type DynamicCocoonProps<TClient extends Client = Client> = {
  client: TClient;
};

export const DynamicCocoon: FC<DynamicCocoonProps> = ({ client }) => {
  const webViewRef = useRef<WebView | null>(null);
  const coreRef = useRef<Core | null>(null);
  const [openModals, setOpenModals] = useState<{ [modalId: string]: boolean }>(
    {}
  );

  const visible = useMemo(() => {
    return Object.values(openModals).some((open) => open);
  }, [openModals]);

  useEffect(() => {
    client.extend((client, core) => {
      coreRef.current = core;

      core.webViewOutboundEventEmitter.on(
        'showAuthFlowChanged',
        (show: boolean) => {
          setOpenModals((prev) => ({
            ...prev,
            'dynamic-auth': show,
          }));
        }
      );

      core.webViewOutboundEventEmitter.on(
        'modalDisplayChanged',
        (modalId, open) => {
          setOpenModals((prev) => ({
            ...prev,
            [modalId]: open,
          }));
        }
      );

      return client;
    });
  }, [client]);

  useEffect(() => {
    const webView = webViewRef.current;

    if (!webView) return;

    client.extend((client, core) => {
      core.webViewInboundEventEmitter.onAny((event, ...args) => {
        webView.requestFocus();

        webView.postMessage(
          JSON.stringify({
            handler: event,
            data: args,
          })
        );
      });

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

    coreRef.current?.webViewOutboundEventEmitter.emit(
      parsedData.handler,
      ...(parsedData.data as unknown[])
    );
  };

  const webviewStyles = useMemo(() => {
    return styles['magic-webview'];
  }, []);

  const containerStyles = useMemo(() => {
    return [styles['webview-container'], visible ? styles.show : styles.hide];
  }, [visible]);

  return (
    <View style={containerStyles}>
      <WebView
        ref={webViewRef}
        style={webviewStyles}
        key={'webview'}
        webviewDebuggingEnabled
        source={{
          uri: 'https://serval-sterling-correctly.ngrok-free.app/',
        }}
        onLoad={() => console.log('webview loaded')}
        injectedJavaScriptBeforeContentLoaded={`
      window.onerror = function(message, sourcefile, lineno, colno, error) {
        alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
        return true;
      };
      true;
      `}
        onMessage={onMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  'magic-webview': {
    flex: 1,
    backgroundColor: 'transparent',
  },

  'webview-container': {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  show: {
    zIndex: 10000,
    elevation: 10000,
  },

  hide: {
    zIndex: -10000,
    elevation: 0,
  },
});
