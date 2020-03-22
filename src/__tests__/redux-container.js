import React from 'react'
import {useSelector} from 'react-redux'
import {render} from '@testing-library/react'
import {Counter} from '../redux-counter-view'
import {CounterContainer} from '../redux-counter-container'

const mockDispatch = jest.fn()

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn().mockImplementation(() => mockDispatch),
    useSelector: jest.fn(),
  }
})

jest.mock('../redux-counter-view')

Counter.mockReturnValue(null)

describe('CounterContainer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders view with correct arguments', () => {
    useSelector.mockImplementation(selector => selector({count: 1}))

    render(<CounterContainer />)

    expect(Counter).toHaveBeenCalledTimes(1)

    expect(Counter).toHaveBeenCalledWith(
      {
        count: 1,
        increment: expect.any(Function),
        decrement: expect.any(Function),
      },
      {},
    )
  })

  test('dispatches the increment action', () => {
    render(<CounterContainer />)

    expect(Counter).toHaveBeenCalledTimes(1)

    const props = Counter.mock.calls[0][0]

    props.increment()

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({type: 'INCREMENT'})
  })

  test('dispatches the decrement action', () => {
    render(<CounterContainer />)

    expect(Counter).toHaveBeenCalledTimes(1)

    const props = Counter.mock.calls[0][0]

    props.decrement()

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({type: 'DECREMENT'})
  })
})
