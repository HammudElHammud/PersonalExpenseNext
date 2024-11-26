import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import {StoreProvider} from "../store/StoreProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
        <AppWrappers>
            <StoreProvider>
            {children}
            </StoreProvider>
        </AppWrappers>
      </body>
    </html>
  );
}
