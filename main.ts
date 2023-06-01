import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Request } from "https://deno.land/x/request@1.3.2/mod.ts";
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
// To listen on port 4242.
serve(handler, { port: 4242 });

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const start = searchParams.get("start") || "USD";
  try {
    const textResponse = await fetch(
      `https://www.google.com/finance/quote/${start}-CNY`,
    );
    const textData = await textResponse.text();
    const $ = cheerio.load(textData);
    const rate = $(".kf1m0 .fxKbKc").text();
    const body = JSON.stringify({
      target_currency: start,
      exchange_rate: rate,
    });
    return new Response(body, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  } catch (err) {
    throw err;
  }
}
