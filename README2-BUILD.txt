INSTRUCTIONS on how to build app 


one time thing per repo
1.npm install
2.bower install


Install on linux:


sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install libncurses5:i386 libstdc++6:i386 zlib1g:i386
sudo apt-get isntall nodejs
sudo apt-get isntall npm
sudo npm install -g bower
sudo npm install -g cordova
sudo npm install -g ionic
npm install wrench
npm install gulp
npm install gulp-concat
npm install gulp-minify-css
npm install gulp-rename
npm install gulp-sass


========HOW TO RUN IT IN IOS
just build usin
3.ionic platform ios (or android)

 and run it from the opened xcode


========HOW TO RUN IT IN WEB SERVER

4.install chrome plugin  https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
uncomment in index.html addUserForWebServe function
(if you have  Invalid HTTP status code 404 problem - you only have it with you pc browser btw - it should be CORS)
it it doesn't work - manually start chrome with a disabled CORS:
http://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome/6083677#6083677

For mac it's:
open -a /Applications/Google\ Chrome.app --args --disable-web-security


5.ionic serve

in the opened window in chrome call javascript:document.dispatchEvent(new CustomEvent('deviceready'));
you can add is as a bookmark


========HOW TO RUN IT IN EMULATOR IOS
ionic emulator


========HOW TO RUN IT FROM ANDROID:

use @ionic build@ or @ant debug@ command to build apk file



=========prereq for android build============================================
export ANT_OPTS="-javaagent:/path/to/newrelic-android-3.361.0/lib/class.rewriter.jar"
for windows it would look like this:
set ANT_OPTS="-javaagent:C:\xxx\reviyoumobile\dev-tools\newrelic\class.rewriter.jar"
============================================================
===================BUILD==================================
============================================================


N
on linux\mac additionally do:

make cordova hooks executable (chmod -R a+x .cordova)
npm install should probably be done with sudo





//2 OPTIONS FOR BUILD


// DEBUG MODE(faster and not minified resources)
default one
//doesn't compress or minify. Same as above - should be followed by ant debug. ALSO: this process suppose to trigge whole build and platform creation but since it cannot trigger hooks curretly we just run it once and than use cordova platrofm add to build the project with hoos every time. We setup our hooks in such a way that you don't have to call cordova platform remove every time(contact Alex for more info if needed)





// OR Production mode(slower):
MODE=RELEASE ionic platform android -d && cd platforms/android && ant clean release

EXPLANATION:

MODE=RELEASE cordova platform add android -d - will add crashlytics and newrelic settings


============================================================
===================recreate platform for IOS(alex)=========
============================================================
1.partially automated by having Xcode project entirely checked in


2.If you want to do it manually with xcode(unless Xcode is committed to the git):
-create platform(cordova platform add ios -d), make sure there was no errors on the console
-open in xcode new generated project
-specify new scheme for this application(info.plist), setup device of emulator
(deprecated)-in cordova project specify “use active architecture only” to “no”
(deprecated)-in reviyou project remove arm64 architecture
-in buildPhases check all .m files for plugins are added to the compile sources drop down
-make sure plugins folder has both .h and .m files for the new added files above

-add provisioning and signing keys from developer.apple.com
-add crashlytics build script(if not added yet), includes adding buildphase script
(./Crashlytics.framework/run 1a10153948073f2bd9178898eabda123fa60239c d6462c6cde941df1caeaa3c8fd0005dc1a61fe610953f70a27e181f37f484904) see screenshots for more details
-hide status bar at the beginning from plist
- add crashlytics folder to framework and initialize scripts to the app delegate file(alex)
-add newrelic support(https://docs.newrelic.com/docs/mobile-monitoring/mobile-monitoring-installation/getting-started/ios-installation-configuration), includes adding buildphase script
-plugin device and do “trust this computer” 
-make sure iphone is added to the list of 100 devices for the provisioning

for ios: migrate images(it would not copy all of them). Then manually copy the rest of them to images.assets folder

run and enjoy




3.IOS build on windows - quite complex -better check with alex if you wanna do it really

build for ios on windows:
phonegap remote login -u reviyouadobe@gmail.com -p ******
grunt phonegap:send
(build.phonegap.com id should be used here, github username would not work here)
try to load to https://build.phonegap.com/ to check your credencials and see status
 signing key needs to be provided and apple id from the incorporation($100\year)


4.throubleshooting(fixed):
Undefined symbols for architecture arm64:  "_OBJC_METACLASS_$_CDVPlugin", referenced from:
solution: happens with iphone5+ only ->>
remove armv64 (http://stackoverflow.com/questions/22494615/xcode-5-and-phonegap-linker-errors-on-building-for-device-but-not-for-simulator)
http://stackoverflow.com/questions/18403225/phonegap-3-0-ios-plugins-not-found
http://stackoverflow.com/questions/18403225/phonegap-3-0-ios-plugins-not-found


issues with ConnectPlugin.java:560: cannot find symbol - means one of 2 things:

1.hook adding libraries to the path for facebook plugin didn't run properly, or:
2. after upgrading to the new version of cordova you didn't run "cordova platform update android" before making the build
 
 
issue #4 is fixed now and arm64 is supported!!! Facebook plugin is updated to support Facebook sdk 3.8+ which supports arm 64.

Also issue with Xcode 5.1 for amr64 is fixed using 
https://github.com/Wizcorp/phonegap-facebook-plugin/issues/425
http://shazronatadobe.wordpress.com/2014/03/12/xcode-5-1-and-cordova-ios/



 
 3.unix\windows potential problem:
if somebody change hooks on windows -> on linux you may have 
"env: node\r: No such file or directory error"

 - This is because the file is in DOS format (line endings in particular). I was able to resolve it by converting the file to a unix format:

one way to fix it is to do this:
brew install dos2unix
sudo dos2unix pathToYourjshook  like

sudo dos2unix beforeCustomHook.jshook
sudo dos2unix 010_installPlugins.jshook 
sudo dos2unix 020_androidCustom.jshook
sudo dos2unix 030_iosCustom.jshook



============================================================
=================== end of recreate platform for IOS(alex)=========
============================================================

//prereq for android build:
//install ant(add to path), jdk(add to path), npm, ionic, cordova - see a list of all updated framework versions on gdrive in a separate doc
