// Group a decimal string without converting it to a possibly imprecise Number.
function formatNumber(value) {
  const match = /^([+-]?)(\d+)(\.\d+)?$/.exec(String(value))
  if (!match) throw new TypeError('Expected a decimal string')
  const [, sign, integer, fraction = ''] = match
  return sign + integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + fraction
}
