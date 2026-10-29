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

2. In **config.toml** add the following on top before the first [section] header.

    ```toml
    model = "openai/gpt-5.4-mini"
    model_provider = "openrouter"
    
    [model_providers.openrouter]
    name = "OpenRouter"
    base_url = "https://openrouter.ai/api/v1"
    env_key = "OPENROUTER_API_KEY"
    wire_api = "responses"
    ```
3. In the same **config.toml** add the following at the bottom.

    ```toml
    [mcp_servers.wxcc]
    enabled = true
    url = "https://agentic-server-platform.produs1.ciscoccservice.com/mcp/webex-contactcenter"
    http_headers = {"Authorization" = "Bearer  [YOUR_TOKEN_FROM_WXCC_DEV_PORTAL] "}
        ```
---

