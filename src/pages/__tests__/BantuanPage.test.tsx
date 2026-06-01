import { render, screen, fireEvent } from '@testing-library/react'
import BantuanPage from '../BantuanPage'

describe('BantuanPage', () => {
  describe('Header', () => {
    test('renders page title', () => {
      render(<BantuanPage />)
      expect(screen.getByRole('heading', { name: /bantuan/i })).toBeInTheDocument()
    })

    test('renders subtitle', () => {
      render(<BantuanPage />)
      expect(screen.getByText(/pertanyaan yang sering diajukan/i)).toBeInTheDocument()
    })
  })

  describe('FAQ', () => {
    test('renders all FAQ questions', () => {
      render(<BantuanPage />)
      expect(screen.getByText('Apa itu Danatharu?')).toBeInTheDocument()
      expect(screen.getByText('Apa itu BPR?')).toBeInTheDocument()
      expect(screen.getByText('Apakah deposito di BPR aman?')).toBeInTheDocument()
      expect(screen.getByText('Bagaimana cara mendaftar deposito?')).toBeInTheDocument()
      expect(screen.getByText('Berapa minimal setoran deposito?')).toBeInTheDocument()
      expect(screen.getByText('Apa perbedaan deposito Konvensional dan Syariah?')).toBeInTheDocument()
      expect(screen.getByText('Bagaimana cara menghitung bunga deposito?')).toBeInTheDocument()
      expect(screen.getByText('Apakah ada biaya tambahan?')).toBeInTheDocument()
    })

    test('toggles answer when question is clicked', () => {
      render(<BantuanPage />)
      const question = screen.getByText('Apa itu Danatharu?')
      fireEvent.click(question)
      expect(screen.getByText(/platform aggregator deposito digital/i)).toBeInTheDocument()
      fireEvent.click(question)
      expect(screen.queryByText(/platform aggregator deposito digital/i)).not.toBeInTheDocument()
    })

    test('closes previous answer when new question is clicked', () => {
      render(<BantuanPage />)
      const q1 = screen.getByText('Apa itu Danatharu?')
      const q2 = screen.getByText('Apa itu BPR?')

      fireEvent.click(q1)
      expect(screen.getByText(/platform aggregator deposito digital/i)).toBeInTheDocument()

      fireEvent.click(q2)
      expect(screen.queryByText(/platform aggregator deposito digital/i)).not.toBeInTheDocument()
      expect(screen.getByText(/bank perkreditan rakyat/i)).toBeInTheDocument()
    })

    test('FAQ buttons have aria-expanded attribute', () => {
      render(<BantuanPage />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-expanded')
      })
    })
  })

  describe('Contact Section', () => {
    test('renders email contact header', () => {
      render(<BantuanPage />)
      expect(screen.getByText(/masih punya pertanyaan/i)).toBeInTheDocument()
    })

    test('renders email link', () => {
      render(<BantuanPage />)
      const emailLink = screen.getByText('support@danatharu.id')
      expect(emailLink).toBeInTheDocument()
      expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:support@danatharu.id')
    })
  })
})
