---
#icon: material/folder-open-outline
icon: material/medal
---

## Story
If the customer wants to use a custom channel, which is not supported by Webex Contact Center natively, they can integrate it with Webex CC using Bring Your Own Channel (BYOC) capability. Such integration significantly expands the amount of options available for end customers to contact companies, partners or service providers via Webex Contact Center through a variety of different digital channels, including social media and custom channels. This makes the entire communication much easier and convenient for the end customers regardless of what type of communication they prefer.

### Call Flow Overview
1. Contact center administrator establishes integration with the external custom channel and subscribes it to receive messages and events from Webex CC.
2. A new request is initiated by the end customer and triggers custom messaging flow.
3. The flow interacts with the customer to gather the details necessary to process the request.
4. The flow extracts the data from customer responses, prepares necessary info for the agent, and routes the request to the queue for further assistance.

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

3. Let's subscribe your Webhook URL to receive Webex Contact Center **events** via Subscriptions API. Go to the [Register Subscription](https://developer.webex.com/webex-contact-center/docs/api/v1/subscriptions/register-subscription){:target="_blank"} section of **Webex Contact Center Developer Portal**. Switch to **Request Body (JSON)** tab in the window on the right-hand side, then copy the JSON body below, paste it there, scroll down and press **Run** button: 

    !!! Note
        Please replace the following parameters in JSON body below before executing API request:

        - **[Your Attendee ID]** - **<span class="attendee-id-placeholder">Your_Attendee_ID</span>**
        - **[Webhook URL from step 1]** - paste your Webhook URL

    ``` JSON
    {
        "name": "[Your Attenee ID]-Event-Sub",
        "eventTypes": [
            "task:new",
            "task:failed",
		    "task:connected",
		    "task:ended"
        ],
        "destinationUrl": "[Webhook URL from step 1]",
        "secret": "secret-string-to-sign-event-payloads",
        "orgId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
        "resourceVersion": "task:1.0.0"
    }
    ```
    
    > **<details><summary>Example of **event subscription** JSON body</summary>**
    >
    > Here is the example of **event subscription** JSON body for attendee **133** and webhook URL **https://usewebhook.com/ac52e535e67c204214ab31283faecbc9**:
    >
        ``` JSON
        {
            "name": "133-Event-Sub",
            "eventTypes": [
                "task:new",
                "task:failed",
                "task:connected",
                "task:ended"
            ],
            "destinationUrl": "https://usewebhook.com/ac52e535e67c204214ab31283faecbc9",
            "secret": "secret-string-to-sign-event-payloads",
            "orgId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
            "resourceVersion": "task:1.0.0"
        }
        ```
    >
    > </details>

    Make sure your **event subscription** has been successfully registered. Here is the example of JSON body of successful API response (Response code - 201):

    ``` JSON
    {
        "meta": {
            "orgId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
            "subscriptionLimit": 20,
            "subscriptionCount": 9
        },
        "data": {
            "id": "d4a5713d-6b3f-45cc-b507-52ea15509da0",
            "name": "133-Event-Sub",
            "eventTypes": [
                "task:failed",
                "task:connected",
                "task:ended",
                "task:new"
            ],
            "destinationUrl": "https://usewebhook.com/ac52e535e67c204214ab31283faecbc9",
            "createdTime": 1795633055860,
            "createdBy": "wxcclabs+admin_ID133@gmail.com",
            "status": "active",
            "lastUpdatedTime": 1795633055860,
            "lastUpdatedBy": "wxcclabs+admin_ID133@gmail.com",
            "resourceVersion": "task:1.0.0"
        }
    }
    ```

