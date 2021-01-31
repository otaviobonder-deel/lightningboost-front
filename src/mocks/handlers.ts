import { rest } from "msw";

export const handlers = [
  rest.get("*", (req, res, ctx) => {
    console.error(`Please add a request handler for ${req.url.toString()}`); // eslint-disable-line
    return res(
      ctx.status(500),
      ctx.json({ error: "Please add a request handler" })
    );
  }),
];
