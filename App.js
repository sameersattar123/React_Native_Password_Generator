import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Yup from "yup"
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';

const PasswordSchema = Yup.object().shape({
  passwordLenght : Yup.number()
  .min(4, 'Should be min of 4 characters')
.max(16, 'Should be max of 16 characters')
  .required( "characters are required")
})
export default function App() {
  const [password, setPassword] = useState("")
  const [isPasswordGenerated , setIsPasswordGenerated ] = useState(false)
  const [LowerCase, setLowerCase] = useState(true)
  const [UpperCase, setUpperCase] = useState(false)
  const [Numbers, setNumbers] = useState(false)
  const [Symbols, setSymbols] = useState(false)

  const generatePassword = (passwordLength) => {
    let characterList = "";

    const uppercase = "QAZWSXEDCRFVTGBYHNUJMIKLOP"
    const lowercase = "qazwsxedcrfvtgbyhnujmkiolp"
    const digiChars = "0123456789";
    const specialChars = '!@#$%^&*()_+';

    if(UpperCase){
      characterList += uppercase
    }
    else if(LowerCase){
      characterList += lowercase
    }
    else if(Numbers){
      characterList += digiChars
    }
    else if(Symbols){
      characterList += specialChars
    }

    const PasswordResult = createPassword(characterList , passwordLength)

    setPassword(PasswordResult)
    setIsPasswordGenerated(true)

  }
  const createPassword = (characters , passwordLenght) => {
    const result=""
    for (let i = 0; i < passwordLenght; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result;
  }

  const resetPssword = () =>{
    setPassword("")
    setIsPasswordGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps>
        <SafeAreaView style={styles.appContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Password Generator</Text>
            <Formik
       initialValues={{ passwordLenght : "" }}
      validationSchema={PasswordSchema}
       onSubmit={ values => {
        generatePassword(+values.passwordLenght)
       }}
     >
       {({
        values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}> 
         <View style={styles.inputColumn}>  
         <Text style={styles.heading}>Password Lenght</Text>
         {
          touched.passwordLenght && errors.passwordLenght && (
            <Text style={styles.errorText}>{errors.passwordLenght}</Text>
          )
         }
         </View>
            <TextInput style={styles.inputStyle} value={values.passwordLenght} onChangeText={handleChange("passwordLenght")} keyboardType="numeric"/>
         </View>

         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Includes LowerCase letter</Text>
         <BouncyCheckbox
          disableBuiltInState
        isChecked={LowerCase}
        onPress={() => setLowerCase(!LowerCase)}
        fillColor="#29AB87"
         />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Uppercase letter</Text>
         <BouncyCheckbox
          disableBuiltInState
        isChecked={UpperCase}
        onPress={() => setUpperCase(!UpperCase)}
        fillColor="#29AB87"
         />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Number</Text>
         <BouncyCheckbox
          disableBuiltInState
        isChecked={Numbers}
        onPress={() => setNumbers(!Numbers)}
        fillColor="#29AB87"
         />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Includes Symbols</Text>
         <BouncyCheckbox
          disableBuiltInState
        isChecked={Symbols}
        onPress={() => setSymbols(!Symbols)}
        fillColor="#29AB87"
         />
         </View>
        <View style={styles.formActions}>
          <TouchableOpacity
          disabled={isValid}
          onPress={handleSubmit}
          style={styles.primaryBtn}
          ><Text  style={styles.primaryBtnTxt}>Generate Password</Text></TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => {
            handleReset()
            resetPssword()
          }}
          ><Text style={styles.secondaryBtnTxt}>Reset</Text></TouchableOpacity>
         </View>
         </>
       )}
     </Formik>
          </View>
          {isPasswordGenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
          ) : null}
        </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: 'black',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'white'
  },
});
