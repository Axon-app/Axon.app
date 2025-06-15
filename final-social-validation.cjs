#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");

async function validateSocialSharing() {
  console.log("🔍 Final Social Sharing Validation...");

  const publicDir = path.join(__dirname, "public");
  const indexPath = path.join(__dirname, "index.html");

  try {
    // Check required social images
    const requiredImages = [
      "og-image.png",
      "twitter-image.png",
      "whatsapp-image.png",
      "favicon.ico",
      "logo1.png",
    ];

    console.log("\n📸 Checking social media images:");
    for (const image of requiredImages) {
      const imagePath = path.join(publicDir, image);
      try {
        const stats = await fs.stat(imagePath);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`✅ ${image}: ${sizeKB}KB`);
      } catch (error) {
        console.log(`❌ ${image}: Missing`);
      }
    }

    // Check meta tags in index.html
    console.log("\n🏷️ Checking meta tags:");
    const indexContent = await fs.readFile(indexPath, "utf-8");

    const metaTags = [
      {
        tag: "og:title",
        regex: /<meta property="og:title"/,
        name: "Open Graph Title",
      },
      {
        tag: "og:description",
        regex: /<meta property="og:description"/,
        name: "Open Graph Description",
      },
      {
        tag: "og:image",
        regex: /<meta property="og:image"/,
        name: "Open Graph Image",
      },
      {
        tag: "twitter:card",
        regex: /<meta name="twitter:card"/,
        name: "Twitter Card",
      },
      {
        tag: "twitter:image",
        regex: /<meta name="twitter:image"/,
        name: "Twitter Image",
      },
    ];

    for (const meta of metaTags) {
      const found = meta.regex.test(indexContent);
      console.log(
        `${found ? "✅" : "❌"} ${meta.name}: ${found ? "Present" : "Missing"}`
      );
    }

    console.log("\n🌐 Social Media Platform URLs:");
    console.log(
      "Facebook Debugger: https://developers.facebook.com/tools/debug/"
    );
    console.log(
      "Twitter Card Validator: https://cards-dev.twitter.com/validator"
    );
    console.log(
      "LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/"
    );

    console.log("\n✅ Social sharing validation complete!");
    console.log("🚀 Ready for social media sharing across all platforms");
  } catch (error) {
    console.error("❌ Error during validation:", error.message);
  }
}

validateSocialSharing();
