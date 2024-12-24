import { useState } from "react"

interface UseFormProps<T> {
    initialValue: T;
}

function useForm<T>({initialValue}: UseFormProps<T>) {
    const [values, setValues] = useState(initialValue)
    const [touched, setTouched] = useState<Record<string, boolean>>(initialValue)
}

export default useForm;