# TITAN AI V5

## Vercel setup
1. Upload this project to GitHub.
2. Import the repo into Vercel.
3. In Vercel: Settings -> Environment Variables.
4. Add `OPENAI_API_KEY` with your secret OpenAI API key.
5. Redeploy.

The API key is server-side only. Do NOT put it in index.html.

## Voice
TITAN automatically requests microphone access on page load. Chrome may require the first user gesture before granting microphone access. Once permission is granted, the page can listen while it remains open.

Wake words: TITAN / টাইটান
Double clap: activates the popup.
Language: automatically switches between Bangla and English.

Note: a normal website cannot reliably run as a background always-listening assistant after the browser/page is closed or the phone is locked.
