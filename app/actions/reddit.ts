'use server'
export default async function GET(ticker: String) {
    const API_URL = `https://oauth.reddit.com/r/stocks/search?q=${ticker}&limit=10&sort=new`;
  
    // Get reddit auth token
    const auth = Buffer.from(
      `${process.env.REDDIT_WEB_APP}:${process.env.REDDIT_SECRET}`,
    ).toString("base64");
    
    const tokenRes = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${auth}`,
        },
        body: `grant_type=client_credentials&redirect_uri=${process.env.REDIRECT_URI}`,
    });
    
  
    // const tokenData = await tokenRes.json();
    // console.log(tokenData);

    // const token = tokenData.access_token;
    // console.log(token);
  
    // const redditRes = await fetch(API_URL, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // const data = await redditRes.json();
    // console.log(data);

    return tokenRes
  }
  