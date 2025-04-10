// This is a Server Component
import { Suspense } from 'react';
import ClientPage from '../../ClientPage';
import { notFound } from 'next/navigation';

// Define a more flexible type that works both with local dev and Netlify
type PageParams = {
  params: {
    page: string;
  };
};

// Make the component async to satisfy Netlify's apparent expectation
// that params is Promise-like
export default async function Page({ params }: PageParams) {
  const pageNumber = parseInt(params.page, 10);
  
  // Validate page number
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }
  
  return (
    <div className="min-h-screen">
      <Suspense fallback={
        <div>
          <h1 className="text-center pt-16 text-3xl font-bold">Found Fonts Foundry</h1>
          <p className="text-center mt-4">Loading fonts collection...</p>
        </div>
      }>
        <ClientPage initialPage={pageNumber} />
      </Suspense>
    </div>
  );
} 