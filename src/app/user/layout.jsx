// app/user/layout.tsx
import React, { Suspense } from 'react';
import AuthLayoutClient, { Loader } from './AuthLayoutClient';

export default function Layout({ children }) {
  return (
    <Suspense fallback={<Loader />}>
      <AuthLayoutClient>{children}</AuthLayoutClient>
    </Suspense>
  );
}
