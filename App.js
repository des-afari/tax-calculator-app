import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native'

export default function App() {
  const [netSalary, setNetSalary] = useState('')
  const [allowances, setAllowances] = useState('')
  const [result, setResult] = useState(null)

  const handleChange = (text, setText) => {
    if (/^\d*\.?\d*$/.test(text)) {
      setText(text)
    }
  }

  const handlePress = () => {}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Salary Calculator</Text>
      < TextInput
       style={styles.input}
       placeholder="Desired Net Salary"
       keyboardType="numeric"
       value={netSalary}
       onChangeText={value => handleChange(value, setNetSalary)}
       autoFocus
       />
      <TextInput
        style={styles.input}
        placeholder="Allowances"
        keyboardType="numeric"
        value={allowances}
        onChangeText={value => handleChange(value, setAllowances)}
      />
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Calculate</Text>
      </Pressable>
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Gross Salary: GHS {result.grossSalary}</Text>
          <Text style={styles.resultText}>Basic Salary: GHS {result.basicSalary}</Text>
          <Text style={styles.resultText}>Total PAYE Tax: GHS {result.payeTax}</Text>
          <Text style={styles.resultText}>Employee Pension Amt: GHS {result.employeePension}</Text>
          <Text style={styles.resultText}>Employer Pension Amt: GHS {result.employerPension}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#01D21C',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: "center"
  },
  resultContainer: {
    backgroundColor: "#f0f5f5",
    marginTop: 20,
    padding: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  }
})
