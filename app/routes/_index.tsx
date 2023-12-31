import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react'
import { json } from "@remix-run/node"; // or cloudflare/deno

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const response = await fetch('https://mock.shop/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query GetProduct {
        product(id: "gid://shopify/Product/7982905098262") {
          id
          title
          description
          featuredImage {
            id
            url
          }
        }
      }
      `,
    }),
  })
  const serverSideData = await response.json()

  return json({
    serverSideData,
  })
}

export default function Index() {
  const {serverSideData} = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <div>{JSON.stringify(serverSideData)}</div>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
