---
#icon: material/folder-open-outline
icon: material/bullseye-arrow
---
### Add the OpenRouter key manually in Windows

1. Press **Win+R**, enter the following, and press Enter:

   ```text
   rundll32 sysdm.cpl,EditEnvironmentVariables
   ```

2. Click **New**, in **User variables** section, 
Var name: OPENROUTER_API_KEY
Var value: ***Your ordinary OpenRouter API key*** 

*** no Bearer prefix.

### Configure the Codex provider

1. Back up existing **%USERPROFILE%\.codex\config.toml**. 

2. In **config.toml** add the following on top before the first [section] header. Copy and paste the following into line 2. Then save and close the file.

    ```toml
    # Place this at the top level, before any [section].
    model_provider = "openai_api"
    
    [model_providers.openai_api]
    name = "OpenAI API"
    base_url = "https://api.openai.com/v1"
    env_key = "OPENAI_API_KEY"
    wire_api = "responses"
    ```
3. Start **Windows PowerShell**, paste the following into **PowerShell** with replaced ***PASTE_YOUR_API_KEY_HERE***. Each worksation should have its own key. Keys can be found in **Lab-Assistant** portal

    ```toml
    & {
    $apiKey = 'PASTE_YOUR_API_KEY_HERE'

    [Environment]::SetEnvironmentVariable('OPENAI_API_KEY', $apiKey, 'User')
    $env:OPENAI_API_KEY = $apiKey

    Write-Host 'OPENAI_API_KEY saved. Fully close and reopen Codex.'
    }
    ```

4. To verify. On keyboard, press **Win + R** and type paste ***rundll32 sysdm.cpl,EditEnvironmentVariables***. Check if **OPENAI_API_KEY** has been added to User Environment Variables.

    ![profiles](../graphics/overview/Env_Var.png)
---

