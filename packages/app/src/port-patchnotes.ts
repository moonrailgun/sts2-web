/** Web port updates, newest first. Add both languages here; original game notes remain in assets/patch_notes. */
export const portPatchNotes: { date: string; eng: string; zhs: string }[] = [
  {
    date: '2026_10_10',
    eng: `[gold][b]Main menu[/b][/gold]
• The offline notice now shows the expected shutdown time: around 5:00 AM PDT on Sunday, October 11.`,
    zhs: `[gold][b]主菜单[/b][/gold]
• 下线提示补充预计下线时间：太平洋时间 10 月 11 日（周日）上午 5:00 左右。`,
  },
  {
    date: '2026_10_08',
    eng: `[gold][b]Main menu[/b][/gold]
• Added a prominent notice that the game will be taken offline soon due to copyright issues, reminding players to manage their progress.
• Added a Wiki entry to the main menu, opening this site's Wiki in a new tab.`,
    zhs: `[gold][b]主菜单[/b][/gold]
• 新增醒目的下线提示：由于版权问题，游戏本体将会在近期下线，请注意管理自己的游戏进度。
• 主菜单新增 Wiki 入口，可在新标签页打开本站 Wiki。`,
  },
  {
    date: '2026_10_06',
    eng: `[gold][b]Performance[/b][/gold]
• Halved the memory music takes on phones and tablets, making crashes and blank screens less likely.

[gold][b]Community[/b][/gold]
• With both the browser and the game in Chinese, a QQ Group button in the main menu's bottom-left corner shows the group's QR code.

[gold][b]Wiki[/b][/gold]
• Added a wiki at /wiki/ on this site, in English and Chinese: cards, relics, potions, powers, keywords, characters, monsters, encounters and events, with the numbers shown in game, filters and search.`,
    zhs: `[gold][b]性能[/b][/gold]
• 手机和平板上音乐占用的内存减半，降低页面崩溃和白屏的概率。

[gold][b]社区[/b][/gold]
• 浏览器和游戏语言均为中文时，主菜单左下角新增「QQ群」按钮，点开可扫码加入玩家交流群。

[gold][b]资料站[/b][/gold]
• 本站新增 Wiki（/wiki/），提供中英文：卡牌、遗物、药水、能力、关键词、角色、怪物、遭遇战和事件，数值与游戏内一致，支持筛选和搜索。`,
  },
  {
    date: '2026_10_05',
    eng: `[gold][b]Save protection[/b][/gold]
• Failed writes now preserve the previous save; Save and Quit waits for pending saves.
• Prevented simultaneous game tabs from overwriting saves in browsers supporting Web Locks.
• Added downloadable backups for all profiles and run history, and backup restoration in General settings.
• Added a browser storage protection request in General settings.

[gold][b]Settings[/b][/gold]
• Added Unlock Everything to the General settings, on the main menu: it unlocks every character, all Timeline content and every Ascension level, and reveals Compendium entries on the current save profile. This cannot be undone.
• Clicking the notice in the main menu's bottom-right corner reopens the About This Project window.

[gold][b]Display fixes[/b][/gold]
• Fixed room backgrounds turning blank or black after visiting shops or rest sites on devices with limited graphics resources.`,
    zhs: `[gold][b]存档保护[/b][/gold]
• 修复写入失败可能丢失旧档的问题；保存并退出会等待存档完成。
• 支持 Web Locks 的浏览器会阻止多个游戏页面同时覆盖存档。
• 通用设置新增全存档及对局历史备份下载和备份恢复。
• 通用设置新增浏览器存储保护申请。

[gold][b]设置[/b][/gold]
• 主菜单的通用设置中新增「全解锁」：在当前存档中解锁全部角色、时间线中的全部内容和全部进阶等级，并点亮百科图鉴。此操作无法撤销。
• 点击主菜单右下角的说明文字可再次打开「关于本项目」窗口。

[gold][b]显示修复[/b][/gold]
• 修复图形资源受限的设备在进入商店、火堆后，房间背景持续空白或黑屏的问题。`,
  },
  {
    date: '2026_10_04',
    eng: `[gold][b]Display and layout[/b][/gold]
• Added an aspect ratio setting: Auto, 4:3, 16:10, 16:9 and 21:9.
• Menus, combat, maps and other screens now adapt to the selected aspect ratio, making better use of wide and tall displays.
• Removed the browser's blue touch highlight throughout the app.
• Fixed tiny End Turn text on iOS Safari and enlarged the button on small touch screens.

[gold][b]Touch controls[/b][/gold]
• Fixed buff descriptions disappearing while holding a status icon.
• Fixed buff icons not showing descriptions when held in Firefox for Android.
• Fixed card targeting arrows appearing away from your finger on iOS Safari, in both landscape and portrait.
• Cards now return to your hand when released there or without a valid target; interrupted touches also cancel the drag.

[gold][b]Audio[/b][/gold]
• Music and sound effects now fall back to MP3 on browsers without Ogg/Opus support, including older iOS Safari versions.
• Audio loading now retries brief network failures; failed samples can load again when played later without refreshing the page.

[gold][b]Feedback[/b][/gold]
• Added a feedback form, opened from the main menu or the settings. Feedback goes to the web port's author, not to Mega Crit.

[gold][b]Performance[/b][/gold]
• Reduced interface rendering memory use on small screens, fixing iPhone Safari reloading when starting a run.
• Reduced the particle count in the fight against The Insatiable for smoother play.`,
    zhs: `[gold][b]显示与布局[/b][/gold]
• 新增宽高比设置，支持自动、4:3、16:10、16:9 和 21:9。
• 主菜单、战斗、地图等界面随所选宽高比调整布局，更好地适配宽屏和较高的屏幕。
• 移除整个应用中按住按钮等控件时浏览器自带的蓝色触摸高亮。
• 修复 iOS Safari 上结束回合文字过小的问题，并放大小触屏上的按钮。

[gold][b]触屏操作[/b][/gold]
• 修复按住状态图标时，增益或减益效果说明消失的问题。
• 修复 Android 火狐浏览器中按住增益或减益图标无法显示说明的问题。
• 修复 iOS Safari 横屏和竖屏时，卡牌瞄准箭头偏离手指位置的问题。
• 卡牌在手牌区松开，或未选中有效目标时松开，会自动放回；触摸中断也会取消拖牌。

[gold][b]音频[/b][/gold]
• 不支持 Ogg/Opus 的浏览器会自动使用 MP3，修复旧版 iOS Safari 中音乐和部分音效无声的问题。
• 音频加载遇到短暂网络故障时会自动重试；加载失败的音频在后续播放时可重新加载，无需刷新页面。

[gold][b]问题反馈[/b][/gold]
• 新增问题反馈，可从主菜单或设置中打开。反馈会发给网页版作者，不会发给 Mega Crit。

[gold][b]性能[/b][/gold]
• 降低小屏幕上的界面绘制内存占用，修复 iPhone Safari 开局时反复重载的问题。
• 减少与「无厌沙虫」战斗时的粒子数量，让画面更流畅。`,
  },
  {
    date: '2026_10_03',
    eng: `[gold][b]Performance[/b][/gold]
• Mobile devices now start with more conservative rendering settings to reduce rendering load.
• Improved caching of game files and assets for repeat visits.

[gold][b]Fixes[/b][/gold]
• Fixed shop purchases with Lord's Parasol, including pause shortcuts while purchasing.
• Fixed combat controls in events that use the combat layout.
• Fixed the Crystal Sphere board disappearing behind its reward screen.
• Fixed the timing of the sculptor's particle effects.
• Centered reward icons and corrected the Proceed button's text styling.

[gold][b]Main menu[/b][/gold]
• Added a GitHub link and a notice identifying this project as an unofficial port.`,
    zhs: `[gold][b]性能[/b][/gold]
• 移动设备默认采用更保守的渲染设置，降低渲染负担。
• 优化游戏文件和资源的缓存，方便再次访问时复用已下载内容。

[gold][b]问题修复[/b][/gold]
• 修复持有「领主阳伞」时的商店购买流程，以及购买过程中的暂停快捷键。
• 修复使用战斗布局的事件中，战斗界面无法正常操作的问题。
• 修复「水晶球」事件打开奖励界面后，棋盘消失的问题。
• 修复雕刻师粒子特效的播放时机。
• 调整奖励图标的居中位置，并修复前进按钮的文字样式。

[gold][b]主菜单[/b][/gold]
• 新增 GitHub 入口和非官方移植说明。`,
  },
  {
    date: '2026_10_02',
    eng: `[gold][b]Controls and presentation[/b][/gold]
• Added the developer console. Press the backtick key to open or close it.
• Purchased cards now fly into the deck, and the deck counter updates after a purchase.
• Fixed the card removal selection screen in shops.
• Fixed potion popups closing as soon as they were pressed.
• Declared the game's dark color scheme to prevent browsers from darkening it again.
• Added an introduction to the web port and its GitHub project.`,
    zhs: `[gold][b]操作与表现[/b][/gold]
• 新增开发者控制台，可按反引号键打开或关闭。
• 购买的卡牌会飞入牌组，牌组数量也会随之更新。
• 修复商店移除卡牌时的选牌界面。
• 修复药水弹出菜单一按就关闭的问题。
• 声明游戏的深色配色，避免浏览器再次强制压暗画面。
• 新增网页移植版介绍及 GitHub 项目链接。`,
  },
  {
    date: '2026_10_01',
    eng: `[gold][b]The web port begins[/b][/gold]
• Released the first browser version of this unofficial port, based on Slay the Spire 2 v0.98.3.
• Added touch controls, including landscape presentation on portrait mobile screens and card dragging fixes.
• Restored full-resolution character and card artwork.
• The game initially selects a language based on your device settings; you can change it in Settings.
• Added support for installing the web app to your device's home screen.`,
    zhs: `[gold][b]网页移植版上线[/b][/gold]
• 发布首个浏览器版本，基于《杀戮尖塔 2》v0.98.3 制作的非官方移植。
• 适配触屏操作，包括手机竖屏时的横向显示，并修复卡牌拖拽问题。
• 恢复原始分辨率的角色与卡牌美术资源。
• 首次启动时根据设备设置选择游戏语言，也可在设置中手动切换。
• 支持将网页应用安装到设备主屏幕。`,
  },
];
