
/**
 * @param {any} username
 */
export async function fetchLastMessagesForUser(username) {
  const response = await fetch(`http://localhost:3014/api/chat/last-messages/${username}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch last messages: ${response.statusText}`);
  }
  return response.json();
}

/**
 * @param {any} chatId
 * @param {any} sender
 * @param {any} recipient
 * @param {any} message
 */
export async function createNewChat(chatId, sender, recipient, message) {
  const payload = { chatId, sender, recipient, content: message };
  const response = await fetch(`http://localhost:3014/api/chat/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to create new chat: ${response.statusText}`);
  }
  return response.json();
}