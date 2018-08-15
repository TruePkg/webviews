/* eslint no-magic-numbers: 0 */
import { PhoneNumberUtil } from 'google-libphonenumber'
import Payment from 'payment'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import isNaN from 'lodash/isNaN'

export const required = (msg = 'Required') => value =>
  value === undefined ||
  value === null ||
  value === '' ||
  (isBoolean(value) && false)
    ? msg
    : undefined

export const requiredWhen = (comparator, msg = 'Required') => (
  value,
  allValues
) => (comparator(allValues) ? required(msg)(value) : undefined)

export const min = (minVal, msg) => value => {
  const parsedValue = parseFloat(value)
  return isNaN(parsedValue) || parsedValue < minVal
    ? msg || `Value is less than minimum value of ${minVal}`
    : undefined
}

export const max = (maxVal, msg) => value => {
  const parsedValue = parseFloat(value)
  return isNaN(parsedValue) || parsedValue > maxVal
    ? msg || `Value is less than minimum value of ${maxVal}`
    : undefined
}

export const validTime = (msg = 'Invalid Time') => value =>
  !isNumber(value) || value < 0 || value > 2359 ? msg : undefined

export const mustEqualField = (fieldToMatch, msg) => (value, allValues) =>
  value !== allValues.get(fieldToMatch)
    ? msg || `Must match ${fieldToMatch} field`
    : undefined

export const email = (msg = 'Invalid email') => value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? msg
    : undefined

export const phone = (msg = 'Invalid Phone') => value => {
  const phoneUtil = PhoneNumberUtil.getInstance()
  if (value && value.length > 1) {
    const phoneNumber = phoneUtil.parse(value, 'US')
    return value && !phoneUtil.isValidNumber(phoneNumber) ? msg : undefined
  }
}

export const name = (msg = 'Only letters and spaces allowed') => value =>
  value && !/^[a-zA-Z ]*$/g.test(value) ? msg : undefined

export const creditCardNumber = (msg = 'Invalid credit card') => value =>
  value && !Payment.fns.validateCardNumber(value) ? msg : undefined

export const creditCardExp = (msg = 'Invalid expiration date') => value =>
  value && !Payment.fns.validateCardExpiry(value) ? msg : undefined

export const creditCardCvc = (msg = 'Invalid CVC') => value =>
  value && !Payment.fns.validateCardCVC(value) ? msg : undefined

export const zip = (msg = 'Invalid zip') => value =>
  value && !/(^\d{5}(?:[-\s]\d{4})?$)/.test(value) ? msg : undefined

export const normalizePhone = value => {
  if (!value) {
    return value || ''
  }

  if (value[0] === '+') {
    value = value.substring(1)
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  if (onlyNums.length === 11) {
    return `${onlyNums.slice(0, 1)} (${onlyNums.slice(1, 4)}) ${onlyNums.slice(
      4,
      7
    )}-${onlyNums.slice(7, 11)}`
  }
  return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(
    6,
    10
  )}`
}

export const formatPhone = value => {
  const phoneUtil = PhoneNumberUtil.getInstance()
  if (value && value.length > 1) {
    const phoneNumber = phoneUtil.parse(value, 'US')
    return phoneUtil.format(phoneNumber)
  }
}

export default {
  required
}
