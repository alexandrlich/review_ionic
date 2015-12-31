#!/bin/bash
KEYSTORE=/Users/Alex/.ssh/googleplay.keystore  

 
echo "start apk release"


buildCordova() {
	echo "change build nubmer and version number in config.xml  and press any button";
	#read my_var;
	echo "build cordova"
	MODE=RELEASE ionic platform android -d
}

buildApk() {

	echo "building apk, but first in androidManifest change build number(this file was overridden by hooks) and press any button"
	#read my_var;
	cd platforms/android && ant clean release && cd bin
	
	echo "apk is built";
}

signApk() {
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE Reviyou-release-unsigned.apk reviyou

}
packageApk() {
	echo "rename apk";

	mv Reviyou-release-unsigned.apk unaligned.apk
	echo "verify apk";
	jarsigner -verify -verbose -certs unaligned.apk
	echo "aligh apk";
	zipalign -v 4 unaligned.apk reviyou.apk

	echo "apk for release is succesfully prepared";
}

//#buildCordova
buildApk 
cd platforms/android/bin
signApk
packageApk


exit 1


