#!/usr/bin/env node

const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);

async function openSocialValidators() {
  console.log("🌐 Opening social media validation tools...");

  const validators = [
    {
      name: "Facebook Sharing Debugger",
      url: "https://developers.facebook.com/tools/debug/",
      platform: "Facebook/Meta",
    },
    {
      name: "Twitter Card Validator",
      url: "https://cards-dev.twitter.com/validator",
      platform: "Twitter/X",
    },
    {
      name: "LinkedIn Post Inspector",
      url: "https://www.linkedin.com/post-inspector/",
      platform: "LinkedIn",
    },
    {
      name: "Open Graph Check",
      url: "https://opengraphcheck.com/",
      platform: "General OG",
    },
  ];

  console.log("\n📋 Available Social Media Validators:");
  validators.forEach((validator, index) => {
    console.log(`${index + 1}. ${validator.name} (${validator.platform})`);
    console.log(`   URL: ${validator.url}`);
  });

  try {
    console.log("\n🚀 Opening validators in your default browser...");

    // Open each validator in the default browser
    for (const validator of validators) {
      console.log(`Opening ${validator.name}...`);

      // Cross-platform browser opening
      let command;
      switch (process.platform) {
        case "darwin": // macOS
          command = `open "${validator.url}"`;
          break;
        case "win32": // Windows
          command = `start "" "${validator.url}"`;
          break;
        default: // Linux and others
          command = `xdg-open "${validator.url}"`;
          break;
      }

      try {
        await execAsync(command);
        console.log(`✅ ${validator.name} opened`);
      } catch (error) {
        console.log(`⚠️ Could not auto-open ${validator.name}`);
        console.log(`   Please open manually: ${validator.url}`);
      }

      // Small delay between opening tabs
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("\n🎉 All validators opened!");
    console.log("\n📝 How to use:");
    console.log("1. Enter your website URL in each validator");
    console.log("2. Check that images display correctly");
    console.log("3. Verify title and description text");
    console.log("4. Test different page URLs if needed");
    console.log('5. Use "Scrape Again" if you make changes');
  } catch (error) {
    console.error("❌ Error opening validators:", error.message);
    console.log("\n📋 Manual URLs to copy and paste:");
    validators.forEach((validator) => {
      console.log(`${validator.name}: ${validator.url}`);
    });
  }
}

openSocialValidators();
