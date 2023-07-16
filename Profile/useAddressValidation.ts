import { useState } from 'react';

import { getStringError } from '../Common/Errors';

export interface Address {
  address: string;
  state: string;
  city: string;
  pin: string;
}

type Validation = Readonly<Partial<Record<keyof Address, string>>> & {
};

export default function useValidation() {
  const [errors, setErrors] = useState<Validation>({});
  const required: Array<keyof Address> = ['address', 'state', 'city', 'pin'];

  function hasRequiredProperties(address: Address) {
    const hasRequiredFields = required.every(
      (key) => address[key] !== undefined && address[key] !== ''
    );

    return (
      hasRequiredFields
    );
  }

  function getPropertyError(name: string, value: unknown) {
    const validators = new Map([
      ['address', getStringError],
      ['state', getStringError],
      ['city', getStringError],
      ['pin', getStringError]
    ]);

    if (validators.has(name)) {
      const validator = validators.get(name)!;

      return validator(
        value,
        !required.includes(name as keyof Address),
        name === 'mobile' ? 11 : name === 'postcode' ? 6 : undefined
      );
    }

    return undefined;
  }

  return {
    required,
    errors,
    validateProperty: (name: keyof Address, value: unknown) =>
      setErrors({
        ...errors,
        [name]: getPropertyError(name as string, value)
      }),
    hasRequiredProperties
  };
}