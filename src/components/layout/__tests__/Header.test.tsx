import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'
import { ComparisonProvider } from '../../../contexts/ComparisonContext'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ComparisonProvider>
        {component}
      </ComparisonProvider>
    </BrowserRouter>
  )
}

describe('Header', () => {
  test('renders logo with link to home', () => {
    renderWithProviders(<Header />)
    const logoLink = screen.getByRole('link', { name: /danatharu/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  test('renders navigation links for Marketplace and Kalkulator', () => {
    renderWithProviders(<Header />)
    expect(screen.getByRole('link', { name: /marketplace/i })).toHaveAttribute('href', '/marketplace')
    expect(screen.getByRole('link', { name: /kalkulator/i })).toHaveAttribute('href', '/kalkulator')
  })

  test('renders Bandingkan button', () => {
    renderWithProviders(<Header />)
    expect(screen.getByRole('link', { name: /bandingkan/i })).toHaveAttribute('href', '/bandingkan')
  })

  test('has sticky top navigation class', () => {
    renderWithProviders(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky')
    expect(header).toHaveClass('top-0')
  })

  test('has white background color', () => {
    renderWithProviders(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-white')
  })

  test('mobile menu is hidden by default on desktop', () => {
    renderWithProviders(<Header />)
    const mobileMenu = screen.queryByRole('navigation', { name: /mobile menu/i })
    expect(mobileMenu).not.toBeInTheDocument()
  })

  test('hamburger button toggles mobile menu', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)
    
    const hamburger = screen.getByRole('button', { name: /menu/i })
    await user.click(hamburger)
    
    const mobileMenu = screen.getByRole('navigation', { name: /mobile menu/i })
    expect(mobileMenu).toBeInTheDocument()
    expect(mobileMenu).toHaveTextContent(/marketplace/i)
    expect(mobileMenu).toHaveTextContent(/kalkulator/i)
    expect(mobileMenu).toHaveTextContent(/bandingkan/i)
  })

  test('hamburger button closes mobile menu when clicked again', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)
    
    const hamburger = screen.getByRole('button', { name: /menu/i })
    await user.click(hamburger)
    await user.click(hamburger)
    
    const mobileMenu = screen.queryByRole('navigation', { name: /mobile menu/i })
    expect(mobileMenu).not.toBeInTheDocument()
  })

  test('hamburger button is hidden on desktop', () => {
    renderWithProviders(<Header />)
    const hamburger = screen.getByRole('button', { name: /menu/i })
    expect(hamburger).toHaveClass('md:hidden')
  })

  test('desktop navigation is hidden on mobile', () => {
    renderWithProviders(<Header />)
    const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(desktopNav).toHaveClass('hidden')
    expect(desktopNav).toHaveClass('md:flex')
  })
})
