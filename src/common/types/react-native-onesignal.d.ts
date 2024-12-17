declare module 'react-native-onesignal' {
  export function init(appId: string): void;
  export function addEventListener(event: string, handler: Function): void;
  export function removeEventListener(event: string, handler: Function): void;
}
