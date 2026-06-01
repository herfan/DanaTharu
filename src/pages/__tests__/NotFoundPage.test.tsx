import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotFoundPage from '../NotFoundPage'

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  )
}

describe('NotFoundPage', () => {
  test('renders 404 heading', () => {
    renderWithRouter()
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  test('renders page not found message', () => {
    renderWithRouter()
    expect(screen.getByText(/halaman tidak ditemukan/i)).toBeInTheDocument()
  })

  test('renders description text', () => {
    renderWithRouter()
    expect(screen.getByText(/halaman yang anda cari tidak tersedia/i)).toBeInTheDocument()
  })

  test('renders back to home button', () => {
    renderWithRouter()
    const button = screen.getByRole('link', { name: /kembali ke beranda/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', '/')
  })
})
