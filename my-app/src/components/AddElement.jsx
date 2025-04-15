import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Схемы валидации для разных типов данных
const validationSchemas = {
  datas: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required').positive().integer(),
    email: Yup.string().email().required('Email is required'),
    pet: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string(),
        age: Yup.number(),
      }))
  }),
};

const initialValues = {
    "datas": {
        "name": '',
        "age": 18,
        "email": '',
        "pet": [
            {
            "name": '',
            "age": 5,
            }
        ]
    }
}
   

const AddForm = ({ type, onSubmit }) => {
  const schema = validationSchemas[type];
  const initial = initialValues[type];

  return (
    <Formik
      initialValues={initial}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="add-form">
          <h3>Add new object</h3>
          
          {type === 'datas' && (
            <>
              <div className="form-group-1">
                <p>User's data:</p>
                <div className="form-group">
                    <label>Name</label>
                    <Field name="name" type="text" />
                    <ErrorMessage name="name" component="div" className="error" />
                </div>
                
                <div className="form-group">
                    <label>Age</label>
                    <Field name="age" type="number" />
                    <ErrorMessage name="age" component="div" className="error" />
                </div>
                
                <div className="form-group">
                    <label>Email</label>
                    <Field name="email" type="text" />
                    <ErrorMessage name="email" component="div" className="error" />
                </div>
              </div>

              <div className="form-group-1">
                <p>Pet data:</p>

                <div className="form-group">
                    <label>Name</label>
                    <Field name="pet[0].name" type="text" />
                    <ErrorMessage name="pet[0].name" component="div" className="error" />
                </div>
                
                <div className="form-group">
                    <label>Age</label>
                    <Field name="pet[0].age" type="number" />
                    <ErrorMessage name="pet[0].age" component="div" className="error" />
                </div>
              </div>
            </>
          )}

          <button type="submit" disabled={isSubmitting}>
            Add object
          </button>
        </Form>
      )}
    </Formik>
  );
};

const AddElement = ({ data, type }) => {
  const addComment = async (newComment) => {
    data.push(newComment);
  };

  return (
    <div>
      <AddForm type={type} onSubmit={addComment} />
    </div>
  );
};

export default AddElement;