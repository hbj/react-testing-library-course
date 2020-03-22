import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Counter} from '../redux-counter-view'

describe('Counter', () => {
  test('displays correct count', () => {
    const {rerender, getByLabelText} = render(<Counter count={1} />)

    expect(getByLabelText(/count/i)).toHaveTextContent('1')

    rerender(<Counter count={2} />)

    expect(getByLabelText(/count/i)).toHaveTextContent('2')
  })

  test('calls increment() prop', () => {
    const increment = jest.fn()
    const {getByText} = render(<Counter count={1} increment={increment} />)

    fireEvent.click(getByText('+'))
    expect(increment).toHaveBeenCalledTimes(1)
  })

  test('calls decrement() prop', () => {
    const decrement = jest.fn()
    const {getByText} = render(<Counter count={1} decrement={decrement} />)

    fireEvent.click(getByText('-'))
    expect(decrement).toHaveBeenCalledTimes(1)
  })
})
