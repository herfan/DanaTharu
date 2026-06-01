import { useState, useCallback } from 'react'

export interface RangeSliderProps {
  min: number
  max: number
  step: number
  values: [number, number]
  onChange: (values: [number, number]) => void
  label?: string
  className?: string
}

export function RangeSlider({
  min,
  max,
  step,
  values,
  onChange,
  label,
  className = '',
}: RangeSliderProps) {
  const [localValues, setLocalValues] = useState<[number, number]>(values)

  const handleMinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setLocalValues(prev => {
      const constrained = Math.min(newValue, prev[1])
      const newValues: [number, number] = [constrained, prev[1]]
      onChange(newValues)
      return newValues
    })
  }, [onChange])

  const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    setLocalValues(prev => {
      const constrained = Math.max(newValue, prev[0])
      const newValues: [number, number] = [prev[0], constrained]
      onChange(newValues)
      return newValues
    })
  }, [onChange])

  const handleMinKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    let newValue = localValues[0]
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      newValue = Math.min(localValues[0] + step, localValues[1])
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      newValue = Math.max(localValues[0] - step, min)
    } else {
      return
    }
    e.preventDefault()
    setLocalValues([newValue, localValues[1]])
    onChange([newValue, localValues[1]])
  }, [localValues, step, min, onChange])

  const handleMaxKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    let newValue = localValues[1]
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      newValue = Math.min(localValues[1] + step, max)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      newValue = Math.max(localValues[1] - step, localValues[0])
    } else {
      return
    }
    e.preventDefault()
    setLocalValues([localValues[0], newValue])
    onChange([localValues[0], newValue])
  }, [localValues, step, max, onChange])

  const rangePercent = ((localValues[1] - localValues[0]) / (max - min)) * 100
  const leftPercent = ((localValues[0] - min) / (max - min)) * 100

  return (
    <div data-testid="range-slider-container" className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="flex justify-between mb-2 text-sm font-semibold text-danatharu-green">
        <span>Rp {localValues[0].toLocaleString('id-ID')}</span>
        <span>Rp {localValues[1].toLocaleString('id-ID')}</span>
      </div>
      <div className="relative h-6">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-full bg-danatharu-green rounded-full"
            style={{
              left: `${leftPercent}%`,
              width: `${rangePercent}%`,
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValues[0]}
          onChange={handleMinChange}
          onKeyDown={handleMinKeyDown}
          aria-label={`Minimum ${label || 'value'}`}
          className="absolute top-1/2 -translate-y-1/2 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-danatharu-green [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-danatharu-green [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValues[1]}
          onChange={handleMaxChange}
          onKeyDown={handleMaxKeyDown}
          aria-label={`Maximum ${label || 'value'}`}
          className="absolute top-1/2 -translate-y-1/2 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-danatharu-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-danatharu-gold [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  )
}
