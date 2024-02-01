import {NextResponse} from 'next/server'

export async function GET(request, response) {
  console.log(request);
  console.log(response);
  return Response.json({ message: "Get request" });
}

export async function POST(req, res) {
  let data = await req.json();
  return NextResponse.json({ message: "Post request", data }, { status: 200 });
}

// export async function GET(req, res) {
//   return res.json({ message: 'Hello from Next.js!' })
// }

// export default async function POST (req, res){
//   console.log(req.body);
//   return res.status(200).json({ message: 'Hello from Next.js!' })
// };

// export default function POST(req, res) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }


export const dynamic = "force-static";

