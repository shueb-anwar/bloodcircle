import { useState } from 'react';
import useValidation from './useRequestBloodValidation';

export type For = "myself" | "friend" | "family";
export interface BloodRequest {
  for: For;
  name: string;
  bloodGroup: string;
  units: number;
  condition: string;
  hospital: string;
}

const newRequest: BloodRequest = {
  for: 'myself',
  name: '',
  bloodGroup: '',
  units: 0,
  condition: '',
  hospital: ''
};

export default function useRequestBloodForm(
  currentrequest = newRequest
) {
  const [request, setRequest] = useState<BloodRequest>(currentrequest);
  const [dirty, setDirty] = useState(false);
  const { errors, validateProperty, hasRequiredProperties } =
    useValidation();

  const isEditing = request.name !== undefined;

  const isValid =
    Object.values(errors).every((value) => typeof value === 'undefined') &&
    hasRequiredProperties(request);

  const isSaveDisabled = (isEditing && !dirty) || !isValid;

  function onPropertyChange<T extends keyof BloodRequest>(
    name: T,
    value: BloodRequest[T]
  ) {

    setRequest((prevRequest: BloodRequest) => ({
      ...prevRequest,
      [name]: value
    }));
    setDirty(true);
    validateProperty(name, value);
  }

  return {
    request,
    errors,
    dirty,
    onPropertyChange,
    isSaveDisabled,
    isEditing
  };
}
