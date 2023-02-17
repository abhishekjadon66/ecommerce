// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes = {
   "476115": ["Porsa", "Morena"],
   "477001": ["Udotgarh", "Bhind"],
   "474001": ["Gwalior", "Gwalior"]
  }
  res.status(200).json(pincodes);
}
