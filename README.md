# Webbrowser based login and deep linking

This is a simple example of a web browser based login and deep linking.
This is made to prove the concept of deep linking with different versions of iOS and Android.

## Used technoligies

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
  - [WebBrowser](https://docs.expo.dev/versions/latest/sdk/webbrowser/)
  - [Linking](https://docs.expo.dev/guides/linking/)
- [React Navigation](https://reactnavigation.org/)
  - [StackNavigator](https://reactnavigation.org/docs/stack-navigator/)
  - [TabNavigator](https://reactnavigation.org/docs/tab-based-navigation/)

## Preview

![Android preview](documentation/android.png)

## Demo

You can test the login and deep linking by installing the [Expo Client](https://expo.dev/client) on your mobile device and scan the following QR code:

[![](https://qr.expo.dev/expo-go?owner=vergissberlin&slug=react-native-deep-linking&releaseChannel=default&host=exp.host)](https://expo.dev/@vergissberlin/react-native-deep-linking)

## Installation

To install the example, you need to have expo-cli installed.

```bash
npm install -g expo-cli
```

I recommend to use the [Expo Client](https://expo.dev/client) to test the application.
If you want to test the example with simulators, you need to install _Android Studio_ and _xcode_ to get the simulators.
The iOS and Android simulators are not included in the expo-cli package.

Then install the example with the following command:

```bash
yarn install
```

After that, you can run the example with the following command:

```bash
yarn start
```

## Testing

Replace the IP with the IP of your expo instance.

### Authentication

1. Go to the login page.
2. Click on the login button.
3. Click on "Pass back some fake auth token" to simulate a successful login.
4. The login should be successful and the user should be redirected to the deep linking page.
5. On the deep linking page, you can see the fake auth token.

### Deep linking

With the deep linking feature you can link to a specific screen in your app.
Here is an example of how to do this:

```shell
npx uri-scheme open exp://192.168.2.13:19000/--/settings -ai
```

Change the path to switch between screens:

```shell
npx uri-scheme open exp://192.168.2.13:19000/--/home -ai
npx uri-scheme open exp://192.168.2.13:19000/--/login -ai
```
