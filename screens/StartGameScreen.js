import React, { useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 Button,
 TouchableWithoutFeedback,
 Keyboard,
 Alert,
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';
import BodyText from '../components/BodyText';

const StartGameScreen = (props) => {
 const [enteredValue, setEnteredValue] = useState('');
 const [confirmed, setConfirmed] = useState(false);
 const [selectedNumber, setSelectedNumber] = useState();

 const numberInputHandler = (inputText) => {
  setEnteredValue(parseInt(inputText.replace(/[^0-9/g]/), ''));
 };

 const resetInputHandler = () => {
  setEnteredValue('');
  setConfirmed(false);
 };

 const confirmInputHandler = () => {
  const chosenNumber = parseInt(enteredValue);
  if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
   Alert.alert('Invalid Number!', 'Number must be between 1 and 99.', [
    { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
   ]);
   return;
  }
  setConfirmed(true);
  setSelectedNumber(parseInt(enteredValue));
  setEnteredValue('');
  Keyboard.dismiss();
 };

 let confirmedOutput;

 if (confirmed) {
  confirmedOutput = (
   <Card style={styles.summaryContainer}>
    <Text>You Selected:</Text>
    <NumberContainer>{selectedNumber}</NumberContainer>
    <Button
     title='START GAME'
     onPress={() => props.onStartGame(selectedNumber)}
    />
   </Card>
  );
 }

 return (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
   <View style={styles.screen}>
    <Text style={styles.title}>Start a New Game!</Text>
    <Card style={styles.inputContainer}>
     <BodyText>Select a Number</BodyText>
     <Input
      style={styles.input}
      blurOnSubmit
      autoCapitalize='none'
      autoCorrect={false}
      keyboardType='numeric'
      maxLength={2}
      onChangeText={numberInputHandler}
      value={enteredValue}
     />
     <View style={styles.buttonContainer}>
      <View style={styles.button}>
       <Button
        title='Reset'
        color={Colors.primary}
        onPress={resetInputHandler}
       />
      </View>
      <View style={styles.button}>
       <Button
        title='Confirm'
        color={Colors.accent}
        onPress={confirmInputHandler}
       />
      </View>
     </View>
    </Card>
    {confirmedOutput}
   </View>
  </TouchableWithoutFeedback>
 );
};

const styles = StyleSheet.create({
 screen: {
  flex: 1,
  padding: 10,
  alignItems: 'center',
 },
 title: {
  fontFamily: 'open-sans-bold',
  fontSize: 20,
  marginVertical: 10,
 },
 inputContainer: {
  width: 300,
  maxWidth: '80%',
  alignItems: 'center',
 },
 buttonContainer: {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  paddingHorizontal: 15,
 },
 button: {
  width: '50%',
 },
 input: {
  width: 50,
  textAlign: 'center',
 },
 summaryContainer: {
  marginTop: 20,
  alignItems: 'center',
 },
});

export default StartGameScreen;
