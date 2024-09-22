# ONBOARDING

### Build using eas-cli
`eas login`

`yarn install`

`eas build -p <platform> --profile snapshot`


### Build using manual expo-cli
`yarn install`

`yarn expo prebuild --no-install --platform <platform_name>`

*Android build*: 

`cd android && ./gradlew :app:assembleRelease`


*iOS build*:

`gem install cocoapods`

`cd ios && pod install`

`xcodebuild -resolvePackageDependencies -workspace ./omitrixmobile.xcworkspace -scheme omitrixmobile -configuration Release -derivedDataPath ./build -destination generic/platform\=iOS\ Simulator`

`xcodebuild -showBuildSettings -workspace ./omitrixmobile.xcworkspace -scheme omitrixmobile -configuration Release -derivedDataPath ./build -destination generic/platform\=iOS\ Simulator 2>&1`

`set -o pipefail && xcodebuild -workspace ./omitrixmobile.xcworkspace -scheme omitrixmobile -configuration Release -derivedDataPath ./build -destination 'generic/platform=iOS Simulator' build | tee ./logs/omitrixmobile-omitrixmobile.log > /dev/null`

