import { ScrapedItem } from '../types';

export const extractData = (text: string, mode: 'mixed' | 'account' | 'config' = 'mixed'): ScrapedItem[] => {
  const results: ScrapedItem[] = [];
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l);

  // 1. Config Regex Patterns
  const configPatterns: Record<string, RegExp> = {
    vless: /vless:\/\/[a-zA-Z0-9\-_@.:?=&%#\[\]]+/i,
    vmess: /vmess:\/\/[a-zA-Z0-9\-_@.:?=&%#\[\]]+/i,
    trojan: /trojan:\/\/[a-zA-Z0-9\-_@.:?=&%#\[\]]+/i,
    ss: /ss:\/\/[a-zA-Z0-9\-_@.:?=&%#\[\]]+/i,
    hysteria: /hysteria2?:\/\/[a-zA-Z0-9\-_@.:?=&%#\[\]]+/i,
    tuic: /tuic:\/\/[a-zA-Z0-9\-_@.:?=&%#\[\]]+/i,
  };

  // 2. Account Regex (Email)
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  
  // Junk filters for password lines
  const junkRegex = /(t\.me|http|www\.|channel|join|id|bot|support|admin|@)/i;

  const seenContent = new Set<string>();

  // --- CONFIG PARSING ---
  if (mode === 'mixed' || mode === 'config') {
      const words = text.split(/\s+/);
      words.forEach(word => {
        for (const [protocol, regex] of Object.entries(configPatterns)) {
          if (regex.test(word)) {
            if (!seenContent.has(word)) {
              seenContent.add(word);
              results.push({
                type: 'config',
                content: word,
                meta: protocol.toUpperCase()
              });
            }
          }
        }
      });
  }

  // --- ACCOUNT PARSING ---
  if (mode === 'mixed' || mode === 'account') {
      for (let i = 0; i < lines.length; i++) {
        let currentLine = lines[i];

        // Clean common prefixes
        const cleanLine = currentLine.replace(/^(User:|Email:|Username:|E-mail:)\s*/i, "").trim();

        // Check if line looks like an email
        const emailMatch = cleanLine.match(emailRegex);
        
        if (emailMatch) {
          const email = emailMatch[0];
          
          // Look ahead for password
          if (i + 1 < lines.length) {
            let nextLine = lines[i + 1];
            
            // Skip typical label lines if they exist standalone (e.g. "Password:")
            if (/^(Pass:|Password:|P:)$/i.test(nextLine)) {
                if(i + 2 < lines.length) nextLine = lines[i+2];
                else continue;
            }

            const isNextEmail = emailRegex.test(nextLine);
            const isNextConfig = Object.values(configPatterns).some(r => r.test(nextLine));
            
            if (!isNextEmail && !isNextConfig) {
               const cleanPass = nextLine.replace(/^(Pass:|Password:|P:)\s*/i, "").trim();
               
               // Strict Password Validation
               // 1. Must be > 3 chars
               // 2. Must not contain common junk (telegram links, channel names)
               // 3. Usually shouldn't have spaces for VPN/App passwords
               if (cleanPass.length > 3 && !junkRegex.test(cleanPass) && !cleanPass.includes(' ')) {
                 const key = `${email}:${cleanPass}`;
                 if (!seenContent.has(key)) {
                    seenContent.add(key);
                    results.push({
                      type: 'account',
                      content: key,
                      meta: email,
                      extra: cleanPass
                    });
                    // Skip used line
                    i++; 
                 }
               }
            }
          }
        }
      }
  }

  return results;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    return true;
  }
};

export const downloadText = (content: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};