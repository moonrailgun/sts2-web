// Localization preload: the rule layer reads tables synchronously through Godot FileAccess (res://localization/...).
import { $, G, GAME_VERSION } from './game';
import { A } from './assets';

export let languages: string[] = [];
/** The tables as lazy js/ chunks rather than fetched .json (CDN-cacheable, see loadAssetIndex). */
const tables = import.meta.glob<string>('../../../assets/i18n/*/*.json', { query: '?raw', import: 'default' });
export async function preloadLocalization(langs: string[]) {
  const idx = await (await fetch(A + 'i18n/index.json')).json();
  languages = idx.languages;
  const files = new Map<string, string>();
  await Promise.all(langs.flatMap((l) => idx.tables.map(async (t: string) => {
    const text = await tables[`../../../assets/i18n/${l}/${t}.json`]?.();
    if (text != null) files.set(`localization/${l}/${t}.json`, text);
  })));
  files.set('localization/completion.json', await (await fetch(A + 'i18n/completion.json')).text());
  $.setResourceReader((p: string) => files.get(p) ?? null);
  $.setResourceLister((dir: string) => {
    const pre = dir.replace(/\/$/, '') + '/';
    return [...files.keys(), ...listed].filter((k) => k.startsWith(pre) && !k.slice(pre.length).includes('/')).map((k) => k.slice(pre.length));
  });
}
/** Extra res:// paths that DirAccess listings should see (converted scenes, e.g. background layer directories). */
const listed: string[] = [];
export function addListedFiles(paths: string[]) { listed.push(...paths); }
export async function setLanguage(lang: string) {
  await preloadLocalization(lang === 'eng' ? ['eng'] : ['eng', lang]);
  try { localStorage.setItem('sts2web.lang', lang); } catch { /* private mode: not remembered */ }
  G.SaveManager.Instance.SettingsSave.Language = lang;
  G.LocManager.Instance.SetLanguage(lang);
  document.documentElement.dataset.lang = lang; // style.css: FontManager's per-language font substitution
}
/** A localized string with SmartFormat variables (numbers are added as decimals, like LocString.Add). */
export const locv = (table: string, key: string, vars: Record<string, string | number | boolean>) => {
  try {
    const ls = new G.LocString().$ctor_LocString(table, key);
    for (const [k, v] of Object.entries(vars)) {
      if (typeof v === 'number') ls.Add$String_Decimal(k, v);
      else if (typeof v === 'boolean') ls.Add$String_Boolean(k, v);
      else ls.Add$String_String(k, v);
    }
    return ls.GetFormattedText();
  } catch { return key; }
};
export const loc = (table: string, key: string) => {
  try { return new G.LocString().$ctor_LocString(table, key).GetFormattedText(); } catch { return key; }
};

/** App labels resolved through the game's own tables (English fallback when a table lacks the key). */
const UI = {
  endTurn: ['settings_ui', 'INPUT_SETTINGS.INPUT_TITLE.endTurn', 'End Turn'],
  enemyTurn: ['gameplay_ui', 'ENEMY_TURN', 'Enemy Turn'],
  proceed: ['gameplay_ui', 'PROCEED_BUTTON', 'Proceed'],
  skip: ['gameplay_ui', 'CHOOSE_CARD_SKIP_BUTTON', 'Skip'],
  loot: ['gameplay_ui', 'COMBAT_REWARD_HEADER_LOOT', 'Loot!'],
  drawPile: ['gameplay_ui', 'DRAW_PILE', 'Draw Pile'],
  discardPile: ['gameplay_ui', 'DISCARD_PILE', 'Discard Pile'],
  exhaust: ['card_keywords', 'EXHAUST.title', 'Exhaust'],
  chooseCard: ['gameplay_ui', 'CHOOSE_CARD_HEADER', 'Choose a Card'],
  chooseRelic: ['gameplay_ui', 'CHOOSE_RELIC_HEADER', 'Choose a Relic'],
  mainMenu: ['game_over_screen', 'BUTTON.mainMenu', 'Main Menu'],
  restSite: ['static_hover_tips', 'ROOM_REST.title', 'Rest Site'],
  restPrompt: ['rest_site_ui', 'PROMPT', 'What shall I do?'],
  merchant: ['map', 'LEGEND_MERCHANT.title', 'Merchant'],
  cardRemoval: ['merchant_room', 'MERCHANT.cardRemovalService.title', 'Card Removal Service'],
  treasure: ['map', 'LEGEND_TREASURE.title', 'Treasure'],
  map: ['map', 'LEGEND_MAP.hoverTip.title', 'Map'],
  back: ['extensions', 'EXTENSION.tutorial.back', 'Back'],
  close: ['timeline', 'EPOCH_INSPECT.closeButton', 'Close'],
  confirm: ['timeline', 'UNLOCK_CONFIRM', 'Confirm'],
  settings: ['gameplay_ui', 'PAUSE_MENU.SETTINGS', 'Settings'],
  language: ['settings_ui', 'LANGUAGE', 'Language'],
  fastMode: ['settings_ui', 'FASTMODE', 'Fast Mode'],
  masterVolume: ['settings_ui', 'MASTER_VOLUME', 'Master Volume'],
  musicVolume: ['settings_ui', 'MUSIC_VOLUME', 'BGM Volume'],
  sfxVolume: ['settings_ui', 'SFX_VOLUME', 'SFX Volume'],
  ambienceVolume: ['settings_ui', 'AMBIENCE_VOLUME', 'Ambience Volume'],
  deck: ['static_hover_tips', 'DECK.title', 'Deck'],
  fpsCap: ['settings_ui', 'FPS_CAP', 'FPS Limit'],
  msaa: ['settings_ui', 'MSAA', 'MSAA'],
  credits: ['settings_ui', 'CREDITS_BUTTON_LABEL', 'Credits'],
  stars: ['static_hover_tips', 'STAR_COUNT.title', 'Stars'],
} as const;
export function t(k: keyof typeof UI): string {
  const [table, key, fallback] = UI[k];
  const s = loc(table, key).replace(/\s*[(（][A-Z0-9]{1,3}[)）]$/, ''); // hover-tip titles carry a hotkey hint: "Deck (D)"
  return s && s !== key ? s : fallback;
}

