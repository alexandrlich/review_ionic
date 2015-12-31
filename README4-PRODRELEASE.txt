INSTRUCTIONS on how to release app

===================google play============
prereq: - 
MODE=RELEASE cordova platform add android -d && cd platforms/android && ant clean release
generates unsigned apt

sign apk and align zip


1.[do 1 time]gen private key

keytool -genkey -v -keystore googleplay.keystore -alias reviyou -keyalg RSA -keysize 2048 -validity 10000

2.sign apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /Users/Alex/.ssh/googleplay.keystore Reviyou-release-unsigned.apk reviyou

3.rename to unaligned.apk

4.verify:
jarsigner -verify -verbose -certs unaligned.apk


5.[do 1 time]for android 19
Copy&paste the zipalign tool from "android-sdk-folder/build-tools/19.1.0" to "tools" folder.

6.align
zipalign -v 4 unaligned.apk reviyou.apk
===================itunes connect============


