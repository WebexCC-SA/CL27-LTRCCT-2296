---
#icon: material/folder-open-outline
icon: material/medal
---

## Story
The chat channel gives customers a convenient way to contact Webex Contact Center through a chat widget on a website. They can connect with an agent without making a phone call and share information using rich message formats such as text, forms, carousels, and quick replies. These options help customers get support in a way that suits their needs and make it easier to provide the right information.

For administrators, the unified flow designer makes chat flows easier to build, manage, and troubleshoot. Its flexible messaging options help administrators tailor each flow to the needs of their business and its customers.

### Call Flow Overview
1. A new chat request is initiated by the customer and enters the flow.
2. The flow sends a special pre-chat form to the customer asking about their contact details and request topic. *(These details ensure the agent will receive proper information about the customer.)*
3. The customer fills in and submits the pre-chat form.
4. The flow extracts the data from the form, prepares customer contact data for the agent, and routes the request to the queue for further assistance.

### Mission Details

Your mission is to:

1. Build a web chat flow in the unified Flow Designer. </br>
2. Create a pre-chat form. </br>
3. Test message exchange between the customer and the agent. </br>

## Build

1. Log in to [Collaboration Control Hub](https://admin.webex.com){:target="_blank"} by using your Admin profile. 
   Your login will be of the format **<span class="attendee-id-container">wxcclabs+admin_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+admin_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy" title="Click to copy!"></span></span>**. You will see another login screen with the Webex logo on it where you may need to enter the email address again and the password provided to you.

    ![profiles](../graphics/Lab1/L1M1_Admin_Login.gif)

    !!! Note
        Remember to take up the offer from Chrome to save your password.

2. Click on the **Contact Center** item under the **SERVICES** section on the left pane.

3. Navigate to **Flows** under **Customer Experience** section on the left, click on **Manage Flows** dropdown list on the top right and select **Create Flows**.

4. New **Flow creation** tab will be opened. Select **Flow** and **Start from scratch** in that tab and press **Next**.

5. On the **Flow confiduration** tab name your flow as <span class="attendee-id-container">**Chat_Flow_<span class="attendee-id-placeholder" data-prefix="Chat_Flow_">Your_Attendee_ID</span><span class="copy" title="Click to copy!"></span></span>** Then select **Chat (web & mobile)** as a channel type and click on **Create Flow**. The new flow with the only **Start Flow** node on the flow canvas will be created.

    !!! Note
        - **Edit** toggle at the top center of the page should be turned on when you create a new flow. If the toggle is off, switch it to on.
        - **Autosave** toggle at the bottom right of the page should also be turned on. If it is off, turn it on.

6.  Click on any empty point at the flow canvas to see **Global flow properties** tab on the right-hand side. Then go to that pane, scroll down to the **Configuration - Flow Variables** and create the following variables by pressing **Create flow variable** button:

    > - Name - **name**, Variable type - **String**
    >
    > - Name - **email**, Variable type - **String**
    >
    > - Name - **topic**, Variable type - **String**

7. Scroll down and turn on **Enable decryption** toggle on the same **Global flow properties** tab.

8. Add **Send Chat** node from the **Activities** pane on the left to the main flow canvas and set the following node settings:

    > - Activity label: **SendForm**
    >
    > - Message Type: **Form**
    >
    > - Form:
    >
    !!! Note
        The JSON code below represents a simple web form with three fields:

        - **Full Name** [text]
        - **Email** [text]
        - **Request topic** [drop-down list]
        
        In this lab, once the customer initiates the chat, this will trigger the flow and **Send Chat** node will show them the form and ask to fill in those three fields one-by-one.
    >
    >    ``` JSON
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
    >   ```
    >
    > - Append message to transcript: **Enabled**
    
    - Connect **Start Chat** node output to this node.

    !!! Note
        The JSON code above represents a simple web form with three fields:

        - **Full Name** [text]
        - **Email** [text]
        - **Request topic** [drop-down list]
        
        In this lab, once the customer initiates the chat, this will trigger the flow and **Send Chat** node will show them the form and ask to fill in those three fields one-by-one.

9. Add **Receive Message** node from the same **Activities** pane and set the following node settings:

    > - Activity label: **ReceiveFrom**
    >
    > **Channel details** section:
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
    > Connect **Set Customer Identity** node output to this node.

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

    > - Channel type: **Chat**
    >
    > - **Static queue**
    >
    > - Queue: **<span class="attendee-id-container"><span class="attendee-id-placeholder" data-suffix="_Chat_Queue">Your_Attendee_ID</span>_Chat_Queue<span class="copy" title="Click to copy!"></span></span>** from the drop-down list
    >
    >    !!! Note
             As mentioned in **Getting Started**, all queues have been preconfigured so you don't need to change them at this step.
    >
    > Connect **all** outputs of **SendSuccessResponse** and **SendErrorResponse** nodes to this node.

14. Add **End Flow** node and connect the output of **Queue Contact** node to this node.

15. Validate and publish the flow:

    > - Enable the **Validation** toggle in the bottom right corner of the flow designer window to check for any potential flow errors and recommendations.
    >
    > - If there are no **Flow Errors** after validation is complete, click on **Publish Flow** next to it.
    >
    > - In the pop-up window, ensure that the **Latest** label is selected in the **Add Version Label(s)** list, then click **Publish Flow**.

16. Return to the **Contact Center** on Collaboration Control Hub. Go to **Entry Points**, search for your channel **<span class="attendee-id-container"><span class="attendee-id-placeholder" data-suffix="_Chat_Channel">Your_Attendee_ID</span>_Chat_Channel<span class="copy" title="Click to copy!"></span></span>** and click on it.

17. In **Entry Point** settings section change the following, then click **Save** button:

    > - Chat routing flow: **Chat_Flow_<span class="attendee-id-placeholder">Your_Attendee_ID</span>**
    >
    > - Version label: **Latest**

## Testing
    
1. Make sure you're logged in to the Webex CC agent desktop as an agent and set the status as **Available** for all channels.

2. Navigate to the **Contact Center** on Collaboration Control Hub. Then click **Assets** under the **DIGITAL SETTINGS** on the left pane and find your web chat asset **<span class="attendee-id-container"><span class="attendee-id-placeholder" data-suffix="_Chat_Asset">Your_Attendee_ID</span>_Chat_Asset<span class="copy" title="Click to copy!"></span></span>**.

3. Click on the chat asset you found, go to **Installation** tab and press **Copy** button under the **Installation Script** field to copy the script to the clipboard.

4. Open a new tab in your web browser and navigate to a [**Website Template**](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_intro){:target="_blank"}.

5. Paste the installation script you copied above between the paragraph closing HTML tag **'</p>'** and body closing tag **'</body>'** in the left window. Then press **Run >** button at the top of it and wait for a few seconds. Chat widget bubble will appear in the bottom right corner of the right window.

    !!! Note
        If chat bubble did not appear, check and make sure the script is pasted to the proper place of the window on the left-hand side and press **Run >** button again. If this does not help, please ask lab proctor for assistance.

6. Click on the chat bubble to open the widget and press **Start Chat** button there to initiate a chat.

7. You should receive the web form asking you to provide Full Name, Email, and Request Topic (you need to select one of the pre-defined topics from the drop-down list) one-by-one.

    !!! Note
        - There is no need to provide your real name or email in the form. Feel free to enter fictitious data.
        - Click on the **>** button next to the field after providing a value for it instead of pressing **Enter** on the keyboard.

8. Once the web form is completed, your chat request will be queued and then routed to the agent. Switch to the browser tab with the agent desktop and accept incoming chat request.

9. Send messages from the customer to the agent and vice versa to make sure bidirectional message exchange works correctly. Then end the conversation in **agent desktop**, select any value from the **Wrap Up Reasons** dropdown list on the right-hand side, and press the **Submit Wrap Up** button.

---
<p style="text-align:center"><strong>Congratulations, you have successfully completed Web Chat Channel mission! 🎉🎉 </strong></p>