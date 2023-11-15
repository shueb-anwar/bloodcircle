import { useState } from 'react';

import { getStringError, getEmailError, getPhoneNumberError, getNumberError } from '../Common/Errors';
import { BloodRequest } from './useRequestBloodForm';

type DonorValidation = Readonly<Partial<Record<keyof BloodRequest, string>>> & {
};

export default function useValidation() {
  const [errors, setErrors] = useState<DonorValidation>({});
  const required: Array<keyof BloodRequest> = ['for', 'name', 'bloodGroup', 'units', 'condition', 'hospital'];

  function hasRequiredProperties(request: BloodRequest) {
    const hasRequiredFields = required.every(
      (key) => {
        if(request.for === 'myself' && (key === 'name' || key == 'bloodGroup')) {
          return true;
        }

        return request[key] !== undefined && request[key] !== ''
      }
    );

    return (
      hasRequiredFields
    );
  }

  function getPropertyError(name: string, value: unknown) {
    const validators = new Map([
      ['for', getStringError],
      ['name', getStringError],
      ['bloogGroup', getStringError],
      ['units', getNumberError],
      ['condition', getStringError],
      ['hospital', getStringError],
    ]);

    if (validators.has(name)) {
      const validator = validators.get(name)!;

      return validator(
        value,
        !required.includes(name as keyof BloodRequest),
        name === 'mobile' ? 11 : name === 'postcode' ? 6 : undefined
      );
    }

    return undefined;
  }

  return {
    required,
    errors,
    validateProperty: (name: keyof BloodRequest, value: unknown) =>
      setErrors({
        ...errors,
        [name]: getPropertyError(name as string, value)
      }),
    hasRequiredProperties
  };
}
