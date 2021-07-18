const text = "Thist should be stored in a file\n";
const encoder = new TextEncoder();
const data = encoder.encode(text);
Deno.writeFile("message.txt", data).then(() => {
  console.log("wrote to file");
});
// Run this as deno run --allow-write app.ts
// or:
// deno run --allow-write=message.txt app.ts
