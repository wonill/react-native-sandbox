import React, {useEffect, useState, useCallback, useMemo} from 'react';

interface useFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<string, string>;
}

function useForm<T>({initialValue, validate}: useFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeValues = useCallback((name: keyof T, text: string) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: text,
    }));
  }, []);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true,
    }));
  }, []);

  useEffect(() => {
    const newError = validate(values);
    setErrors(newError);
  }, [values, validate]);

  const getTextInputProps = useMemo(
    () => (name: keyof T) => {
      const value = values[name];
      const onChangeText = (text: string) => handleChangeValues(name, text);
      const onBlur = () => handleBlur(name);

      return {value, onChangeText, onBlur};
    },
    [values, handleChangeValues, handleBlur],
  );

  return {values, errors, touched, getTextInputProps};
}

export default useForm;
