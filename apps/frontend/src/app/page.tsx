import { BatchList } from '@/components/BatchList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            RecycleCo Waste Tracking
          </h1>
          <BatchList />
        </div>
      </div>
    </main>
  )
}