/** App-only strings the game has no text for (it uses visuals instead); English fallback. */
const APP: Record<string, Record<string, string>> = {
  portPatchNotesHeader: { eng: 'Web Port Updates', zhs: '移植版更新' },
  storageFull: { eng: 'Saving failed. Your previous save is kept; check browser storage and try again.', zhs: '保存失败，已保留上一次存档。请检查浏览器存储后重试。' },
  exportSaves: { eng: 'Save backup', zhs: '存档备份' },
  exportButton: { eng: 'Download', zhs: '下载备份' },
  restoreSaves: { eng: 'Restore saves', zhs: '恢复存档' },
  restoreButton: { eng: 'Restore', zhs: '恢复' },
  restoreBody: { eng: 'A backup of your current saves has been downloaded. Make sure you have kept it before continuing.\n\nRestore replaces ALL profiles, run history and settings with the selected backup, then reloads the game.', zhs: '已下载当前存档的备份，请确认已妥善保存后再继续。\n\n恢复会用所选备份替换全部存档槽位、对局历史和设置，随后重新载入游戏。' },
  backupExported: { eng: 'Backup downloaded. Keep a copy outside this browser, such as in your cloud drive.', zhs: '备份已下载，请另存到网盘等浏览器之外的位置。' },
  backupFailed: { eng: 'Backup or restore failed. Check the file and available storage; your existing saves were not replaced.', zhs: '备份或恢复失败，请检查文件和可用空间；现有存档未被替换。' },
  restoreUnavailable: { eng: 'This browser cannot safely restore saves. Download a backup and restore it in a browser with IndexedDB and Web Locks support.', zhs: '当前浏览器无法安全恢复存档。可先下载备份，再用支持 IndexedDB 和 Web Locks 的浏览器恢复。' },
  protectStorage: { eng: 'Protect browser saves', zhs: '保护浏览器存档' },
  protectButton: { eng: 'Request', zhs: '申请保护' },
  storageProtected: { eng: 'Persistent storage is enabled for this site, reducing automatic removal under storage pressure.\n\nClearing site data still deletes saves. Download backups regularly and keep them outside the browser.', zhs: '已获得此站点的持久存储权限，可降低空间不足时被自动清理的风险。\n\n手动清除网站数据仍会删除存档。请定期下载备份，并保存在浏览器之外。' },
  storageNotProtected: { eng: 'The browser has not granted persistent storage. You can try again later.\n\nDownload backups regularly and keep them outside the browser.', zhs: '浏览器尚未授予持久存储权限，可以稍后再试。\n\n请定期下载备份，并保存在浏览器之外。' },
  saveTabOpen: { eng: 'The game is open in another tab. Close that tab, then reload here to protect your saves.', zhs: '游戏已在另一个标签页打开。为保护存档，请先关闭那个页面，再重新载入。' },
  reloadGame: { eng: 'Reload game', zhs: '重新载入游戏' },
  afterReload: { eng: 'Applies the next time the game loads.', zhs: '下次载入游戏时生效。' },
  noStorage: { eng: 'This browser blocks storage: progress lasts until the tab closes.', zhs: '浏览器禁止了本地存储：进度只保留到关闭页面为止。' },
  unofficial: { eng: 'Unofficial fan port, for learning only', zhs: '非官方正版，仅供学习使用' }, // ui/menu.tsx PortLinks
  shutdownNotice: { eng: 'Due to copyright issues, the game is expected to go offline around 5:00 AM PDT on Sunday, October 11. Please manage your game progress accordingly.', zhs: '由于版权问题，游戏本体预计于太平洋时间 10 月 11 日（周日）上午 5:00 左右下线。请注意管理自己的游戏进度' },
  // ui/settings.tsx: the port's full unlock
  unlockAll: { eng: 'Unlock Everything', zhs: '全解锁' },
  unlockAllButton: { eng: 'Unlock', zhs: '解锁' },
  unlockAllBody: {
    eng: 'Unlocks all characters, Timeline content and Ascensions, and marks Compendium entries as discovered. Enemies with no fight records gain one win.\n\n[red]Cannot be undone.[/red] To keep this profile\'s progress, switch to an empty profile first.',
    zhs: '在当前存档中解锁全部角色、时间线内容和进阶等级，并标记百科条目为已发现。没有战斗记录的敌人会补记一次胜利。\n\n[red]此操作无法撤销。[/red]想保留现有进度的话，可以先切换到一个空存档。',
  },
  unlockAllDone: { eng: 'Everything is unlocked.', zhs: '已全部解锁。' },
  // ui/feedback.tsx: the feedback goes to the port, not to Mega Crit
  feedback: { eng: 'Feedback', zhs: '问题反馈' },
  feedbackPlaceholder: { eng: "Feedback here goes to this web port's author, not to Mega Crit. Up to 500 characters.", zhs: '这里的反馈会发给网页版作者，不会发给 Mega Crit。最多 500 字。' },
  // ui/menu.tsx PortLinks, ui/disclaimer.tsx showQQGroupDialog: Chinese players only
  qqGroup: { eng: 'QQ Group', zhs: 'QQ群' },
  qqGroupBody: { eng: '[center]Welcome to join our QQ group to share and chat![/center]', zhs: '[center]欢迎加入QQ群分享交流！[/center]' },
  // ui/disclaimer.tsx: the port's own notice in place of the game's Early Access text
  aboutHeader: { eng: 'About This Project', zhs: '关于本项目' },
  aboutBody: {
    eng: `[gold][b]Slay the Spire 2 Web[/b][/gold] is an unofficial, open-source fan port of the original game ([blue]v${GAME_VERSION}[/blue]) that runs in your browser.\n\n`
      + 'If you like this project, come give it a [gold]Star[/gold] on GitHub! Every star keeps the updates coming:\n[url=https://github.com/moonrailgun/sts2-web]github.com/moonrailgun/sts2-web[/url]\n\n'
      + '[gray]Disclaimer: this project is for learning and technical exchange only, is non-commercial, and is not affiliated with Mega Crit. All game art, music and text are the property of Mega Crit. If you enjoy the game, please buy it on Steam and support the developers![/gray]\n\n'
      + 'Alright, you have a Spire to climb!',
    zhs: `[gold][b]杀戮尖塔2 网页版[/b][/gold]是由爱好者制作的非官方开源移植，基于原版 [blue]v${GAME_VERSION}[/blue] 移植到网页上运行。\n\n`
      + '如果你喜欢这个项目，欢迎来 GitHub 给仓库点一个 [gold]Star[/gold]！你的每一颗 Star 都是项目继续更新的动力：\n[url=https://github.com/moonrailgun/sts2-web]github.com/moonrailgun/sts2-web[/url]\n\n'
      + '[gray]免责声明：本项目仅供学习与技术交流，不作任何盈利用途，与 Mega Crit 没有任何关联。游戏的美术、音乐、文本等全部内容的版权均归 Mega Crit 所有。喜欢这款游戏的话，请前往 Steam 购买正版支持原作者！[/gray]\n\n'
      + '好啦，让我们，在高塔的攀爬中相见！',
  },
};
export function appText(k: keyof typeof APP, language?: string): string {
  const lang = language ?? (() => { try { return G.LocManager.Instance.Language; } catch { return 'eng'; } })();
  return APP[k][lang] ?? APP[k].eng;
}
