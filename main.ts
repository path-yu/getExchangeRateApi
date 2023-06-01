
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Request } from 'https://deno.land/x/request@1.3.2/mod.ts';
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
// To listen on port 4242.
serve(handler, { port: 4242 });

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const start = searchParams.get('start') || 'USD';
  const textResponse = await fetch(`https://www.google.com/finance/quote/${start}-CNY`);
  const textData = await textResponse.text();
  const $ = cheerio.load(textData);
  const rate =  $(".kf1m0 .fxKbKc").text();
  return new Response(rate);
}