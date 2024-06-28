import { calculateGrossSalary, calculatePensionContribution, calculatePAYETax, calculateBasicSalary } from '../components/SalaryCalculator'

describe('SalaryCalculator', () => {
  test('calculatePensionContribution should return correct pension contributions', () => {
    const basicSalary = 5000
    const expectedContributions = {
      tier1Employer: 650, // 13% of 5000
      tier2Employee: 275, // 5.5% of 5000
      tier3Employee: 250, // 5% of 5000
      tier3Employer: 250, // 5% of 5000
    }
    expect(calculatePensionContribution(basicSalary)).toEqual(expectedContributions)
  })

  test('calculatePAYETax should return correct PAYE tax', () => {
    const taxableIncome = 10000
    const expectedTax = 0 * 365 + 0.05 * 110 + 0.1 * 130 + 0.175 * 3000 + 0.25 * (10000 - 365 - 110 - 130 - 3000)
    expect(calculatePAYETax(taxableIncome)).toBeCloseTo(expectedTax)
  })

  test('calculateBasicSalary should return correct basic salary', () => {
    const grossSalary = 10000
    const allowances = 2000
    const expectedBasicSalary = 8000
    expect(calculateBasicSalary(grossSalary, allowances)).toBe(expectedBasicSalary)
  })

  test('calculateGrossSalary should return correct gross salary details', () => {
    const netSalary = 7000
    const allowances = 1000
    const result = calculateGrossSalary(netSalary, allowances)

    expect(result).toEqual(expect.objectContaining({
      grossSalary: expect.any(String),
      basicSalary: expect.any(String),
      payeTax: expect.any(String),
      employeePensionAmt: expect.any(String),
      employerPensionAmt: expect.any(String),
    }))
  })

  test('calculateGrossSalary with zero allowances should return correct gross salary details', () => {
    const netSalary = 7000
    const allowances = 0
    const result = calculateGrossSalary(netSalary, allowances)

    expect(result).toEqual(expect.objectContaining({
      grossSalary: expect.any(String),
      basicSalary: expect.any(String),
      payeTax: expect.any(String),
      employeePensionAmt: expect.any(String),
      employerPensionAmt: expect.any(String),
    }))
  })

  test('calculateGrossSalary with zero net salary should return zeroed results', () => {
    const netSalary = 0
    const allowances = 0
    const result = calculateGrossSalary(netSalary, allowances)

    expect(result).toEqual({
      grossSalary: '0.00',
      basicSalary: '0.00',
      payeTax: '0.00',
      employeePensionAmt: '0.00',
      employerPensionAmt: '0.00',
    })
  })

  test('calculateGrossSalary should handle high allowances correctly', () => {
    const netSalary = 7000
    const allowances = 5000
    const result = calculateGrossSalary(netSalary, allowances)

    expect(parseFloat(result.basicSalary)).toBeGreaterThan(0)
    expect(parseFloat(result.grossSalary)).toBeGreaterThan(parseFloat(result.basicSalary))
  })
})