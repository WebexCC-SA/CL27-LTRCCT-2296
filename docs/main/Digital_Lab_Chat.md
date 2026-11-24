---
#icon: material/folder-open-outline
icon: material/medal
---

## Story
Imagine calling a contact center, seeking quick, personalized help. Behind the scenes, a flow smoothly routes your call based on your needs.

### Call Flow Overview
1. A new chat request is initiated by the customer and enters the flow.
2. The flow sends a special pre-chat form to the customer asking about their contact details and request topic. *(This info defines further call processing logic and ensures the agent will receive proper information about the customer.)*
3. The customer fills in and submit the pre-chat form.
4. The flow extracts the data from the form, prepare customer contact data for the agent, determines destination queue and route the request to it for further assistance.

### Mission Details

Your mission is to:

1. Build a web chat flow in the unified Flow Designer. </br>
2. Create a pre-chat form. </br>
3. Set up chat request routing depending on the topic. </br>
4. Test message exchange between the customer and the agent. </br>

Flow Templates are designed to empower developers, speed up the development lifecycle, and maintain high-quality standards across flows, making them a core asset in Webex Contact Center flow design.

</details>
---

### Build

1. Login into [Webex Control Hub](https://admin.webex.com){:target="_blank"} by using your Admin profile. 
   Your login will be of the format **<span class="attendee-id-container">wxcclabs+admin_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+admin_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy" title="Click to copy!"></span></span>**. You will see another login screen with Webex logo on it where you may need to enter the email address again and the password provided to you.

    ![profiles](../graphics/Lab1/L1M1_Admin_Login.gif)

    !!! Note
        Remember to take up the offer from Chrome to save your password

2. Click on the **Contact Center** item under the **SERVICES** section on the left pane.

3. Navigate to **Flows** under **Customer Experience** section on the left, click on **Manage Flows** dropdown list on the top right and select **Create Flows**.

4. New **Flow creation** tab will be opened. Select **Flow** and **Start from scratch** in that tab and press **Next**.

5. Name your flow as <span class="attendee-id-container">**Chat_Flow_<span class="attendee-id-placeholder" data-prefix="Chat_Flow_">Your_Attendee_ID</span><span class="copy" title="Click to copy!"></span></span>** Then select **Chat (web & mobile)** as a channel type and click on **Create Flow**. The new flow with the only **Start Flow** node on the flow canvas will be created.

    !!! Note
        **Edit** toggle at the top center of the page should be set to **On** when you create a new flow. If the toggle value is **Edit: Off**, switch it to **Edit: On**.
        **Autosave** toggle at the bottom right of the page should be also turned on. If it is off, turn it on.

6.  Click on any empty point at the flow canvas to see **Global flow properties** tab on the right-hand side. Then go to that pane, scroll down to the **Configuration - Flow Variables** and create the following variables by pressing **Create flow variable** button:

    > - **name**: Variable type - **String**
    >
    > - **email**: Variable type - **String**
    >
    > - **topic**: Variable type - **String**

7. Scroll down and turn on **Enable decryption** toggle on the same **Global flow properties** tab.

8. Add **Send Chat** node from the **Activities** pane on the left to the main flow canvas and set the following node settings:

    > - Activity label: **SendForm**
    >
    > - Message Type: **Form**
    >
    > - Form:
    >   ``` JSON
        { 
            "reference": "contact-request", 
            "title": "Please provide the details", 
            "fields": [ 
                { 
                    "name": "fullName", 
                    "label": "Full name", 
                    "description": "Full name", 
                    "type": "name", 
                    "mandatory": true 
                }, 
                { 
                    "name": "email", 
                    "label": "Email address", 
                    "description": "Email address", 
                    "type": "email", 
                    "mandatory": true 
                }, 
                { 
                    "name": "level", 
                    "label": "Request topic", 
                    "description": "Choose the request topic", 
                    "type": "dropdown", 
                    "value": [ 
                        "Technical support", 
                        "Order status",
                        "Account balance"
                    ], 
                    "mandatory": true 
                } 
            ]
        }
        ```
    >
    > - Append message to transcript: **Enabled**
    >
    > Connect **Start Chat** node output to this node.

    !!! Note
        The JSON code above represents a simple web form with three fields:
        - **Full Name** [text]
        - **Email** [text]
        - **Request topic** [drop-down list]
        In this lab, once the customer initiates the chat, this will trigger the flow and **Send Chat** node will show them the form and ask to fill in those three fields one-by-one.

9. Add **Receive Message** node from the same **Activities** pane and set the following node settings:

    > - Activity label: **ReceiveFrom**
    >
    >  **Channel details** section:
    >
    > - Channel type: **Chat**
    >
    > - Message type: **Form response**
    >
    > - Wait before timing out: **180** seconds
    >
    > - Append message to transcript: **Enabled**
    > <br/><br/>
    >  **Parse settings** section (press **+ Add new** button to add a variable):
    >
    > - Flow variable: **name**
    >
    > - JSON path expression: **$.message.lcFormResponse.fields[0].value**<span class="copy-static" data-copy-text="$.message.lcFormResponse.fields[0].value"><span class="copy" title="Click to copy!"></span></span>
    > <br/><br/>
    > - Flow variable: **email**
    >
    > - JSON path expression: **$.message.lcFormResponse.fields[1].value**<span class="copy-static" data-copy-text="$.message.lcFormResponse.fields[1].value"><span class="copy" title="Click to copy!"></span></span>
    > <br/><br/>
    > - Flow variable: **topic**
    >
    > - JSON path expression: **$.message.lcFormResponse.fields[2].value**<span class="copy-static" data-copy-text="$.message.lcFormResponse.fields[2].value"><span class="copy" title="Click to copy!"></span></span>
    >
    > Connect **SendForm** node output to this node.

10. Add **Set Customer Identity** node from the **Activities** pane and set the following node settings:
    
    >  **Customer identity settings** section:
    >
    > - Customer contact information: **{{email}}**<span class="copy-static" data-copy-text="{{email}}"><span class="copy" title="Click to copy!"></span></span>
    >
    > - Customer name: **{{name}}**<span class="copy-static" data-copy-text="{{name}}"><span class="copy" title="Click to copy!"></span></span>
    >
    > Connect **ReceiveForm** node output to this node.

    !!! Note
        Customer identity settings configured in this node will be presented to the agent once they accept chat request in agent desktop.

11. Add one more **Send Chat** node to the flow and set the following node settings:

    > - Activity label: **SendSuccessResponse**
    >
    > - Message type: **Text**
    >
    > - Message text: **Thank you for providing the information. We appreciate your patience. One of our agents will join the chat shortly to assist you.**<span class="copy-static" data-copy-text="Thank you for providing the information. We appreciate your patience. One of our agents will join the chat shortly to assist you."><span class="copy" title="Click to copy!"></span></span>
    >
    > - Append message to transcript: **Enabled**
    >
    > Connect **SendForm** node output to this node.

12. Add one more **Send Chat** node to the flow and set the following node settings:

    > - Activity label: **SendErrorResponse**
    >
    > - Message type: **Text**
    >
    > - Message text: **It looks like an issue may have occurred during the chat. One of our agents will join shortly to investigate and assist you. Thank you for your patience.**<span class="copy-static" data-copy-text="It looks like an issue may have occurred during the chat. One of our agents will join shortly to investigate and assist you. Thank you for your patience."><span class="copy" title="Click to copy!"></span></span>
    >
    > - Append message to transcript: **Enabled**
    >
    > Connect all **Timeout** and **Undefined Error** outputs of **SendForm**, **ReceiveForm** and **Set Customer Identity** nodes to this node.

13. Add **Queue Contact** node to the flow and configure it in the following way:


13. Validate and publish the flow:

    > - Enable the **Validation** toggle in the bottom right corner of the flow designer window to check for any potential flow errors and recommendations.
    >
    > - If there are no **Flow Errors** after validation is complete, click on **Publish Flow** next to it.
    >
    > - In the pop-up window, ensure that the **Latest** label is selected in the **Add Version Label(s)** list, then click **Publish Flow**. 