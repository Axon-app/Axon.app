#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");

async function generateSocialGuide() {
  console.log("📋 Generating social media sharing guide...");

  const guideContent = `# Social Media Sharing Guide for Axon.App

## Quick Reference

### Supported Platforms
- ✅ Facebook (Open Graph)
- ✅ Twitter/X (Twitter Cards)
- ✅ LinkedIn (Open Graph)
- ✅ WhatsApp (Custom preview)
- ✅ Discord (Embed support)
- ✅ Slack (Link previews)

### Image Specifications
- **Facebook/LinkedIn**: 1200x630px (og-image.png)
- **Twitter**: 1200x600px (twitter-image.png)
- **WhatsApp**: 400x400px (whatsapp-image.png)

## How to Share

### Step 1: Copy the URL
\`\`\`
https://your-domain.com
\`\`\`

### Step 2: Paste on Your Platform
Simply paste the URL and the preview will appear automatically with:
- Professional Axon logo
- Branded background
- Title: "Axon.App - Professional Web Development"
- Description: "Expert web development services"

### Step 3: Add Your Message
Consider adding context like:
- "Check out this professional web development portfolio"
- "Great example of modern React development"
- "Built with Vite and Tailwind CSS"

## Platform-Specific Tips

### Facebook
- Link previews appear automatically
- Edit the description after pasting
- Best times: 1-3 PM weekdays

### Twitter/X
- Use relevant hashtags: #WebDev #React #Portfolio
- Tag relevant accounts
- Best times: 9 AM and 3 PM

### LinkedIn
- Add professional context
- Tag industry connections
- Share in relevant groups
- Best times: Tuesday-Thursday 8-10 AM

### WhatsApp
- Perfect for direct referrals
- Compact square preview
- Fast loading on mobile

## Troubleshooting

### Preview Not Showing?
1. Wait 1-2 minutes for cache
2. Try incognito/private mode
3. Use platform debugging tools:
   - Facebook: developers.facebook.com/tools/debug/
   - Twitter: cards-dev.twitter.com/validator

### Wrong Image Displaying?
1. Clear browser cache
2. Use platform refresh tools
3. Check image accessibility

## Analytics & Tracking

### What We Monitor
- Click-through rates by platform
- Engagement metrics
- Best performing content
- Optimal posting times

### Performance Data
- Facebook: Higher engagement with professional context
- Twitter: Tech hashtags perform well
- LinkedIn: Business networking gets most clicks
- WhatsApp: Personal recommendations convert best

## Ready to Share! 🚀

Your Axon.App link is optimized for sharing across all major social platforms with professional branding and fast loading times.
`;

  try {
    const outputPath = path.join(__dirname, "SOCIAL_SHARING_QUICK_GUIDE.md");
    await fs.writeFile(outputPath, guideContent);

    console.log("✅ Social sharing guide generated successfully!");
    console.log(`📍 Saved to: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error generating guide:", error.message);
  }
}

generateSocialGuide();
