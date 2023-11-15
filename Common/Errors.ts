import { defineMessages, IntlShape } from 'react-intl';

const fieldCharLimits = 150;

const translations = defineMessages({
  Empty: {
    id: 'form.Errors.Empty',
    defaultMessage: 'The field cannot be empty.'
  },
  MinValue: {
    id: 'form.Errors.MinValue',
    defaultMessage: 'The field cannot be less than {value, number}.'
  },
  MaxValue: {
    id: 'form.Errors.MaxValue',
    defaultMessage: 'The field cannot be more than {value, number}.'
  },
  MinLength: {
    id: 'form.Errors.MinLength',
    defaultMessage:
      'The field cannot be less than {value, number} characters long.'
  },
  MaxLength: {
    id: 'form.Errors.MaxLength',
    defaultMessage:
      'The field cannot be more than {value, number} characters long.'
  },
  LogoUrl: {
    id: 'form.Errors.LogoUrl',
    defaultMessage: 'Invalid logo url.'
  },
  Type: {
    id: 'form.Errors.Type',
    defaultMessage: 'Invalid field type {type}.'
  },
  Email: {
    id: 'form.Errors.Email',
    defaultMessage: 'The provided email address is invalid.'
  },
  Phone: {
    id: 'form.Errors.Phone',
    defaultMessage: 'The provided phone number is invalid.'
  },
  UnapprovedEmail: {
    id: 'form.Errors.UnapprovedEmail',
    defaultMessage:
      'Invalid Email Address, please input approved email address.'
  },
  Discounts: {
    id: 'form.Errors.Discounts',
    defaultMessage: 'Invalid discounts format.'
  },
  TaxRateRange: {
    id: 'form.Errors.TaxRateRange',
    defaultMessage: 'Tax Rate must be between 0 and 100.'
  }
});

const alphanumericPattern = /^[0-9a-z]*$/i;

export function getPhoneNumberError(
  value: unknown,
  nullable = true,
  size = 30
) {
  // const error = getNumberError(Number(value), nullable);
  // if (error) {
  //   return error;
  // }
  const regex = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;

  if (!regex.test(value as string)) {
    return translations.Phone.defaultMessage;
  }
}

export function getEmailError(
  value: unknown,
  nullable = true,
  size = fieldCharLimits,
  allowedDomains?: readonly string[]
): string | undefined {
  const error = getStringError(value, nullable, size);
  if (error) {
    return error;
  }

  const regex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gi;
  if (!regex.test(value as string)) {
    return translations.Email.defaultMessage;
  }

  if (allowedDomains && allowedDomains.length > 0) {
    const emailAddress = value as string;
    const emailDomain = emailAddress.slice(emailAddress.indexOf('@'));
    if (!allowedDomains.includes(emailDomain)) {
      return translations.UnapprovedEmail.defaultMessage;
    }
  }

  return undefined;
}

export function getDescriptionError(
  value: unknown,
  intl: IntlShape,
  nullable = true,
  size = 250
): string | undefined {
  return getStringError(value, nullable, size);
}

export function getStringError(
  value: unknown,
  nullable = true,
  size = fieldCharLimits
): string | undefined {
  if (typeof value !== 'string' && value !== undefined) {
    // return intl.formatMessage(translations.Type, { type: typeof value });
    return translations.Type.defaultMessage
  }

  if (!nullable && !value?.trim().length) {
    return translations.Empty.defaultMessage
  }

  if (value && value.length > size) {
    return translations.MaxLength.defaultMessage
  }

  return undefined;
}

export function getDateError(
  value: unknown,
  nullable = true
): string | undefined {
  return !nullable && value === undefined
    ? translations.Empty.defaultMessage
    : undefined;
}

export function getNumberError(
  value: unknown,
  nullable = true
): string | undefined {
  if (!nullable && value === undefined || value == 0) {
    return translations.Empty.defaultMessage;
  }

  if (typeof value !== 'number' && value !== undefined) {
    return translations.Type.defaultMessage; //, { type: typeof value });
  }

  return undefined;
}

export function getTaxRateError(
  value: unknown,
  intl: IntlShape,
  nullable = true
): string | undefined {
  if (!nullable && value === undefined) {
    return intl.formatMessage(translations.Empty);
  }

  if (typeof value !== 'number' && value !== undefined) {
    return intl.formatMessage(translations.Type, { type: typeof value });
  }

  if (typeof value === 'number' && value > 1) {
    return intl.formatMessage(translations.TaxRateRange);
  }

  return undefined;
}

export function getReferenceCodeError(
  value: unknown,
  intl: IntlShape,
  nullable = true,
  size = fieldCharLimits
): string | undefined {
  const validation = getStringError(value, nullable, size);

  if (validation) {
    return validation;
  }

  if (!alphanumericPattern.test(String(value).trim())) {
    return intl.formatMessage({
      id: 'Admin.Manager.DataFieldDesigner.Settings.ReferenceCode.InvalidCharacters',
      defaultMessage: 'Only alphanumeric characters allowed'
    });
  }

  return undefined;
}

interface IntegerConfiguration {
  MaxValue: number;
  MinValue: number;
}

export function getIntegerError(
  value: number | undefined,
  intl: IntlShape,
  nullable = true,
  configuration: IntegerConfiguration
): string | undefined {
  const validation = getNumberError(value, nullable);

  if (validation) {
    return validation;
  }

  if (value !== undefined && value < configuration.MinValue) {
    return intl.formatMessage(translations.MinValue, {
      value: configuration.MinValue
    });
  }

  if (value !== undefined && value > configuration.MaxValue) {
    return intl.formatMessage(translations.MaxValue, {
      value: configuration.MaxValue
    });
  }

  return undefined;
}

export function getPickListError(
  value: readonly { readonly Value: string; readonly ShortCode: string }[],
  intl: IntlShape,
  nullable = true
): string | undefined {
  if (value.length === 0 && !nullable) {
    return intl.formatMessage(translations.Empty);
  }

  return undefined;
}

interface TextConfiguration {
  MaxLength: number;
  MinLength: number;
}

export function getTextError(
  value: string | undefined,
  intl: IntlShape,
  nullable = true,
  configuration: TextConfiguration
): string | undefined {
  const validation = getStringError(value, nullable);

  if (validation) {
    return validation;
  }

  if (value && value.length < configuration.MinLength) {
    return intl.formatMessage(translations.MinLength, {
      value: configuration.MinLength
    });
  }

  if (value && value.length > configuration.MaxLength) {
    return intl.formatMessage(translations.MaxLength, {
      value: configuration.MaxLength
    });
  }

  return undefined;
}
