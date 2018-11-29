# Bixby Home Card Programming Guide



[TOC]





# 1. Developing Cards on Bixby Home

Bixby Home displays various cards according to user behavior patterns.

Developers can use \"Card SDK\" in their application to develop cards which can be displayed on Bixby Home application.

Developers have to register their card information at Bixby Home partner portal site to start the card development.

Only registered card can be displayed on Bixby Home.

![](media/image1.png){width="5.9006944444444445in" height="3.25750656167979in"}




# 2. Application based integration : using Card SDK library.

This chapter describes how to make use of SDK to create a card.

Pre-condition:

-   Check Installed Bixby Home apk version. Refer to below table.

-   Include SDK library (spage-card-sdk-v\[*version*\].aar) file in your application.

| API spec. version | SDK library version | Bixby Home version Name | Release Date |
| ----------------- | ------------------- | ----------------------- | ------------ |
| v1                | 1.0.0               |                         |              |
| v1                | 1.0.1               | since 2.1.2.7           | Oct. 2017    |
| v2                | 1.0.2               | since 2.1.6.0           | Jan. 2018    |
| v3                | 1.0.2               | since 2.1.7.0           | Feb. 2018    |
| v4                | 1.0.3               | since 2.1.9.0           | Mar. 2018    |
| v5                | 1.1.1               | since 2.2.2.2           | Jul. 2018    |
| v6                | 1.1.3               | since 2.2.4.0           | Sep. 2018    |
| v7                | 1.2.1               | since 3.0.0.0           | Nov. 2018    |



## 2.1 Selecting Template type

Select the appropriate template type for your card\'s look and feel. Your card view style is fixed by this template. Please refer to template guides (Bixby Home SDK UX document) for the detailed information.




## 2.2 Registering Card

Register your card at CP portal site. Upon successful registration a unique Card ID will be provided. This Card ID will be used for the identification of your card.

