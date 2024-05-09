import { google } from 'googleapis';
import { gmailConfig } from '../config/gmail.config';

const gmailOAuthClient = new google.auth.OAuth2({
  clientId: gmailConfig.clientId,
  clientSecret: gmailConfig.clientSecret,
  redirectUri: gmailConfig.redirectUri,
});

export async function fetchEmailsFromGmail() {
    try {
        // Load client secrets from local file.
        const credentials = require('./credentials.json');
        const { client_secret, client_id, redirect_uris } = credentials.installed;
    
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
    
        // Get the access token
        const token = require('./token.json');
        oAuth2Client.setCredentials(token);
    
        // Create a new instance of the Gmail API
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    
        // Fetch the emails
        const response = await gmail.users.messages.list({
            userId: 'me',
            // Change the number to fetch more or fewer emails
            maxResults: 10 
        });
    
        const messages = response.data.messages;
    
        if (messages) {
            for (let i = 0; i < messages.length; i++) {
                const message = messages[i];
                const email = await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id
                });
                console.log('Email:', email.data);
                // Process the email
            }
        } else {
            console.log('No emails found.');
        }
    } catch (error) {
        console.error('Error fetching emails:', error);
    }
}
