import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const router = new Router();
router
  .get("/", async (context) => {
    const url = new URL(context.request.url);
    const searchParams = url.searchParams;
    const start = searchParams.get("start") || "USD";
    try {
      const textResponse = await fetch(
        `https://www.google.com/finance/quote/${start}-CNY`,
      );
      const textData = await textResponse.text();
      const $ = cheerio.load(textData);
      const rate = $(".kf1m0 .fxKbKc").text();
      // const body = JSON.stringify();
      context.response.type = "application/json";
      context.response.body = {
        target_currency: start,
        exchange_rate: rate,
      };
    } catch (err) {
      throw err;
    }
  });
const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());

console.info("CORS-enabled web server listening on port 8000");
await app.listen({ port: 8000 });
