import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'

function CustomInput({ field, form, ...props }) {
  return <input {...field} {...props} />
}

function App() {
  const [result, setResult] = useState('')
  return (
    // Formik is the main component that handles all the logic
    // Form is just a regular html <form> wrapper
    <Formik
      initialValues={{
        email: '',
        name: '',
        color: 'red'
      }}
      onSubmit={(values, actions) => {
        setResult(JSON.stringify(values))
      }}
    >
      {() => (
        <Form>
          <Field as="select" name="color" value="none">
            <option value="none">Pick a color</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </Field>
          <br />
          <Field name="email">
            {({ field }) => (
              <div>
                <label>email:</label>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  {...field}
                />
              </div>
            )}
          </Field>
          <br />
          <Field
            name="name"
            required
            placeholder="Name"
            component={CustomInput}
          />
          <br />
          <button type="submit">Submit</button>
          <br />
          <br />
          <Field
            style={{ width: '100%'}}
            as="textarea"
            value={result}
            rows={2}
          />
        </Form>
      )}
    </Formik>  
  );
}

export default App;
