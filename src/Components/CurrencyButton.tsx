import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import type { PropsWithChildren } from 'react';

type CurrencyProps = PropsWithChildren<{
    name: string;
    value: number;
    flag: string;
    symbol: string;
}>;

export default function CurrencyButton(props: CurrencyProps): JSX.Element {
  return (
    <View style = {styles.buttonContainer}>
      <Text style = {styles.flag}>{props.flag}</Text>
      <Text style = {styles.country}>{props.name}</Text>
      
      {/* <Text>{props.flag}</Text> */}
      {/* <Text>{props.symbol}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer : {
    alignItems: 'center',
    // justifyContent: 'center'
},
flag: {
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 4
},
country: {
    fontSize: 14,
    color: "#2d3436",

}

});
