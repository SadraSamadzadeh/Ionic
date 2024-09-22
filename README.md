1. Run npm install in the directory of Ionic
2. Run ionic cap sync --> there should be a dist folder created 
3. ionic cap build android --> this should open android studio but if not go to next step/ if it opened android studio skip next step.
4. ionic cap open android 
5. go to app/manifests/AndroidManifest.xml
6. add the lines below:
    <uses-permission android:name="android.permission.WRITE_CALENDAR"/>
    <uses-permission android:name="android.permission.READ_CALENDAR"/>
    <uses-permission android:name="android.permission.WRITE_CONTACTS"/>
    <uses-permission android:name="android.permission.READ_CONTACTS"/>
NOTES: 
when trying to use the invite button in the main page, you have to select a party that has attendees added to them. note that attendees who don't have a phone number, will be saved as no phone and the application prevents you from sending texts to it 
