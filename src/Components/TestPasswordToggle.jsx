import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputFiled from './Forms/InputField';
const TestPasswordToggle = () => {
  const initialValues = {
    password: '',
    regularPassword: ''
  };

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    regularPassword: Yup.string().required('Password is required')
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Password Toggle Test</h3>
            </div>
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <Form>
                    <div className="mb-4">
                      <h5>With Password Toggle:</h5>
                      <InputField
                        label="Password with toggle"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        showPasswordToggle={true}
                      />
                    </div>

                    <div className="mb-4">
                      <h5>Without Password Toggle:</h5>
                      <InputFiled
                        label="Regular password input"
                        name="regularPassword"
                        type="password"
                        placeholder="Enter password"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPasswordToggle;