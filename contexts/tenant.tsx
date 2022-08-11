import { createContext, ReactNode } from 'react';

export type Tenant = {
  name: string,
  url: string,
};

const TenantContext = createContext<Tenant>(undefined!);

export const TenantProvider = ({ children, value }: { children: ReactNode | ReactNode[], value: Tenant}) => {
  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
};

export default TenantContext;

