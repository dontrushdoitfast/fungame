const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Title / Start Screen
    await page.goto('http://127.0.0.1:8080/index.html');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshot_menu.png' });
    console.log("Screenshot: Menu");

    // Click Normal Mode and wait for pointer lock/game load
    await page.click('#btn-normal');
    await page.waitForTimeout(500);

    // Active Gameplay (Corridor)
    await page.screenshot({ path: 'screenshot_gameplay.png' });
    console.log("Screenshot: Gameplay");

    // Shoot
    await page.mouse.down();
    await page.waitForTimeout(50);
    await page.screenshot({ path: 'screenshot_combat.png' });
    console.log("Screenshot: Combat (Muzzle Flash)");
    await page.mouse.up();

    // Change weapon to check HUD updates
    await page.keyboard.press('3');
    await page.waitForTimeout(100);
    await page.screenshot({ path: 'screenshot_hud.png' });
    console.log("Screenshot: HUD updated");

    // Force Game Over
    await page.evaluate(() => {
        takeDamage(1000);
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshot_gameover.png' });
    console.log("Screenshot: Game Over");

    await browser.close();
})();
