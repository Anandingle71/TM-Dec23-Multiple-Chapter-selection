import React, { ReactNode } from 'react';
import { Sidebar } from '../dashboard/Sidebar';
import { Breadcrumbs } from '../dashboard/Breadcrumbs';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-64">
        <div className="p-8">
          <Breadcrumbs />
          {children}
        </div>
      </div>
    </div>
  );
}