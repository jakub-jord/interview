'use client'

import { useEffect, useState } from 'react'

interface WasteBatch {
  id: string
  batchId: string
  source: string
  materialType: string
  weightKg: number
  status: string
  receivedDate: string
  parentBatchId?: {
    id: string
    batchId: string
  }
}

export function BatchList() {
  const [batches, setBatches] = useState<WasteBatch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBatches()
  }, [])

  const fetchBatches = async () => {
    try {
      setLoading(true)
      
      // BUG #1: Wrong endpoint - should be /api/waste-batches but using /api/batches
      const response = await fetch('http://localhost:3000/api/batches')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // BUG #2: Incorrect data path - Payload returns {docs: [...]} but we're accessing data directly
      setBatches(data)
      
    } catch (err) {
      // BUG #3: Error is set but never displayed to user
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching batches:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading batches...</div>
      </div>
    )
  }

  // BUG #4: Error state exists but is never shown to the user
  // Should display error message here

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {batches.length === 0 ? (
          <li className="px-6 py-4 text-gray-500">
            No batches found. Create some batches in the admin panel first.
          </li>
        ) : (
          batches.map((batch) => (
            <li key={batch.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {batch.batchId}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <StatusBadge status={batch.status} />
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex sm:space-x-4">
                      <p className="flex items-center text-sm text-gray-500">
                        <span className="font-medium">Source:</span>
                        <span className="ml-1">{batch.source}</span>
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        <span className="font-medium">Material:</span>
                        <span className="ml-1">{formatMaterialType(batch.materialType)}</span>
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        <span className="font-medium">Weight:</span>
                        {/* BUG #5: Weight is displayed but not formatted - should show as "123.45 kg" */}
                        <span className="ml-1">{batch.weightKg}</span>
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        {new Date(batch.receivedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {batch.parentBatchId && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-400">
                        ↳ Reprocessed from: {batch.parentBatchId.batchId}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    received: 'bg-blue-100 text-blue-800',
    processing: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
  }

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {status}
    </span>
  )
}

function formatMaterialType(type: string): string {
  const types: Record<string, string> = {
    mixed: 'Mixed Waste',
    plastic: 'Plastic',
    paper: 'Paper/Cardboard',
    metal: 'Metal',
    organic: 'Organic Waste',
  }
  return types[type] || type
}

