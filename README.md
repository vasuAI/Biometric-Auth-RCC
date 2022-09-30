# Biometric authenctation

## Getting started

### Install

```shell
 yarn add react-native-biometrics
```

Note: we are using version `v3.0.1` by default version is `v2.2.2 `

or

```shell
 npm install react-native-biometrics --save
```

## App Permissions

Add the following permissions to their respective files:

In your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.USE_FINGERPRINT" />
<uses-permission android:name="android.permission.USE_BIOMETRIC" />

```

In your `Info.plist`:

```xml
<key>NSFaceIDUsageDescription</key>
<string>Enabling Face ID allows you quick and secure access to your account.</string>
```

## Props

| Prop                   |  Default  |    Type     | Description                |
| :--------------------- | :-------: | :---------: | :------------------------- |
| title                  | `Sign in` |  `string`   | Title for biometric prompt |
| cancelButtonText       |  `close`  |  `string`   | Cancel button text         |
| image                  |    ``     | `imageType` | Image to display           |
| onVerify               |     -     | `Function`  | Return success callback    |
| imageStyle             |    ``     |     {}      | Image style                |
| allowDeviceCredentials |  `false`  |  `Boolean`  | Enable Device Credentials  |

## Issues

```shell undefined is not a function (BiometryTypes)
TypeError: constructor is not callable (new ReactNativeBiometrics())
```

The latest version on npmjs is 3.0.1, but 2.2.2 is installed by default.

- If someone encounters such an error, just install version 3.0.1, otherwise you should follow the readme in the package you installed instead of the one on github. By the way, the 3.0.0 version will also have the above problems.