4. Let's now subscribe the same Webhook URL to receive Webex Contact Center **messages** via Subscriptions API. Go to the [Register Subscription](https://developer.webex.com/webex-contact-center/docs/api/v1/subscriptions/register-subscription){:target="_blank"} page again. Switch to **Request Body (JSON)** tab in the window on the right-hand side, then copy the JSON body below, paste it there, scroll down and press **Run** button: 

    !!! Note
        Please replace the following parameters in JSON body below before executing API request:

        - **[Your Attendee ID]** - **<span id="display-attendee">No ID stored</span>**
        - **[Webhook URL from step 1]** - paste your Webhook URL

    ``` JSON
    {
        "name": "[Your Attendee ID]-Message-Sub",
        "eventTypes": [
            "task-message:appended",
            "task-message:append-failed"
        ],
        "destinationUrl": "[Webhook URL from step 1]",
        "secret": "secret-string-to-sign-event-payloads",
        "orgId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
        "resourceVersion": "task:1.0.0"
    }
    ```

    Here is the example of **message subscription** JSON body for attendee **133** and webhook URL **https://usewebhook.com/ac52e535e67c204214ab31283faecbc9**:

    ``` JSON
    {
        "name": "133-Message-Sub",
        "eventTypes": [
            "task-message:appended",
            "task-message:append-failed"
        ],
        "destinationUrl": "https://usewebhook.com/ac52e535e67c204214ab31283faecbc9",
        "secret": "secret-string-to-sign-event-payloads",
        "orgId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
        "resourceVersion": "task-message:1.0.0"
    }
    ```

    Make sure your **message subscription** has been successfully registered. Here is the example of JSON body of successful API response (Response code - 201):

    ``` JSON
    {
        "meta": {
            "orgId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
            "subscriptionLimit": 20,
            "subscriptionCount": 10
        },
        "data": {
            "id": "a839417e-7766-47e3-929a-7ea994cd4781",
            "name": "133-Message-Sub",
            "eventTypes": [
                "task-message:appended",
                "task-message:append-failed"
            ],
            "destinationUrl": "https://usewebhook.com/ac52e535e67c204214ab31283faecbc9",
            "createdTime": 1795633733786,
            "createdBy": "wxcclabs+admin_ID133@gmail.com",
            "status": "active",
            "lastUpdatedTime": 1795633733786,
            "lastUpdatedBy": "wxcclabs+admin_ID133@gmail.com",
            "resourceVersion": "task-message:1.0.0"
        }
    }
    ```

