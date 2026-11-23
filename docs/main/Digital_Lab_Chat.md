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
        **Edit** should be set to **On** at the top center of the page when you create a new flow. If the toggle value is **Edit: Off**, switch it to **Edit: On**.

6. Drag **Send Chat** node from the **Activities** pane on the left and drop it on the main flow canvas. Set the following node settings:

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
                        "Subscription renewal", 
                        "Account balance" 
                    ], 
                    "mandatory": true 
                } 
            ]
        }
        ```
    >
    > - Append message to transcript: **Enabled**
