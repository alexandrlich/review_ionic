INSTRUCTIONS on how to emulate\deploy app

============================================================
============================================================
===================How to run an app on android emulator============
1. Start AVD
android avd //(creates avd)
emulator -avd emul-al-1 //(start emulator by) 
2. Open command line
3. go to %Android sdk%/sdk/platform-tools/
4. $ adb clean install -r {path-to-apk} (the easiest way is to place apk file to the platform-tools folder and then run $ adb install reviyouMobile-debug.apk)

//After this steps you'll get an app installed on AVD

//read about hooks here: https://leanpub.com/developingwithcordovacli/read
//debug application: in chrome by running opening chrome://inspect/










