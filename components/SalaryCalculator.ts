
const pensionRates = {
  tier1: { employer: 0.13, employee: 0 },
  tier2: { employer: 0, employee: 0.055 },
  tier3: { employer: 0.05, employee: 0.05 },
}

export const calculatePensionContribution = (basicSalary: number) => {
  const { tier1, tier2, tier3 } = pensionRates

  return {
    tier1Employer: basicSalary * tier1.employer,
    tier2Employee: basicSalary * tier2.employee,
    tier3Employee: basicSalary * tier3.employee,
    tier3Employer: basicSalary * tier3.employer,
  }
}

const calculateTaxableIncome = (grossSalary: number, totalEmployeePension: number) => {
  return grossSalary - totalEmployeePension
}

const taxBrackets = [
  { limit: 365, rate: 0 },
  { limit: 475, rate: 0.05 },
  { limit: 605, rate: 0.1 },
  { limit: 3605, rate: 0.175 },
  { limit: 20000, rate: 0.25 },
  { limit: Infinity, rate: 0.3 },
]

export const calculatePAYETax = (taxableIncome) => {
  let payeTax = 0
  let remainingIncome = taxableIncome
  let previousLimit = 0

  for (const bracket of taxBrackets) {
    if (remainingIncome <= 0) break
    const taxableAmountInBracket = Math.min(remainingIncome, bracket.limit - previousLimit)
    payeTax += taxableAmountInBracket * bracket.rate
    remainingIncome -= taxableAmountInBracket
    previousLimit = bracket.limit
  }

  return payeTax
}

export const calculateBasicSalary = (grossSalary: number, allowances: number) => {
  return grossSalary - allowances
}

export const calculateGrossSalary = (netSalary: number, allowances: number) => {
  let grossSalary = netSalary // Initial guess
  let netSalaryCalculated = 0
  let basicSalary = 0, totalEmployeePension = 0, totalEmployerPension = 0, payeTax = 0

  while (Math.abs(netSalaryCalculated - netSalary) > 0.01) {
    basicSalary = calculateBasicSalary(grossSalary, allowances)
    const pensions = calculatePensionContribution(basicSalary)
    totalEmployeePension = pensions.tier2Employee + pensions.tier3Employee
    totalEmployerPension = pensions.tier1Employer + pensions.tier3Employer
    const taxableIncome = calculateTaxableIncome(grossSalary, totalEmployeePension)
    payeTax = calculatePAYETax(taxableIncome)
    netSalaryCalculated = grossSalary - payeTax - totalEmployeePension
    grossSalary += (netSalary - netSalaryCalculated) / 2
  }

  return {
    grossSalary: grossSalary.toFixed(2),
    basicSalary: basicSalary.toFixed(2),
    payeTax: payeTax.toFixed(2),
    employeePensionAmt: totalEmployeePension.toFixed(2),
    employerPensionAmt: totalEmployerPension.toFixed(2),
  }
}