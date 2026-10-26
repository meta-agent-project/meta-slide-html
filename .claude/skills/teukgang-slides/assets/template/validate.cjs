const fs = require('fs');
const path = require('path');
const {pathToFileURL} = require('url');
const {chromium} = require('playwright');

(async () => {
  const root = path.resolve(process.argv[2] || __dirname);
  const htmlPath = path.join(root, 'lecture.html');
  const out = path.join(root, 'validation');
  fs.mkdirSync(out, {recursive:true});
  const browser = await chromium.launch({headless:true, ...(process.env.BROWSER_CHANNEL ? {channel:process.env.BROWSER_CHANNEL} : {})});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  const errors = [], results = [], checks = {};
  page.on('pageerror', e => errors.push(e.message));
  const project = JSON.parse(fs.readFileSync(path.join(root,'slides-built.json'),'utf8'));
  const frame = () => page.frames().find(f => f.parentFrame() === page.mainFrame());
  const state = f => f.evaluate(() => document.body.innerText + '|' + [...document.querySelectorAll('[data-flow-frame],[data-live-frame],[data-family-frame],[data-architecture-frame],[data-context-frame],[data-interview-frame]')].map(e=>e.outerHTML).join('|'));
  const ready = async () => {
    await page.waitForTimeout(180);
    const f = frame();
    await f.evaluate(async () => {await document.fonts.ready; await Promise.all([...document.images].map(im=>im.decode().catch(()=>{})))});
    return f;
  };
  const select = async i => {await page.locator('#nav').selectOption(String(i)); return await ready()};
  await page.goto(pathToFileURL(htmlPath).href);
  await ready();
  for (let i=0;i<project.slides.length;i++) {
    const f = await select(i);
    const missing = await f.evaluate(()=>[...document.images].filter(im=>!im.naturalWidth).map(im=>im.alt));
    const motion = await f.locator('[data-motion-direction="next"]').count();
    const stageChecks = {};
    if (motion) {
      const next = f.locator('[data-motion-direction="next"]').first();
      const previous = f.locator('[data-motion-direction="previous"]').first();
      await f.getByRole('button',{name:'일시정지',exact:true}).click();
      const before = await state(f);
      await next.click(); await page.waitForTimeout(180);
      const after = await state(f);
      stageChecks.next = before !== after;
      await previous.click(); await page.waitForTimeout(180);
      stageChecks.previous = await state(f) !== after;
      await f.getByRole('button',{name:'재생',exact:true}).click();
      for(let retry=0;retry<15 && await state(f)===before;retry++) await page.waitForTimeout(200);
      await f.getByRole('button',{name:'일시정지',exact:true}).click();
      stageChecks.play = await state(f) !== before;
      await f.getByRole('button',{name:'다시시작',exact:true}).click(); await page.waitForTimeout(180);
      stageChecks.reset = await state(f) === before;
      stageChecks.order = (await f.locator('button').allTextContents()).map(t=>t.trim()).filter(t=>['재생','일시정지','이전','다음','다시시작'].includes(t)).join('|') === '재생|일시정지|이전|다음|다시시작';
      for(let j=0;j<24;j++) await next.click();
      await page.waitForTimeout(200);
    }
    const bounds = await f.evaluate(()=>[...document.querySelectorAll('section *')].filter(e=>{
      const r=e.getBoundingClientRect(), s=getComputedStyle(e);
      return s.visibility!=='hidden' && s.opacity!=='0' && r.width && r.height && (r.x < -1 || r.y < -1 || r.right > 1281 || r.bottom > 721);
    }).map(e=>e.tagName+'.'+e.className));
    await page.locator('#stage').screenshot({path:path.join(out,`slide-${i+1}.png`)});
    results.push({slide:i+1,missing,bounds,checks:stageChecks});
  }
  const firstMotion=results.findIndex(r=>r.checks.next!==undefined);
  if(firstMotion>=0) {
    let f=await select(firstMotion);
    await f.getByRole('button',{name:'다시시작',exact:true}).click();
    const initial=await state(f);
    await page.locator('header strong').click(); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(300);
    checks.parentStep = await page.locator('#nav').inputValue()===String(firstMotion) && await state(f)!==initial;
    await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(300);
    checks.parentPrevious = await state(f)===initial;
    // Focus the iframe through a harmless element; a synthetic click doesn't navigate slides.
    await f.locator('h1').evaluate(e=>{e.tabIndex=-1;e.focus()});
    await page.keyboard.press('PageDown'); await page.waitForTimeout(300);
    checks.iframeStep = await page.locator('#nav').inputValue()===String(firstMotion) && await state(f)!==initial;
    await page.keyboard.press('Shift+ArrowRight'); await page.waitForTimeout(250);
    checks.shiftNext = await page.locator('#nav').inputValue()===String(firstMotion+1);
    await page.keyboard.press('Shift+ArrowLeft'); await page.waitForTimeout(250);
    checks.shiftPrevious = await page.locator('#nav').inputValue()===String(firstMotion);
    f=frame();
    for(let j=0;j<24;j++)await f.locator('[data-motion-direction="next"]').first().click();
    await page.locator('header strong').click();await page.keyboard.press('ArrowRight');await page.waitForTimeout(350);
    checks.stepEndNextSlide=await page.locator('#nav').inputValue()===String(firstMotion+1);
    f=await select(firstMotion);
    await page.locator('header strong').click();await page.keyboard.press('ArrowLeft');await page.waitForTimeout(350);
    checks.stepStartPreviousSlide=await page.locator('#nav').inputValue()===String(firstMotion-1);
  }
  let f=await select(0);
  await page.locator('#noteBtn').click();checks.notes=await page.locator('#notes').isVisible();await page.locator('#noteBtn').click();
  // Blank area at the top of a slide; coordinates are in the iframe's own CSS pixels.
  await f.locator('body').click({position:{x:1100,y:8}});await page.waitForTimeout(250);
  checks.clickNext=await page.locator('#nav').inputValue()==='1';
  f=frame();await f.locator('body').click({position:{x:20,y:8}});await page.waitForTimeout(250);
  checks.clickPrevious=await page.locator('#nav').inputValue()==='0';
  f=frame();await page.locator('#edit').click();await f.locator('h1').first().fill('편집 저장 검증 < & >');
  await page.keyboard.press('ArrowRight');checks.editDoesNotNavigate=await page.locator('#nav').inputValue()==='0';
  const save=page.waitForEvent('download');await page.locator('#save').click();const saved=path.join(out,'roundtrip.html');await(await save).saveAs(saved);
  await page.goto(pathToFileURL(saved).href);f=await ready();
  checks.roundtrip=(await f.locator('h1').first().textContent())==='편집 저장 검증 < & >' && await page.locator('#nav option').count()===project.slides.length;
  const jsonDownload=page.waitForEvent('download');await page.locator('#json').click();const exported=path.join(out,'roundtrip.json');await(await jsonDownload).saveAs(exported);
  const parsed=JSON.parse(fs.readFileSync(exported,'utf8'));checks.jsonExport=parsed.slides.length===project.slides.length;
  await page.locator('#import').setInputFiles(exported);await page.waitForTimeout(250);f=frame();checks.jsonImport=(await f.locator('h1').first().textContent())==='편집 저장 검증 < & >';
  if(firstMotion>=0){f=await select(firstMotion);const before=await state(f);await f.locator('[data-motion-direction="next"]').first().click();await page.waitForTimeout(200);checks.roundtripMotion=await state(f)!==before;}
  const report={results,checks,errors};fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));await browser.close();
  if(errors.length||Object.values(checks).some(v=>!v)||results.some(r=>r.bounds.length||r.missing.length||Object.values(r.checks).some(v=>!v)))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
