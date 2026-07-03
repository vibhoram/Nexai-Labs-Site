import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { execSync } from 'child_process';

const demos = [
  { name: 'forge', url: 'https://fof.nexailabs.tech/', duration: 8000 },
  { name: 'apexflow', url: 'https://apxflow.netlify.app/', duration: 8000 },
];

await mkdir('assets/videos', { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const demo of demos) {
  console.log(`Recording ${demo.name}...`);
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: 'assets/videos',
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();

  let videoPath = null;
  const video = page.video();

  try {
    await page.goto(demo.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1500);
    await page.mouse.move(640, 360);
    await page.waitForTimeout(500);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(2000);
    await page.mouse.wheel(0, -200);
    await page.waitForTimeout(demo.duration - 4000);
  } catch (err) {
    console.warn(`Navigation issue for ${demo.name}:`, err.message);
    await page.waitForTimeout(demo.duration);
  }

  if (video) {
    videoPath = await video.path();
  }

  await context.close();

  if (videoPath) {
    const webmPath = `assets/videos/${demo.name}.webm`;
    const mp4Path = `assets/videos/${demo.name}.mp4`;

    execSync(`mv "${videoPath}" "${webmPath}"`);

    execSync(
      `ffmpeg -y -i "${webmPath}" -c:v libx264 -pix_fmt yuv420p -movflags +faststart -an "${mp4Path}"`,
      { stdio: 'inherit' }
    );

    console.log(`Saved ${mp4Path}`);
  }
}

await browser.close();
console.log('Done recording demos.');
