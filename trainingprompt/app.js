const texts=[...document.querySelectorAll('[data-zh]')];
texts.forEach(el=>el.dataset.en=el.innerHTML);
let lang='en', mode='image';
const control=document.querySelector('#language');
function detectLanguage(languages){
 for(const language of languages){
  const base=String(language).toLowerCase().split(/[-_]/)[0];
  if(base==='ar')return 'ar';
  if(base==='zh')return 'zh-CN';
  if(base==='en')return 'en';
 }
 return 'en';
}
function renderCue(){
 const labels={en:['Jumping jack','Orange · You choose the action','One clear direction','Happy expression','Match this expression'], 'zh-CN':['开合跳','橙色 · 由你定义动作','向左 · 一个清晰的方向','开心的表情','模仿这个表情'],ar:['قفز مع فتح الذراعين والساقين','برتقالي · أنت تختار الحركة','اتجاه واحد واضح','تعبير سعيد','قلّد هذا التعبير']}[lang];
 const cues={image:`<img src="assets/jumping-jack.webp" width="290" height="290" alt="${labels[0]}"><strong>${labels[0]}</strong>`,color:`<span class="color-disc" aria-hidden="true"></span><strong>${labels[1]}</strong>`,word:`<span class="big-cue" dir="ltr" lang="en">LEFT</span><strong>${labels[2]}</strong>`,emoji:`<span class="emoji-cue" role="img" aria-label="${labels[3]}">😄</span><strong>${labels[4]}</strong>`};
 document.querySelector('#cue-content').innerHTML=cues[mode];
 document.querySelector('.stage-bottom>span:last-child').textContent=['image','color','word','emoji'].map(x=>x===mode?'●':'○').join(' ');
}
function setLanguage(preference){
 lang=preference==='auto'?detectLanguage(navigator.languages?.length?navigator.languages:[navigator.language]):preference;
 if(!['en','zh-CN','ar'].includes(lang))lang='en';
 document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 texts.forEach(el=>el.innerHTML=el.dataset[lang==='zh-CN'?'zh':lang]||el.dataset.en);
 document.querySelector('.skip').textContent={en:'Skip to content','zh-CN':'跳转到正文',ar:'انتقل إلى المحتوى'}[lang];
 document.querySelector('nav').setAttribute('aria-label',{en:'Main navigation','zh-CN':'主导航',ar:'التنقل الرئيسي'}[lang]);
 document.querySelector('.demo-options').setAttribute('aria-label',{en:'Choose a cue type','zh-CN':'选择提示类型',ar:'اختر نوع الإشارة'}[lang]);
 document.querySelector('.visual-label').textContent={en:'YOUR NEXT MOVE','zh-CN':'你的下一个动作',ar:'حركتك التالية'}[lang];
 document.title={en:'Training Prompt — Find your rhythm.','zh-CN':'Training Prompt — 找到你的训练节奏',ar:'Training Prompt — اعثر على إيقاعك'}[lang];
 renderCue();
}
let preference='auto';
try{const saved=localStorage.getItem('trainingprompt-language');if(['auto','en','zh-CN','ar'].includes(saved))preference=saved;}catch{}
control.value=preference;setLanguage(preference);
control.addEventListener('change',()=>{preference=control.value;setLanguage(preference);try{localStorage.setItem('trainingprompt-language',preference);}catch{}});
window.addEventListener('languagechange',()=>{if(preference==='auto')setLanguage('auto');});
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.mode;document.querySelectorAll('[data-mode]').forEach(el=>{el.classList.toggle('active',el===button);el.setAttribute('aria-pressed',String(el===button));});renderCue();}));
