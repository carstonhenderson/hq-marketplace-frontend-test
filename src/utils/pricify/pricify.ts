/***************************************************************************
 * FUNCTION FOR MANIPULATING AN INTEGER INTO A CURRENCY-FORMED VALUE
 * TAKES: a whole number (required), and a boolean for
 *        whether the value should be returned as type "number"
 * RETURNS: a value set to two decimal places either as a string or a number
 ****************************************************************************/

export const pricify = (price: number, asNumber?: boolean) => {
  const dollarsToCents = price / Math.pow(10, 2)

  return asNumber
    ? Number(dollarsToCents.toFixed(2))
    : `$${dollarsToCents.toFixed(2)}`
}
