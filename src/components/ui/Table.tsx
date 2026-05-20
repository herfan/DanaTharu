import { useState, useCallback } from 'react'

export interface Column {
  key: string
  header: string
}

export interface TableProps {
  columns: Column[]
  data: Record<string, string | number>[]
  onRowClick?: (row: Record<string, string | number>) => void
  className?: string
}

type SortDirection = 'asc' | 'desc' | null

export function Table({
  columns,
  data,
  onRowClick,
  className = '',
}: TableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleSort = useCallback((key: string) => {
    if (sortColumn === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortColumn(null)
        setSortDirection(null)
      }
    } else {
      setSortColumn(key)
      setSortDirection('asc')
    }
  }, [sortColumn, sortDirection])

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0
    const aVal = a[sortColumn]
    const bVal = b[sortColumn]
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  if (data.length === 0) {
    return (
      <div data-testid="table-container" className={`overflow-x-auto ${className}`}>
        <div className="text-center py-8 text-gray-500">
          Tidak ada data tersedia
        </div>
      </div>
    )
  }

  return (
    <div data-testid="table-container" className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleSort(column.key)}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-danatharu-green ${
                  sortColumn === column.key ? 'text-danatharu-green' : ''
                }`}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {sortColumn === column.key && (
                    <span className="text-xs">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={`${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-gray-100 transition-colors duration-150 ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
              role="row"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
