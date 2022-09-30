import React, {useEffect, useState} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {Alert, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  image: any;
  title: string;
  imageStyle: object;
  onVerify: Function;
  cancelButtonText: string;
  allowDeviceCredentials: boolean;
}

const Biometric = (props: Props) => {
  const [success, setSuccess] = useState(false);
  const initialImageLink = {
    uri: 'https://cdn-icons-png.flaticon.com/512/25/25936.png',
  };
  const {
    title = 'Sign in',
    onVerify,
    imageStyle,
    cancelButtonText = 'close',
    image = initialImageLink,
    allowDeviceCredentials = false,
  } = props;

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: allowDeviceCredentials,
  });
  useEffect(() => {
    isSensorAvailable();
  }, []);

  /**
   * @description Handling error
   * @param code
   */
  const handleError = (code: any) => {
    switch (code) {
      case 'Too many attempts. Try again later.':
        Alert.alert('Too many attempts. Try again later');
        break;
      case 'Too many attempts. Fingerprint sensor disabled.':
        Alert.alert(
          'Too many attempts. Fingerprint sensor disabled please try later',
        );
        break;
      default:
        break;
    }
  };

  /**
   * @desc check type of biometric and prompt biometric
   */
  const isBiometricSupport = async () => {
    if (
      BiometryTypes.Biometrics ||
      BiometryTypes.FaceID ||
      BiometryTypes.TouchID
    ) {
      rnBiometrics
        .simplePrompt({
          promptMessage: title,
          cancelButtonText: cancelButtonText,
        })
        .then(resultObject => {
          const {success, error} = resultObject;
          onVerify(success);
          setSuccess(success);
          console.log('isBiometricSupport error', error);
        })
        .catch(err => handleError(err.code));
    }
  };
  /**
   * @desc check whether biometric is available on device
   */
  const isSensorAvailable = async () => {
    try {
      const {biometryType, available, error} =
        await rnBiometrics.isSensorAvailable();
      if (available) {
        isBiometricSupport();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!success && (
        <TouchableOpacity onPress={isSensorAvailable} activeOpacity={0.8}>
          <Image source={image} style={[styles.imageStylee, imageStyle]} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default Biometric;

const styles = StyleSheet.create({
  imageStylee: {
    height: 100,
    width: 100,
  },
});
