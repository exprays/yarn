![harmony-wordmark](https://github.com/fxso/Harmony/assets/133385746/ca592d3c-9c11-4dcc-9b0d-04b7d31f8d56)


A Full-stack OpenSource Discord clone built using NextJS 14! This is the project which I built to learn WebSockets and how it is used in a real world application.


## Features

- Light/dark mode toggle
- Authentication
- Realtime Text, Audio & Video chats
- Emoji support 
- Channels (Discord like)
- Send attachments as messages
- Delete & Edit messages in real time for all users
- Create Text, Audio and Video call Channels
- 1:1 conversation between members
- 1:1 video calls between members
- Member management (Kick, Role change Guest / Moderator)
- Unique invite link generation & full working invite system
- Responsive web design
- Websocket fallback (Polling with indicators)


## Tech Stack

- **Next.js:** React framework for server-side rendering and static site generation.
- **React:** Library for building user interfaces with a component-based approach.
- **TypeScript:** Typed superset of JavaScript for better code quality and development experience.
- **LiveKit:** Real-time webRTC based audio and video communications.
- **TanStack Query:** Powerful data fetching and state management for React.
- **Zod:** TypeScript-first schema declaration and validation library.
- **Zustand:** Small, fast, and scalable state management for React.
- **Uploadthing:** Simple file upload solution for web applications.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **React Hook Form:** Performant, flexible, and extensible forms with easy-to-use validation.
- **Socket.io:** Real-time, bidirectional communication between clients and servers.
- **Prisma:** Next-generation ORM for Node.js and TypeScript.
- **Aiven:** MySQL database hosting



## Run Locally

Clone the project

```bash
  git clone https://github.com/fxso/Harmony.git
```

Go to the project directory

```bash
  cd Harmony
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`

`CLERK_SECRET_KEY=`

`NEXT_PUBLIC_CLERK_SIGN_IN_URL=/secure/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/secure/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/`

`DATABASE_URL=`

`UPLOADTHING_SECRET=`

`UPLOADTHING_APP_ID=`

`LIVEKIT_API_KEY=`

`LIVEKIT_API_SECRET=`

`NEXT_PUBLIC_LIVEKIT_URL=`

After deploying add another variable:
`NEXT_PUBLIC_SITE_URL=` `Your deployment URL`


## Deployment

To deploy this project to vercel, 

- Install vercel CLI 
```bash
  npm install -g vercel
```
- **Add a deploy script to package.json:** In your package.json, add a script to deploy your project. Here is an example of how you can do this:

```bash
{
  "name": "your-project-name",
  "version": "1.0.0",
  "scripts": {
    "deploy": "vercel --prod"
  }
}
```

- **Deploy the project:** Now, you can deploy your project to Vercel by running the following command in your terminal:

```bash
npm run deploy
```

### Info!
Please note that Vercel does not support WebSockets due to the time limit in edge function execution. So this project will work on polling on vercel due to absence of websockets. If you want to use the WebSockets feature then you can deploy it on AWS etc. or managed servers like Render.comor fly.io!


## Support

For support, email suryakantsubudhi@protonmail.com or join our Discord channel.


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Feedback

If you have any feedback, please reach out to us at @gearxlab
