# Dawarty Educational Platform

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Clone the repository

First, you will need to clone **[Dawraty Repository](https://github.com/joindawraty/dawraty-mobile-app.git)**.

After cloning completion, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm install

# OR using Yarn
yarn
```

## Step 2: iOS pod installation (for iOS only)

After installing the node*modules, run the following command from the \_root* of your React Native project:

```bash
# using npx
npx pod-install

# OR from ios directory
pod install
```

## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Creating builds for new release of app on Play store and App store

### For Android

```bash
# using gradlew command (**Note**: for this you have to make sure that you have specified the keystore file path and credentials in signingConfigs phase of build.gradle (app level))
cd android && ./gradlew clear && ./gradlew bundleRelease

# OR using Android Studio
- Open android directory in Android Studio
- Make changes in build version name and code (if releasing new version on play store)
- Choose Build option from Menu Bar
- Choose Generate Signed Bundle / APK option
- Make sure you have selected Android App Bundle option there and click on Next Button
- Select the jks / keystore file
- enter the credentials for selected file
- Click on Next
- After completion of process your bundle will be created
```

### For iOS

```bash
# using XCode
- Open .xcworkspace file from ios directory in XCode
- Make changes in build version name and code (in General settings of app target)
- Make sure you have selected app store account (in Signing & Capabilities of app target)
- Select any iOS device option as your destination to run the app
- Choose Product option from Menu Bar
- Choose Archive option from context menu
- After completion of process your archive will be created
- You will be prompted with options to publish app on App Store, Test flight
- Choose desired option and click on upload
```

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
