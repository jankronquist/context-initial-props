import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { useState } from 'react';

import { Tenant, TenantProvider } from '../contexts/tenant';
import App from 'next/app';
import { IncomingMessage } from 'http';

type MyAppProps = AppProps & { tenant: Tenant };

function MyApp({ Component, pageProps, tenant }: MyAppProps) {
  // tenant will be set on first render based on server getInitialProps
  const [storedTenant] = useState(tenant);
  if (storedTenant == null) {
    // TODO: something has gone wrong, render some error info
    return (<div>No tenant found!</div>);
  }

  return (
    <TenantProvider value={storedTenant}>
      <Component {...pageProps} />
    </TenantProvider>);
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { req } = appContext.ctx;
  const isOnServer = !!req;
  const appProps = await App.getInitialProps(appContext);
  const tenant = isOnServer ? loadTenantDetails(req) : null;

  return { ...appProps, tenant };
}

const loadTenantDetails = (req: IncomingMessage) => {
  // TODO: actually load tenant details
  return {
    name: 'someName',
    url: 'someUrl',
  };
};

export default MyApp
