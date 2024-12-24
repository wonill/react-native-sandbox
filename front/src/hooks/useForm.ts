import React, { useEffect, useState } from 'react';

interface useFormProps<T> {
  initialValue : T;
  validate: (values: T) => Record<string, string>
}

function useForm<T>({initialValue, validate}: useFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeValues = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    })
  }

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name] : true,
    })
  }

  useEffect(() => {
    const newError = validate(values);
    setErrors(newError);
  },[values])

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (text: string) => handleChangeValues(name, text);
    const onBlur = () => handleBlur(name);

    return {value, onChangeText, onBlur};
  }

  return {values, errors, touched, getTextInputProps};
}

export default useForm;