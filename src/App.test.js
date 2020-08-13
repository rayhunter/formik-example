import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor, waitForDomChange } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it("submits correct values", async () => {
  const { container } = render(<App />)
  const name = container.querySelector('input[name="name"]')
  const email = container.querySelector('input[name="email"]')
  const color = container.querySelector('select[name="color"]')
  const submit = container.querySelector('button[type="submit"]')
  const results = container.querySelector("textarea");

  await waitFor(() => {
    fireEvent.change(name, {
      target: {
        value: "mockname"
      }
    })
  })

  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mock@email.com"
      }
    })
  })

  await waitFor(() => {
    fireEvent.change(color, {
      target: {
        value: "green"
      }
    })
  })

  await waitFor(() => {
    fireEvent.click(submit)
  })

  expect(results.innerHTML).toBe(
    '{"email":"mock@email.com","name":"mockname","color":"green"}'
  )
})