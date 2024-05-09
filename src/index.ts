import { fetchEmailsFromGmail } from './services/gmail.service';
import { fetchEmailsFromOutlook } from './services/outlook.service';
import { analyzeEmailContent, generateReplies } from './services/openai.service';
import { sendRepliesToEmails } from './utils/email-parser';

async function main() {
    try {
        // Fetch emails from Gmail and Outlook
        const gmailEmails = await fetchEmailsFromGmail();
        const outlookEmails = await fetchEmailsFromOutlook();

        // Combine emails from both services
        const allEmails = [...gmailEmails, ...outlookEmails];

        // Analyze email content to understand the context
        const analyzedEmails = await analyzeEmailContent(allEmails);

        // Generate replies based on the analyzed email content
        const generatedReplies = await generateReplies(analyzedEmails);

        // Send replies to emails
        await sendRepliesToEmails(generatedReplies);

        console.log('All replies sent successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
