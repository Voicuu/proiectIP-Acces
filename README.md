[23.05.2023] 
- implementation for getting other data and configuring the mobile interfaces. [TO DO]

- implementation for getting the imei code from firebase realtime database and checking imei code[DONE]

open this in code preview,
npm install before running the project

add the permissions to the AndroidManifest.xml file:

<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>

1.write your google user/pw in code

2.create user

3.sign in

4.you need to get these logs:

 LOG  Firebase: User signed in successfully!
 LOG  Firebase IMEI: undefined
 LOG  IMEI codes do not match

[09.05.2023]
# proiectIP-Acces
    "react": "18.2.0",
    "react-native": "0.71.7",
    "react-native-device-info": "^10.6.0"
    Project with .tsx main file 
    
importing react-native-imei failed

importing react-native-device-info succeeded
(npm install react-native-device-info required)

implemented the functionality of signing and generating the IMEI code.

interfaces needs to be done.