5. Open a new tab in your web browser and log in to [Collaboration Control Hub](https://admin.webex.com){:target="_blank"} by using your Admin profile. 
   Your login will be of the format **<span class="attendee-id-container">wxcclabs+admin_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+admin_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy" title="Click to copy!"></span></span>**.

    ![profiles](../graphics/Lab1/L1M1_Admin_Login.gif)

    !!! Note
        Remember to take up the offer from Chrome to save your password.

6. Click on the **Contact Center** item under the **SERVICES** section on the left pane. Then go to **Assets** under **DIGITAL SETTINGS** section on the left. Click on **Custom messaging** tab at the top, search for your asset **<span class="attendee-id-container"><span class="attendee-id-placeholder" data-suffix="_BYOC_Asset">Your_Attendee_ID</span>_BYOC_Asset<span class="copy" title="Click to copy!"></span></span>** and click on it to go to the asset settings.

7. Set the following parameters in the **Webhook** section of asset settings and save changes:

    > - Messaging webhook URL: **[Webhook URL from step 1]**
    >
    > - Messaging webhook secret: **secret-string-to-sign-event-payloads**<span class="copy-static" title="Click to copy!" data-copy-text="secret-string-to-sign-event-payloads"><span class="copy"></span></span>

8. Navigate to **Flows** under **Customer Experience** section on the left, click on **Manage Flows** dropdown list on the top right and select **Create Flows**.

9. New **Flow creation** tab will be opened. Select **Flow** and **Start from scratch** in that tab and press **Next**.

10. On the **Flow configuration** tab name your flow as <span class="attendee-id-container">**BYOC_Flow_<span class="attendee-id-placeholder" data-prefix="BYOC_Flow_">Your_Attendee_ID</span><span class="copy" title="Click to copy!"></span></span>** Then select **Common_BYOC_Channel** as a channel type and click on **Create Flow**. The new flow with the only **Start Flow** node on the flow canvas will be created.

    !!! Note
        - **Edit** toggle at the top center of the page should be turned on when you create a new flow. If the toggle is off, switch it to on.
        - **Autosave** toggle at the bottom right of the page should also be turned on. If it is off, turn it on.

11.  Click on any empty point at the flow canvas to see **Global flow properties** tab on the right-hand side. Then go to that pane, scroll down to the **Configuration - Flow Variables** and create the following variables by pressing **Create flow variable** button:

    > - Name - **order**, Variable type - **String**, Agent viewable - **On**, Desktop label - **Order number**

12. Scroll down and turn on **Enable decryption** toggle on the same **Global flow properties** tab.

13. Add **Send Custom Message** node from the **Activities** pane on the left to the main flow canvas and set the following node settings:

    > - Activity label: **SendHello**
    >
    > **Channel details** section:
    >
    > - Custom messaging channel: **Common_BYOC_Channel**
    >
    > **Message configuration** section:
    >
    > - Message type: **Text**
    >
    > - Message text: **Hello, Please provide your order number.**
    >
    > - Append message to transcript: **Enabled**
    >
    > Connect **Start Flow** node output to this node.

14. Add **Receive Message** node from the same **Activities** pane and set the following node settings:

    > - Activity label: **ReceiveOrder**
    >
    > **Channel details** section:
    >
    > - Channel type: **Custom Messaging**
    >
    > - Channel: **Common_BYOC_Channel**
    >
    > - Wait before timing out: **600** seconds
    >
    > - Append message to transcript: **Enabled**
    >
    > **Parse settings** section (press **+ Add new** button to add a variable):
    >
    > - Flow variable: **order**
    >
    > - JSON path expression: **$.message.text**<span class="copy-static" data-copy-text="$.message.text"><span class="copy" title="Click to copy!"></span></span>
    >
    > Connect **SendHello** node output to this node.

15. Add one more **Send Custom Message** node to the flow and set the following node settings:

    > - Activity label: **SendSuccessResponse**
    >
    > **Channel details** section:
    >
    > - Custom messaging channel: **Common_BYOC_Channel**
    >
    > **Message configuration** section:
    >
    > - Message type: **Text**
    >
    > - Message text: **Thank you for providing the information. We appreciate your patience. One of our agents will join the chat shortly to assist you.**<span class="copy-static" data-copy-text="Thank you for providing the information. We appreciate your patience. One of our agents will join the chat shortly to assist you."><span class="copy" title="Click to copy!"></span></span>
    >
    > - Append message to transcript: **Enabled**
    > 
    > Connect **ReceiveOrder** node output to this node.

16. Add one more **Send Custom Message** node to the flow and set the following node settings:

    > - Activity label: **SendErrorResponse**
    >
    > **Channel details** section:
    >
    > - Custom messaging channel: **Common_BYOC_Channel**
    >
    > **Message configuration** section:
    >
    > - Message type: **Text**
    >
    > - Message text: **It looks like an issue may have occurred during the chat. One of our agents will join shortly to investigate and assist you. Thank you for your patience.**<span class="copy-static" data-copy-text="It looks like an issue may have occurred during the chat. One of our agents will join shortly to investigate and assist you. Thank you for your patience."><span class="copy" title="Click to copy!"></span></span>
    >
    > - Append message to transcript: **Enabled**
    >
    > Connect all **Timeout** and **Undefined Error** outputs of **SendHello** and **ReceiveOrder** nodes to this node.

17. Add **Queue Contact** node to the flow and configure it in the following way:

    > - Channel type: **Custom messaging**
    >
    > - **Static queue**
    >
    > - Queue: **<span class="attendee-id-container"><span class="attendee-id-placeholder" data-suffix="_BYOC_Queue">Your_Attendee_ID</span>_BYOC_Queue<span class="copy" title="Click to copy!"></span></span>** from the drop-down list
    >
    > Connect **all** outputs of **SendSuccessResponse** and **SendErrorResponse** nodes to this node.

    !!! Note
        As mentioned in **Getting Started**, all queues have been preconfigured so you don't need to change any of them at this step.

18. Add **End Flow** node and connect the output of **Queue Contact** node to this node.

19. Validate and publish the flow:

    > - Enable the **Validation** toggle in the bottom right corner of the flow designer window to check for any potential flow errors and recommendations.
    >
    > - If there are no **Flow Errors** after validation is complete, click on **Publish Flow** next to it.
    >
    > - In the pop-up window, ensure that the **Latest** label is selected in the **Add Version Label(s)** list, then click **Publish Flow**.

20. Return to the **Contact Center** on Collaboration Control Hub. Go to **Entry Points**, search for your channel **<span class="attendee-id-container"><span class="attendee-id-placeholder" data-suffix="_BYOC_Channel">Your_Attendee_ID</span>_BYOC_Channel<span class="copy" title="Click to copy!"></span></span>** and click on it.

21. In **Entry Point** settings section change the following, then click **Save** button:

    > - Chat routing flow: **BYOC_Flow_<span class="attendee-id-placeholder">Your_Attendee_ID</span>**
    >
    > - Version label: **Latest**

## Testing
    
1. Make sure you're logged in to the Webex CC agent desktop as an agent and set the status as **Available** for all channels.

2. Navigate to [Create Task API](https://developer.webex.com/webex-contact-center/docs/api/v1/tasks-call-control/create-task){:target="_blank"} of **Webex Contact Center Developer Portal** and make sure you signed in with your Admin profile. Then switch to **Request Body (JSON)** tab in the window on the right-hand side.

    !!! Note
        As mentioned at the beginning of this mission, we will use **Create Task API** for two purposes:

        - Initiate a new request via custom channel on behalf of customer and trigger Webex CC flow starting a conversation.
        - Append message to the existing conversation on behalf of customer.
        
        In other words, we will use **Create Task API** to simulate custom channel interface on customer's side. Like, if the end customer would send those messages via Instagram, Telegram, LinkedIn or any other application.

3. Firstly, let's initiate a new request on behalf of the end customer to trigger Webex CC flow we created above. Copy the JSON body below, paste it to **Request Body (JSON)** tab, scroll down and press **Run** button. This will send a message **Hello, I need help with my order.** to Webex CC and call your flow. 

    !!! Note
        Please replace the following parameters in JSON body below before executing API request:

        - **[The email from your Webex CC lab Admin account]** - **<span class="attendee-id-container">wxcclabs+admin_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+admin_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy"></span></span>**
        - **[The name of your BOYC Entry Point]** - **<span class="attendee-id-container"><span class="attendee-id-placeholder" data-suffix="_BYOC_Channel">Your_Attendee_ID</span>_BYOC_Channel<span class="copy" title="Click to copy!"></span></span>**
        - **[Current time in EPOCH format with milliseconds]** - use [Epoch Converter](https://developer.webex.com/webex-contact-center/docs/api/v1/tasks-call-control/create-task){:target="_blank"} to get the timestamp in the proper format. For example, 1795636326000

    ``` JSON
    {
        "origin": {
            "address": "email@example.com",
            "name": "Customer Inc.",
            "type": "customerAddress"
        },
        "destination": {
            "address": "[The email from your Webex CC lab Admin account]",
            "name": "Webex CC Inc.",
            "type": "businessAddress"
        },
        "channelProperties": {
            "channelType": "customMessaging",
            "channel": "[The name of your BOYC Entry Point]",
            "message": {
                "direction": "inbound",
                "type": "text",
                "text": "Hello, I need help with my order.",
                "timestampEpoch": "[Current time in EPOCH format in milliseconds]"
            }
        }
    }
    ```    

4. After your flow receives initial message, it will auto-reply with the message **Hello, Please provide your order number.** that we preconfigured creating the flow. Both messages will be sent to Webhook URL provided during subscription registration above. Therefore, switch to the Webhook website tab in your browser and make sure you see both messages there.

5. Now, let's append an existing conversation with the new message on behalf of the end customer to route it to the queue and engage an agent. We will reply with the text **123456** as an order number.

    !!! Note
        In order to simplify lab task and flow logic, we do not make any verification within the flow whether provided value really matches order number format. However, this is a mandatory part of any BYOC implementation in production environment.

    In order to do this, navigate to [Append Task Message API](https://developer.webex.com/webex-contact-center/docs/api/v1/tasks-call-control/append-task-message){:target="_blank"} of **Webex Contact Center Developer Portal** and switch to **Request Body (JSON)** tab in the window on the right-hand side. Then copy the JSON body below, paste it to **Request Body (JSON)** tab, scroll down and press **Run** button:

    !!! Note
        Please replace the following parameters in JSON body below before executing API request:

        - **[The name of your BOYC Entry Point]** - **<span class="attendee-id-container"><span class="attendee-id-placeholder" data-suffix="_BYOC_Channel">Your_Attendee_ID</span>_BYOC_Channel<span class="copy" title="Click to copy!"></span></span>**
        - **[Current time in EPOCH format with milliseconds]** - use [Epoch Converter](https://developer.webex.com/webex-contact-center/docs/api/v1/tasks-call-control/create-task){:target="_blank"} to get the timestamp in the proper format. For example, 1795636326000

    ``` JSON
    {
        "channelProperties": {
            "channelType": "customMessaging",
            "channel": "[The name of your BOYC Entry Point]",
            "message": {
                "direction": "inbound",
                "type": "text",
                "text": "123456",
                "timestampEpoch": "[Current time in EPOCH format in milliseconds]"
            }
        }
    }
    ```

6. Switch to the Webhook website tab in your browser and make sure you see the appended messages with order number there.

7. Switch to the agent desktop browser tab and accept incoming request.

8. Send messages from the customer to the agent (via **Append Task Message API**) and vice versa (from the agent desktop) to make sure bidirectional message exchange works correctly. Make sure you see all those messages on the Webhook webpage. Then end the conversation in **agent desktop**, select any value from the **Wrap Up Reasons** dropdown list on the right-hand side, and press the **Submit Wrap Up** button.

---
<p style="text-align:center"><strong>Congratulations, you have successfully completed Bring Your Own Channel mission! 🎉🎉 </strong></p>