export const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + '-'
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3) + '.'
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3)
  }
  return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6) + '.' + onlyNums.slice(6, 10)
}

export const numsOnly = (value,previousValue) => {
	if(!value){
		return value
	}
	if((value.match(/\./g) || []).length > 1){
		return previousValue
	}
	return value.replace(/[^\d.]/g, '')
}

export const normalizeAbbrev = value => value && value.toUpperCase().slice(0,2)

export const normalizeSlug = value => value && value.toString().toLowerCase()
  .replace(/\s+/g, '-')           // Replace spaces with -
  .replace(/[^\w-]+/g, '')       // Remove all non-word chars
  .replace(/--+/g, '-')         // Replace multiple - with single -
  .replace(/^-+/, '')             // Trim - from start of text
