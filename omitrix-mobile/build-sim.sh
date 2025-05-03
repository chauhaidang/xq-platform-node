xcodebuild -resolvePackageDependencies -workspace ./omitrixmobile.xcworkspace -scheme omitrixmobile -configuration Release -derivedDataPath ./build -destination generic/platform\=iOS\ Simulator

xcodebuild -showBuildSettings -workspace ./omitrixmobile.xcworkspace -scheme omitrixmobile -configuration Release -derivedDataPath ./build -destination generic/platform\=iOS\ Simulator 2>&1

set -o pipefail && xcodebuild -workspace ./omitrixmobile.xcworkspace -scheme omitrixmobile -configuration Release -derivedDataPath ./build -destination 'generic/platform=iOS Simulator' build