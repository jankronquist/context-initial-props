# About

This is an example showing how to load data from the server once during initial load and then make it available using context. See `pages/_app.tsx` for details.

We are building a multi tenant service where different tenants have different configuration including different feature flags, for example how the UI should look. We are also doing server side rendering and want the entire page to be rendered from the start. Next.js provides a few different options for doing server side rendering, but in our case we have separate backend services that we want the client to use once it is running in the browser, ie as a traditional single-page-app.

We decided to use getInitialProps to load the tenant configuration on the server for all pages and then use a Context Provider to make this data available for any component. In our case the tenant is determined by the hostname.

We are not using getServerSideProps because:

- the data is the same for every page (ie we dont need to reload the data)
- this would add additional delay for page navigation and would add additional load on our servers (1 additional request / page navigation) (could be mitigated using
caching)

Notice getInitialProps in `_app.tsx` is slightly different than a regular getInitialProps:

```
MyApp.getInitialProps = async (appContext: AppContext) => {
  const { req } = appContext.ctx;
  const isOnServer = !!req;
  const appProps = await App.getInitialProps(appContext);
  const tenant = isOnServer ? loadTenantDetails(req) : null;

  return { ...appProps, tenant };
}
```

Links:

- https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
- https://nextjs.org/docs/advanced-features/custom-app
- https://reactjs.org/docs/context.html

===

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
