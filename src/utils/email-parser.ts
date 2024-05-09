
export function getEmailContent(email: any): string {
    let content = '';
  
    if (email.subject) {
      content += `Subject: ${email.subject}\n`;
    }
    if (email.body) {
      content += `Body: ${email.body}\n`;
    }
    if (email.sender) {
      content += `Sender: ${email.sender}\n`;
    }
  
  
    return content.trim();
  }

  export async function sendRepliesToEmails(replies: string[]): Promise<void> {
    for (const reply of replies) {
      console.log(`Sending reply: ${reply}`);
    }
  }
  