To register your card, please contact to Bixby Home partner portal, [[https://bixbyhome.samsungfeed.com]](https://bixbyhome.samsungfeed.com).

Before registering the card to the site, Manifest side-loading scheme can be used for developing the cards. Refer to appendix 4.1 below.



## 2.3 Building Your Cards

To display your cards in Bixby Home application, modify your application as mentioned below:




### *2.3.1 Including card sdk library*

Put Bixby Home SDK library files (spage-card-sdk-\[version\].aar and sdk-v1.0.0.jar) in \"libs\" folder on your application project. And modify your application build.gradle file to include this library like below.

```
dependencies {

	implementation fileTree(include: \['spage-card-sdk-\[version\].aar', dir: 'libs')

	...

}
```



### 2.3.2 *Modify \"AndroidManifest.xml\"*

Modify your application's manifest file as following guide.

-   Provide the required permission, use \"uses-permission\" tag and add the permission as shown in the code block.
-   Add your receiver (e.g. **\".list.ListSampleProvider\"**) block in AndroidManifest.xml file.
-   Add meta data element which should contain xml resource \"cards\" which should list up all cards id and template id provided in your app. Refer to section 2.3.8 for detailed explanation.



```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android=http://schemas.android.com/apk/res/android

package="samsung.spage.sample">

// Add uses-permission

<uses-permission android:name="com.samsung.android.app.spage.permission.WRITE_CARD_DATA" />

<application ... >

...

// Add broadcast receiver

<receiver android:name=".list.ListSampleProvider"> //Add this receiver block

<intent-filter>
    <action android:name="com.samsung.android.app.spage.action.CARD_UPDATE" />
    <action android:name="com.samsung.android.app.spage.action.CARD_EVENT" />
    <action android:name="com.samsung.android.app.spage.action.CARD_ENABLED"/>
    <action android:name="com.samsung.android.app.spage.action.CARD_DISABLED"/>
</intent-filter>

</receiver>

// Add meta data for card list

<meta-data

android:name="com.samsung.android.sdk.spage.card.info"

android:resource="@xml/cards"/>

</application>

</manifest>
```

Before going further, please refer to section 2.4, which explains how and why to use Content Provider instead of Broadcast Receiver.



### 2.3.3 *Check Feature Support*

If you want to check if the feature is supported or not on your device, refer to SpageCardSdk class

![](media/image2.jpg){width="2.5625in" height="1.2401837270341207in"}

- Card developer should **initialize** the SDK by calling initialize method. If the device is not proper or Bixby Home is not installed, it will throw SsdkUnSupportedException. And it is to check for feature support by calling** isFeatureEnabled** method of SpageCardSdk before using the SDK in your application code.

- If **initialize** and **isFeatureEnabled** is success then the device and installed Bixby Home support the card feature.

- The method, **getVersionCode** and **getVersionName** returns the SDK library version code and name.


```java
boolean isBixbyHomeCardFeatureAvailable(Context context) {
    SpageCardSdk csdk = new SpageCardSdk();

    try {
        csdk.initialize(context);
    } catch (SsdkUnsupportedException e) {
        // Not supported device
        return false;
    }

    if (csdk.isFeatureEnabled(FEATURE_TEMPLATE) == false) {
        // Bixby Home does not support the template card feature.
        return false;
    }

    return true;
}
```

After the above code result is succeeded, when you need to check installed Bixby Home API version, refer to Appendix 4.4 'How to check Bixby Home API version".



### 2.3.4 *Create the Provider Class*

Create your own provider class inherited from CardContentProvider class. With the help of this class, card developers can provide the contents to Bixby Home app which can display in the card.



There are 3 methods which can be overridden in your provider class.

- onDisabled : This will be called if your card gets disabled in Bixby Home Settings.

- onEnabled : This will be called if your card gets enabled in Bixby Home Settings

- onUpdate : This will be called if your card should be updated. This is not called periodically, it is called when your card in Bixby Home needs to be refreshed.

- onReceiveEvent : This will be called for events like click which will be defined earlier when setting the content.


### 2.3.5 *Override onUpdate Method*

Whenever the card content needs to be refreshed \"onUpdate\" of the provider will be called. Prepare the contents to be displayed based on the template you had selected.

onUpdate is not called on every entrance to Bixby Home. When some amount time (e.g. 2 minutes) has been passed after last visit, onUpdate will be called. Or when users do refresh manually by pulling down the Bixby Home screen, the method will be called also.



```java
@Override
public void onUpdate(Context context, CardContentManager cardContentManager, int[] ids) {

    private static final int MY_CARD_ID = 50000; // Issued from CP portal site upon successful registration of card.

    ...

    for (int id : ids) {

        if (id == MY_CARD_ID) {

            CardContent listContent = getListDataContent(context, id);

            cardContentManager.updateCardContent(context, listContent);

            return;

        }
    }

}
```



### 2.3.6 *Preparing Contents Using CardContent Class*

-   Various data types are defined in SDK to prepare the contents.

-   Create a CardContent object by providing the Card ID. CardContent provides put method which takes two arguments, one is the Field ID string and the other is FieldData object.

-   For each field and matched data object type, refer to the UX template guide.

More on FieldData will be explained in chapter 2.5.



```java
private CardContent getListDataContent(Context context, int id) {

    CardContent content = new CardContent(id);

    Uri imageUri = getUriToDrawable(context, R.drawable.worker);

    content.put(CardContent.FIELD_1, new ImageData().setImageUri(imageUri.toString()));
    content.put(CardContent.FIELD_2, new TextData().setText("search worker!"));
    content.put(CardContent.FIELD_5, new RectData().setIntent(new Intent().setData(Uri.parse("https://www.google.com/search?q=worker"))));

    return content;

}
```



### 2.3.7 *Updating Contents*

When contents are prepared, it should be sent to Bixby Home application. CardContent prepared above in section 2.3.6 should be sent/committed by calling **updateCardContent** method of **CardContentManager** class.

Refer to below snippet and Javadoc document of Sample application code.

```java
CardContent listContent = getListDataContent(context, MY_CARD_ID);
cardContentManager.updateCardContent(context, listContent);
```



![](media/image3.jpg){width="3.1268657042869643in" height="1.9825339020122486in"}



### 2.3.8 *Add \"cards.xml\"*

List up all your card\'s ids and template ids in cards.xml file and add it to \"res/xml\" folder. With the help of this meta data file, Bixby Home figures out which all cards are provided by your application.

```xml
<?xml version="1.0" encoding="utf-8"?>

<cards>

    <card cardId="81000" templateId="UTILITY_LIST_IMAGE"/>
    <card cardId="81001" templateId="UTILITY_LIST_TRENDING"/>

</cards>
```



## 2.4 Using Content Provider instead of Broadcast Receiver (v6)

If your application is concerned about the security issue of exporting Broadcast receiver in your package, you can use Content Provider which supports the caller check. But it is supported since the Bixby Home version 2.2.4.0. So be careful that if you implement your application using this Content Provider mechanism, the older version Bixby Home cannot display your cards.

If you already serve some cards using Broadcast receiver, it should be kept for the old version Bixby Home compatibility. If you are about to serve the card first time, it is recommended to use this Content Provider mechanism. But please [remember that your cards can be appeared only on Bixby Home version 2.2.4.0 or later.]

All callbacks on CardContentProvider class working on Broadcast Receiver would be called in your main thread, but those on CardProvider would be called in binder thread. Please refer to Android developer guide.



### *2.4.1 Modify \"AndroidManifest.xml\"*

Add 'provider' in your AndroidManifest.xml file as the below codes. Set your class name, which inherits CardProvider class as 'name' attribute value.

Please do not change 'authorities' value, keep it as below.

```xml
<?xml version="1.0" encoding="utf-8"?>

<manifest xmlns:android=http://schemas.android.com/apk/res/android
	package="samsung.spage.sample">

// Add uses-permission
<uses-permission android:name="com.samsung.android.app.spage.permission.WRITE_CARD_DATA" />

<application ... >

...

    // Add provider block
    <provider
        android:name=".list.ListSampleCpProvider"
        android:authorities="${applicationId}.provider.spagecardprovider"
        android:exported="true"/>

    // Add meta data for card list
    <meta-data
        android:name="com.samsung.android.sdk.spage.card.info"
        android:resource="@xml/cards"/>

</application>

</manifest>
```



### *2.4.2 Create the Content Provider Class*

Create your own Content Provider class inherited from CardProvider class. Other things are same with the above guide.



### *2.4.3 Modify \"cards.xml\"*

In the cards.xml file, XML tag name is different from previous one. Please use 'card-provider' instead of 'card'.

```xml
<?xml version="1.0" encoding="utf-8"?>
<cards>
    <card-provider cardId="81000" templateId="UTILITY_LIST_IMAGE"/>
    <card-provider cardId="81001" templateId="UTILITY_LIST_TRENDING"/>
</cards>
```



## 2.5 Field Data

### *2.5.1 FieldData Class*

-   Each card template is composed of many parts called \'FIELD\'. Each Field corresponds to a data of type \'FieldData\'.

-   By putting \'FieldData\' to these fields, card will display the contents on Bixby Home application.

-   Many FieldData are derived to represent appropriate UI element (TextData, ImageData, VideoData) and event (RectData).

-   Each field in the card should make use these types to represent the data.

![](media/image4.jpg){width="4.820895669291339in" height="3.370657261592301in"}



### *2.5.2 Providing Contents*

To provide image contents, use ImageData class

To provide text contents, use TextData class

To get intents or event on user actions, use RectData inherited from ActionFieldData.

To manage some special widgets, like music play controller, you can use ControllerData class which would take care of events like Next/Previous, play/pause.

Please refer to \'Bixby Home SDK UX\' document for the template data type.



## 2.6 Extra State

There are 5 states of cards, "NORMAL"(default), "ON\_BOARDING", "SIGN\_IN", "NO\_CONTENTS", and "AUTHORIZATION".

With default "NORMAL" state, cards contents will be composed and displayed as explained above. With other states, predefined layout will be used and displayed, when you set the extra state explicitly using CardContent class. According to your card context, set your card state properly. If you don't set anything, it will be "NORMAL" state as default.

The displayed layout and contents are defined like below. Please refer to UX guideline document for more details.

SIGN\_IN (v1), AUTHORIZATION(v7) -- predefined text and layout will be used. Launching Activity URI on clicking the button, should be provided through Bixby Home portal site

ON\_BOARDING (v1) -- Icon, text and launching Activity URI on clicking the button should be provided through Bixby Home portal site.

NO\_CONTENT (v5) - Icon and first text should be provided through Bixby Home portal site. Additionally other text, button and launching Activity URI can be provided at runtime when you set the card state as "NO\_CONTENT". These are optional things.



### *2.6.1 How to set the state*

Refer to codes below to change the state.

```java
@Override
public void onUpdate(Context context, CardContentManager cardContentManager, int[] ids) {

...

    if (isInitialStep) {
        CardContent content = new CardContent(cardId);
        content.setExtraState(CardContent.ON_BOARDING);
        return content;
    }

...

}
```



## 2.7 Instant Update (v2)

Instant update can be used when you have to update some part of card contents periodically. For example, like sports scores in playing at sports card, it shall be updated every 10 seconds while a user is watching that card. This feature is supported since SDK API version 2.



### *2.7.1 Preparing*

Not all card templates support this instant update. Choose the right template on Bixby Home partner portal site. And the update interval time(seconds) should be set in BH portal site, because this update will be invoked periodically while the card is displaying on the stream.

If you want to test it locally, Referring to 'Manifest side-loading' in appendix, insert following block after "templateId" element. Below example is to set the interval as 5 seconds.

```
"properties": {

"updateInterval" : "5"

...

}
```



### *2.7.2 Override onInstantUpdate Method*

Override onInstantUpdate method in your CardContentProvider class. There is two different thing with onUpdate method.

One thing is the 'updateCode' as last argument. This onInstantUpdate will be called repeatedly on that period time. So, to manage these update sequence, this updateCode is added. This code should be used, when you update the card contents, with the method, 'updateInstantCardContent' on the CardContentManager class.

The other thing is that it is possible to update card content partially. Just update frequently changeable contents only for better performance.

| Callback method | Content update method                       | Update content            | Invoke period          | Available templates       | mandatory to override |
| --------------- | ------------------------------------------- | ------------------------- | ---------------------- | ------------------------- | --------------------- |
| onUpdate        | CardContentManager.updateCardContent        | Full content              | System interval        | All templates             |                       |
| onInstantUpdate | CardContentManager.updateInstantCardContent | Partial content available | Card specific interval | Limited to some templates | X                     |



If you want to call updateInstantCardContent later to update asynchronously, keep the 'updateCode' and use it. Do not use old or not received updateCode, it will not work.

Although you are using instant update, onUpdate should be also overridden to provide full contents snapshot of your card.

```java
import static com.samsung.android.sdk.spage.card.CardContent.*;

...

@Override public void onInstantUpdate(Context context, CardContentManager contentManager, int cardId, int updateCode) {

    if (cardId == MY_CARD_ID) {
        CardContent content = new CardContent(cardId);
        content.put(FIELD_3, new TextData().setText(getCost().toString()));
        contentManager.updateInstantCardContent(context, content, updateCode);
    }

}
```



## *2.8 Sharing Contents (v4)*

Your card contents can be shared via the share panel in Android framework. In UX guide document, the templates which have 'share content' column in the field table can support share functions.

To activate 'share' function, below two things should be done.

1.  Add 'share' property in Bixby Home Portal

2.  Provide share contents in onUpdate callback.

When you input card information in Bixby Home Portal website, there is 'Buttons' in 'Header' section. 'share' can be added by OR-ing with other options.

Buttons : refresh\|more\|share

And in your app code, fill the sharing content data with the ShareData class and put it into the some FieldData class. All the share content in a CardContent should be have same MIME type. So MIME type would be set at CardContent class, although ShareData can be set on more than one FieldData.

Be sure to check template guide, because not all templates support ShareData. FieldData where ShareData can be set is also defined at that guide.

```java
CardContent content = new CardContent(id);

...

content.setShareMimeType("image/*");

ShareData shareData = new ShareData();

shareData.setDataUri(getShareContentUri());

...

rectData.setShareData(shareData);

content.put(CardContent.FIELD_8, rectData);

...
```



After these things are completed, when user clicks the 'share' icon on the header of the card, 'share' panel will be appeared.



## 2.9 Multi-instance Card (v5)

When you have single content source but the content should be displayed with several cards with each own configuration, you can use this multi-instance card type.

For example, with the sports card, many teams are there, and users can select some preferred teams and see their score and status on each different card. Those cards look and layout would be same although the team is different.

To do this, two types of card should be prepared. One is the intro card and the other is the instance card. Both cards should be registered at Bixby Home portal.

The intro card is to introduce your card content and provide the customize button to let users to select preferred things as cards. (For example, preferred things can be teams on the domain of sports, or news categories on the news domain)

![](media/image5.jpg){width="1.845450568678915in" height="1.470148731408574in"}

Making \'intro\' card is same as other cards. Only one thing to be considered is to make the \'Customize\' button to invoke your activity on which users can select preferred things. When users' selections are completed, the selection changes should be notified and updated to Bixby Home.

In the instance card, there are two kinds of types, the parent (representative) instance card and child instance card. The parent instance card is the base card at which all properties will be set on Bixby Home portal registration step. The child instance cards are to instantiate the users\' selected preferred things as cards. Child instance cards inherit all the properties of the parent instance card.

The intro card id and parent (representative) instance card id are issued from Bixby Home portal site. For child instance card id, you can choose and assign them to your cards. There are rules for instance card id. The parent instance card id would have 5 zero digits at lower part (in case of test card id, 3 zero digits). For example, if the parent instance card id is 123400000, then the child instance card id would be from 123400001 to 123499999. (With test card, if it is 82000, then the child instance card id is from 82001 \~ 82999)

Only if the child instance card id is in the valid range, you can freely choose and assign them to your configured cards.

To avoid synchronization problem between your application and Bixby Home, the chosen card id should be kept once it has been assigned.

![](media/image6.png){width="3.672267060367454in" height="1.7238801399825021in"}

This is MultiInstancePreferenceData class hierarchy. About category ids, only if they are not duplicated, whatever they are, it is ok. The \'title\' is a string to be shown to users.

![](media/image7.jpg){width="3.5596992563429573in" height="2.0in"}

Using MultiInstancePreferenceData class, you can provide those information, category id and title, and card id and title, to Bixby Home.

```
MultiInstancePreferenceData getPreferenceData() {

MultiInstancePreferenceData data = new MultiInstancePreferenceData();

data.setTitle("All the Sports");

MultiInstancePreferenceData.Category category = new MultiInstancePreferenceData.Category();

category.setId(1).setTitle("NBA Basketball");

category.addCard(new MultiInstancePreferenceData.Card().setId(123400001).setTitle("Boston Celtics"));

category.addCard(new MultiInstancePreferenceData.Card().setId(123400002).setTitle("LA Lakers"));

...

data.addCategory(category);

category = new MultiInstancePreferenceData.Category();

category.setId(2).setTitle("MLB Baseball");

category.addCard(new MultiInstancePreferenceData.Card().setId(123400101).setTitle("New York Yankees"));

category.addCard(new MultiInstancePreferenceData.Card().setId(123400102).setTitle("LA Lakers"));

...

data.addCategory(category);

return data;

}
```



At first, override onPreferenceRequested method on your CardProivder class to provide these information to Bixby Home

```java
private static final int SPORTS\_PARENT\_INSTANCE\_CARD\_ID = 123400000;

...

@Override
protected void onPreferenceRequested(Context context, CardContentManger cardContentManager, int cardId) {

    if (cardId == SPORTS_PARENT_INSTANCE_CARD_ID) {
    	cardContentManager.updateMultiInstancePreference(context, cardId, getPreferenceData());
    }

}
```



Whenever users change the preferred things on your application, call this directly to inform to Bixby Home.

```
CardContentManager.getInstance().updateMultiInstancePreference(context, SPORTS_PARENT_INSTANCE_CARD_ID, getPreferenceData());
```



With these provided child instance card information and ids, Bixby Home will request contents of them through onUpdate method. Then you can provide the contents to be displayed.

Be sure that there will be no content request with parent instance card id.

```java
@Override
protected void onUpdate(Context context, CardContentManger cardContentManager, int[] cardIds) {

    for (int id : cardIds) {

        if (cardId == 345604321) { // INTRO Card
        	...
        } else if (cardId == 123400001) { // child instance card : Boston Celtics
        	...
        } else if 
            ...
        }
	}

}
```



As last thing, with Cards.xml file on your xml resource, add two cards information, intro card and parent (representative) instance card.

\* \<card-provider\> tag is supported since API v6, it declares that cards work based on Content Provider of Android instead of Broadcast Receiver.

```xml
<?xml version="1.0" encoding="utf-8"?>

<cards>

<card-provider cardId="345604321" templateId="SPORTS_GAME_LIVE"/>
<card-provider cardId="123400000" templateId="SPORTS_GAME_LIVE"/>

...

</cards>
```



## 2.10 Variable Field (v6)

Some card templates have a special field, which is called "variable field". Normally a filed has a single component type. But this field provides more than one component type to be set. You can choose one of them according to your card use cases and set it on that field. To select a component type, make the field option number to be set together with a FieldData. Please refer to UX guide for those field and field option number.

Below the sample code is that when the field 6 is variable field, and option 2, image is to be set,

```java
private static final int FIELD_OPTION_IMAGE = 2;

...

content.put(CardContent.FIELD_6, FIELD_OPTION_IMAGE,
new ImageData().setImageResName("gallery"));

...
```



# 3. Server based integration

Bixby Home card server-based implementations enable your Bixby Home cards to be displayed to your app and card users at the right time and under the right conditions.

This document describes guides you through: 

- Server-based implementation of Bixby Home cards for Android apps
- Components in the Bixby Home environment
- How to register your Bixby Home card plans and Bixby Home cards
- Bixby Home card content and selection processing
- How to upload Bixby Home card content data.

 

> **Note:**     Bixby Home also supports application-based implementations, in which card content data is coded directly in the Bixby Home card's Android app. For details, see the *Bixby Home Application-Based Implementation Guide*.

 

Implementation relies on the integration of: your Partner Content Server, the Bixby Home Partner Portal, the Bixby Home Admin Tool, the Bixby Home Server, and the Bixby Home Client Application on user devices.



 To enable the implementation of your Bixby Home cards:

- You design your card based on your users’ needs and the most suitable Bixby Home card template.
- You register your card plan, and get it approved by Samsung.
- You register your card (for example, display conditions such as the relevant time and place, and card content selection rules) and get it approved by Samsung.
- You upload card content:
  - From your Partner Content Server to the Bixby Home Server using the Open API.
  - Throughout your card’s lifecycle, upload sets of card content data that are appropriate for display at different times (for example, on different days, at different times of the day, and for special situations).
- The Bixby team sets up deployment and display conditions for you card in the Bixby Admin Tool.
- The Bixby Home Server provides card display and template data to the Bixby Home Client App.
- The Bixby Home Client App determines when to display your card.
- The Bixby Home Server selects the most appropriate uploaded card content data and provides it to the Bixby Home Client App.
- Your users review your Bixby Home card and use its functionality.

 



## 3.1 Bixby Home Card Environment

 

### *3.1.1 Components and Functions*

 

- Bixby Home Partner Portal (<https://bixbyhome.samsungfeed.com>)

  - Become a Bixby partner.
  - Design your card based on your user needs, card content, and the card template that is most appropriate. Map card content to the template elements.
  - Create and submit your card plans and cards, and get them approved.

- Partner Content Server

  - One or more of your servers that send card content data to the Bixby Home Server using its Open API call [Upload Card Content Data](#_Put_Card_Content_1). You can also retrieve previously uploaded content, upload later versions of content (with or without deleting previous versions),  and delete uploaded content from the Bixby Home Server.
  - How often you upload content depends on your use scenario for your card.

- Bixby Home Admin Tool

  - Card plans and cards are evaluated and approved.

  - Approved cards are deployed.

  - The Bixby Home Partner Portal is managed.

    > **Note:** Only Samsung uses this tool.

- Bixby Home Server

  - Gets and processes uploaded card content data and display condition data.
  - Sends data to the Bixby Home Client Application.

- Bixby Home Client Application

- Resides on the user’s device.

- Determines when to display each Bixby Home card. 

- For each card to be displayed:

  - The Bixby Home Server selects the most appropriate card content and provides it to the Bixby Home Client Application.
  - Constructs and displays the card based on the card template and the card content.
  - Manages user-initiated card actions.

 

### *3.1.2 Roles*

 

- Bixby Partner (you)
  - Register card plans and get them approved.
  - Register cards (including card content and card display condition data) and get them approved.
  - Upload card content data from your Partner Content Server to the Bixby Home Server.
- Samsung
- Set up and enforce the display conditions of your card.
- Deploy your card to the Bixby Home Client Application on user devices.
- Your card users
  - See appropriate Bixby Home cards based on the user’s actions and preferences.
  - Review up-to-date card content that is either independent of, related to, or the same as the card's Android app.
  - Initiate functions provided by the card.







## 3.2 Manage Card Content

After the Bixby system determines that your card is to be displayed, the system then determines what content is to be displayed in the card based on the following:

- The selection rules you specify for your card’s content
- The card content you upload from your Partner Content Server to the Bixby Home Server using the Open API.  
- The settings related to selection rule filters that you apply to each uploaded card content.



The Bixby Home Server applies the selection rule filters to find all uploaded content that match all rule filters, and then selects the most appropriate of those based on the selection rule criteria. The Bixby Home Server then forwards the most appropriate uploaded content to the Bixby Home Client Application for display in the card template. 





### *3.2.1 Card Content Uploading and Management*

Each set of card content that you upload must specify all element components required for the card’s template. If the selected uploaded content does not include a full set of content data for the card’s template, then the No Content card is displayed.

You create and manage a unique content ID for each uploaded content (contentId). After your Bixby Home card is approved, Samsung assigns a unique access token to your card, which must be specified in each Open API call that targets the card. To get your card’s access token value, see [To manage your Bixby Home cards:](#_To_manage_your)

You use the access token and content ID to manage your uploaded content by the following Open API methods.

- Upload card content

  With the Upload Card Content Data API, you send card content from your Partner Content Server to the Bixby Home Server and make it available for display in your card.
   For details, see [Put Card Content Data](#_Put_Card_Content_1).

- Download previously uploaded content

  With the Get Uploaded Card Content Data API, you retrieve card content that was previously uploaded and is currently available for display in your card.

  Currently, individual contents can be checked, but contents retrieval function will be provided later.
   For details, see [Get Uploaded Card Content Data](#_Get_Card_Content_2). 

- Delete uploaded content

  With the Delete Uploaded Card Content Data API, you can make card content that was previously uploaded **not** available for display in your card. The content is permanently deleted from the Bixby Home Server.

  For details, see [Delete Uploaded Card Content Data](#_Delete_Card_Content).

 

For details, see the *Bixby Home SDK Card Template UX Guidelines*.

 

### *3.2.2 Bixby Home Server Endpoint Locations*

Bixby Home Server endpoints are located in the Asia, United States, and Europe regions. You should send your contents to the endpoints in all regions where your card will be served.

![1542855506726](C:\Users\Sungtaek\AppData\Roaming\Typora\typora-user-images\1542855506726.png)

| **Region** | **Bixby Home Server Endpoint**      |
| ---------- | ----------------------------------- |
| US         | https://us-data-api.samsungfeed.com |
| Asia       | https://ap-data-api.samsungfeed.com |
| Europe     | https://eu-data-api.samsungfeed.com |

For details about the countries serviced by each region, see [Appendix C. Bixby Home Server Endpoint Regions for Service Countries](#_Appendix_C._Bixby).

 

 

### *3.2.3 Uploaded Card Content Selection*

 When your card is to be displayed, the Bixby system will select the most appropriate content for your card based on: each set of card content data that you have uploaded from your Partner Content Server to the Bixby Home Server, and the evaluation of the content selection rules that you specify for your card. 



For each of your cards, you specify one or more selection rules to determine the most appropriate uploaded content for your card when it is to be displayed.  

 

Each selection rule is defined by the following:

- *Optional*  None, one, or more filters
  Multiple filters are connected by the logical AND condition. For details about each type of filter, see [Selection Rule Filters](#_Selection_Rule_Filters).
- *Required*  One selection criteria:
  - Latest        Of the uploaded content that match **all** rule filters, the content that was most recently uploaded is selected. If more than one most recent content was uploaded at the same time, then one of them will be arbitrarily selected.
  - Random    Of the uploaded content that match **all** rule filters, one content is arbitrarily selected.  



For the selection rule being evaluated:

- If no filter is specified, then the selection criteria will be used to evaluate **all** uploaded content in order to select the one most appropriate content.
- If one or more filters are specified:
  - If only one uploaded content matches all filters, then that content is selected.
  - If more than one uploaded content match all filters, then one of those will be selected based on the selection criteria.
  - If no uploaded content matches all filters, then the next lower selection rule is evaluated until all selection rules have been evaluated.



The following govern the evaluation of the selection rules specified in the list:

- At most, one selection rule is used to select one uploaded card content.
  However, evaluation of all selection rules could result in no selection of card content.
- The top selection rule is evaluated first.
- If uploaded content is selected by the rule being evaluated:
  - That content is displayed in the Bixby Home card.
  - The card content selection process stops.
- If no uploaded content is selected by the rule being evaluated:
  - The next lower selection rule is evaluated.
  - If uploaded content is selected, the content is used, and the selection process stops.
  - If no content is not selected, the next lower selection rule is evaluated.
- The selection process continues until either:
  - Uploaded content is selected by one of the selection rules.
    OR
  - The lowest selection rule is evaluated and no content is selected.
    The resulting action depends on whether or not the user has pinned the card:
    - When the user pinned the card, the No Content card is displayed.
    - When the user did not pin the card, the card and its No Content card are **not** displayed.

 

### Selection Rule Filters

When the Bixby Home system has determined that your card is to be displayed, the content to be displayed in your card will be the most appropriate collection of card content uploaded from your server to the Bixby Home Server, as determined by the following:

- The selection filters specified in the selection rules of your card registration (in the Bixby Home Partner Portal).
- The selection filter settings that are specified when card content is uploaded (specified in the contentField parameters of the [Upload Card Content Data](#_Upload_Card_Content) API call).

> **Note:**  These settings are applied to card content at the time of upload. Each uploaded content can specify more than one type of filter, and can specify more than one value for each filter.

  

| **Name**   | **Selection    Rule Setting**      | **Uploaded    Content     Settings**    contents    **└**{content}    **└** contentField | **Description**                                              |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Tag        | ‘Add filter’ and specify tag value | └ tag    └ {tag value}                                       | Consider content with the same tag value   as the selection rule’s tag value.   For example, you can assign unique tag   values for each of your Bixby Home cards. |
| FirstOfDay | ‘Add filter’                       | n/a[[PT4\]](#_msocom_4)                                      | Whether or not the user has entered the Bixby   Home Client App for the first time in the current day. If the user has, then   the filter condition is true. If the user has not, then false.   Typically, this filter is used with other   filters. |
| Country    | ‘Add filter’                       | └ country   └ {country value}                                | Consider content with the same country   value that the Bixby Home Client App has when the rule is evaluated. |
| Year       | ‘Add filter’                       | └ year   └ {year value}                                      | Consider content with the same year value   (YYYY) that the Bixby Home Client App has when the rule is evaluated. |
| Month      | ‘Add filter’                       | └ month   └ {month value}                                    | Consider content with the same month   value (01 to 12) that the Bixby Home Client App has when the rule is   evaluated. |
| Day        | ‘Add filter’                       | └ day   └ {day value}                                        | Consider content with the same date value   (00 to 31) that the Bixby Home Client App has when the rule is evaluated. |
| TimeRange  | ‘Add filter’                       | └ timeRange   └ {timeRange value}   └ start   └   end        | Consider content with daily start and end   hour-minute values (HH:mm) that includes the time (HH:mm) that the Bixby Home   Client App has when the rule is evaluated. |
| Weather    | ‘Add filter’                       | └ weather   └ {weather value}                                | Consider content with the same weather value   (0 to 19) that the Bixby Home Client App has when the rule is evaluated.   0: sunny   1: partly sunny   2: cloud   3: fog   4, 5, 6, 7, 21: raining   8, 9, 20:   thunder   10, 11,   12, 13, 14, 15, 16: snowing[[PT5\]](#_msocom_5)    17: hot   18: cold   19: windy |
| [None]     | Do **not** add any filter.         |                                                              | Apply the specified rule selection   criteria (latest or random) to **all** uploaded content. |

 

### Specify Selection Rules

Each Bixby Home card must specify at least one selection rule. Each rule must specify a selection criteria, but may or may not specify a filter. Rules in the list are evaluated from top-to-bottom.

 

To specify a selection rule in the Bixby Home Partner Portal:

- *Optional*  For each filter to be added, click **Add filter**.
  - For Tag filters, specify the tag value.
- *Required*  Select either the ‘Latest’ or ‘Random’ selection criteria.
- Click the **[selection rule’s** + **plus icon]**.



Additional selection rules are added below the last previously added rule.

![1542863509911](C:\Users\Sungtaek\AppData\Roaming\Typora\typora-user-images\1542863509911.png)



Example Selection Rule Evaluation Process

 ![1542863585787](C:\Users\Sungtaek\AppData\Roaming\Typora\typora-user-images\1542863585787.png)

   

1. Evaluate the top selection rule.
   - If the user has entered the Bixby Home Client App for the first time in the current day:
     - If one or more uploaded content matches the weather code value in the Bixby Home Client App, then select the most recently uploaded card content. Stop the selection rule evaluation process.
     - If **no** uploaded content matches the Bixby Home Client App’s weather code value, then evaluate selection rule #2.
   - If the user has not entered the Bixby Home Client App for the first time in the current day (for example, this is the second time they entered the app), then evaluate selection rule #2.
2. Evaluate the next selection rule.
   - If one or more uploaded content **both**: a) matches the country code value in the Bixby Home Client App, **and** b) has the tag setting ‘SpecialDay’, then select the most recently uploaded content. Stop the selection rule evaluation process.
   - If **no** uploaded content both: a) matches the Bixby Home Client App’s country code value, **and** 
     b) has the tag setting ‘SpecialDay’, then evaluate selection rule #3.
3. Evaluate the last selection rule.
   - If one or more card content has been uploaded, then arbitrarily select one card content. Stop the selection rule evaluation process.
   - If no card content has been uploaded, then display the No Content card. Stop the selection rule evaluation process.

 



## 3.2 Card Content Data Sets

You can specify one or more sets of card content data for the same Bixby Home card when you make an Upload Card Content Data API call. Each set of data must specify all of the card content elements (and all of the components for each element) that are required for the card’s template. Each uploaded set of content data is independently evaluated by the selection rule process in order to determine the most appropriate set of data to be displayed as the content of a card.

 

> **Note:**  Multiple sets of data for the same Bixby Home card can uploaded in one Upload Card Content Data API call. Each set of data will have the same: content ID, time of upload, and filter settings.
>
> For details about specifying and uploading sets of card content data, see [Upload Card Content Data](#_Put_Card_Content_1). 

 

For details about the card content elements that must be specified for each Bixby Home card template, see Appendix D. Bixby Home card Templates.

 

- Sample Upload API Code of One Content Data Set for a Card with Two Element Components

```json
"data" : [{
		"tag" : 1,
		"type" : "VIDEO",
		"property" : {
			"videoPath" : "https://img.kr.news.samsung.com/kr/wp-content/uploads/2017/04/galaxys8_007.mp4"
		}
	}, {
		"tag" : 2,
		"type" : "TEXT",
		"property" : {
			"rawString" : "Samsung Galaxy S8, S8+ Launch"
		}
	},
]
```



- Sample Upload API Code of Two Content Data Sets for a Card with Two Element Components

```json
"data" : [{
		"tag" : 1,
		"type" : "VIDEO",
		"property" : {
			"videoPath" : "https://img.kr.news.samsung.com/kr
							/wp-content/uploads/2017/04/galaxys8_007.mp4"
		}
	}, {
		"tag" : 2,
		"type" : "TEXT",
		"property" : {
			"rawString" : "Samsung Galaxy S8, S8+ Launch"
		}
	}, {
		"tag" : 1,
		"type" : "VIDEO",
		"property" : {
			"videoPath" : "https://img.kr.news.samsung.com/kr
							/wp-content/uploads/2017/04/galaxys8_007.mp4"
		}
	}, {
		"tag" : 2,
		"type" : "TEXT",
		"property" : {
			"rawString" : "Samsung Galaxy S8, S8+ Launch"
		}
	},

]
```



## 3.3 Bixby Home Server Open API

You use the Bixby Home Server Open API to upload your Bixby Home card content data from your Partner Content Server to the Bixby Home Server, and retrieve and delete card content data.





### *3.3.1 API Requirements and Restrictions*



#### Requests

All APIs require SSL communication. All APIs must use the HTTPS protocol. Required parameters must be specified in all API calls. Optional parameters may or may not be specified. Conditional parameters must be specified when their condition applies.

 

The access token, issued to the card's Android app registrar, must be specified to authenticate and execute an API call. You get the value from the Bixby Home Partner Portal ([To manage your Bixby Home cards:](#_To_manage_your)).

 

Regarding string and integer values:

- For string values:
  - Length(N)      String parameter size must be N.
  - Min(N)            If the parameter can accept a range of values, its minimum size is N.
  - Max(N)           The maximum size  of the parameter is N (default value: 9999)
- For integer values, minimum and maximum default settings:
  - Min  Default      0
  - Max Default        9999



Regarding the parameter format:

- Use the Restful format.

- To retrieve data, use the [Get Uploaded Card Content](#_Get_Uploaded_Card) API call, which uses a URL query parameter.

  > **Note:**  Every key value pair must be URL-encoded.

  ```http
  GET /getApi?key1=value1&key2=value2 HTTP/1.0                        
  Host: www.example.com                                               
  Accept: application/json    
  ```

- When changing data, use the [Upload Card Content](#_Put_Card_Content_1) API call, which uses a JSON body parameter; therefore, the method must set a Content-Type header as application/json;charset=UTF-8.

  ```http
  POST /postApi HTTP/1.0
  Host: www.example.com
  Accept: application/json
  Content-Type: application/json;charset=UTF-8
  Content-Length: 23
  {
  	"param1": "value",
  	"param2": "value"
  }    
  ```



#### Responses

Response data is returned in the JSON format.



 

### *3.3.2 Upload Card Content Data*

Uploads card content with a unique content ID to the Bixby Home Server. An API call specifies the content ID, one or more sets of card content data, filter settings, and whether or not to delete previously uploaded card content with the same content ID. All sets of card content data in the same API call will have the same: content ID, upload time, and filter settings.



#### Request

| **Method:**      | HTTPS / POST                                                 | **API result type:** | JSON |
| ---------------- | ------------------------------------------------------------ | -------------------- | ---- |
| **URL:**         | /v1/content/_upload                                          |                      |      |
| **Description:** | Upload one or more sets of card content   from your Partner Content Server to the Bixby Home Server, in order to make   it available for display in Bixby Home cards. |                      |      |
| **Condition:**   | The Bixby Home card must be approved.                        |                      |      |



**Request Header**

| **Name**      | **Type** | **Multiplicity** | **Description / Constraints**                                |
| ------------- | -------- | ---------------- | ------------------------------------------------------------ |
| x-accesstoken | String   | 1..1             | *Required*  Value   of the access token issued to the partner |
| Content-Type  | String   | 1..1             | *Required*  Must   be set to:   application/json; charset=UTF-8 |

 

**Request Parameters**

| **Name**       | **Type** | **Multiplicity** | **Description / Restrictions**                               |
| -------------- | -------- | ---------------- | ------------------------------------------------------------ |
| removeOthers   | Boolean  | 0..1             | *Optional*  Whether or not to delete content that has **not**   been updated after content uploading:   **true**      Remove   non-updated content.   **false**     *Default*   Do **not** remove non-updated content. |
| contents       | List     | 1..*             | *Required*  Content list                                     |
| └ {content}    | Object   | 1..1             | *Required*  Content object                                   |
| └ contentId    | String   | 1..1             | *Required*  ID of the content, which is unique among   all of your uploaded content |
| └ contentField | Object   | 0..1             | *Required*  Name of the content field object                 |
| └ tag          | List     | 0..1             | Tag settings that   apply to the card content   *Conditional*  If the Bixby Home card has one or more   selection rules with the Tag filter, this field must be specified. |
| └ {tag}        | String   | 1..*             | One or more tag   values that apply to the card content   *Conditional*  If the card has one or more selection rules   with the Tag filter, this field must be specified. |
| └ country      | List     | 0..1             | Country settings that   apply to the card content   *Conditional*  If the card has one or more selection rules   with the Country filter, this field must be specified. |
| └ {country}    | String   | 1..*             | One or more country   values (ISO 3166-1 alpha-2 code) that apply to the card content   *Conditional*  If the card has one or more selection rules   with the Country filter, this field must be specified. |
| └ year         | List     | 0..1             | Year settings that   apply to the card content   *Conditional*  If the card has one or more selection rules   with the Year filter, this field must be specified. |
| └ {year}       | String   | 1..*             | One or more year   values (YYYY) that apply to the card content   *Conditional*  If the card has one or more selection rules   with the Year filter, this field must be specified. |
| └ month        | List     | 0..1             | Month settings that   apply to the card content   *Conditional*  If the card has one or more selection rules   with the Month filter, this field must be specified. |
| └ {month}      | String   | 1..*             | One or more   numeric month values (MM) that apply to the card content   *Conditional*  If the card has one or more selection rules   with the Month filter, this field must be specified. |
| └ day          | List     | 0..1             | Day settings that   apply to the card content   *Conditional*  If the card has one or more selection rules   with the Day filter, this field must be specified. |
| └ {day}        | String   | 1..*             | One or more   numeric date of the month values (DD) that apply to the card content   *Conditional*  If the card has one or more selection rules   with the Day filter, this field must be specified. |
| └ timeRange    | List     | 0..1             | Daily time range   settings when card content is relevant   *Conditional*  If the card has one or more selection rules   with the TimeRange filter, this field must be specified. |
| └ {timeRange}  | Object   | 1..*             | One or more daily   time ranges ({"start": "HH:mm", "end": "HH:mm")   when card content is relevant   *Conditional*  If the card has one or more selection rules   with the TimeRange filter, this field must be specified. |
| └ start        | String   | 1..1             | Start time (HH:mm   24-hour, inclusive) of the time range when card content is relevant   *Conditional*  If the card has one or more selection rules   with the TimeRange filter, this field must be specified. |
| └ end          | String   | 1..1             | End time (HH:mm   24-hour, inclusive) of the time range when card content is relevant   *Conditional*  If the card has one or more selection rules   with the TimeRange filter, this field must be specified. |
| └ weather      | List     | 0..1             | Weather settings that   apply to the card content   *Conditional*  If the card has one or more selection rules   with the Weather filter, this field must be specified. |
| └ {weather}    | Integer  | 1..*             | One or   more weather values that apply to the card content:   *0: sunny*   *1: partly sunny*   *2: cloud*   *3: fog*   *4, 5, 6, 7, 21:   raining*   *8, 9, 20: thunder*   *10, 11, 12, 13,   14, 15, 16: snowing*   *17: hot*   *18: cold*   *19: windy*         *Conditional*  If the card has one or more selection rules   with the Weather filter, this field must be specified. |
| └ data         | List     | 1..1             | *Required*  One or more sets of card content data to be   uploaded |
| └ {data}       | Object   | 1..*             | *Required*  One set of card content data   **Note:**    Each set of card content data must specify a collection of tag, type,   property, and key parameter settings for each element component required by   the Bixby Home card’s template. |
| └ tag          | Int      | 1..1             | *Required*  ID number of the element component               |
| └ type         | String   | 1..1             | *Required*  Kind of data in the element component   For   details, see [Appendix A. Content Data Types](#_Appendix_A._Content) |
| └   property   | Object   | 1..1             | *Required*  Property object for the element component        |
| └ {key}        | -        | 1..*             | *Required*  Data subtype and value of the element   component (“subtype”: “value”)   For   details, see [Appendix A. Content Data Types](#_Appendix_A._Content) |



**Sample Request Code**

```http
POST https://[service domain]/v1/content/_upload
{
	"removeOthers" : true,
	"contents" : [
		{
			"contentId" : "content-1234",
			"contentField" : {
				"tag" : ["tag1", "tag2"],
				"country" : ["KR", "US", "GB"],
				"year" : ["2017", "2018"],
				"month" : ["03", "11"],
				"day" : ["01", "15"],
				"timeRange" : [
				{
					"start" : "12:00",
					"end" : "13:00"
				},
				{
					"start" : "18:00",
					"end" : "19:00"
				}
				],
				"weather" : [0, 17]
			},
			"data" : [
			{
					"tag" : 1,
					"type" : "VIDEO",
					"property" : {
						"videoPath" : "https://img.kr.news.samsung.com/kr/wp-content/uploads/2017/04/galaxys8_007.mp4"
					}
				},
			{
					"tag" : 2,
					"type" : "TEXT",
					"property" : {
						"rawString" : "Samsung Galaxy S8, S8+ Launch"
					}
				},
			{
					"tag" : 3,
					"type" : "ACTION",
					"property" : {
						"intent" : "https://news.samsung.com/kr/?p=325656"
					}
				},
				...
			]
		},
		...
	]
}
```

 

#### Response

| name          | Type   | Multiplicity | Description   / Restrictions                                 |
| ------------- | ------ | ------------ | ------------------------------------------------------------ |
| resultCode    | Int    | 1..1         | Result code   Success:    1000   Failure:      1001, 1002, 1100, 1101, 1201, 1202,   7001, 7999   For   details, see [Appendix B. API Result Codes](#_Appendix_B._API). |
| resultMessage | String | 1..1         | Result   message   For   details, see [Appendix B. API Result Codes](#_Appendix_B._API). |

 

**Sample Response Code**

```http
200 OK
{
	"resultCode": 1000,
	"resultMessage": "Success"
}
```





### *3.3.3 Get Uploaded Card Content Data*

Retrieves the specified set of card content data that was previously uploaded to the Bixby Home Server.



#### Request

| **Method:**      | HTTPS / GET                                                  | **API result type:** | JSON |
| ---------------- | ------------------------------------------------------------ | -------------------- | ---- |
| **URL:**         | /v1/content/{contentId}                                      |                      |      |
| **Description:** | Retrieve the Bixby Home card content   data from the Bixby Home Server. |                      |      |
| **Condition:**   | The Bixby card must be registered via   the Bixby Home partner portal. |                      |      |



**Request Header**

| **Name**      | **Type** | **Multiplicity** | **Description / Restrictions**                               |
| ------------- | -------- | ---------------- | ------------------------------------------------------------ |
| x-accesstoken | String   | 1..1             | *Required*  Value   of the access token issued to the partner. |



**Request Parameters**

| **Name**  | **Type** | **Multiplicity** | **Description / Constraints**                                |
| --------- | -------- | ---------------- | ------------------------------------------------------------ |
| contentId | String   | 1..1             | *Required*  ID of the content, which is unique among   all of your uploaded content |



**Sample Request Code**

```http
GET https://[service domain]/partner/v1/content/content-1234
```



#### Response

| Name          | Type   | Multiplicity | Description   / Restrictions                                 |
| ------------- | ------ | ------------ | ------------------------------------------------------------ |
| resultCode    | Int    | 1..1         | Result code   Success:    1000   Failure:      1001, 1002, 1100, 1101, 1201, 1202,   7001, 7999   For details, see [Appendix   B. API Result Codes](#_Appendix_B._API). |
| resultMessage | String | 1..1         | Result message   For details, see [Appendix   B. API Result Codes](#_Appendix_B._API). |
| content       | Object | 0..1         | Content   object   If previously   uploaded content with the specified content ID is not in the Bixby Home   Server, then this field will be not be specified.   For   details, see [Upload Card   Content Data](#_Put_Card_Content_1) |



**Sample Response Code**

```http
200 OK
{
	"resultCode" : 1000,
	"resultMessage" : "Success",
	"content" : {
		"contentId" : "content-1234",
		"contentField" : {
			"tag" : ["tag1", "tag2"],
			"country" : ["KR", "US", "GB"],
			"year" : ["2017", "2018"],
			"month" : ["03", "11"],
			"day" : ["01", "15"],
			"timeRange" : [
			{
				"start" : "12:00",
				"end" : "13:00"
			},
			{
				"start" : "18:00",
				"end" : "19:00"
			}
			],
			"weather" : [0, 17]
		},
		"data" : [
		{
				"tag" : 1,
				"type" : "VIDEO",
				"property" : {
					"videoPath" : "https://img.kr.news.samsung.com/kr/wp-content/uploads/2017/04/galaxys8_007.mp4"
				}
			},
		{
				"tag" : 2,
				"type" : "TEXT",
				"property" : {
					"rawString" : "Samsung Galaxy S8, S8+ Launch"
				}
			},
		{
				"tag" : 3,
				"type" : "ACTION",
				"property" : {
					"intent" : "https://news.samsung.com/kr/?p=325656"
				}
			},
			...
		]
	}
}
```

 

### *3.3.4 Delete Uploaded Card Content Data*

Removes the specified set of card content data previously uploaded to the Bixby Home Server.



#### Request

| **Method:**      | HTTPS / DELETE                                               | **API result type:** | JSON |
| ---------------- | ------------------------------------------------------------ | -------------------- | ---- |
| **URL:**         | /v1/content/{contentId}                                      |                      |      |
| **Description:** | Delete the specified card content from the   Bixby Home Server. |                      |      |
| **Condition:**   | The Bixby card must be registered via   the Bixby Home partner portal. |                      |      |



**Request Header**

| **Name**      | **Type** | **Multiplicity** | **Description / Restrictions**                               |
| ------------- | -------- | ---------------- | ------------------------------------------------------------ |
| x-accesstoken | String   | 1..1             | *Required*  Value   of the access token issued to the partner |



**Request Parameters**

| Name      | Type   | Multiplicity | Description   / Constraints                                  |
| --------- | ------ | ------------ | ------------------------------------------------------------ |
| contentId | String | 1..1         | *Required*  ID of the content, which is   unique among all of your uploaded content |



**Sample Request Code**

```http
DELETE https://[service domain]/partner/v1/content/content-1234
```



#### Response

| Name          | Type   | Multiplicity | Description   / Restrictions                                 |
| ------------- | ------ | ------------ | ------------------------------------------------------------ |
| resultCode    | Int    | 1..1         | Result code:   Success:    1000   Failure:      1001, 1002, 1100, 1101, 1201, 1202,   7001, 7999   For details, see [Appendix   B. API Result Codes](#_Appendix_B._API). |
| resultMessage | String | 1..1         | Result   message   For   details, see [Appendix B. API Result Codes](#_Appendix_B._API). |



**Sample Response Code**

```http
200 OK
{
	"resultCode": 1000,
	"resultMessage": "Success"
}
```



# 4. How to test of developed card.



## 4.1 Manifest side-loading



### 4.1.1 Loading local card manifest file

Without registering the card details in the CP portal one can make the card and test it on Bixby Home in supported device. Even though it does not provide full features, one can easily check how the card looks in Bixby Home.



1.  **Modify last item of \"card\_test.json\" file for your card. (If you want to add more cards, you can use cardNo between 85000 to 89999.)**

```json
{

    "idNo": 81000,
    "templateId": "ENTER_YOUR_SELECTED_TEMPLATE",
    "header": {
        "title": "Title For Your Card",
        "onClick": "http://developer.android.com",
        "buttons": "refresh|more", //This can be "close", but cannot be used together. (ex) refresh|more|close (X)
        "moreMenu": "pin|hide|off"
    }

}
```

If you want to launch your own application with title click, fill your application \"URI\" here. This will be parsed like this. \"Intent.parseUri(\"URI\", Intent.URI\_INTENT\_SCHEME);\"

Here is an example,

\"onClick\": \"intent:\#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=com.example.spage.card;end\",

![](media/image20.png){width="3.0972222222222223in" height="1.8125in"}

![](media/image21.png){width="3.201388888888889in" height="1.7361111111111112in"}

![](media/image22.png){width="2.9305555555555554in" height="1.6944444444444444in"}



1. **Make \"show\_me\_the\_card.test \" folder in your device root and add your modified \"card\_test.json\" file.**

2. **Enable Developer options by going to, Bixby Home Settings \> About Bixby \> Click 10 times on Bixby icon.**

3. **Click on Developer option and select \"Load local test cards\". \"Your cards are loaded\" toast will appear.**

4. **Your cards will be displayed in Bixby Home application.**



   ### 4.1.2 Testing custom menu (v2)

Adding custom menu under more option is available since SDK API version 2. Actually it should be set on Bixby Home portal site. But for the local test, you can add it on the test json file, like below. Then the menu will appear on the option menu of that card.

```json
"header": {
    ...
    "customMenus": [
        {
            "title" : "My menu",
            "onClick" : "Uri to Jump"
        }
    ]

}
```



### 4.1.3 Testing instant update (v2)

To do the local test of instant update, add the following block. With that interval, Bixby Home will call the onInstantUpdate method of your card. This is added in SDK API v2, so make sure that Bixby Home version you've installed supports SDK API v2 or later. (Refer to 2.5 Instant Update.)

```json
"cards": [

{

        ...

        "properties": {

            "updateInterval" : "5"

            ...

        }

        ...

}
```



## 4.2 Manifest fetched from the server

Instead of loading the local manifest file, you can fetch manifest file from the CP portal server with registered your card information.

To do this, at first you have to complete the card registration procedure on the server, and the issued card id number should be used in your application code and cards.xml file.

Your application key hash should be registered correctly.(Refer to 4.3. How to generate Key hash)

Then follow below steps. Your card will appear on Bixby Home card stream, if the appearance condition is met.

1. Enable Developer options by going to, Bixby Home Settings \> About Bixby \> Click 10 times on Bixby icon.

2. Click on Developer option and select \"Fetch test cards from server\" and enter your application package name or Card ID with prefix \'\#\' which was assigned to your card in Bixby Home partner portal. You can enter more than one package name with 'space' divider. (example, com.example.app.cp or \#559900000)

3. Click \"ok\" then your card information will be fetched from the server.



   ## 4.3 How to generate Key hash

The key hash string is required to register your card on the Bixby Home portal server.

1.  Using the default keystore only for the testing (with Android default debug keystore )

- Linux: keytool -exportcert -alias androiddebugkey -keystore \~/.android/debug.keystore \| openssl sha1 -binary \| openssl base64

- Windows: keytool -exportcert -alias androiddebugkey -keystore %HOMEPATH%\\.android\\debug.keystore \| openssl sha1 -binary \| openssl base64


2. Using you own official keystore (For the official release, the same keystore of your application package should be used.)

   ```co
   keytool -exportcert -alias <RELEASE_KEY_ALIAS> -keystore <RELEASE_KEY_PATH> | openssl sha1 -binary | openssl base64
   ```


3. If you can only have the certificate, not keystore.

   ```
   openssl x509 -in <YOUR_CERT>.crt -outform der | openssl sha1 -binary | openssl base64
   
   or
   
   cat <YOUR_CERT>.der | openssl sha1 -binary | openssl base64
   ```


4. If you want to extract it from the signed apk,

   ```
   keytool -list -printcert -jarfile <YOUR_PACKAGE>.apk | grep -Po "(?<=SHA1:) .*" | xxd -r -p | openssl base64
   
   or
   
   unzip -p <your_package.apk> META-INF/CERT.RSA | openssl pkcs7 -print_certs -inform der | openssl x509 -outform der | openssl sha1 -binary | openssl base64
   ```



key hash value example:

"rNc7uTDdaT/iAl6mw02sudkyje8="



## 4.4 How to check the SDK API version of Bixby Home

To get the API version of Bixby Home package installed on the device,

```java
SpageCardSdk csdk = new SpageCardSdk();

try {

	csdk.initialize(context);

} catch (SsdkUnsupportedException e) {

    // Not supported device
    return false;
}

int apiVersion = csdk.getApiVersionOfSpage(context);

if (apiVersion == 0) {
	// SDK feature is not supported'

} else {
	// SDK Api version is equal or more than 1.

}
```



## 4.5 Resolving build errors to migrate from older SDK library to v1.0.3 or later

If you has been using SDK library before v1.0.3 and move to use that version or later, please resolve build errors as following guide.

The below method of CardContentProvider class had been deleted at v1.0.3 library.

```java
protected abstract void onReceiveEvent(Context context, CardContentManager manager, int cardId, String event)
```



Instead, to extend event information, following method was added. (last argument type is changed.)

```java
protected void onReceiveEvent(Context context, CardContentManager manager, int cardId, Event event)
```



So please change the method on your class inherited from CardContentProvider, to latter one.

And in your implementation body, replace string type 'event' argument with **event.getEventName**().



## 4.6 Bixby Home card integration "Auto-testing" guide

In order to run self-test on Bixby home card creation process, developer must have card ID generated from the portal. Developer will have real card ID when you save your card on portal. "Auth-testing" method will help developer to verify card implementation for both server based card and app based card. It also provides error message to give basic information for resolution.



***How to enter Bixby Home "Developer mode"***

Developer can download SDK package and install the reference app to develop Bixby Home card. The "Developer mode" menu is only available on reference app in SDK package from Bixby Home partner portal(<https://bixbyhome.samsungfeed.com>). Once you install the reference app from the SDK package, you will be able to use "Developer mode" with following step.

![](media/image23.png){width="5.850533683289589in" height="4.572916666666667in"}



***How to run "Auto-testing"***

Once you turn on the Developer mode, you will be able to run "Auto-testing" for end-to-end test. With "Auto-testing", you will be able to check whether you have correctly done everything.

![](media/image24.png){width="5.854166666666667in" height="3.7970778652668415in"}



You will need to input your package name or card id with \# on both "Fetch cards from server". You will see your card on setting menu. **Make sure you turn on your card to run "Auto-testing"**. After you turn on your card on settings, go to "Auto-testing" and input your card id with \# or package name to run. With package name, "Auto-testing" tool will grab card ID from your apk and test all cards which you defined on cards.xml.

Finally you are able to see "Auto-testing" result. If you get pass result, please submit your card to report Bixby Home test team.





# Appendix A. Sample Application

This chapter explains User interface concept and example codes of each template card of Sample Application. (If you want to see all supported example cards, install sample application and execute it first. After it, follow side-loading procedure in Appendix.)



## 1 "UTILITY\_SHORTCUT\_BASIC\"

This template card is suitable for shortcut type application.



### 1.1 GUI preview

This is a sample preview of shortcut type template card.

![](D:/ztmp/manual/developer%20guide/media/image8.png){width="2.8285717410323707in" height="2.0857152230971128in"}



### 1.2 Field Area

This is field area definition of shortcut type template card from UX guide.

![](D:/ztmp/manual/developer%20guide/media/image9.png){width="2.6462029746281717in" height="2.1878051181102363in"}



### 1.3 Field Number

This is field number definition of shortcut type template card. This will help in creating FieldData and fill the CardContent.

![](D:/ztmp/manual/developer%20guide/media/image10.png){width="2.6774573490813647in" height="1.8127526246719161in"}



### 1.4 Field Number Table

This is data type definition of each field.

![](D:/ztmp/manual/developer%20guide/media/image11.png){width="3.615087489063867in" height="3.052509842519685in"}



### 1.5 Sample Codes

The details can be referenced in sample application source codes.

```java
import static com.samsung.android.sdk.spage.card.CardContent.*;

...

private CardContent putShortcutData(Context context,int id) {

    Uri image1Uri = getUriToDrawable(context, R.drawable.clock);

    CardContent content = new CardContent(id);

    content.put(FIELD_1, new TextData().setText("[TEST]GALAXY APPS")); // Not Mandatory data
    content.put(FIELD_2, new TextData().setText("popular app")); // Not Mandatory data
    content.put(FIELD_3, new ImageData().setImageUri(image1Uri.toString())); // Mandatory data
    content.put(FIELD_4, new TextData().setText("Clock")); // Mandatory data
    content.put(FIELD_5, new RectData().setIntent(new Intent().setData(Uri.parse("http://www.samsung.com")))); // Mandatory data

    ...

    Uri image5Uri = getUriToDrawable(context, R.drawable.camera);

    content.put(FIELD_15, new ImageData().setImageUri(image5Uri.toString()));
    content.put(FIELD_16, new TextData().setText("Camera"));
    content.put(FIELD_17, new RectData().setIntent(new Intent().setData(Uri.parse("http://www.samsung.com"))));
    content.put(FIELD_18, new TextData().setText("VIEW MORE").setIntent(new Intent().setData(Uri.parse("https://www.samsung.com"))));

    return content;

}
```



## 2 \"UTILITY\_LIST\_IMAGE\"

This template card is suitable for list type application.



### 2.1 GUI preview

This is a sample preview of list type template card.

![](D:/ztmp/manual/developer%20guide/media/image12.png){width="2.85in" height="2.25in"}



### 2.2 Field Area

This is filed area definition of list type template card.

![](D:/ztmp/manual/developer%20guide/media/image13.png){width="2.6566207349081363in" height="2.1044608486439196in"}



### 2.3 Field Number

This is filed number definition of list type template card.

![](D:/ztmp/manual/developer%20guide/media/image14.png){width="2.708711723534558in" height="1.6877351268591425in"}



### 2.4 Field Number Table

This is data type definition of each field.

![](D:/ztmp/manual/developer%20guide/media/image15.png){width="3.9067957130358706in" height="2.4065857392825896in"}



### 2.5 Sample Codes

The details can be referenced in sample application source codes.

```java
import static com.samsung.android.sdk.spage.card.CardContent.*;

...

private CardContent putListImageData(Context context, int id) {

    CardContent content = new CardContent(id);

    Uri image1Uri = getUriToDrawable(context, R.drawable.camera);

    content.put(FIELD_1, new ImageData().setImageUri(image1Uri.toString()));
    content.put(FIELD_2, new TextData().setText("search camera"));
    content.put(FIELD_3, new TextData().setText("Camera"));
    content.put(FIELD_4, new TextData().setText("samsung"));
    content.put(FIELD_5, new RectData().setIntent(new Intent().setData(Uri.parse("https://www.google.com/search?q=camera"))));

    ...

    Uri image3Uri = getUriToDrawable(context, R.drawable.notes);

    content.put(FIELD_11, new ImageData().setImageUri(image3Uri.toString()));
    content.put(FIELD_12, new TextData().setText("search samsung notes"));
    content.put(FIELD_13, new TextData().setText("samsung notes"));
    content.put(FIELD_14, new TextData().setText("samsung"));
    content.put(FIELD_15, new RectData().setIntent(new Intent().setData(Uri.parse("https://www.google.com/search?q=samsung notes"))));

    return content;

}
```



## 3 \"MULTIMEDIA\_MUSICPLAYER\_BASIC\"

This template card is suitable for multimedia music player type application.



### 3.1 GUI preview

This is a sample preview of multimedia music player type template card.

![](D:/ztmp/manual/developer%20guide/media/image16.png){width="2.721429352580927in" height="2.1928576115485563in"}



### 3.2 Field Area

This is filed area definition of multimedia music player type template card.

![](D:/ztmp/manual/developer%20guide/media/image17.png){width="2.68787510936133in" height="2.604529746281715in"}



### 3.3 Field Number

This is filed number definition of multimedia music player type template card.

![](D:/ztmp/manual/developer%20guide/media/image18.png){width="2.7295472440944883in" height="2.6566207349081363in"}



### 3.4 Field Number Table

This is data type definition of each field.

![](D:/ztmp/manual/developer%20guide/media/image19.png){width="3.8859590988626422in" height="1.802334864391951in"}



### 3.5 Sample Codes

The details can be referenced in sample application source codes.

```java
import static com.samsung.android.sdk.spage.card.CardContent.*;

...

public static void updateMusicCardData(Context context, MusicCardData musicCardData) {

    CardContent cardContent = new CardContent(MUSIC_CARD_ID);

    if (musicCardData != null) {

        cardContent.put(FIELD_1, new TextData().setText(musicCardData.track.getTitle()));
        cardContent.put(FIELD_2, new TextData().setText(musicCardData.track.getArtist()));
        cardContent.put(FIELD_3,

        new ImageData().setImageUri("content://media/external/audio/albumart/" + musicCardData.track.getAlbumId()));

        ControllerData controllerData = new ControllerData()

        .setState(musicCardData.playing ? PLAYING : PAUSED);

        if (musicCardData.currentIndex == 0) {
            controllerData.addFlags(DISABLE_PREV_BUTTON);
        }

        if (musicCardData.currentIndex == musicCardData.size - 1) {
            controllerData.addFlags(DISABLE_NEXT_BUTTON);
        }

        cardContent.put(FIELD_4, controllerData);
        cardContent.put(FIELD_5,

        new RectData().setIntent(new Intent().setData(Uri.parse("https://www.google.com/search?q=" + musicCardData.track.getArtist()))));

    } else {

    	cardContent.put(FIELD_4, new ControllerData().addFlags(DISABLE_PREV_BUTTON | DISABLE_PLAY_BUTTON | DISABLE_NEXT_BUTTON));

    }

    CardContentManager.getInstance().updateCardContent(context, cardContent);

}
```







# Appendix B. Card Content Data Types, Subtypes, and Values

In the set of card content data, each element component is assigned a type, a subtype, and a value.

 

| **Type**   | **Subtype**                                                  | **Value Description  and Example**                           |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| TEXT       | rawString                                                    | *Required*  Brief description of the image, action, or   video    "My   news title" |
| IMAGE      | uriString                                                    | *Required*  Source of the graphic image     "http://server/img/my_img.png"   "content://provider/img/32" |
| ACTION     | intent                                                       | *Required*  Target of the action   "https://www.instagram.com"   "intent:#Intent;action=com.example.action.show_more;S.EXTRA_TYPE=music;end" |
| intentType | *Optional*  Type of action   "ACTIVITY"          *Default*   "BROADCAST" |                                                              |
| VIDEO      | videoPath                                                    | *Required*  Source of the video content           "http://sever/video/my_video.mp4"   "file://sdcard/video/my_video.mp4" |
| seekPos    | *Optional*  Start of video playback (0 to 3000 ms after   the beginning of video) |                                                              |

 

# Appendix C. API Result Codes

 Whether successful or failed, each API call returns a result code and message.  

| **HTTP Status Code**         | **Result   Code**     | **Result Message**               | **Description**                         |
| ---------------------------- | --------------------- | -------------------------------- | --------------------------------------- |
| 200  OK                      | 1000                  | Success                          | API call as   specified was successful. |
| 400  Bad   Request           | 1001                  | Bad Request                      | Invalid request   protocol              |
| 1002                         | Bad Request           | Invalid access token             |                                         |
| 1100                         | Bad Request           | Invalid parameter                |                                         |
| 1101                         | Bad Request           | Required   parameter is missing. |                                         |
| 1201                         | Bad Request           | Invalid content   field          |                                         |
| 1202                         | Bad Request           | Invalid data                     |                                         |
| 500  Internal   Server Error | 7001                  | Internal Server   Error          | Database error                          |
| 7999                         | Internal Server Error | System error                     |                                         |

 

# Appendix D. Bixby Home Countries, Regions, and Endpoints

Bixby Home Server endpoints are located in the regions below that serve the Bixby Home Service countries. Determine the region for your Partner Content Server, and send your Bixby Home Service Open API calls to the region’s endpoint.



| **Region** | **Bixby Home Server Endpoint**      |
| ---------- | ----------------------------------- |
| US         | https://us-data-api.samsungfeed.com |
| Asia       | https://ap-data-api.samsungfeed.com |
| Europe     | https://eu-data-api.samsungfeed.com |

 

| **Region** | **Country**                       | **Region**             | **Country**                                |      |       |
| ---------- | --------------------------------- | ---------------------- | ------------------------------------------ | ---- | ----- |
| US         | AG                                | Antigua and   Barbuda  | US                                         | HT   | Haiti |
| AI         | Anguilla                          | JM                     | Jamaica                                    |      |       |
| AN         | Netherlands   Antilles            | KN                     | Saint Kitts and   Nevis                    |      |       |
| AR         | Argentina                         | KY                     | Cayman Islands                             |      |       |
| AW         | Aruba                             | LC                     | Saint Lucia                                |      |       |
| BB         | Barbados                          | MQ                     | Martinique                                 |      |       |
| BM         | Bermuda                           | MS                     | Montserrat                                 |      |       |
| BO         | Bolivia                           | MX                     | Mexico                                     |      |       |
| BR         | Brazil                            | NI                     | Nicaragua                                  |      |       |
| BS         | Bahamas                           | PA                     | Panama                                     |      |       |
| BZ         | Belize                            | PE                     | Peru                                       |      |       |
| CA         | Canada                            | PM                     | Saint Pierre and   Miquelon                |      |       |
| CL         | Chile                             | PR                     | Puerto Rico                                |      |       |
| CO         | Colombia                          | PY                     | Paraguay                                   |      |       |
| CR         | Costa Rica                        | SR                     | Suriname                                   |      |       |
| CU         | Cuba                              | SV                     | El Salvador                                |      |       |
| DM         | Dominica                          | TC                     | Turks and Caicos   Islands                 |      |       |
| DO         | Dominican   Republic              | TT                     | Trinidad and   Tobago                      |      |       |
| EC         | Ecuador                           | US                     | United States                              |      |       |
| FK         | Falkland Islands                  | UY                     | Uruguay                                    |      |       |
| GD         | Grenada                           | VC                     | Saint Vincent and   the Grenadines         |      |       |
| GF         | French Guiana                     | VE                     | Venezuela                                  |      |       |
| GL         | Greenland                         | VG                     | British Virgin   Islands                   |      |       |
| GP         | Guadeloupe                        | VI                     | Virgin Islands                             |      |       |
| GT         | Guatemala                         |                        |                                            |      |       |
| GY         | Guyana                            |                        |                                            |      |       |
| HN         | Honduras                          |                        |                                            |      |       |
| **Region** | **Country**                       | **Region**             | **Country**                                |      |       |
| Asia       | AE                                | United Arab   Emirates | Asia                                       | MO   | Macau |
| AF         | Afghanistan                       | MP                     | Northern Mariana   Islands                 |      |       |
| AM         | Armenia                           | MV                     | Maldives                                   |      |       |
| AS         | American Samoa                    | MY                     | Malaysia                                   |      |       |
| AU         | Australia                         | NC                     | New Caledonia                              |      |       |
| AZ         | Azerbaijan                        | NF                     | Norfolk Island                             |      |       |
| BD         | Bangladesh                        | NP                     | Nepal                                      |      |       |
| BH         | Bahrain                           | NR                     | Nauru                                      |      |       |
| BN         | Brunei                            | NU                     | Niue                                       |      |       |
| BT         | Bhutan                            | NZ                     | New Zealand                                |      |       |
| CC         | Cocos Islands                     | OM                     | Oman                                       |      |       |
| CK         | Cook Islands                      | PF                     | French Polynesia                           |      |       |
| CX         | Christmas Island                  | PG                     | Papua New Guinea                           |      |       |
| CY         | Cyprus                            | PH                     | Philippines                                |      |       |
| FJ         | Fiji                              | PK                     | Pakistan                                   |      |       |
| FM         | Micronesia,   Federated States of | PN                     | Pitcairn Islands                           |      |       |
| GE         | Georgia                           | PW                     | Palau                                      |      |       |
| GU         | Guam                              | QA                     | Qatar                                      |      |       |
| HK         | Hong Kong                         | RU                     | Russia                                     |      |       |
| ID         | Indonesia                         | SA                     | Saudi Arabia                               |      |       |
| IL         | Israel                            | SB                     | Solomon Islands                            |      |       |
| IN         | India                             | SG                     | Singapore                                  |      |       |
| IO         | British Indian   Ocean Territory  | SY                     | Syria                                      |      |       |
| IQ         | Iraq                              | TH                     | Thailand                                   |      |       |
| IR         | Iran                              | TJ                     | Tajikistan                                 |      |       |
| JO         | Jordan                            | TK                     | Tokelau                                    |      |       |
| JP         | Japan                             | TM                     | Turkmenistan                               |      |       |
| KG         | Kyrgyzstan                        | TO                     | Tonga                                      |      |       |
| KH         | Cambodia                          | TP                     | East Timor                                 |      |       |
| KI         | Kiribati                          | TR                     | Turkey                                     |      |       |
| KP         | Korea, North                      | TV                     | Tuvalu                                     |      |       |
| KR         | Korea, South                      | TW                     | Taiwan                                     |      |       |
| KW         | Kuwait                            | UM                     | United States   Minor Outlying Islands     |      |       |
| KZ         | Kazakhstan                        | UZ                     | Uzbekistan                                 |      |       |
| LA         | Laos                              | VN                     | Vietnam                                    |      |       |
| LB         | Lebanon                           | VU                     | Vanuatu                                    |      |       |
| LK         | Sri Lanka                         | WF                     | Wallis and Futuna                          |      |       |
| MH         | Marshall Islands                  | WS                     | Western Samoa                              |      |       |
| MM         | Myanmar                           | YE                     | Yemen                                      |      |       |
| MN         | Mongolia                          |                        |                                            |      |       |
| **Region** | **Country**                       | **Region**             | **Country**                                |      |       |
| Europe     | AD                                | Andorra                | Europe                                     | EG   | Egypt |
| AL         | Albania                           | EH                     | Western Sahara                             |      |       |
| AO         | Angola                            | ER                     | Eritrea                                    |      |       |
| AQ         | Antarctica                        | ES                     | Spain                                      |      |       |
| AT         | Austria                           | ET                     | Ethiopia                                   |      |       |
| BA         | Bosnia and   Herzegovina          | FI                     | Finland                                    |      |       |
| BE         | Belgium                           | FO                     | Faroe Islands                              |      |       |
| BF         | Burkina Faso                      | FR                     | France                                     |      |       |
| BG         | Bulgaria                          | FX                     | France,   Metropolitan                     |      |       |
| BI         | Burundi                           | GA                     | Gabon                                      |      |       |
| BJ         | Benin                             | GB                     | United Kingdom                             |      |       |
| BV         | Bouvet Island                     | GG                     | Guernsey                                   |      |       |
| BW         | Botswana                          | GH                     | Ghana                                      |      |       |
| BY         | Belarus                           | GI                     | Gibraltar                                  |      |       |
| CF         | Central African   Republic        | GM                     | Gambia, The                                |      |       |
| CG         | Congo, Republic   of the          | GN                     | Guinea                                     |      |       |
| CH         | Switzerland                       | GQ                     | Equatorial Guinea                          |      |       |
| CI         | Cote d'Ivoire                     | GR                     | Greece                                     |      |       |
| CM         | Cameroon                          | GS                     | South Georgia and   South Sandwich Islands |      |       |
| CV         | Cape Verde                        | GW                     | Guinea-Bissau                              |      |       |
| CZ         | Czech Republic                    | HM                     | Heard Island and   McDonald Islands        |      |       |
| DE         | Germany                           | HR                     | Croatia                                    |      |       |
| DJ         | Djibouti                          | HU                     | Hungary                                    |      |       |
| DK         | Denmark                           | IE                     | Ireland                                    |      |       |
| DZ         | Algeria                           | IS                     | Iceland                                    |      |       |
| EE         | Estonia                           |                        |                                            |      |       |

 



