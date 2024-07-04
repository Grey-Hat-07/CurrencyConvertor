import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
  Pressable,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import CurrencyButton from './Components/CurrencyButton';
import { currencyByRupee } from './constants';

type Currency = {
  name: string;
  value: number;
  flag: string;
  symbol: string;
};

function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const ButtonPressed = (currency: Currency) => {
    if (!inputValue) {
      Snackbar.show({
        text: 'Enter a value to convert',
        duration: Snackbar.LENGTH_INDEFINITE,
      });
      return;
    }

    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      const result = value * currency.value;
      const resultCur = `${currency.symbol} ${result.toFixed(2)}`;
      setResultValue(resultCur);
      setTargetCurrency(currency.name);
    } else {
      Snackbar.show({
        text: 'Not a valid number to convert',
        duration: Snackbar.LENGTH_INDEFINITE,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rupeesContainer}>
          <Text style={styles.rupee}>₹
            {/* <Text>IN</Text> */}
          </Text>
          <TextInput
            style={styles.inputAmountField}
            placeholder="Enter the amount in rupees"
            maxLength={10}
            keyboardType="numeric"
            value={inputValue}
            onChangeText={(value) => setInputValue(value)}
          />
        </View>
        {resultValue && (
          <Text style={styles.resultTxt}>{resultValue}</Text>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          numColumns={3}
          data={currencyByRupee}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.button,
                targetCurrency === item.name && styles.selected,
              ]}
              onPress={() => ButtonPressed(item)}
            >
              <CurrencyButton {...item} />
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151',
    // marginTop: 12,
    // padding: 12,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
