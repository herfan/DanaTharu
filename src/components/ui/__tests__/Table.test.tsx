import { render, screen, fireEvent } from '@testing-library/react'
import { Table } from '../Table'

describe('Table', () => {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age' },
    { key: 'email', header: 'Email' },
  ]

  const data = [
    { name: 'Alice', age: 30, email: 'alice@example.com' },
    { name: 'Bob', age: 25, email: 'bob@example.com' },
    { name: 'Charlie', age: 35, email: 'charlie@example.com' },
  ]

  test('renders table with headers', () => {
    render(<Table columns={columns} data={data} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  test('renders table rows with data', () => {
    render(<Table columns={columns} data={data} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })

  test('renders correct number of rows', () => {
    render(<Table columns={columns} data={data} />)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(4)
  })

  test('applies striped rows', () => {
    render(<Table columns={columns} data={data} />)
    const rows = screen.getAllByRole('row')
    expect(rows[2]).toHaveClass('bg-gray-50')
    expect(rows[3]).not.toHaveClass('bg-gray-50')
  })

  test('applies hover effect on rows', () => {
    render(<Table columns={columns} data={data} />)
    const rows = screen.getAllByRole('row')
    const dataRow = rows[1]
    expect(dataRow).toHaveClass('hover:bg-gray-100')
  })

  test('calls onRowClick when row is clicked', () => {
    const handleRowClick = vi.fn()
    render(<Table columns={columns} data={data} onRowClick={handleRowClick} />)
    const rows = screen.getAllByRole('row')
    fireEvent.click(rows[1])
    expect(handleRowClick).toHaveBeenCalledWith(data[0])
  })

  test('sorts column ascending when header clicked first time', () => {
    render(<Table columns={columns} data={data} />)
    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)
    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Alice')
    expect(rows[2]).toHaveTextContent('Bob')
    expect(rows[3]).toHaveTextContent('Charlie')
  })

  test('sorts column descending when header clicked second time', () => {
    render(<Table columns={columns} data={data} />)
    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)
    fireEvent.click(nameHeader)
    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Charlie')
    expect(rows[2]).toHaveTextContent('Bob')
    expect(rows[3]).toHaveTextContent('Alice')
  })

  test('shows sort indicator on sorted column', () => {
    render(<Table columns={columns} data={data} />)
    const nameHeader = screen.getByText('Name').closest('th')
    fireEvent.click(nameHeader!)
    expect(nameHeader).toHaveClass('text-danatharu-green')
  })

  test('applies custom className', () => {
    render(<Table columns={columns} data={data} className="custom-class" />)
    const container = screen.getByTestId('table-container')
    expect(container).toHaveClass('custom-class')
  })

  test('renders empty state when no data', () => {
    render(<Table columns={columns} data={[]} />)
    expect(screen.getByText('Tidak ada data tersedia')).toBeInTheDocument()
  })

  test('renders numeric column values correctly', () => {
    render(<Table columns={columns} data={data} />)
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('35')).toBeInTheDocument()
  })
})
