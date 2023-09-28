## API END POINTS (With Basic Authentication):
```
1. Get tasks (GET /api/task)
2. Create task (POST /api/task)
# JSON = {"title": ""}
3. Update task (PUT /api/task)
# JSON = {"id": "", "new_title": ""}
4. Remove task (DELETE /api/task)
# JSON = {"id": ""}
5. Reorder task (PUT /api/task/reorder)
# ARRAY[JSON] = [{"_id": ""}, {"_id": ""}, {"_id": ""}, ...] # Order will depend on the order of the array
```
I was thinking that I will structure the tasks as an array in the database, but to be realistic I decided to make a record of each task in the database. But on the reordering task the only approach I think would work is to do a loop depending on the array order.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
