---
#icon: material/folder-open-outline
icon: material/medal
---

## Story
If the customer wants to use a custom channel, which is not supported by Webex Contact Center natively, they can integrate it with Webex CC using Bring Your Own Channel (BYOC) capability. Such integration significantly expands the amount of options available for end customers to contact companies, partners or service providers via Webex Contact Center through a variety of different digital channels, including social media and custom channels. This makes the entire communication much easier and convenient for the end customers regardless of what type of communication they prefer.

### Call Flow Overview
1. Contact center administrator establishes integration with the external digital channel and subscribes it to receive messages and events from Webex CC.
2. A new request is initiated by the customer and enters the flow.
3. The flow interacts with the customer to gather the details necessary process the request.
3. The flow extracts the data from customer responses, prepares necessary info for the agent, and routes the request to the queue for further assistance.

### Mission Details

Your mission is to:

1. Get webhook URL of the external message recipient and subscribe it to the messages and events from Webex CC. </br>
2. Build a custom messaging flow in the unified flow designer. </br>
3. Set up chat request routing depending on the topic. </br>
4. Test message exchange between the customer and the agent. </br>

### Build

1. Open your web browser or a new tab in an exisiting web browser window and navigate to **[UseWebhook site](https://usewebhook.com/){:target="_blank"}**. Then click on **Copy URL** button next to the webhook URL at the top of the page to make a copy of URL.
**<span style="color: red;">Please keep this browser tab open to avoid changing your unique Webhook URL.</span>**

    ![profiles](../graphics/Lab1/L1M3_Webhook_Site.gif)

2. Log in to [Webex Contact Center Developer Portal](https://developer.webex.com/webex-contact-center/docs/webex-contact-center){:target="_blank"} by using your Admin profile.
   Your login will be of the format **<span class="attendee-id-container">wxcclabs+admin_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+admin_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy" title="Click to copy!"></span></span>**. If you did not sign in to the Collaboration Control Hub or the other resource under the same admin account in the same web browser session yet, you will see another login screen with the Webex logo on it where you may need to enter the email address again and the password provided to you.

3. Let's subscribe your Webhook URL to receive Webex Contact Center **events** via API. Go to the [Register Subscription](https://developer.webex.com/webex-contact-center/docs/api/v1/subscriptions/register-subscription){:target="_blank"} section of **Webex Contact Center Developer Portal**. Switch to **Request Body (JSON)** tab in the window on the right-hand side, then copy the JSON body below, paste it there, scroll down and press **Run** button: 

    !!! Note
        Please replace **[Your Attenee ID]** and **[Webhook URL from step 1]** parts in JSON body with the proper values before executing API request.

    ``` JSON
    {
        "name": "*[Your Attenee ID]-Event-Sub*",
        "eventTypes": [
            "task:new",
            "task:failed",
		    "task:connected",
		    "task:ended"
        ],
        "destinationUrl": "*[Webhook URL from step 1]*",
        "secret": "secret-string-to-sign-event-payloads",
        "orgId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
        "resourceVersion": "task:1.0.0"
    }
    ```

4. Make sure your **event** subscription has been sucessfully registered. Here is the example of successful API response:

    ``` JSON
    {
        "placeholder": "placeholder"
    }
    ```

5. Let's now subscribe the same Webhook URL to receive Webex Contact Center **messages** via API. Go to the [Register Subscription](https://developer.webex.com/webex-contact-center/docs/api/v1/subscriptions/register-subscription){:target="_blank"} page again. Switch to **Request Body (JSON)** tab in the window on the right-hand side, then copy the JSON body below, paste it there, scroll down and press **Run** button: 

    !!! Note
        Please replace **[Your Attenee ID]** and **[Webhook URL from step 1]** parts in JSON body with the proper values before executing API request.

    ``` JSON
    {
        "name": "*[Your Attenee ID]-Event-Sub*",
        "eventTypes": [
            "task:new",
            "task:failed",
		    "task:connected",
		    "task:ended"
        ],
        "destinationUrl": "*[Webhook URL from step 1]*",
        "secret": "secret-string-to-sign-event-payloads",
        "orgId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
        "resourceVersion": "task:1.0.0"
    }

6. Make sure your **message** subscription has been sucessfully registered. Here is the example of successful API response:

    ``` JSON
    {
        "placeholder": "placeholder"
    }
    ```

7. Open a new tab in your web browser and log in to [Collaboration Control Hub](https://admin.webex.com){:target="_blank"} by using your Admin profile. 
   Your login will be of the format **<span class="attendee-id-container">wxcclabs+admin_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+admin_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy" title="Click to copy!"></span></span>**.

    ![profiles](../graphics/Lab1/L1M1_Admin_Login.gif)

    !!! Note
        Remember to take up the offer from Chrome to save your password.

8. Click on the **Contact Center** item under the **SERVICES** section on the left pane.

9. 


3. Navigate to **Flows** under **Customer Experience** section on the left, click on **Manage Flows** dropdown list on the top right and select **Create Flows**.

4. New **Flow creation** tab will be opened. Select **Flow** and **Start from scratch** in that tab and press **Next**.

5. On the **Flow confiduration** tab name your flow as <span class="attendee-id-container">**BYOC_Flow_<span class="attendee-id-placeholder" data-prefix="BYOC_Flow_">Your_Attendee_ID</span><span class="copy" title="Click to copy!"></span></span>** Then select **Custom-Messaging-BYOC** as a channel type and click on **Create Flow**. The new flow with the only **Start Flow** node on the flow canvas will be created.

    !!! Note
        - **Edit** toggle at the top center of the page should be turned on when you create a new flow. If the toggle is off, switch it to on.
        - **Autosave** toggle at the bottom right of the page should also be turned on. If it is off, turn it on.

6.  Click on any empty point at the flow canvas to see **Global flow properties** tab on the right-hand side. Then go to that pane, scroll down to the **Configuration - Flow Variables** and create the following variables by pressing **Create flow variable** button:

    > - **name**: Variable type - **String**, Agent viewable - **On**, Desktop label - **Customer name**
    >
    > - **topic**: Variable type - **String**, Agent viewable - **On**, Desktop label - **Brief description**

7. Scroll down and turn on **Enable decryption** toggle on the same **Global flow properties** tab.

8. Add **Send Chat** node from the **Activities** pane on the left to the main flow canvas and set the following node settings: