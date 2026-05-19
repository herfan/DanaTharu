import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Header', () => {
  test('renders logo with link to home', () => {
    renderWithRouter(<Header />)
    const logoLink = screen.getByRole('link', { name: /danatharu/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  test('renders navigation links for Marketplace and Kalkulator', () => {
    renderWithRouter(<Header />)
    expect(screen.getByRole('link', { name: /marketplace/i })).toHaveAttribute('href', '/marketplace')
    expect(screen.getByRole('link', { name: /kalkulator/i })).toHaveAttribute('href', '/kalkulator')
  })

  test('renders Bandingkan button', () => {
    renderWithRouter(<Header />)
    expect(screen.getByRole('button', { name: /bandingkan/i })).toBeInTheDocument()
  })

  test('has sticky top navigation class', () => {
    renderWithRouter(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky')
    expect(header).toHaveClass('top-0')
  })

  test('has green background color', () => {
    renderWithRouter(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-danatharu-green')
  })

  test('mobile menu is hidden by default on desktop', () => {
    renderWithRouter(<Header />)
    const mobileMenu = screen.queryByRole('navigation', { name: /mobile menu/i })
    expect(mobileMenu).not.toBeInTheDocument()
  })

  test('hamburger button toggles mobile menu', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Header />)
    
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
    renderWithRouter(<Header />)
    
    const hamburger = screen.getByRole('button', { name: /menu/i })
    await user.click(hamburger)
    await user.click(hamburger)
    
    const mobileMenu = screen.queryByRole('navigation', { name: /mobile menu/i })
    expect(mobileMenu).not.toBeInTheDocument()
  })

  test('hamburger button is hidden on desktop', () => {
    renderWithRouter(<Header />)
    const hamburger = screen.getByRole('button', { name: /menu/i })
    expect(hamburger).toHaveClass('md:hidden')
  })

  test('desktop navigation is hidden on mobile', () => {
    renderWithRouter(<Header />)
    const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(desktopNav).toHaveClass('hidden')
    expect(desktopNav).toHaveClass('md:flex')
  })
})
