import React from 'react';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { ContentHistory } from '../components/dashboard/ContentHistory';

function HistoryPage() {
  return (
    <PageLayout>
      <PageHeader 
        title="Content History" 
        description="View and manage your created content"
      />
      <div className="mt-8">
        <ContentHistory />
      </div>
    </PageLayout>
  );
}

export default HistoryPage;