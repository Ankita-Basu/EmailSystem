import axios from 'axios';

const OUTLOOK_CLIENT_ID = 'your_outlook_client_id';
const OUTLOOK_CLIENT_SECRET = 'your_outlook_client_secret';
const OUTLOOK_REFRESH_TOKEN = 'your_outlook_refresh_token';

export async function fetchEmailsFromOutlook(): Promise<string[]> {
    try {
        const accessToken = await getOutlookAccessToken();

        // Fetch emails
        const response = await axios.get(
            'https://graph.microsoft.com/v1.0/me/mailfolders/inbox/messages?$select=body',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        // Extract email bodies
        const emails: string[] = response.data.value.map((email: any) => email.body.content);

        return emails;
    } catch (error) {
        console.error('Error fetching emails from Outlook:', error);
        return [];
    }
}

async function getOutlookAccessToken(): Promise<string> {
    try {
        const tokenResponse = await axios.post(
            'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            {
                grant_type: 'refresh_token',
                client_id: OUTLOOK_CLIENT_ID,
                client_secret: OUTLOOK_CLIENT_SECRET,
                refresh_token: OUTLOOK_REFRESH_TOKEN,
                redirect_uri: 'http://localhost:3000' 
            }
        );

        return tokenResponse.data.access_token;
    } catch (error) {
        console.error('Error getting Outlook access token:', error);
        return '';
    }
}
