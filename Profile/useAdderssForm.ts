import { useState } from 'react';
import useValidation, { Address } from "./useAddressValidation"


const newAddress: Address = {
  address: '',
  state: '',
  city: '',
  pin: ''
};

export default function useAdderssForm(
  currentAddress = newAddress
) {
  const [address, setAddress] = useState<Address>(currentAddress);
  const [dirty, setDirty] = useState(false);
  const { errors, validateProperty, hasRequiredProperties } =
  useValidation();

  const isEditing = address.address !== undefined;

  const isDonorValid =
    Object.values(errors).every((value) => typeof value === 'undefined') &&
    hasRequiredProperties(address);

  const isSaveDisabled = (isEditing && !dirty) || !isDonorValid;

  function onPropertyChange<T extends keyof Address>(
    name: T,
    value: Address[T]
  ) {
    setAddress((prevAddress: Address) => ({
      ...prevAddress,
      [name]: value
    }));
    setDirty(true);
    validateProperty(name, value);
  }

  return {
    address,
    errors,
    dirty,
    onPropertyChange,
    isSaveDisabled,
    isEditing
  };
}
